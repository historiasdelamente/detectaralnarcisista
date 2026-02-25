import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { siteConfig } from '@/config/siteConfig'
import { sendToAirtable } from '@/shared/lib/airtable'

const PAYPAL_API = process.env.PAYPAL_API_URL || 'https://api-m.paypal.com'
const resend = new Resend(process.env.RESEND_API_KEY)

async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await res.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const { orderId, sessionId } = await request.json()

    if (!orderId || !sessionId) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    // Capture the PayPal order
    const accessToken = await getPayPalAccessToken()

    const captureRes = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    const capture = await captureRes.json()

    if (capture.status !== 'COMPLETED') {
      console.error('PayPal capture not completed:', capture)
      return NextResponse.json({ error: 'Pago no completado' }, { status: 400 })
    }

    const supabase = await createClient()

    // Update session as paid
    const { data: session } = await supabase
      .from('quiz_sessions')
      .update({
        payment_status: 'approved',
        payment_id: orderId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId)
      .select()
      .single()

    // Send email report
    if (session?.email) {
      try {
        const name = session.name || ''
        const subject = name
          ? `${name}, tu Reporte Completo - Detectar al Narcisista`
          : 'Tu Reporte Completo - Detectar al Narcisista'

        await resend.emails.send({
          from: siteConfig.emails.from,
          to: session.email,
          subject,
          html: buildEmailHtml(session),
        })
      } catch (emailError) {
        console.error('Email send error:', emailError)
      }

      // Update Airtable with payment status
      sendToAirtable({
        nombre: session.name || '',
        email: session.email,
        fecha: new Date().toISOString(),
        score: session.total_score,
        nivel: getLevelLabel(session.level),
        pagado: true,
      }).catch((err) => console.error('Airtable update error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Capture error:', error)
    return NextResponse.json({ error: 'Error al procesar pago' }, { status: 500 })
  }
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

interface SessionData {
  total_score: number
  level: string
  name?: string
  email?: string
  category_scores: Array<{
    emoji: string
    label: string
    percentage: number
    score: number
    maxScore: number
  }>
}

function getRecommendations(level: string): string[] {
  const recs: Record<string, string[]> = {
    bajo: [
      'Mantén una comunicación abierta y honesta en tu relación.',
      'Establece y respeta límites saludables mutuamente.',
      'Continúa educándote sobre relaciones saludables.',
    ],
    moderado: [
      'Establece límites claros y comunícalos firmemente.',
      'Considera hablar con un terapeuta o consejero de parejas.',
      'Fortalece tu red de apoyo (amistades, familia).',
      'Documenta situaciones que te incomoden para identificar patrones.',
    ],
    alto: [
      'Busca apoyo profesional (psicólogo o terapeuta especializado).',
      'Establece límites firmes y no negociables.',
      'Fortalece tu red de apoyo y no te aísles.',
      'Crea un plan de seguridad emocional y, si es necesario, física.',
      'Considera si esta relación es compatible con tu bienestar.',
    ],
    extremo: [
      'Busca ayuda profesional de inmediato (línea de ayuda o terapeuta).',
      'Prioriza tu seguridad física y emocional ante todo.',
      'Contacta organizaciones de apoyo a víctimas de abuso emocional.',
      'No enfrentes esta situación sola — busca apoyo de personas de confianza.',
      'Elabora un plan de seguridad con ayuda profesional.',
    ],
  }
  return recs[level] || recs.moderado
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
        <div style="background: #1E1E1E; border-radius: 16px; padding: 30px; margin-bottom: 20px;">
          <h3 style="color: #ffffff; margin-bottom: 16px;">Recomendaciones Personalizadas</h3>
          <ul style="color: #999; padding-left: 20px;">
            ${getRecommendations(session.level).map(r => `<li style="margin-bottom: 8px;">${r}</li>`).join('')}
          </ul>
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
