import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { siteConfig } from '@/config/siteConfig'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, totalScore, level, categoryScores, email } = body

    if (!answers || !email || totalScore === undefined || !level) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const supabase = await createClient()

    // Create quiz session in Supabase
    const { data: session, error: dbError } = await supabase
      .from('quiz_sessions')
      .insert({
        answers,
        total_score: totalScore,
        level,
        category_scores: categoryScores,
        email,
        payment_status: 'pending',
      })
      .select('id')
      .single()

    if (dbError || !session) {
      console.error('DB error:', dbError)
      return NextResponse.json({ error: 'Error al crear sesión' }, { status: 500 })
    }

    const baseUrl = siteConfig.url

    // Create MercadoPago preference
    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            title: 'Reporte Completo - Detectar al Narcisista',
            quantity: 1,
            unit_price: siteConfig.pricing.amount,
            currency_id: siteConfig.pricing.currency,
          },
        ],
        back_urls: {
          success: `${baseUrl}/resultados`,
          failure: `${baseUrl}/resultados`,
          pending: `${baseUrl}/resultados`,
        },
        auto_return: 'approved',
        external_reference: session.id,
        notification_url: `${baseUrl}/api/payment/webhook`,
        statement_descriptor: 'NARCISISTA TEST',
        payer: {
          email,
        },
      }),
    })

    const mpData = await mpResponse.json()

    if (!mpResponse.ok) {
      console.error('MercadoPago error:', mpData)
      return NextResponse.json({ error: 'Error al crear preferencia de pago' }, { status: 500 })
    }

    // Save MP preference ID
    await supabase
      .from('quiz_sessions')
      .update({ mp_preference_id: mpData.id })
      .eq('id', session.id)

    return NextResponse.json({
      initPoint: mpData.init_point,
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Payment create error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
