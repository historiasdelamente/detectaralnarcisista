'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

/* ─── SVG Icons ─── */

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

/* ─── Data ─── */

const SIGNALS = [
  {
    num: '01',
    title: 'TE HACE DUDAR DE TU REALIDAD',
    desc: 'Cambia versiones, niega lo que dijo, te hace sentir que "exageras". Esto se llama gaslighting y es la herramienta #1 del narcisista.',
  },
  {
    num: '02',
    title: 'TUS EMOCIONES NO EXISTEN',
    desc: 'Cuando lloras, te ignora. Cuando te enojas, eres "la loca". La falta de empat\u00eda no es distracci\u00f3n \u2014 es un rasgo estructural.',
  },
  {
    num: '03',
    title: 'TODO GIRA ALREDEDOR DE \u00c9L',
    desc: 'Sus necesidades son urgencias. Las tuyas son caprichos. La necesidad de control disfrazada de "preocupaci\u00f3n".',
  },
  {
    num: '04',
    title: 'TE A\u00cdSLA DE TU RED DE APOYO',
    desc: 'Critica a tu familia. Cuestiona a tus amigas. No es celos \u2014 es una estrategia para que dependas solo de \u00e9l.',
  },
  {
    num: '05',
    title: 'EL CICLO NUNCA TERMINA',
    desc: 'Explosi\u00f3n, disculpa, luna de miel, tensi\u00f3n, explosi\u00f3n. Si llevas meses o a\u00f1os repitiendo esto, no es coincidencia.',
  },
]

const STEPS = [
  {
    icon: <IconEyeScan />,
    title: 'RESPONDE',
    desc: '15 preguntas dise\u00f1adas desde la psicolog\u00eda cl\u00ednica. No son preguntas obvias \u2014 miden patrones que t\u00fa normalizaste.',
  },
  {
    icon: <IconBrainNetwork />,
    title: 'ANALIZA',
    desc: 'El algoritmo cruza tus respuestas con los 5 criterios del DSM-5 para trastorno narcisista de personalidad.',
  },
  {
    icon: <IconTargetCheck />,
    title: 'DETECTA',
    desc: 'Recibes un reporte con tu nivel de riesgo, las se\u00f1ales espec\u00edficas detectadas y qu\u00e9 hacer ahora.',
  },
]

