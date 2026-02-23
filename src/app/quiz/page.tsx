'use client'

import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/features/quiz/store/quizStore'
import { QUESTIONS, CATEGORIES, ANSWER_OPTIONS } from '@/features/quiz/data/questions'
import Link from 'next/link'

export default function QuizPage() {
  const router = useRouter()
  const { currentQuestion, answers, setAnswer, nextQuestion, prevQuestion, completeQuiz } = useQuizStore()

  const question = QUESTIONS[currentQuestion]
  const category = CATEGORIES[question.category]
  const currentAnswer = answers.find(a => a.questionId === question.id)
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1
  const hasAnswer = currentAnswer !== undefined

  const handleNext = () => {
    if (isLastQuestion) {
      completeQuiz()
      router.push('/resultados')
    } else {
      nextQuestion()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/40 flex items-center gap-1 text-sm hover:text-white/60 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Salir
          </Link>
          <span className="text-lg font-extrabold">
            <span className="text-primary">N</span>arcisista
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/60 text-sm font-medium">
              Pregunta {currentQuestion + 1}/{QUESTIONS.length}
            </span>
            <span className="text-white/40 text-sm">
              {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 text-sm">
              <span>{category.emoji}</span>
              <span className="text-white/70">{category.label}</span>
            </span>
          </div>

          <h2 className="text-xl font-bold text-center mb-10 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-3">
            {ANSWER_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => setAnswer(question.id, option.value)}
                className={`w-full p-4 rounded-2xl text-left font-medium transition-all duration-200
                  ${currentAnswer?.value === option.value
                    ? 'bg-primary text-black shadow-[0_0_20px_rgba(255,217,0,0.3)]'
                    : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 pb-8">
        <div className="max-w-md mx-auto flex gap-4">
          {currentQuestion > 0 && (
            <button
              onClick={prevQuestion}
              className="flex-1 py-4 rounded-full border-2 border-white/20 text-white font-semibold
                         hover:border-white/40 transition-colors"
            >
              Anterior
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className={`flex-1 py-4 rounded-full font-bold transition-all duration-300
              ${hasAnswer
                ? 'bg-primary text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,217,0,0.4)]'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
          >
            {isLastQuestion ? 'Ver Resultados' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  )
}
