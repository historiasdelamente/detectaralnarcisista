import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const PAYPAL_API = process.env.PAYPAL_API_URL || 'https://api-m.paypal.com'

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
    const errData = await res.json()
    console.error('PayPal auth error:', errData)
    throw new Error(`PayPal auth failed: ${errData.error_description || res.status}`)
  }

  const data = await res.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, totalScore, level, categoryScores, email, sessionId: existingSessionId } = body

    if (!answers || !email || totalScore === undefined || !level) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const supabase = await createClient()

    let sessionId = existingSessionId

    if (existingSessionId) {
      // Reuse existing session (created by capture-email)
      await supabase
        .from('quiz_sessions')
        .update({ email, payment_status: 'pending' })
        .eq('id', existingSessionId)
    } else {
      // Create new quiz session
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
        return NextResponse.json({ error: 'Error al crear sesión en DB' }, { status: 500 })
      }

      sessionId = session.id
    }

    // Create PayPal order (USD - PayPal Colombia works with USD)
    const accessToken = await getPayPalAccessToken()

    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: '2.50',
          },
          description: 'Reporte Completo - Detectar al Narcisista',
          custom_id: sessionId,
        }],
      }),
    })

    const order = await orderRes.json()

    if (!orderRes.ok) {
      console.error('PayPal order error:', JSON.stringify(order, null, 2))
      const detail = order.details?.[0]?.description || order.message || 'Error desconocido'
      return NextResponse.json({ error: `PayPal: ${detail}` }, { status: 500 })
    }

    // Save PayPal order ID
    await supabase
      .from('quiz_sessions')
      .update({ payment_id: order.id })
      .eq('id', sessionId)

    return NextResponse.json({
      orderId: order.id,
      sessionId,
    })
  } catch (error) {
    console.error('Payment create error:', error)
    const message = error instanceof Error ? error.message : 'Error interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
