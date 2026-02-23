import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { siteConfig } from '@/config/siteConfig'
import { buildEmail1, buildEmail2, buildEmail3 } from '@/features/email-sequence/services/emailTemplates'
import { EmailTemplateData } from '@/features/email-sequence/types'

const resend = new Resend(process.env.RESEND_API_KEY)

function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    bajo: 'Riesgo Bajo',
    moderado: 'Riesgo Moderado',
    alto: 'Riesgo Alto',
    extremo: 'Riesgo Extremo',
  }
  return labels[level] || 'Sin clasificar'
}

function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    bajo: '#22c55e',
    moderado: '#ffd900',
    alto: '#f97316',
    extremo: '#ef4444',
  }
  return colors[level] || '#ffd900'
}

const emailBuilders = {
  1: buildEmail1,
  2: buildEmail2,
  3: buildEmail3,
} as const

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()

  // Fetch pending emails that are due
  const { data: pendingEmails, error: fetchError } = await supabase
    .from('email_sequences')
    .select('*')
    .eq('status', 'pending')
    .lte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(50)

  if (fetchError) {
    console.error('Error fetching pending emails:', fetchError)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  if (!pendingEmails || pendingEmails.length === 0) {
    return NextResponse.json({ processed: 0, sent: 0, failed: 0 })
  }

  let sent = 0
  let failed = 0

  for (const emailRow of pendingEmails) {
    try {
      // Fetch quiz session for personalization
      const { data: session } = await supabase
        .from('quiz_sessions')
        .select('*')
        .eq('id', emailRow.quiz_session_id)
        .single()

      if (!session) {
        console.error(`Session not found for email sequence ${emailRow.id}`)
        await supabase
          .from('email_sequences')
          .update({ status: 'failed' })
          .eq('id', emailRow.id)
        failed++
        continue
      }

      const sortedCategories = [...(session.category_scores || [])].sort(
        (a: { percentage: number }, b: { percentage: number }) => b.percentage - a.percentage
      )
      const topCategory = sortedCategories[0] || {
        label: 'General',
        emoji: '',
        percentage: 0,
        category: 'manipulacion',
      }

      const templateData: EmailTemplateData = {
        email: emailRow.email,
        name: session.name || '',
        totalScore: session.total_score,
        maxScore: 40,
        level: session.level,
        levelLabel: getLevelLabel(session.level),
        levelColor: getLevelColor(session.level),
        categoryScores: session.category_scores || [],
        topCategory: {
          label: topCategory.label,
          emoji: topCategory.emoji,
          percentage: topCategory.percentage,
          category: topCategory.category,
        },
      }

      const seqNum = emailRow.sequence_number as 1 | 2 | 3
      const builder = emailBuilders[seqNum]
      const { subject, html } = builder(templateData)

      const emailResult = await resend.emails.send({
        from: siteConfig.emails.from,
        to: emailRow.email,
        subject,
        html,
      })

      await supabase
        .from('email_sequences')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
          resend_message_id: emailResult.data?.id || null,
        })
        .eq('id', emailRow.id)

      sent++
    } catch (error) {
      console.error(`Error processing email ${emailRow.id}:`, error)
      await supabase
        .from('email_sequences')
        .update({ status: 'failed' })
        .eq('id', emailRow.id)
      failed++
    }
  }

  return NextResponse.json({
    processed: pendingEmails.length,
    sent,
    failed,
  })
}
