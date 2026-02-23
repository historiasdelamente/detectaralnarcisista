import Link from 'next/link'

const CATEGORIES = [
  { emoji: '🎭', label: 'Manipulación', desc: 'Uso de tácticas emocionales para controlar' },
  { emoji: '💔', label: 'Falta de Empatía', desc: 'Incapacidad de conectar con tus emociones' },
  { emoji: '⛓️', label: 'Necesidad de Control', desc: 'Dominio sobre decisiones y relaciones' },
  { emoji: '🌫️', label: 'Gaslighting', desc: 'Distorsión de la realidad para confundirte' },
  { emoji: '👑', label: 'Superioridad', desc: 'Sentido exagerado de importancia propia' },
]

const STEPS = [
  { icon: 'quiz', num: '01', title: 'Responde', desc: '10 preguntas diseñadas por expertos en psicología basadas en el DSM-5.' },
  { icon: 'analytics', num: '02', title: 'Descubre', desc: 'Nuestro algoritmo analiza tus respuestas e identifica patrones narcisistas.' },
  { icon: 'description', num: '03', title: 'Recibe', desc: 'Un reporte detallado con tu nivel de riesgo y recomendaciones personalizadas.' },
]

const FAQS = [
  { q: '¿El test es gratuito?', a: 'Sí, realizar el test es completamente gratis. Solo pagas si deseas desbloquear el reporte completo con análisis detallado y recomendaciones personalizadas.' },
  { q: '¿Es un diagnóstico profesional?', a: 'No. Este test es una herramienta de orientación basada en criterios del DSM-5. No sustituye un diagnóstico profesional. Si necesitas ayuda, te recomendamos consultar con un psicólogo.' },
  { q: '¿Cuánto tiempo toma?', a: 'El test toma aproximadamente 3 minutos. Son 10 preguntas con opciones de respuesta claras.' },
  { q: '¿Mis respuestas son confidenciales?', a: 'Absolutamente. Tus respuestas son procesadas de forma anónima. Solo se guardan si decides comprar el reporte y nos proporcionas tu email.' },
  { q: '¿Cómo recibo el reporte?', a: 'Después del pago, el reporte se muestra inmediatamente en pantalla y también se envía a tu email para que lo tengas siempre disponible.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          <span className="text-lg font-extrabold">
            <span className="text-primary">N</span>arcisista
          </span>
          <Link
            href="/quiz"
            className="bg-primary text-black text-sm font-bold rounded-full px-5 py-2 hover:scale-105 transition-transform"
          >
            Comenzar Test
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <span className="material-symbols-outlined text-primary text-base">psychology</span>
            <span className="text-primary text-sm font-medium">Basado en DSM-5</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight mb-6">
            ¿Estás en una relación con un{' '}
            <span className="text-gradient-yellow">narcisista</span>?
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Descúbrelo en 3 minutos con nuestro test científico de 10 preguntas.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/quiz" className="btn-primary text-center">
              Comenzar Test Gratis
            </Link>
            <a href="#como-funciona" className="btn-outline text-center">
              Saber Más
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-8 text-white/40 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">timer</span>
              3 minutos
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">verified</span>
              DSM-5
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">bolt</span>
              Inmediato
            </span>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-12">
            ¿Cómo <span className="text-primary">funciona</span>?
          </h2>
          <div className="space-y-8">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">{step.icon}</span>
                  </div>
                  {step.num !== '03' && <div className="w-px h-8 bg-white/10 mt-2" />}
                </div>
                <div className="pt-1">
                  <div className="text-xs text-primary font-bold mb-1">PASO {step.num}</div>
                  <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-4">
            ¿Qué <span className="text-primary">evaluamos</span>?
          </h2>
          <p className="text-white/50 text-center mb-10 text-sm">
            5 dimensiones clave del narcisismo según el DSM-5
          </p>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.label} className="glass-card p-4 hover:border-primary/30 transition-colors">
                <span className="text-2xl mb-2 block">{cat.emoji}</span>
                <h3 className="font-bold text-sm mb-1">{cat.label}</h3>
                <p className="text-white/40 text-xs">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="glass-card p-8 text-center glow-yellow">
            <span className="inline-flex items-center gap-1 text-primary text-sm font-bold mb-4">
              <span className="material-symbols-outlined text-base">local_offer</span>
              Precio de lanzamiento
            </span>
            <div className="mb-4">
              <span className="text-white/30 line-through text-lg">$29.900</span>
              <div className="text-4xl font-extrabold text-primary mt-1">
                $9.900 <span className="text-lg font-bold">COP</span>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-6">
              El test es gratis. Solo pagas si quieres el reporte completo con análisis detallado.
            </p>
            <Link href="/quiz" className="btn-primary inline-block">
              Comenzar Test Gratis
            </Link>
            <div className="flex justify-center gap-4 mt-6 text-white/30 text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lock</span>
                Pago seguro
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">mail</span>
                Envío inmediato
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">shield</span>
                MercadoPago
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-10">
            Preguntas <span className="text-primary">frecuentes</span>
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="glass-card group">
                <summary className="flex justify-between items-center cursor-pointer p-4 list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-sm pr-4">{faq.q}</span>
                  <span className="material-symbols-outlined text-white/40 group-open:rotate-180 transition-transform shrink-0">
                    expand_more
                  </span>
                </summary>
                <div className="px-4 pb-4 text-white/50 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-md mx-auto text-center">
          <span className="text-lg font-extrabold">
            <span className="text-primary">N</span>arcisista
          </span>
          <p className="text-white/20 text-xs mt-4 leading-relaxed">
            Este test es una herramienta de orientación y no constituye un diagnóstico profesional.
            Si estás en una situación de riesgo, contacta a las autoridades locales o una línea de ayuda.
          </p>
          <p className="text-white/10 text-xs mt-4">
            © 2026 Historias de la Mente. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
