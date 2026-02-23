'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuizStore } from '@/features/quiz/store/quizStore'
import { calculateResults, getLevelColor } from '@/features/quiz/services/scoring'
import { ScoreGauge } from './ScoreGauge'
import { CategoryBar } from './CategoryBar'
import { Category } from '../types'

export default function ResultadosContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { answers, isCompleted, isPaid, setIsPaid, email, setEmail, setSessionId, reset } = useQuizStore()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const result = useMemo(() => {
    if (answers.length === 0) return null
    return calculateResults(answers)
  }, [answers])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const status = searchParams.get('collection_status')
    const externalRef = searchParams.get('external_reference')

    if (status === 'approved' && externalRef) {
      setIsPaid(true)
      setSessionId(externalRef)
    }
  }, [searchParams, setIsPaid, setSessionId])

  useEffect(() => {
    if (mounted && !isCompleted && !searchParams.get('collection_status')) {
      router.push('/quiz')
    }
  }, [mounted, isCompleted, router, searchParams])

  if (!mounted || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  const levelColor = getLevelColor(result.level)

  const handlePayment = async () => {
    if (!email) return
    setIsLoading(true)

    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          totalScore: result.totalScore,
          level: result.level,
          categoryScores: result.categoryScores,
          email,
        }),
      })

      const data = await res.json()

      if (data.initPoint) {
        setSessionId(data.sessionId)
        window.location.href = data.initPoint
      }
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewTest = () => {
    reset()
    router.push('/')
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Tus Resultados</h1>

        {/* Score Gauge */}
        <div className="flex justify-center mb-6">
          <ScoreGauge score={result.totalScore} maxScore={result.maxScore} color={levelColor} />
        </div>

        {/* Risk Level Badge */}
        <div className="flex justify-center mb-8">
          <span
            className="px-6 py-2 rounded-full text-sm font-bold"
            style={{ backgroundColor: `${levelColor}20`, color: levelColor }}
          >
            {result.levelLabel}
          </span>
        </div>

        {/* Category Breakdown */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-lg font-bold mb-6">Desglose por Categoría</h3>
          <div className="space-y-5">
            {result.categoryScores.map(cat => (
              <CategoryBar key={cat.category} {...cat} />
            ))}
          </div>
        </div>

        {/* Locked/Unlocked Section */}
        {!isPaid ? (
          <>
            {/* Blurred Preview */}
            <div className="relative mb-8">
              <div className="glass-card p-6 blur-sm select-none pointer-events-none" aria-hidden="true">
                <h3 className="text-lg font-bold mb-4">Tu Análisis Detallado</h3>
                <p className="text-white/60 mb-3">
                  Basado en tus respuestas, hemos identificado patrones significativos en las áreas de
                  manipulación emocional y control que requieren atención...
                </p>
                <h4 className="font-bold mb-2">Recomendaciones Personalizadas</h4>
                <ul className="text-white/60 space-y-2">
                  <li>Establecer límites claros y firmes en la relación</li>
                  <li>Buscar apoyo profesional especializado</li>
                  <li>Fortalecer tu red de apoyo social y emocional</li>
                </ul>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent rounded-2xl flex flex-col items-center justify-end pb-6">
                <span className="material-symbols-outlined text-4xl text-white/30 mb-2">lock</span>
                <p className="text-white/40 text-sm">Contenido bloqueado</p>
              </div>
            </div>

            {/* Payment Card */}
            <div className="glass-card p-6 glow-yellow">
              <h3 className="text-lg font-bold text-center mb-2">
                Desbloquea tu reporte completo
              </h3>
              <p className="text-white/50 text-sm text-center mb-6">
                Recibe un análisis detallado con recomendaciones personalizadas en tu email.
              </p>

              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4
                           text-white placeholder:text-white/30 focus:outline-none focus:border-primary
                           transition-colors"
              />

              <button
                onClick={handlePayment}
                disabled={!email || isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed
                           disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isLoading ? 'Procesando...' : 'Desbloquear por $9.900 COP'}
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-white/30 text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Pago seguro
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Envío inmediato
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Full Report */}
            <div className="glass-card p-6 mb-8">
              <div className="flex items-center gap-2 text-primary mb-4">
                <span className="material-symbols-outlined">verified</span>
                <span className="font-bold">Reporte Desbloqueado</span>
              </div>

              <h3 className="text-lg font-bold mb-4">Tu Análisis Detallado</h3>
              <p className="text-white/70 mb-6">{result.levelDescription}</p>

              {result.categoryScores.map(cat => (
                <div key={cat.category} className="mb-5">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <span>{cat.emoji}</span> {cat.label}
                    <span className="text-white/40 text-sm font-normal">({cat.percentage}%)</span>
                  </h4>
                  <p className="text-white/60 text-sm">
                    {getCategoryInsight(cat.category, cat.percentage)}
                  </p>
                </div>
              ))}

              <hr className="border-white/10 my-6" />

              <h3 className="text-lg font-bold mb-4">Recomendaciones</h3>
              <ul className="space-y-3">
                {getRecommendations(result.level).map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5 shrink-0">check_circle</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-white/30 text-xs text-center mb-6">
              Se ha enviado una copia de este reporte a tu email.
            </p>
          </>
        )}

        {/* New Test */}
        <button
          onClick={handleNewTest}
          className="w-full py-4 rounded-full border-2 border-white/10 text-white/50 font-medium
                     hover:border-white/20 hover:text-white/70 transition-colors mt-4 mb-8"
        >
          Realizar nuevo test
        </button>

        <p className="text-white/20 text-xs text-center pb-4">
          Este test es una herramienta de orientación y no sustituye un diagnóstico profesional.
        </p>
      </div>
    </div>
  )
}

