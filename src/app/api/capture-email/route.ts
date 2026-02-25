import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { siteConfig } from '@/config/siteConfig'
import { enqueueEmailSequence } from '@/features/email-sequence/services/emailScheduler'
import { buildEmail1 } from '@/features/email-sequence/services/emailTemplates'
import { EmailTemplateData } from '@/features/email-sequence/types'
import { sendToAirtable } from '@/shared/lib/airtable'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, answers, totalScore, level, categoryScores, sessionId: existingSessionId } = body

    if (!email || !answers || totalScore === undefined || !level || !categoryScores) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const supabase = await createClient()
    let sessionId = existingSessionId

    if (!sessionId) {
      const { data: session, error: dbError } = await supabase
        .from('quiz_sessions')
        .insert({
          answers,
          total_score: totalScore,
          level,
          category_scores: categoryScores,
          email,
          name: name || '',
          payment_status: 'pending',
        })
        .select('id')
        .single()

      if (dbError || !session) {
        console.error('DB error creating session:', dbError)
        return NextResponse.json({ error: 'Error al crear sesion' }, { status: 500 })
      }

      sessionId = session.id
    } else {
      await supabase
        .from('quiz_sessions')
        .update({ email, name: name || '' })
        .eq('id', sessionId)
    }

    // Enqueue 3-email sequence
    const { alreadyExists } = await enqueueEmailSequence(supabase, email, sessionId)

    // Send Email 1 immediately (hybrid: don't depend on cron)
    if (!alreadyExists) {
      const sortedCategories = [...categoryScores].sort(
        (a: { percentage: number }, b: { percentage: number }) => b.percentage - a.percentage
      )
      const topCategory = sortedCategories[0]

      const templateData: EmailTemplateData = {
        email,
        name: name || '',
        totalScore,
        maxScore: 40,
        level,
        levelLabel: getLevelLabel(level),
        levelColor: getLevelColor(level),
        categoryScores,
        topCategory: {
          label: topCategory.label,
          emoji: topCategory.emoji,
          percentage: topCategory.percentage,
          category: topCategory.category,
        },
      }

      const { subject, html } = buildEmail1(templateData)

      try {
        const emailResult = await resend.emails.send({
          from: siteConfig.emails.from,
          to: email,
          subject,
          html,
        })

        // Mark Email 1 as sent
        await supabase
          .from('email_sequences')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
            resend_message_id: emailResult.data?.id || null,
          })
          .eq('email', email)
          .eq('sequence_number', 1)
      } catch (emailError) {
        console.error('Error sending Email 1:', emailError)
        // Leave as pending for cron to retry
      }
    }

    // Send to Airtable (fire and forget - don't block response)
    sendToAirtable({
      nombre: name || '',
      email,
      fecha: new Date().toISOString(),
      score: totalScore,
      nivel: getLevelLabel(level),
      pagado: false,
    }).catch((err) => console.error('Airtable error:', err))

    return NextResponse.json({ sessionId, alreadyEnrolled: alreadyExists })
  } catch (error) {
    console.error('Capture email error:', error)
    const message = error instanceof Error ? error.message : 'Error interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
