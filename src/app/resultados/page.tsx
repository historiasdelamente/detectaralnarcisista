import { Suspense } from 'react'
import ResultadosContent from '@/features/quiz/components/ResultadosContent'

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm">Calculando resultados...</p>
      </div>
    </div>
  )
}

export default function ResultadosPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultadosContent />
    </Suspense>
  )
}
