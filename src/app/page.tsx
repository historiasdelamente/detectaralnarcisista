import Link from 'next/link'
import Image from 'next/image'

/* ── SVG Icons (line-art, feminine, no Material Design) ── */

function IconHeart() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#D4A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 28S4 20 4 12a6 6 0 0 1 12 0 6 6 0 0 1 12 0c0 8-12 16-12 16z" />
      <line x1="10" y1="16" x2="22" y2="16" stroke="#D4A0A0" strokeWidth="1.5" />
    </svg>
  )
}

function IconMirror() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#D4A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="13" r="9" />
      <line x1="16" y1="22" x2="16" y2="30" />
      <line x1="12" y1="30" x2="20" y2="30" />
      <circle cx="16" cy="13" r="3" strokeDasharray="2 2" />
    </svg>
  )
}

function IconBattery() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#D4A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="22" height="12" rx="2" />
      <line x1="28" y1="14" x2="28" y2="18" />
      <rect x="7" y="13" width="5" height="6" rx="1" fill="#D4A0A0" opacity="0.3" />
    </svg>
  )
}

function IconEye() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#D4A0A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16s5-8 14-8 14 8 14 8-5 8-14 8S2 16 2 16z" />
      <circle cx="16" cy="16" r="4" />
      <line x1="4" y1="4" x2="28" y2="28" stroke="#D4A0A0" strokeWidth="1.5" />
    </svg>
  )
}

function IconManipulation() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FDB913" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="8" r="5" />
      <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <path d="M18 6l3-3M10 6L7 3" strokeDasharray="2 2" />
    </svg>
  )
}

function IconEmpathy() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FDB913" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 24S4 18 4 11a5 5 0 0 1 10 0 5 5 0 0 1 10 0c0 7-10 13-10 13z" />
      <path d="M10 13l8 0" strokeDasharray="3 2" />
    </svg>
  )
}

function IconControl() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FDB913" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="20" height="20" rx="3" />
      <path d="M4 14h20M14 4v20" />
      <circle cx="14" cy="14" r="3" fill="#FDB913" opacity="0.2" />
    </svg>
  )
}

function IconGaslighting() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FDB913" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="10" />
      <path d="M14 8v4l3 3" />
      <path d="M9 18c1-2 3-3 5-3s4 1 5 3" strokeDasharray="2 2" />
    </svg>
  )
}

function IconSuperiority() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FDB913" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="14,3 17,11 26,11 19,17 21,25 14,20 7,25 9,17 2,11 11,11" />
    </svg>
  )
}

/* ── Data ── */

const PAIN_POINTS = [
  { Icon: IconHeart, text: 'Sientes que tus emociones no importan en la relacion' },
  { Icon: IconMirror, text: 'Te preguntas si eres tu la del problema' },
  { Icon: IconBattery, text: 'Estas agotada de intentar que todo funcione' },
  { Icon: IconEye, text: 'Tus amigos y familia ya no entienden por que sigues ahi' },
]

const STEPS = [
  { num: '01', title: 'Responde', desc: '10 preguntas basadas en el DSM-5 disenadas por expertos en psicologia.' },
  { num: '02', title: 'Descubre', desc: 'Nuestro algoritmo identifica patrones narcisistas en tus respuestas.' },
  { num: '03', title: 'Recibe', desc: 'Reporte con tu nivel de riesgo y recomendaciones personalizadas.' },
]

const DIMENSIONS = [
  { Icon: IconManipulation, label: 'Manipulacion', desc: 'Uso de tacticas emocionales para controlar tu comportamiento y decisiones.' },
  { Icon: IconEmpathy, label: 'Falta de Empatia', desc: 'Incapacidad de conectar con tus emociones o validar lo que sientes.' },
  { Icon: IconControl, label: 'Necesidad de Control', desc: 'Dominio sobre tus decisiones, relaciones y libertad personal.' },
  { Icon: IconGaslighting, label: 'Gaslighting', desc: 'Distorsion de la realidad para hacerte dudar de tu propia percepcion.' },
  { Icon: IconSuperiority, label: 'Superioridad', desc: 'Sentido exagerado de importancia propia y desprecio hacia los demas.' },
]