const FAQS = [
  {
    q: '\u00bfEsto reemplaza ir al psic\u00f3logo?',
    a: 'No. Es una herramienta de detecci\u00f3n, no un diagn\u00f3stico. Te ayuda a poner nombre a lo que sientes para que puedas buscar ayuda profesional con claridad.',
  },
  {
    q: '\u00bf\u00c9l va a saber que lo hice?',
    a: 'No. Es 100% an\u00f3nimo. No pedimos tu nombre, no enviamos nada a nadie, no queda registro en tu historial.',
  },
  {
    q: '\u00bfY si el resultado dice que no es narcisista?',
    a: 'Entonces tienes un dato m\u00e1s para entender tu relaci\u00f3n. El test mide patrones espec\u00edficos \u2014 si no los detecta, es informaci\u00f3n valiosa tambi\u00e9n.',
  },
  {
    q: '\u00bfCu\u00e1nto cuesta?',
    a: 'Nada. El test es completamente gratuito.',
  },
  {
    q: '\u00bfQui\u00e9n cre\u00f3 esto?',
    a: 'El Ps. Javier Vieira (COLPSIC 293219), psic\u00f3logo especialista y creador de Historias de la Mente, con m\u00e1s de 180K seguidores en redes especializadas en narcisismo y recuperaci\u00f3n emocional.',
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


/* ═══════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════ */

export default function LandingPage() {
  return (
    <main className="overflow-hidden">

      {/* ════════════════════════════════════════════
          S1: HERO — Fondo blanco, foto arriba, bot\u00f3n visible
          ════════════════════════════════════════════ */}
      <section className="bg-white pt-10 pb-12 sm:pt-16 sm:pb-20 lg:min-h-[100svh] lg:flex lg:items-center">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:gap-16">

            {/* ── Mobile/Tablet: foto arriba con glow ── */}
            <div className="lg:hidden flex justify-center mb-5">
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[#FDB913]/25 via-[#FDB913]/10 to-[#C9A96E]/15 blur-xl" />
                <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#FDB913]/30 to-[#C9A96E]/20" />
                <div className="relative w-[200px] h-[180px] sm:w-[240px] sm:h-[210px] rounded-2xl overflow-hidden border-2 border-white">
                  <Image
                    src="/hero-narcisista.webp"
                    alt="Test para detectar al narcisista"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="240px"
                  />
                </div>
              </div>
            </div>

            {/* ── Text side ── */}
            <div className="flex-1 text-center lg:text-left">
              {/* Hook */}
              <p className="font-serif italic text-[#555555] text-base sm:text-lg mb-3 leading-relaxed">
                Este test puede cambiar la forma en que ves tu relaci&oacute;n.
              </p>

              {/* H1 */}
              <h1 className="font-serif font-bold text-[#1A1A1A] leading-[1.1] mb-3">
                <span className="block text-[1.7rem] sm:text-[2.2rem] lg:text-[3rem]">
                  Descubre si tu pareja
                </span>
                <span className="block text-[1.7rem] sm:text-[2.2rem] lg:text-[3rem]">
                  es <span className="text-[#FDB913]">narcisista</span>.
                </span>
              </h1>

              {/* Yellow accent line */}
              <div className="w-16 h-[2px] bg-[#FDB913] mb-4 mx-auto lg:mx-0" />

              {/* Copy */}
              <p className="text-[#666666] text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6">
                15 preguntas. 3 minutos.<br />
                <span className="text-[#1A1A1A] font-medium">Y la respuesta que llevas meses necesitando.</span>
              </p>

              {/* CTA */}
              <div className="mb-3">
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

              {/* Trust */}
              <p className="text-[#999999] text-xs flex items-center justify-center lg:justify-start gap-2 mb-5">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="#C9A96E" strokeWidth="1.5"><rect x="3" y="5.5" width="8" height="6.5" rx="1.5" /><path d="M5 5.5V4a2 2 0 0 1 4 0v1.5" /></svg>
                Solo t&uacute; ver&aacute;s tu resultado
              </p>

              {/* Authority */}
              <p className="text-[#BBBBBB] text-[11px] tracking-wide">
                Creado por <span className="text-[#C9A96E]">Ps. Javier Vieira</span> &middot; COLPSIC 293219
              </p>
            </div>

            {/* ── Desktop: foto a la derecha con glow ── */}
            <div className="flex-shrink-0 relative hidden lg:block">
              <div className="absolute -inset-10 bg-[#FDB913]/10 rounded-full blur-3xl" />
              <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-[#FDB913]/30 to-[#C9A96E]/20" />
              <div className="relative w-[360px] h-[460px] rounded-2xl overflow-hidden">
                <Image
                  src="/hero-narcisista.webp"
                  alt="Test para detectar al narcisista"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          S2: LAS 5 SE&Ntilde;ALES
          ════════════════════════════════════════════ */}
      <section className="bg-[#FFF8F0] py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-[#FDB913] text-[11px] font-semibold uppercase tracking-[3px] block mb-4">
              Lo que &eacute;l no quiere que veas
            </span>
            <h2 className="font-serif font-bold text-[#1A1A1A] text-[1.6rem] sm:text-[2.2rem] leading-tight">
              Las 5 se&ntilde;ales que confirman<br className="hidden sm:block" />
              que est&aacute;s con un narcisista
            </h2>
          </div>

          {/* Signal rows */}
          <div>
            {SIGNALS.map((s, i) => (
              <div
                key={s.num}
                className={`flex gap-5 sm:gap-8 py-6 ${i < SIGNALS.length - 1 ? 'border-b border-[#E8E0D8]' : ''}`}
              >
                <span className="font-serif font-bold text-[#FDB913] text-[1.8rem] sm:text-[2.2rem] flex-shrink-0 leading-none pt-0.5 select-none">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] text-[12px] sm:text-[13px] tracking-[1.5px] uppercase mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing */}
          <div className="text-center mt-12">
            <p className="font-serif italic text-[#1A1A1A] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-7">
              Si le&iacute;ste esto y sentiste que hablaba de tu vida,
              <span className="not-italic font-bold"> el test te lo va a confirmar.</span>
            </p>
            <Link
              href="/quiz"
              className="btn-outline-yellow inline-flex items-center gap-3 text-[12px]"
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
          S3: C&Oacute;MO FUNCIONA
          ════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-24" id="como-funciona">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-[#FDB913] text-[11px] font-semibold uppercase tracking-[3px] block mb-4">
              Proceso
            </span>
            <h2 className="font-serif font-bold text-[#1A1A1A] text-[1.6rem] sm:text-[2.2rem] leading-tight">
              C&oacute;mo funciona la detecci&oacute;n
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-[22%] right-[22%] border-t-2 border-dashed border-[#FDB913]/25 z-0" />

            {STEPS.map((step, i) => (
              <div key={i} className="text-center relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF8F0] shadow-sm border border-[#FDB913]/15 mb-5">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-[12px] sm:text-[13px] tracking-[2px] uppercase mb-3">
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
          ════════════════════════════════════════════ */}
      <section className="bg-[#0D0D0D] py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] bg-[#FDB913]/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <p className="font-serif font-bold text-[#FDB913] text-5xl sm:text-7xl lg:text-8xl leading-none mb-3">
            +2,400
          </p>
          <p className="text-white/70 text-sm sm:text-base mb-8">
            mujeres usaron esta herramienta en la &uacute;ltima semana
          </p>

          <p className="font-serif italic text-white text-lg sm:text-xl leading-relaxed max-w-md mx-auto mb-10">
            El 78% descubri&oacute; que lo que viv&iacute;a
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
          ════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[650px] mx-auto px-5 sm:px-8">
          <h2 className="font-serif font-bold text-[#1A1A1A] text-[1.6rem] sm:text-[2.2rem] text-center mb-10 leading-tight">
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
          ════════════════════════════════════════════ */}
      <footer className="bg-[#0D0D0D] border-t border-white/[0.06] py-10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <p className="font-serif font-bold text-white text-lg mb-1">
            Historias de la <span className="text-[#FDB913]">Mente</span>
          </p>
          <p className="text-[#666666] text-sm mb-5">
            @historias.de.la.mente
          </p>
          <p className="text-white/20 text-xs max-w-md mx-auto mb-5 leading-relaxed">
            Herramienta de orientaci&oacute;n psicoeducativa. No constituye diagn&oacute;stico profesional.
          </p>
          <div className="flex items-center justify-center gap-3 text-white/15 text-[11px]">
            <span>&copy; 2026 Historias de la Mente</span>
            <span>&middot;</span>
            <span>Privacidad</span>
            <span>&middot;</span>
            <span>T&eacute;rminos</span>
          </div>
        </div>
      </footer>

    </main>
  )
}
