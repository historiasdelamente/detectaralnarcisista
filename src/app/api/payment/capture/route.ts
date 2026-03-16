import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { siteConfig } from '@/config/siteConfig'
import { sendToAirtable } from '@/shared/lib/airtable'
import { enqueueEmailSequence } from '@/features/email-sequence/services/emailScheduler'

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

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status}`)
  }

  const data = await res.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const { orderId, sessionId } = await request.json()

    if (!orderId || !sessionId) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

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

    const { data: session, error: updateError } = await supabase
      .from('quiz_sessions')
      .update({
        payment_status: 'approved',
        payment_id: orderId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId)
      .select()
      .single()

    if (updateError || !session) {
      console.error('Session update error:', updateError)
      return NextResponse.json({ error: 'Sesion no encontrada' }, { status: 404 })
    }

    if (session.email) {
      // Email 1: Send report immediately
      try {
        const name = session.name || ''
        const subject = name
          ? `${name}, tu Reporte Personal - Detectar al Narcisista`
          : 'Tu Reporte Personal - Detectar al Narcisista'

        await resend.emails.send({
          from: siteConfig.emails.from,
          to: session.email,
          subject,
          html: buildReportEmail(session),
        })
      } catch (emailError) {
        console.error('Email send error:', emailError)
      }

      // Enqueue emails 2 and 3 for Apego Detox promotion (24h and 48h)
      try {
        await enqueueEmailSequence(supabase, session.email, sessionId)
        // Mark email 1 as sent since we already sent the report
        await supabase
          .from('email_sequences')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('email', session.email)
          .eq('sequence_number', 1)
      } catch (seqError) {
        console.error('Email sequence enqueue error:', seqError)
      }

      // Update Airtable
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
    moderado: '#C9A84C',
    alto: '#f97316',
    extremo: '#ef4444',
  }
  return colors[level] || '#C9A84C'
}

function getLevelDescription(level: string): string {
  const descriptions: Record<string, string> = {
    bajo: 'Tu relaci&oacute;n muestra pocos indicadores de patrones narcisistas. Sin embargo, es importante que mantengas l&iacute;mites saludables y sigas educandote sobre relaciones sanas. El hecho de que hayas hecho este test habla de tu compromiso con tu bienestar.',
    moderado: 'Hemos detectado patrones que merecen atenci&oacute;n. Aunque no todos los indicadores est&aacute;n presentes, hay se&ntilde;ales que sugieren din&aacute;micas de control o manipulaci&oacute;n en tu relaci&oacute;n. Es importante que no ignores lo que sientes.',
    alto: 'Tu resultado revela patrones significativos de comportamiento narcisista en tu relaci&oacute;n. Lo que est&aacute;s viviendo no es normal y no es tu culpa. Tu cerebro ha normalizado situaciones que son da&ntilde;inas para ti. Es fundamental que busques apoyo profesional.',
    extremo: 'Tu resultado indica un nivel muy alto de patrones narcisistas. Lo que est&aacute;s experimentando es serio y merece atenci&oacute;n inmediata. No est&aacute;s loca, no es tu culpa, y no tienes que enfrentar esto sola. Tu seguridad emocional y f&iacute;sica es la prioridad.',
  }
  return descriptions[level] || descriptions.moderado
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
      'Mant&eacute;n una comunicaci&oacute;n abierta y honesta en tu relaci&oacute;n.',
      'Establece y respeta l&iacute;mites saludables mutuamente.',
      'Contin&uacute;a educ&aacute;ndote sobre relaciones saludables.',
    ],
    moderado: [
      'Establece l&iacute;mites claros y comun&iacute;calos firmemente.',
      'Considera hablar con un terapeuta o consejero de parejas.',
      'Fortalece tu red de apoyo (amistades, familia).',
      'Documenta situaciones que te incomoden para identificar patrones.',
    ],
    alto: [
      'Busca apoyo profesional (psic&oacute;logo o terapeuta especializado).',
      'Establece l&iacute;mites firmes y no negociables.',
      'Fortalece tu red de apoyo y no te a&iacute;sles.',
      'Crea un plan de seguridad emocional y, si es necesario, f&iacute;sica.',
      'Considera si esta relaci&oacute;n es compatible con tu bienestar.',
    ],
    extremo: [
      'Busca ayuda profesional de inmediato (l&iacute;nea de ayuda o terapeuta).',
      'Prioriza tu seguridad f&iacute;sica y emocional ante todo.',
      'Contacta organizaciones de apoyo a v&iacute;ctimas de abuso emocional.',
      'No enfrentes esta situaci&oacute;n sola &mdash; busca apoyo de personas de confianza.',
      'Elabora un plan de seguridad con ayuda profesional.',
    ],
  }
  return recs[level] || recs.moderado
}

function getCategoryLabel(label: string): string {
  const clean: Record<string, string> = {
    'Manipulaci\u00f3n': 'Manipulaci&oacute;n Emocional',
    'Falta de Empat\u00eda': 'Falta de Empat&iacute;a',
    'Control': 'Control y Dominaci&oacute;n',
    'Gaslighting': 'Gaslighting',
    'Grandiosidad': 'Grandiosidad y Ego',
  }
  return clean[label] || label
}

function buildReportEmail(session: SessionData): string {
  const levelColor = getLevelColor(session.level)
  const levelLabel = getLevelLabel(session.level)
  const firstName = session.name || ''
  const greeting = firstName || 'Querida'

  const categoryRows = session.category_scores.map(cat => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f0ece6;color:#333;font-family:Georgia,serif;font-size:12px;">${getCategoryLabel(cat.label)}</td>
      <td style="padding:8px 0;border-bottom:1px solid #f0ece6;text-align:right;">
        <strong style="color:${levelColor};">${cat.score}/${cat.maxScore}</strong>
        <span style="color:#999;font-size:11px;margin-left:4px;">(${cat.percentage}%)</span>
      </td>
    </tr>
  `).join('')

  const recommendationRows = getRecommendations(session.level).map((r, i) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f0ece6;color:#333;font-family:Georgia,serif;font-size:12px;line-height:1.7;">
        <strong style="color:#C9A84C;">${String(i + 1).padStart(2, '0')}.</strong> ${r}
      </td>
    </tr>
  `).join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Georgia,serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
<tr><td align="center" style="padding:15px 8px;">

<table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background-color:#ffffff;">

<!-- FRANJA DORADA SUPERIOR -->
<tr><td style="background-color:#C9A84C;padding:10px 20px;text-align:center;">
  <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;color:#ffffff;font-weight:bold;text-transform:uppercase;">tu reporte personal &bull; detectar al narcisista</p>
</td></tr>

<!-- TITULO -->
<tr><td style="background-color:#ffffff;padding:30px 25px 15px 25px;text-align:center;">
  <p style="margin:0 0 3px 0;font-family:Georgia,serif;font-size:18px;color:#1A1A2E;font-weight:bold;line-height:1.3;">${greeting},</p>
  <p style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:18px;color:#1A1A2E;font-weight:bold;line-height:1.3;">Tu Reporte Personal</p>
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:#8B5E3C;font-style:italic;line-height:1.5;">An&aacute;lisis basado en criterios cl&iacute;nicos del DSM-5</p>
</td></tr>

<!-- LINEA FINA -->
<tr><td style="padding:0 25px;"><table width="100%"><tr><td style="border-bottom:1px solid #C9A84C;font-size:0;">&nbsp;</td></tr></table></td></tr>

<!-- SCORE PRINCIPAL -->
<tr><td style="background-color:#ffffff;padding:25px 25px 10px 25px;text-align:center;">
  <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:9px;letter-spacing:2px;color:#C9A84C;font-weight:bold;text-transform:uppercase;">tu resultado</p>
  <p style="margin:0;font-family:Georgia,serif;font-size:48px;font-weight:bold;color:${levelColor};">${session.total_score}/40</p>
  <table cellpadding="0" cellspacing="0" style="margin:12px auto;">
    <tr><td style="background-color:${levelColor};border-radius:4px;padding:8px 24px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#ffffff;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">${levelLabel}</p>
    </td></tr>
  </table>
</td></tr>

<!-- DESCRIPCION DEL NIVEL -->
<tr><td style="background-color:#ffffff;padding:10px 25px 20px 25px;">
  <p style="font-family:Georgia,serif;font-size:12px;color:#333333;line-height:1.8;margin:0;">
    ${getLevelDescription(session.level)}
  </p>
</td></tr>

<!-- LINEA FINA -->
<tr><td style="padding:0 25px;"><table width="100%"><tr><td style="border-bottom:1px solid #e8e0d4;font-size:0;">&nbsp;</td></tr></table></td></tr>

<!-- DESGLOSE POR CATEGORIA -->
<tr><td style="background-color:#ffffff;padding:20px 25px;">
  <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:2px;color:#C9A84C;font-weight:bold;margin:0 0 14px 0;text-transform:uppercase;">desglose por categor&iacute;a</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Georgia,serif;font-size:12px;">
    ${categoryRows}
  </table>
</td></tr>

<!-- LINEA FINA -->
<tr><td style="padding:0 25px;"><table width="100%"><tr><td style="border-bottom:1px solid #e8e0d4;font-size:0;">&nbsp;</td></tr></table></td></tr>

<!-- RECOMENDACIONES -->
<tr><td style="background-color:#ffffff;padding:20px 25px;">
  <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:2px;color:#C9A84C;font-weight:bold;margin:0 0 14px 0;text-transform:uppercase;">recomendaciones personalizadas</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${recommendationRows}
  </table>
</td></tr>

<!-- LINEA FINA -->
<tr><td style="padding:0 25px;"><table width="100%"><tr><td style="border-bottom:1px solid #e8e0d4;font-size:0;">&nbsp;</td></tr></table></td></tr>

<!-- MENSAJE ESPERANZADOR -->
<tr><td style="background-color:#ffffff;padding:25px 25px;text-align:center;">
  <p style="font-family:Georgia,serif;font-size:12px;color:#8B5E3C;line-height:1.8;margin:0;font-style:italic;">
    &ldquo;El primer paso para salir de la niebla es ver con claridad.<br>Hoy diste ese paso. Y eso ya es enorme.&rdquo;
  </p>
</td></tr>

<!-- FRANJA DORADA CIERRE -->
<tr><td style="background-color:#C9A84C;padding:14px 25px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:#ffffff;font-style:italic;line-height:1.5;">
    No est&aacute;s sola. Mereces una relaci&oacute;n donde te cuiden tanto como t&uacute; cuidas.
  </p>
</td></tr>

<!-- FOOTER -->
<tr><td style="background-color:#ffffff;padding:20px 25px;text-align:center;">
  <p style="margin:0 0 3px 0;font-family:Arial,sans-serif;font-size:10px;color:#C9A84C;font-weight:bold;">Historias de la Mente &bull; @historiasdelamente</p>
  <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;color:#999999;">Javier Vieira &bull; Psic&oacute;logo Especialista</p>
  <p style="margin:8px 0 0 0;font-family:Arial,sans-serif;font-size:9px;color:#cccccc;">Este test es una herramienta de orientaci&oacute;n y no constituye un diagn&oacute;stico profesional.</p>
</td></tr>

</table>
</td></tr>
</table>

</body>
</html>`
}
