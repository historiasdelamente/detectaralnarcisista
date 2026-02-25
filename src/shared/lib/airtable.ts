const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Quiz Narcisista'

interface QuizRecord {
  nombre: string
  email: string
  fecha: string
  score: number
  nivel: string
  pagado: boolean
}

export async function sendToAirtable(data: QuizRecord): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Nombre: data.nombre,
                Email: data.email,
                Fecha: data.fecha,
                Score: data.score,
                Nivel: data.nivel,
                Pagado: data.pagado,
              },
            },
          ],
        }),
      }
    )

    if (!res.ok) {
      const error = await res.json()
      console.error('Airtable error:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Airtable send error:', err)
    return false
  }
}
