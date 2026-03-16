'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

/* ─── SVG Icons (detection / scan aesthetic) ─── */

function IconEyeScan() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#FDB913" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="20" cy="20" rx="14" ry="9" />
      <circle cx="20" cy="20" r="5" />
      <circle cx="20" cy="20" r="2" fill="#FDB913" stroke="none" />
      <line x1="20" y1="3" x2="20" y2="8" opacity="0.4" />
      <line x1="20" y1="32" x2="20" y2="37" opacity="0.4" />
      <line x1="3" y1="20" x2="8" y2="20" opacity="0.4" />
      <line x1="32" y1="20" x2="37" y2="20" opacity="0.4" />
    </svg>
  )
}

function IconBrainNetwork() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#FDB913" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 36V20" />
      <path d="M20 20C20 14 15 10 11 10C7 10 4 13 4 17C4 21 7 23 10 23" />
      <path d="M20 20C20 14 25 10 29 10C33 10 36 13 36 17C36 21 33 23 30 23" />
      <path d="M10 23C7 25 6 28 8 31C10 34 14 34 16 32" />
      <path d="M30 23C33 25 34 28 32 31C30 34 26 34 24 32" />
      <circle cx="11" cy="16" r="1.5" fill="#FDB913" stroke="none" opacity="0.6" />
      <circle cx="29" cy="16" r="1.5" fill="#FDB913" stroke="none" opacity="0.6" />
      <circle cx="15" cy="12" r="1" fill="#FDB913" stroke="none" opacity="0.4" />
      <circle cx="25" cy="12" r="1" fill="#FDB913" stroke="none" opacity="0.4" />
    </svg>
  )
}

function IconTargetCheck() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#FDB913" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="16" opacity="0.3" />
      <circle cx="20" cy="20" r="10" opacity="0.6" />
      <circle cx="20" cy="20" r="4" />
      <path d="M16 20l3 3 5-6" strokeWidth="2" />
    </svg>
  )
}

/* ─── Detection Lines (Hero decoration) ─── */
function DetectionLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 700"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="750" y1="180" x2="480" y2="120" stroke="#FDB913" strokeWidth="0.5" opacity="0.15" />
      <line x1="720" y1="250" x2="430" y2="200" stroke="#FDB913" strokeWidth="0.5" opacity="0.2" />
      <line x1="780" y1="320" x2="460" y2="280" stroke="#FDB913" strokeWidth="0.5" opacity="0.12" />
      <line x1="740" y1="400" x2="490" y2="360" stroke="#FDB913" strokeWidth="0.5" opacity="0.18" />
      <circle cx="480" cy="120" r="2" fill="#FDB913" opacity="0.3" />
      <circle cx="430" cy="200" r="2.5" fill="#FDB913" opacity="0.25" />
      <circle cx="460" cy="280" r="2" fill="#FDB913" opacity="0.2" />
      <circle cx="490" cy="360" r="1.5" fill="#FDB913" opacity="0.3" />
      <line x1="600" y1="100" x2="600" y2="600" stroke="#FDB913" strokeWidth="0.3" opacity="0.06" strokeDasharray="4 8" />
      <line x1="700" y1="80" x2="700" y2="620" stroke="#FDB913" strokeWidth="0.3" opacity="0.06" strokeDasharray="4 8" />
      <line x1="400" y1="300" x2="800" y2="300" stroke="#FDB913" strokeWidth="0.3" opacity="0.05" strokeDasharray="4 8" />
    </svg>
  )
}

/* ─── Section data ─── */

const SIGNALS = [
  {
    num: '01',
    title: 'TE HACE DUDAR DE TU REALIDAD',
    desc: 'Cambia versiones, niega lo que dijo, te hace sentir que "exageras". Esto se llama gaslighting y es la herramienta #1 del narcisista.',
  },
  {
    num: '02',
    title: 'TUS EMOCIONES NO EXISTEN',
    desc: 'Cuando lloras, te ignora. Cuando te enojas, eres "la loca". La falta de empatia no es distraccion — es un rasgo estructural.',
  },
  {
    num: '03',
    title: 'TODO GIRA ALREDEDOR DE EL',
    desc: 'Sus necesidades son urgencias. Las tuyas son caprichos. La necesidad de control disfrazada de "preocupacion".',
  },
  {
    num: '04',
    title: 'TE AISLA DE TU RED DE APOYO',
    desc: 'Critica a tu familia. Cuestiona a tus amigas. No es celos — es una estrategia para que dependas solo de el.',
  },
  {
    num: '05',
    title: 'EL CICLO NUNCA TERMINA',
    desc: 'Explosion, disculpa, luna de miel, tension, explosion. Si llevas meses o anios repitiendo esto, no es coincidencia.',
  },
]

