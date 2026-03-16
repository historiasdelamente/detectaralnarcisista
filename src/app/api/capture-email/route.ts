import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendToAirtable } from '@/shared/lib/airtable'

function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    bajo: 'Riesgo Bajo',
    moderado: 'Riesgo Moderado',
    alto: 'Riesgo Alto',
    extremo: 'Riesgo Extremo',
  }
  return labels[level] || 'Sin clasificar'
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
      const { error: updateError } = await supabase
        .from('quiz_sessions')
        .update({ email, name: name || '' })
        .eq('id', sessionId)

      if (updateError) {
        console.error('Error updating session:', updateError)
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

    return NextResponse.json({ sessionId })
  } catch (error) {
    console.error('Capture email error:', error)
    const message = error instanceof Error ? error.message : 'Error interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
