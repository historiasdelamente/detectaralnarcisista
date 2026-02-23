import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { siteConfig } from '@/config/siteConfig'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID requerido' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: session, error } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('payment_status', 'approved')
      .single()

    if (error || !session) {
      return NextResponse.json({ error: 'Sesión no encontrada o pago no aprobado' }, { status: 404 })
    }

    if (!session.email) {
      return NextResponse.json({ error: 'Email no disponible' }, { status: 400 })
    }

    const levelLabels: Record<string, string> = {
      bajo: 'Riesgo Bajo',
      moderado: 'Riesgo Moderado',
      alto: 'Riesgo Alto',
      extremo: 'Riesgo Extremo',
    }

    const levelColors: Record<string, string> = {
      bajo: '#22c55e',
      moderado: '#ffd900',
      alto: '#f97316',
      extremo: '#ef4444',
    }

    const levelColor = levelColors[session.level] || '#ffd900'
    const levelLabel = levelLabels[session.level] || 'Sin clasificar'

    const categoryRows = (session.category_scores as Array<{
      emoji: string; label: string; score: number; maxScore: number; percentage: number
    }>).map(cat => `
      <tr>
        <td style="padding: 8px 0; color: #ffffff;">${cat.emoji} ${cat.label}</td>
        <td style="padding: 8px 0; text-align: right; color: #999;">${cat.score}/${cat.maxScore} (${cat.percentage}%)</td>
      </tr>
    `).join('')

    await resend.emails.send({
      from: siteConfig.emails.from,
      to: session.email,
      subject: 'Tu Reporte Completo - Detectar al Narcisista',
      html: `
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
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send report error:', error)
    return NextResponse.json({ error: 'Error al enviar reporte' }, { status: 500 })
  }
}
