import Link from 'next/link'

const CATEGORIES = [
  { icon: 'theater_comedy', label: 'Manipulación', desc: 'Uso de tácticas emocionales para controlar' },
  { icon: 'heart_broken', label: 'Falta de Empatía', desc: 'Incapacidad de conectar con tus emociones' },
  { icon: 'link', label: 'Necesidad de Control', desc: 'Dominio sobre decisiones y relaciones' },
  { icon: 'blur_on', label: 'Gaslighting', desc: 'Distorsión de la realidad para confundirte' },
  { icon: 'diamond', label: 'Superioridad', desc: 'Sentido exagerado de importancia propia' },
]

const STEPS = [
  { icon: 'quiz', num: '01', title: 'Responde', desc: '10 preguntas diseñadas por expertos en psicología basadas en el DSM-5.' },
  { icon: 'analytics', num: '02', title: 'Descubre', desc: 'Nuestro algoritmo analiza tus respuestas e identifica patrones narcisistas.' },
  { icon: 'description', num: '03', title: 'Recibe', desc: 'Un reporte detallado con tu nivel de riesgo y recomendaciones personalizadas.' },
]

const FAQS = [
  { q: '¿El test es gratuito?', a: 'Sí, realizar el test es completamente gratuito y anónimo. Al finalizar, tienes la opción de recibir un reporte detallado con análisis personalizado en tu correo.' },
  { q: '¿Es un diagnóstico profesional?', a: 'No. Este test es una herramienta de orientación basada en criterios del DSM-5. No sustituye un diagnóstico profesional. Si necesitas ayuda, te recomendamos consultar con un psicólogo.' },
  { q: '¿Cuánto tiempo toma?', a: 'El test toma aproximadamente 3 minutos. Son 10 preguntas con opciones de respuesta claras.' },
  { q: '¿Mis respuestas son confidenciales?', a: 'Absolutamente. Tus respuestas son procesadas de forma anónima y confidencial. No compartimos tu información con terceros.' },
  { q: '¿Cómo recibo el reporte?', a: 'Al finalizar el test, puedes solicitar tu reporte detallado. Lo recibes directamente en tu correo electrónico en menos de 2 minutos.' },
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
      <section className="relative pt-20 pb-4 px-4 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-md mx-auto relative z-10">
          {/* Top Tag */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
              <span className="material-symbols-outlined text-primary text-sm">psychology</span>
              <span className="text-white/70 text-xs font-bold tracking-widest uppercase">Test Psicológico</span>
            </div>
          </div>

          {/* Hero Image + Headline combo */}
          <div className="relative flex flex-col items-center mb-4">
            {/* Image - small, circular crop for compact hero */}
            <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden mb-4 shrink-0">
              <img
                src="/hero-narcisista.webp"
                alt="Retrato dramático en sombras"
                className="w-full h-full object-cover object-top"
                loading="eager"
                width={160}
                height={160}
              />
              {/* Subtle glow behind image */}
              <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(255,217,0,0.15)]" />
            </div>

            {/* Headline - The Emotional Hook */}
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight text-center mb-3">
              Él te dice que estás{' '}
              <span className="text-gradient-yellow">loca</span>.
              <br />
              <span className="text-white/90">Pero tú sabes que algo no está bien.</span>
            </h1>
          </div>

          {/* Emotional Sub-copy */}
          <p className="text-white/50 text-sm text-center leading-relaxed mb-4 max-w-sm mx-auto">
            El agotamiento. Las disculpas que nunca llegan. La sensación de que todo es tu culpa.{' '}
            <span className="text-white/80 font-semibold">No estás loca.</span>{' '}
            Y este test te lo va a demostrar.
          </p>

          {/* CTA - visible above the fold */}
          <div className="flex flex-col gap-2 mb-4">
            <Link href="/quiz" className="btn-primary text-center text-lg">
              Descubrir la Verdad
            </Link>
            <a href="#como-funciona" className="btn-outline text-center text-sm py-3">
              Son solo 3 minutos
            </a>
          </div>

          {/* Social Proof + Trust */}
          <p className="text-center text-white/40 text-xs mb-3">
            <span className="text-primary font-bold">+2,400 mujeres</span> ya lo hicieron esta semana
          </p>

          <div className="flex justify-center gap-4 text-white/30 text-xs">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">timer</span>
              3 min
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">lock</span>
              Anónimo
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">shield</span>
              DSM-5
            </span>
          </div>
        </div>
      </section>

      {/* Pain Points - Emotional Bridge */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <p className="text-center text-white/30 text-sm font-medium tracking-wide uppercase mb-8">
            Si esto te suena familiar...
          </p>
          <div className="space-y-3">
            {[
              { icon: 'hearing_disabled', text: 'Sientes que tus emociones no importan en la relación' },
              { icon: 'psychology_alt', text: 'Te preguntas si eres tú la del problema' },
              { icon: 'energy_savings_leaf', text: 'Estás agotada de intentar que todo funcione' },
              { icon: 'visibility_off', text: 'Tus amigos y familia ya no entienden por qué sigues ahí' },
            ].map((item) => (
              <div key={item.icon} className="flex items-center gap-4 glass-card p-4">
                <span className="material-symbols-outlined text-primary/70 text-xl shrink-0">{item.icon}</span>
                <span className="text-white/60 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-white/50 text-sm">
            No es tu culpa. Pero sí es tu <span className="text-primary font-bold">decisión</span> descubrirlo.
          </p>
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
                <span className="material-symbols-outlined text-primary text-2xl mb-2 block">{cat.icon}</span>
                <h3 className="font-bold text-sm mb-1">{cat.label}</h3>
                <p className="text-white/40 text-xs">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="glass-card p-8 text-center glow-yellow">
            <span className="material-symbols-outlined text-primary text-3xl mb-3">group</span>
            <h2 className="text-2xl font-extrabold mb-3">
              Más de <span className="text-primary">2,400 mujeres</span> ya dieron el primer paso
            </h2>
            <p className="text-white/50 text-sm mb-6">
              El test es 100% gratuito, anónimo y toma solo 3 minutos. Descubre lo que tus respuestas revelan.
            </p>
            <Link href="/quiz" className="btn-primary inline-block">
              Comenzar Test Gratis
            </Link>
            <div className="flex justify-center gap-4 mt-6 text-white/30 text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lock</span>
                100% anónimo
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">timer</span>
                3 minutos
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                DSM-5
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