const STEPS = [
  {
    icon: <IconEyeScan />,
    title: 'RESPONDE',
    desc: '10 preguntas disenadas desde la psicologia clinica. No son preguntas obvias — miden patrones que tu normalizaste.',
  },
  {
    icon: <IconBrainNetwork />,
    title: 'ANALIZA',
    desc: 'El algoritmo cruza tus respuestas con los 5 criterios del DSM-5 para trastorno narcisista de personalidad.',
  },
  {
    icon: <IconTargetCheck />,
    title: 'DETECTA',
    desc: 'Recibes un reporte con tu nivel de riesgo, las seniales especificas detectadas y que hacer ahora.',
  },
]

const FAQS = [
  {
    q: 'Esto reemplaza ir al psicologo?',
    a: 'No. Es una herramienta de deteccion, no un diagnostico. Te ayuda a poner nombre a lo que sientes para que puedas buscar ayuda profesional con claridad.',
  },
  {
    q: 'El va a saber que lo hice?',
    a: 'No. Es 100% anonimo. No pedimos tu nombre, no enviamos nada a nadie, no queda registro en tu historial.',
  },
  {
    q: 'Y si el resultado dice que no es narcisista?',
    a: 'Entonces tienes un dato mas para entender tu relacion. El test mide patrones especificos — si no los detecta, es informacion valiosa tambien.',
  },
  {
    q: 'Cuanto cuesta?',
    a: 'Nada. El test es completamente gratuito.',
  },
  {
    q: 'Quien creo esto?',
    a: 'El Ps. Javier Vieira (COLPSIC 293219), psicologo especialista y creador de Historias de la Mente, con mas de 180K seguidores en redes especializadas en narcisismo y recuperacion emocional.',
  },
]

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#E5E5E5]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-semibold text-[#1A1A1A] text-[15px] pr-4">{q}</span>
        <span
          className="text-[#FDB913] text-2xl font-light flex-shrink-0 transition-transform duration-300 leading-none"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="pb-5 text-[#666666] text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════
   LANDING — "Rayos X Emocional"
   Concepto: ver a traves de la mascara del narcisista
   ═══════════════════════════════════════════════════ */

