'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useQuizStore } from '@/features/quiz/store/quizStore'
import { calculateResults } from '@/features/quiz/services/scoring'

const INTRIGUE_PHRASES = [
  'Lo que encontramos en tus respuestas lo cambia todo.',
  'Hay algo que llevas tiempo sintiendo. Ahora tienes la respuesta.',
  'Esto explica por qué no puedes salir de ahí.',
]

export default function ResultadosContent() {
  const router = useRouter()
  const { answers, isCompleted, isPaid, setIsPaid, email, setEmail, name, setName, setSessionId, reset } = useQuizStore()
  const [hydrated, setHydrated] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [sessionId, setLocalSessionId] = useState<string | null>(null)
  const [emailCaptured, setEmailCaptured] = useState(false)
  const [reportSent, setReportSent] = useState(false)

  useEffect(() => {
    if (useQuizStore.persist.hasHydrated()) {
      setHydrated(true)
      return
    }
    const unsub = useQuizStore.persist.onFinishHydration(() => setHydrated(true))
    return unsub
  }, [])

  const result = useMemo(() => {
    if (answers.length === 0) return null
    return calculateResults(answers)
  }, [answers])

  // Pick a random intrigue phrase based on score
  const intriguePhrase = useMemo(() => {
    if (!result) return INTRIGUE_PHRASES[0]
    const idx = result.totalScore % INTRIGUE_PHRASES.length
    return INTRIGUE_PHRASES[idx]
  }, [result])

  useEffect(() => {
    if (hydrated && !isCompleted) {
      router.push('/quiz')
    }
  }, [hydrated, isCompleted, router])

  // Debounced email capture - sends email + quiz data to start drip sequence
  useEffect(() => {
    if (!email || !email.includes('@') || !result || emailCaptured) return

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/capture-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name,
            answers,
            totalScore: result.totalScore,
            level: result.level,
            categoryScores: result.categoryScores,
            sessionId: sessionId || undefined,
          }),
        })
        const data = await res.json()
        if (data.sessionId) {
          setLocalSessionId(data.sessionId)
          setSessionId(data.sessionId)
          setEmailCaptured(true)
        }
      } catch (err) {
        console.error('Email capture error:', err)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [email, result, emailCaptured, answers, sessionId, setSessionId, name])

  // Send report via email after payment
  useEffect(() => {
    if (!isPaid || reportSent || !email || !sessionId) return

    const sendReport = async () => {
      try {
        await fetch('/api/send-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, email, name }),
        })
        setReportSent(true)
      } catch (err) {
        console.error('Error sending report:', err)
        setReportSent(true) // Don't block UI
      }
    }

    sendReport()
  }, [isPaid, reportSent, email, sessionId, name])

  const createOrder = useCallback(async () => {
    if (!result) throw new Error('No results')

    // Ensure email is captured before payment (in case debounce didn't fire)
    if (email && !emailCaptured) {
      try {
        const captureRes = await fetch('/api/capture-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email, name, answers,
            totalScore: result.totalScore,
            level: result.level,
            categoryScores: result.categoryScores,
            sessionId: sessionId || undefined,
          }),
        })
        const captureData = await captureRes.json()
        if (captureData.sessionId) {
          setLocalSessionId(captureData.sessionId)
          setSessionId(captureData.sessionId)
          setEmailCaptured(true)
        }
      } catch (err) {
        console.error('Pre-payment email capture error:', err)
      }
    }

    const currentSessionId = sessionId || undefined

    const res = await fetch('/api/payment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers,
        totalScore: result.totalScore,
        level: result.level,
        categoryScores: result.categoryScores,
        email,
        sessionId: currentSessionId,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setPaymentError(data.error || 'Error al crear orden')
      throw new Error(data.error)
    }

    setLocalSessionId(data.sessionId)
    setSessionId(data.sessionId)
    return data.orderId
  }, [answers, result, email, name, sessionId, emailCaptured, setSessionId])

  const onApprove = useCallback(async (data: { orderID: string }) => {
    const res = await fetch('/api/payment/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: data.orderID,
        sessionId: sessionId,
      }),
    })

    const captureData = await res.json()

    if (captureData.success) {
      setIsPaid(true)
    } else {
      setPaymentError('Error al procesar el pago. Intenta de nuevo.')
    }
  }, [sessionId, setIsPaid])

  if (!hydrated || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  const handleNewTest = () => {
    reset()
    router.push('/')
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto">

        {!isPaid ? (
          <>
            {/* Intrigue Phase - No data, just emotional tension */}
            <div className="text-center pt-8 mb-10">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">psychology</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-4">
                {intriguePhrase}
              </h1>
              <p className="text-white/40 text-sm">
                Hemos analizado tus 10 respuestas en 5 dimensiones clínicas.
              </p>
            </div>

            {/* Paywall Card */}
            <div className="glass-card p-6 glow-yellow mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">lock</span>
                <h2 className="text-lg font-bold">Tu reporte personal está listo</h2>
              </div>

              <p className="text-white/60 text-sm mb-5">
                Hemos analizado tus respuestas y preparado un reporte detallado con todo lo que necesitas saber.
                Lo que encontramos es importante.
              </p>

              <p className="text-white/70 text-sm font-semibold mb-4">
                Por solo <span className="text-primary">$2.50 USD</span> recibe en tu correo:
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  'Tu nivel de riesgo real con explicación clínica',
                  'Los patrones exactos que detectamos en tu relación',
                  'Qué significa esto para ti y qué puedes hacer ahora',
                  'Recomendaciones personalizadas basadas en el DSM-5',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/60 text-sm">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5 shrink-0">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-white/40 text-xs mb-5">
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>Lo recibes en tu correo en menos de 2 minutos.</span>
              </div>

              {/* Name + Email inputs */}
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-3
                           text-white placeholder:text-white/30 focus:outline-none focus:border-primary
                           transition-colors"
              />

              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4
                           text-white placeholder:text-white/30 focus:outline-none focus:border-primary
                           transition-colors"
              />

              {email ? (
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                    currency: 'USD',
                    intent: 'capture',
                  }}
                >
                  <PayPalButtons
                    style={{
                      color: 'gold',
                      shape: 'pill',
                      label: 'pay',
                      height: 48,
                      layout: 'vertical',
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={(err) => {
                      console.error('PayPal error:', err)
                      setPaymentError(`Error con PayPal: ${err}`)
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <div className="text-center text-white/30 text-sm py-4 border-2 border-dashed border-white/10 rounded-2xl">
                  Ingresa tu email para continuar
                </div>
              )}

              {paymentError && (
                <p className="text-red-400 text-sm text-center mt-3">{paymentError}</p>
              )}

              <div className="flex items-center justify-center gap-4 mt-4 text-white/30 text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Pago seguro
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  PayPal
                </span>
              </div>
            </div>

            {/* Price anchoring */}
            <div className="text-center mb-6">
              <span className="text-white/20 line-through text-sm">$9.99 USD</span>
              <span className="text-primary font-bold text-lg ml-2">$2.50 USD</span>
              <p className="text-white/30 text-xs mt-1">Precio de lanzamiento por tiempo limitado</p>
            </div>
          </>
        ) : (
          <>
            {/* Post-Payment: Report sent confirmation */}
            <div className="text-center pt-12 mb-10">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">mark_email_read</span>
              </div>
              <h1 className="text-2xl font-extrabold mb-3">
                Tu reporte está en camino
              </h1>
              <p className="text-white/60 text-sm mb-2">
                Revisa tu bandeja de entrada en <span className="text-primary font-semibold">{email}</span>
              </p>
              <p className="text-white/40 text-xs">
                Si no lo ves en los próximos 2 minutos, revisa tu carpeta de spam.
              </p>
            </div>

            <div className="glass-card p-6 mb-8">
              <div className="flex items-center gap-2 text-primary mb-4">
                <span className="material-symbols-outlined">verified</span>
                <span className="font-bold">Pago confirmado</span>
              </div>
              <p className="text-white/50 text-sm">
                Tu reporte personalizado incluye tu nivel de riesgo, análisis por categoría,
                patrones detectados y recomendaciones basadas en el DSM-5.
                Todo ha sido enviado a tu correo electrónico.
              </p>
            </div>
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
