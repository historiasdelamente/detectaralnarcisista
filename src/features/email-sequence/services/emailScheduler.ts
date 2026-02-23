import { SupabaseClient } from '@supabase/supabase-js'
import { EMAIL_SCHEDULE } from '../constants'

export async function enqueueEmailSequence(
  supabase: SupabaseClient,
  email: string,
  quizSessionId: string
): Promise<{ enrolled: boolean; alreadyExists: boolean }> {
  const now = Date.now()

  const rows = [
    {
      email,
      quiz_session_id: quizSessionId,
      sequence_number: 1,
      scheduled_at: new Date(now + EMAIL_SCHEDULE.email1).toISOString(),
    },
    {
      email,
      quiz_session_id: quizSessionId,
      sequence_number: 2,
      scheduled_at: new Date(now + EMAIL_SCHEDULE.email2).toISOString(),
    },
    {
      email,
      quiz_session_id: quizSessionId,
      sequence_number: 3,
      scheduled_at: new Date(now + EMAIL_SCHEDULE.email3).toISOString(),
    },
  ]

  const { data, error } = await supabase
    .from('email_sequences')
    .upsert(rows, { onConflict: 'email,sequence_number', ignoreDuplicates: true })
    .select()

  if (error) {
    console.error('Error enqueuing email sequence:', error)
    return { enrolled: false, alreadyExists: false }
  }

  const inserted = (data?.length ?? 0) > 0
  return { enrolled: inserted, alreadyExists: !inserted }
}
