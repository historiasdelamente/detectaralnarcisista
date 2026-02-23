import { QuizAnswer, QuizResult, RiskLevel, CategoryScore, Category } from '../types'
import { CATEGORIES, QUESTIONS } from '../data/questions'

const RISK_LEVELS: Record<RiskLevel, { label: string; description: string }> = {
  bajo: {
    label: 'Riesgo Bajo',
    description: 'Tu relación muestra pocos rasgos narcisistas. Mantén límites saludables y comunicación abierta.',
  },
  moderado: {
    label: 'Riesgo Moderado',
    description: 'Existen algunos patrones preocupantes en tu relación. Presta atención a las señales y considera hablar con un profesional.',
  },
  alto: {
    label: 'Riesgo Alto',
    description: 'Tu relación muestra patrones narcisistas significativos. Es importante buscar apoyo profesional para proteger tu bienestar emocional.',
  },
  extremo: {
    label: 'Riesgo Extremo',
    description: 'Los patrones narcisistas son muy marcados en tu relación. Busca ayuda profesional de inmediato y prioriza tu seguridad.',
  },
}

export function calculateResults(answers: QuizAnswer[]): QuizResult {
  const totalScore = answers.reduce((sum, a) => sum + a.value, 0)
  const maxScore = 40
  const percentage = Math.round((totalScore / maxScore) * 100)
  const level = getRiskLevel(totalScore)
  const levelInfo = RISK_LEVELS[level]
  const categoryScores = calculateCategoryScores(answers)

  return {
    totalScore,
    maxScore,
    percentage,
    level,
    levelLabel: levelInfo.label,
    levelDescription: levelInfo.description,
    categoryScores,
  }
}

function getRiskLevel(score: number): RiskLevel {
  if (score <= 10) return 'bajo'
  if (score <= 20) return 'moderado'
  if (score <= 30) return 'alto'
  return 'extremo'
}

function calculateCategoryScores(answers: QuizAnswer[]): CategoryScore[] {
  const categoryMap = new Map<Category, number[]>()

  for (const answer of answers) {
    const question = QUESTIONS.find(q => q.id === answer.questionId)
    if (!question) continue

    const existing = categoryMap.get(question.category) || []
    existing.push(answer.value)
    categoryMap.set(question.category, existing)
  }

  return Object.entries(CATEGORIES).map(([key, info]) => {
    const scores = categoryMap.get(key as Category) || []
    const score = scores.reduce((sum, v) => sum + v, 0)
    const maxScore = scores.length * 4

    return {
      category: key as Category,
      label: info.label,
      emoji: info.emoji,
      score,
      maxScore: maxScore || 8,
      percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
    }
  })
}

export function getLevelColor(level: RiskLevel): string {
  switch (level) {
    case 'bajo': return '#22c55e'
    case 'moderado': return '#ffd900'
    case 'alto': return '#f97316'
    case 'extremo': return '#ef4444'
  }
}
