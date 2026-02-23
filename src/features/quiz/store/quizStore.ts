import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QuizAnswer } from '../types'

interface QuizState {
  currentQuestion: number
  answers: QuizAnswer[]
  isCompleted: boolean
  sessionId: string | null
  isPaid: boolean
  email: string
  name: string

  setAnswer: (questionId: number, value: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  completeQuiz: () => void
  setSessionId: (id: string) => void
  setIsPaid: (paid: boolean) => void
  setEmail: (email: string) => void
  setName: (name: string) => void
  reset: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentQuestion: 0,
      answers: [],
      isCompleted: false,
      sessionId: null,
      isPaid: false,
      email: '',
      name: '',

      setAnswer: (questionId: number, value: number) => {
        const { answers } = get()
        const existing = answers.findIndex(a => a.questionId === questionId)
        const newAnswers = [...answers]

        if (existing >= 0) {
          newAnswers[existing] = { questionId, value }
        } else {
          newAnswers.push({ questionId, value })
        }

        set({ answers: newAnswers })
      },

      nextQuestion: () => {
        const { currentQuestion } = get()
        if (currentQuestion < 9) {
          set({ currentQuestion: currentQuestion + 1 })
        }
      },

      prevQuestion: () => {
        const { currentQuestion } = get()
        if (currentQuestion > 0) {
          set({ currentQuestion: currentQuestion - 1 })
        }
      },

      completeQuiz: () => set({ isCompleted: true }),

      setSessionId: (id: string) => set({ sessionId: id }),

      setIsPaid: (paid: boolean) => set({ isPaid: paid }),

      setEmail: (email: string) => set({ email }),

      setName: (name: string) => set({ name }),

      reset: () => set({
        currentQuestion: 0,
        answers: [],
        isCompleted: false,
        sessionId: null,
        isPaid: false,
        email: '',
        name: '',
      }),
    }),
    {
      name: 'quiz-narcisista',
    }
  )
)