const FAQS = [
  { q: 'El test es gratuito?', a: 'Si, realizar el test es completamente gratuito y anonimo. Al finalizar, tienes la opcion de recibir un reporte detallado con analisis personalizado en tu correo.' },
  { q: 'Es un diagnostico profesional?', a: 'No. Este test es una herramienta de orientacion basada en criterios del DSM-5. No sustituye un diagnostico profesional. Si necesitas ayuda, te recomendamos consultar con un psicologo.' },
  { q: 'Cuanto tiempo toma?', a: 'El test toma aproximadamente 3 minutos. Son 10 preguntas con opciones de respuesta claras.' },
  { q: 'Mis respuestas son confidenciales?', a: 'Absolutamente. Tus respuestas son procesadas de forma anonima y confidencial. No compartimos tu informacion con terceros.' },
  { q: 'Como recibo el reporte?', a: 'Al finalizar el test, puedes solicitar tu reporte detallado. Lo recibes directamente en tu correo electronico en menos de 2 minutos.' },
]

/* ── Page ── */

export default function LandingPage() {
  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ─── HEADER ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#D4A0A0]/20">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          <span className="font-serif text-xl font-bold tracking-tight">
            <span className="text-[#FDB913]">N</span>arcisista
          </span>
          <Link
            href="/quiz"
            className="bg-[#FDB913] hover:bg-[#E5A711] text-[#1A1A1A] text-xs font-semibold rounded-full px-5 py-2.5 uppercase tracking-[1.5px] transition-all duration-300"
          >
            Comenzar Test
          </Link>
        </div>
      </header>

      {/* ─── S1: HERO ─── */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col-reverse sm:flex-row items-center gap-8 sm:gap-12">
            {/* Text side */}
            <div className="flex-[3] text-center sm:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-[#D4A0A0]/40 rounded-full px-4 py-2 mb-6">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C9A96E" strokeWidth="1.5">
                  <rect x="2" y="5" width="10" height="8" rx="1.5" />
                  <path d="M4 5V4a3 3 0 0 1 6 0v1" />
                </svg>
                <span className="text-[#555] text-xs font-medium tracking-wide">Test 100% Anonimo &middot; Basado en DSM-5</span>
              </div>

              {/* H1 */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-5 text-[#1A1A2E]">
                El te dice que estas{' '}
                <span className="text-[#FDB913] italic">loca</span>.
                <br />
                Pero tu sabes que algo no esta bien.
              </h1>

              {/* Sub-copy */}
              <p className="text-[#555] text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                El agotamiento. Las disculpas que nunca llegan. La sensacion de que todo es tu culpa.{' '}
                <strong className="text-[#1A1A1A]">No estas loca.</strong>{' '}
                Y este test te lo va a demostrar.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href="/quiz" className="btn-primary text-center">
                  Descubrir la Verdad
                </Link>
                <a href="#como-funciona" className="btn-outline text-center text-sm py-3">
                  Son solo 3 minutos
                </a>
              </div>

              {/* Social proof */}
              <p className="text-[#555] text-sm">
                <span className="text-[#FDB913] font-bold">+2,400 mujeres</span> ya lo hicieron esta semana
              </p>
            </div>

            {/* Image side */}
            <div className="flex-[2] flex justify-center">
              <div className="relative w-[240px] h-[300px] sm:w-[320px] sm:h-[400px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(212,160,160,0.2)]">
                <Image
                  src="/hero-narcisista.webp"
                  alt="Mujer mirando hacia la luz con expresion serena"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Warm gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF0]/30 to-transparent" />
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex justify-center sm:justify-start gap-6 mt-8 text-[#999] text-xs">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5.5" /><path d="M7 4v3l2 2" /></svg>
              3 minutos
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="8" height="7" rx="1.5" /><path d="M5 5V4a2 2 0 0 1 4 0v1" /></svg>
              100% anonimo
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-3 1.5.5-3.5L2 4.5l3.5-.5z" /></svg>
              DSM-5
            </span>
          </div>
        </div>
      </section>

      {/* ─── S2: PAIN POINTS ─── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#FFFBF0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center font-serif text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-12">
            Si esto te suena familiar...
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {PAIN_POINTS.map(({ Icon, text }) => (
              <div key={text} className="card-warm p-5 flex items-start gap-4">
                <div className="shrink-0 mt-0.5">
                  <Icon />
                </div>
                <p className="text-[#555] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-12 font-serif text-lg italic text-[#8B5E3C]">
            No es tu culpa. Pero si es tu <strong className="text-[#1A1A1A] not-italic">decision</strong> descubrirlo.
          </p>
        </div>
      </section>

      {/* ─── S3: HOW IT WORKS ─── */}
      <section id="como-funciona" className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-14 text-[#1A1A2E]">
            Como <span className="text-[#FDB913]">funciona</span>?
          </h2>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-4 max-w-3xl mx-auto">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex-1 relative">
                {/* Connector line (desktop only) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[60%] w-full h-px bg-[#D4A0A0]/30" />
                )}
                <div className="text-center">
                  <p className="font-serif text-5xl font-bold text-[#FDB913]/30 mb-2">{step.num}</p>
                  <h3 className="font-serif text-xl font-bold text-[#1A1A2E] mb-2">{step.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── S4: DIMENSIONS ─── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#FFFBF0]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-4 text-[#1A1A2E]">
            Que <span className="text-[#FDB913]">evaluamos</span>?
          </h2>
          <p className="text-center text-[#555] text-sm mb-12">
            5 dimensiones clave del narcisismo segun el DSM-5
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {DIMENSIONS.map(({ Icon, label, desc }) => (
              <div key={label} className="card-dimension p-5">
                <div className="mb-3"><Icon /></div>
                <h3 className="font-serif text-lg font-bold text-[#1A1A2E] mb-1">{label}</h3>
                <p className="text-[#555] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── S5: SOCIAL PROOF + CTA (Dark section) ─── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-5xl sm:text-7xl font-bold text-[#FDB913] mb-3">+2,400</p>
          <p className="text-white/80 text-lg sm:text-xl font-light mb-8">
            mujeres ya dieron el primer paso
          </p>
          <Link href="/quiz" className="btn-primary inline-block mb-8">
            Comenzar Test Gratis
          </Link>
          <div className="flex justify-center gap-6 text-white/40 text-xs">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="8" height="7" rx="1.5" /><path d="M5 5V4a2 2 0 0 1 4 0v1" /></svg>
              100% anonimo
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5.5" /><path d="M7 4v3l2 2" /></svg>
              3 minutos
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2l5 3v4c0 3-5 5-5 5S2 12 2 9V5z" /></svg>
              DSM-5
            </span>
          </div>
        </div>
      </section>

      {/* ─── S6: FAQ ─── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-12 text-[#1A1A2E]">
            Preguntas <span className="text-[#FDB913]">frecuentes</span>
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group border border-[#D4A0A0]/20 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer p-5 list-none [&::-webkit-details-marker]:hidden bg-white hover:bg-[#FFFBF0] transition-colors">
                  <span className="font-serif text-base font-semibold text-[#1A1A2E] pr-4">{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-[#FDB913] shrink-0 group-open:rotate-180 transition-transform duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-[#555] text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── S7: FOOTER ─── */}
      <footer className="py-10 px-4 sm:px-6 bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-serif text-xl font-bold text-white mb-1">
            Historias de la <span className="text-[#FDB913]">Mente</span>
          </p>
          <p className="text-white/30 text-xs mt-4 leading-relaxed max-w-md mx-auto">
            Este test es una herramienta de orientacion y no constituye un diagnostico profesional.
            Si estas en una situacion de riesgo, contacta a las autoridades locales o una linea de ayuda.
          </p>
          <p className="text-white/15 text-xs mt-4">
            &copy; 2026 Historias de la Mente. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
