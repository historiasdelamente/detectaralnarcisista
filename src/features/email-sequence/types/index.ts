export type EmailSequenceStatus = 'pending' | 'sent' | 'failed'

export interface EmailSequenceRow {
  id: string
  email: string
  quiz_session_id: string
  sequence_number: 1 | 2 | 3
  status: EmailSequenceStatus
  scheduled_at: string
  sent_at: string | null
  resend_message_id: string | null
  created_at: string
}

export interface EmailTemplateData {
  email: string
  name: string
  totalScore: number
  maxScore: number
  level: string
  levelLabel: string
  levelColor: string
  categoryScores: Array<{
    category: string
    label: string
    emoji: string
    score: number
    maxScore: number
    percentage: number
  }>
  topCategory: {
    label: string
    emoji: string
    percentage: number
    category: string
  }
}