export default function LandingPage() {
  return (
    <main className="overflow-hidden">

      {/* ════════════════════════════════════════════
          S1: HERO — IMPACTO TOTAL
          Fondo oscuro #0D0D0D, imagen emergiendo
          ════════════════════════════════════════════ */}
      <section className="relative bg-[#0D0D0D] min-h-[100svh] flex items-center overflow-hidden">
        {/* Background image on mobile — behind text */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/hero-narcisista.webp"
            alt=""
            fill
            className="object-cover object-top opacity-25"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-[#0D0D0D]/40" />
        </div>

        {/* Detection lines overlay (desktop only) */}
        <div className="hidden lg:block absolute inset-0 z-10">
          <DetectionLines />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent z-10" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center lg:gap-16">

            {/* ── Text side (ALWAYS first on mobile) ── */}
            <div className="flex-1 text-center lg:text-left">
              {/* Hook */}
              <p className="font-serif italic text-white/50 text-lg sm:text-xl mb-5 leading-relaxed">
                Este test puede cambiar la forma en que ves tu relacion.
              </p>

              {/* H1 */}
              <h1 className="font-serif font-bold text-white leading-[1.1] mb-4">
                <span className="block text-[1.9rem] sm:text-[2.4rem] lg:text-[3rem]">
                  Descubre si tu pareja
                </span>
                <span className="block text-[1.9rem] sm:text-[2.4rem] lg:text-[3rem]">
                  es <span className="text-[#FDB913]">narcisista</span>.
                </span>
              </h1>

              {/* Yellow accent line */}
              <div className="w-20 h-[2px] bg-[#FDB913] mb-6 mx-auto lg:mx-0" />

              {/* Copy */}
              <p className="text-[#CCCCCC] text-base sm:text-[17px] leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                15 preguntas. 3 minutos.<br />
                <span className="text-white/90 font-medium">Y la respuesta que llevas meses necesitando.</span>
              </p>

              {/* CTA */}
              <div className="mb-4">
                <Link
                  href="/quiz"
                  className="btn-primary inline-flex items-center gap-3 text-[13px]"
                >
                  HACER EL TEST AHORA
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Trust line */}
              <p className="text-[#666666] text-sm flex items-center justify-center lg:justify-start gap-2 mb-6">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C9A96E" strokeWidth="1.5"><rect x="3" y="5.5" width="8" height="6.5" rx="1.5" /><path d="M5 5.5V4a2 2 0 0 1 4 0v1.5" /></svg>
                Solo tu veras tu resultado
              </p>

              {/* Authority */}
              <p className="text-[#444444] text-[11px] tracking-wide">
                Creado por <span className="text-[#C9A96E]">Ps. Javier Vieira</span> &middot; COLPSIC 293219
              </p>
            </div>

            {/* ── Image side (desktop only — on mobile it's the background) ── */}
            <div className="flex-shrink-0 relative hidden lg:block">
              <div className="absolute -inset-12 bg-[#FDB913]/[0.04] rounded-full blur-3xl" />

              <div className="relative w-[380px] h-[490px]">
                <Image
                  src="/hero-narcisista.webp"
                  alt="Detectar al narcisista"
                  fill
                  className="object-cover object-top rounded-2xl"
                  priority
                  sizes="380px"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-transparent via-transparent to-[#0D0D0D]/50" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-transparent to-[#0D0D0D]/30" />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          S2: LAS 5 SENIALES
          Fondo blanco, filas horizontales
          ════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-[#FDB913] text-[11px] font-semibold uppercase tracking-[3px] block mb-4">
              Lo que el no quiere que veas
            </span>
            <h2 className="font-serif font-bold text-[#1A1A1A] text-[1.75rem] sm:text-[2.3rem] leading-tight">
              Las 5 seniales que confirman<br className="hidden sm:block" />
              que estas con un narcisista
            </h2>
          </div>

          {/* Signal rows */}
          <div>
            {SIGNALS.map((s, i) => (
              <div
                key={s.num}
                className={`flex gap-5 sm:gap-8 py-7 ${i < SIGNALS.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}
              >
                <span className="font-serif font-bold text-[#FDB913] text-[2rem] sm:text-[2.5rem] flex-shrink-0 leading-none pt-0.5 select-none">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] text-[13px] tracking-[1.5px] uppercase mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing statement */}
          <div className="text-center mt-14">
            <p className="font-serif italic text-[#1A1A1A] text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-8">
              Si leiste esto y sentiste que hablaba de tu vida,
              <span className="not-italic font-bold"> el test te lo va a confirmar.</span>
            </p>
            <Link
              href="/quiz"
              className="btn-outline-yellow inline-flex items-center gap-3 text-[13px]"
            >
              HACER EL TEST
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          S3: COMO FUNCIONA LA DETECCION
          Fondo crema #FFF8F0
          ════════════════════════════════════════════ */}
      <section className="bg-[#FFF8F0] py-20 sm:py-28" id="como-funciona">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[#FDB913] text-[11px] font-semibold uppercase tracking-[3px] block mb-4">
              Proceso
            </span>
            <h2 className="font-serif font-bold text-[#1A1A1A] text-[1.75rem] sm:text-[2.3rem] leading-tight">
              Como funciona la deteccion
            </h2>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 relative">
            {/* Dotted connector (desktop) */}
            <div className="hidden md:block absolute top-8 left-[22%] right-[22%] border-t-2 border-dashed border-[#FDB913]/25 z-0" />

            {STEPS.map((step, i) => (
              <div key={i} className="text-center relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm border border-[#FDB913]/10 mb-5">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-[13px] tracking-[2px] uppercase mb-3">
                  {step.title}
                </h3>
                <p className="text-[#666666] text-sm leading-relaxed max-w-[280px] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          S4: DATO DE IMPACTO
          Fondo oscuro #0D0D0D, minimalista
          ════════════════════════════════════════════ */}
      <section className="bg-[#0D0D0D] py-24 sm:py-32 relative overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] bg-[#FDB913]/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <p className="font-serif font-bold text-[#FDB913] text-6xl sm:text-7xl lg:text-8xl leading-none mb-3">
            +2,400
          </p>
          <p className="text-white/70 text-base sm:text-lg mb-10">
            mujeres usaron esta herramienta en la ultima semana
          </p>

          <p className="font-serif italic text-white text-xl sm:text-2xl leading-relaxed max-w-md mx-auto mb-12">
            El 78% descubrio que lo que vivia
            <span className="text-[#FDB913] not-italic font-bold"> no era normal.</span>
          </p>

          <Link
            href="/quiz"
            className="btn-primary inline-flex items-center gap-3 text-[13px]"
          >
            DESCUBRIR MI RESULTADO
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          S5: PREGUNTAS FRECUENTES
          Fondo blanco, acordeon minimalista
          ════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-[650px] mx-auto px-5 sm:px-8">
          <h2 className="font-serif font-bold text-[#1A1A1A] text-[1.75rem] sm:text-[2.3rem] text-center mb-12 leading-tight">
            Antes de que te<br />lo preguntes
          </h2>

          <div>
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          S6: FOOTER
          Fondo oscuro #0D0D0D
          ════════════════════════════════════════════ */}
      <footer className="bg-[#0D0D0D] border-t border-white/[0.06] py-12">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <p className="font-serif font-bold text-white text-xl mb-2">
            Historias de la <span className="text-[#FDB913]">Mente</span>
          </p>

          <p className="text-[#666666] text-sm mb-6">
            @historias.de.la.mente
          </p>

          <p className="text-white/20 text-xs max-w-md mx-auto mb-6 leading-relaxed">
            Herramienta de orientacion psicoeducativa. No constituye diagnostico profesional.
          </p>

          <div className="flex items-center justify-center gap-3 text-white/15 text-[11px]">
            <span>&copy; 2026 Historias de la Mente</span>
            <span>&middot;</span>
            <span>Privacidad</span>
            <span>&middot;</span>
            <span>Terminos</span>
          </div>
        </div>
      </footer>

    </main>
  )
}