function getCategoryInsight(category: Category, percentage: number): string {
  const level = percentage >= 65 ? 'high' : percentage >= 35 ? 'medium' : 'low'

  const insights: Record<string, Record<string, string>> = {
    manipulacion: {
      high: 'Se detectan tácticas de manipulación emocional frecuentes. Tu pareja puede estar usando tus sentimientos y vulnerabilidades para controlar situaciones a su favor.',
      medium: 'Hay indicios de comportamiento manipulador ocasional. Presta atención a patrones que se repitan con el tiempo.',
      low: 'No se detectan patrones significativos de manipulación emocional en esta área.',
    },
    empatia: {
      high: 'Tu pareja muestra una marcada falta de empatía. La incapacidad de conectar emocionalmente contigo es una señal importante de rasgos narcisistas.',
      medium: 'Hay momentos en que tu pareja no logra conectar emocionalmente contigo. Observa si esto ocurre especialmente en momentos clave.',
      low: 'Tu pareja muestra capacidad empática en general en la relación.',
    },
    control: {
      high: 'Se detecta un patrón de control significativo sobre tus decisiones, relaciones sociales y libertad personal.',
      medium: 'Existen algunas señales de comportamiento controlador. Presta atención a si estos patrones se intensifican con el tiempo.',
      low: 'No se detectan patrones significativos de control en tu relación.',
    },
    gaslighting: {
      high: 'Se identifican tácticas de gaslighting frecuentes que pueden estar afectando tu percepción de la realidad y tu autoconfianza.',
      medium: 'Hay indicios de distorsión de la realidad ocasional. Es importante que confíes en tu memoria y tus percepciones.',
      low: 'No se detectan patrones significativos de gaslighting en la relación.',
    },
    grandiosidad: {
      high: 'Tu pareja muestra un sentido exagerado de su propia importancia y espera un trato preferencial constante de tu parte.',
      medium: 'Hay momentos en que tu pareja muestra actitudes de superioridad. Observa cómo esto afecta la dinámica de la relación.',
      low: 'No se detectan patrones significativos de grandiosidad o superioridad.',
    },
  }

  return insights[category]?.[level] || ''
}

function getRecommendations(level: string): string[] {
  const recs: Record<string, string[]> = {
    bajo: [
      'Mantén una comunicación abierta y honesta en tu relación.',
      'Establece y respeta límites saludables mutuamente.',
      'Continúa educándote sobre relaciones saludables.',
    ],
    moderado: [
      'Establece límites claros y comunícalos firmemente.',
      'Considera hablar con un terapeuta o consejero de parejas.',
      'Fortalece tu red de apoyo (amistades, familia).',
      'Documenta situaciones que te incomoden para identificar patrones.',
    ],
    alto: [
      'Busca apoyo profesional (psicólogo o terapeuta especializado).',
      'Establece límites firmes y no negociables.',
      'Fortalece tu red de apoyo y no te aísles.',
      'Crea un plan de seguridad emocional y, si es necesario, física.',
      'Considera si esta relación es compatible con tu bienestar.',
    ],
    extremo: [
      'Busca ayuda profesional de inmediato (línea de ayuda o terapeuta).',
      'Prioriza tu seguridad física y emocional ante todo.',
      'Contacta organizaciones de apoyo a víctimas de abuso emocional.',
      'No enfrentes esta situación sola — busca apoyo de personas de confianza.',
      'Elabora un plan de seguridad con ayuda profesional.',
    ],
  }

  return recs[level] || recs.moderado
}
