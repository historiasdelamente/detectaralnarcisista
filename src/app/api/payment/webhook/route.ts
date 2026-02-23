import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { siteConfig } from '@/config/siteConfig'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // MercadoPago sends different notification formats
    let paymentId: string | null = null

    if (body.data?.id) {
      paymentId = body.data.id.toString()
    } else if (body.id) {
      paymentId = body.id.toString()
    }

    if (!paymentId) {
      return NextResponse.json({ received: true })
    }

    // Verify payment with MercadoPago
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    })

    if (!mpResponse.ok) {
      console.error('MP payment fetch failed:', mpResponse.status)
      return NextResponse.json({ received: true })
    }

    const payment = await mpResponse.json()

    if (payment.status !== 'approved') {
      return NextResponse.json({ received: true })
    }

    const sessionId = payment.external_reference
    if (!sessionId) {
      return NextResponse.json({ received: true })
    }

    const supabase = await createClient()

    // Update quiz session
    const { data: session } = await supabase
      .from('quiz_sessions')
      .update({
        payment_status: 'approved',
        payment_id: paymentId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId)
      .select()
      .single()

    if (!session?.email) {
      return NextResponse.json({ received: true })
    }

    // Send email report
    await resend.emails.send({
      from: siteConfig.emails.from,
      to: session.email,
      subject: 'Tu Reporte Completo - Detectar al Narcisista',
      html: buildEmailHtml(session),
    })

    return NextResponse.json({ received: true, processed: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ received: true })
  }
}

interface SessionData {
  total_score: number
  level: string
  category_scores: Array<{
    emoji: string
    label: string
    percentage: number
    score: number
    maxScore: number
  }>
}

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

function buildEmailHtml(session: SessionData): string {
  const levelColor = getLevelColor(session.level)
  const levelLabel = getLevelLabel(session.level)

  const categoryRows = session.category_scores.map(cat => `
    <tr>
      <td style="padding: 8px 0; color: #ffffff;">${cat.emoji} ${cat.label}</td>
      <td style="padding: 8px 0; text-align: right; color: #999;">${cat.score}/${cat.maxScore} (${cat.percentage}%)</td>
    </tr>
  `).join('')

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="background-color: #0a0a0a; color: #ffffff; font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px;">
      <div style="max-width: 480px; margin: 0 auto;">
        <div style="text-align: center; padding: 30px 0;">
          <h1 style="margin: 0; font-size: 24px;">
            <span style="color: #ffd900;">N</span>arcisista
          </h1>
          <p style="color: #666; margin-top: 8px;">Tu reporte completo</p>
        </div>

        <div style="background: #1E1E1E; border-radius: 16px; padding: 30px; margin-bottom: 20px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 48px; font-weight: 800; color: ${levelColor};">${session.total_score}/40</div>
            <div style="display: inline-block; padding: 6px 20px; border-radius: 20px; font-size: 14px; font-weight: 700; color: ${levelColor}; background: ${levelColor}20; margin-top: 8px;">
              ${levelLabel}
            </div>
          </div>

          <h3 style="color: #ffffff; margin-bottom: 16px;">Desglose por Categoría</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${categoryRows}
          </table>
        </div>

        <div style="text-align: center; padding: 20px; color: #444; font-size: 12px;">
          <p>Este test es una herramienta de orientación y no constituye un diagnóstico profesional.</p>
          <p style="margin-top: 8px;">© 2026 Historias de la Mente</p>
        </div>
      </div>
    </body>
    </html>
  `
}
