export type Category = 'manipulacion' | 'empatia' | 'control' | 'gaslighting' | 'grandiosidad'

export interface CategoryInfo {
  id: Category
  label: string
  emoji: string
  description: string
}

export interface Question {
  id: number
  category: Category
  text: string
}

export interface QuizAnswer {
  questionId: number
  value: number
}

export type RiskLevel = 'bajo' | 'moderado' | 'alto' | 'extremo'

export interface CategoryScore {
  category: Category
  label: string
  emoji: string
  score: number
  maxScore: number
  percentage: number
}

export interface QuizResult {
  totalScore: number
  maxScore: number
  percentage: number
  level: RiskLevel
  levelLabel: string
  levelDescription: string
  categoryScores: CategoryScore[]
}
