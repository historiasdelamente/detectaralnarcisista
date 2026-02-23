import { EmailTemplateData } from '../types'
import { COURSE_CONFIG } from '../constants'

const COLORS = {
  bg: '#0a0a0a',
  surface: '#1E1E1E',
  gold: '#ffd900',
  white: '#ffffff',
  muted: '#999999',
  mutedLight: '#666666',
}

function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    bajo: '#22c55e',
    moderado: '#ffd900',
    alto: '#f97316',
    extremo: '#ef4444',
  }
  return colors[level] || '#ffd900'
}

function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    bajo: 'Riesgo Bajo',
    moderado: 'Riesgo Moderado',
    alto: 'Riesgo Alto',
    extremo: 'Riesgo Extremo',
  }
  return labels[level] || 'Sin clasificar'
}

function getCategoryConnection(category: string): string {
  const connections: Record<string, string> = {
    manipulacion: 'Tu cerebro aprendio a normalizar la manipulacion. En Apego Detox entenderas por que defiendes a quien te destruye — y como dejar de hacerlo.',
    empatia: 'La falta de empatia que detectaste no es algo que tu puedas arreglar. En Apego Detox descubriras por que sigues intentandolo y como soltar esa carga.',
    control: 'El control que sientes no es amor — es una trampa cognitiva. En Apego Detox aprenderas a ver la jaula y a encontrar la puerta.',
    gaslighting: 'Si dudas de tu propia memoria, no estas loca. Tu cerebro te esta mintiendo porque el le enseno a hacerlo. En Apego Detox recuperas tu realidad.',
    grandiosidad: 'Sientes que nada de lo que haces es suficiente para el? No es porque no lo sea. En Apego Detox entenderas por que tu autoestima quedo atrapada en su aprobacion.',
  }
  return connections[category] || ''
}

function wrapTemplate(content: string, preheader: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historias de la Mente</title>
</head>
<body style="background-color:${COLORS.bg};color:${COLORS.white};font-family:'Segoe UI',Arial,sans-serif;margin:0;padding:0;">
  <span style="display:none;font-size:1px;color:${COLORS.bg};max-height:0;overflow:hidden;">${preheader}</span>
  <div style="max-width:480px;margin:0 auto;padding:20px;">
    <div style="text-align:center;padding:30px 0 20px;">
      <h1 style="margin:0;font-size:22px;font-weight:800;">
        <span style="color:${COLORS.gold};">N</span>arcisista
      </h1>
      <p style="color:${COLORS.mutedLight};margin-top:4px;font-size:13px;">Historias de la Mente</p>
    </div>
    ${content}
    <div style="text-align:center;padding:30px 0;color:${COLORS.mutedLight};font-size:11px;">
      <p>Este test es una herramienta de orientacion y no constituye un diagnostico profesional.</p>
      <p style="margin-top:8px;">&copy; 2026 Historias de la Mente</p>
    </div>
  </div>
</body>
</html>`
}

function goldButton(text: string, url: string): string {
  return `<div style="text-align:center;margin:28px 0;">
  <a href="${url}" style="display:inline-block;background-color:${COLORS.gold};color:${COLORS.bg};font-weight:800;font-size:16px;padding:16px 40px;border-radius:50px;text-decoration:none;">${text}</a>
</div>`
}

// ─────────────────────────────────────────────
// EMAIL 1: "El Espejo" — VALIDACION PURA
// ─────────────────────────────────────────────
export function buildEmail1(data: EmailTemplateData): { subject: string; html: string } {
  const levelColor = getLevelColor(data.level)
  const levelLabel = getLevelLabel(data.level)
  const topCat = data.topCategory
  const connection = getCategoryConnection(topCat.category)

  const firstName = data.name || ''
  const greeting = firstName ? `${firstName}, tu` : 'Tu'
  const subject = `${greeting} resultado de ${data.totalScore}/${data.maxScore} confirma lo que ya sabias`
  const preheader = 'Lo que sientes tiene nombre. Y no es tu culpa.'

  const content = `
    <div style="background:${COLORS.surface};border-radius:16px;padding:30px;margin-bottom:20px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:48px;font-weight:800;color:${levelColor};">${data.totalScore}/${data.maxScore}</div>
        <div style="display:inline-block;padding:6px 20px;border-radius:20px;font-size:14px;font-weight:700;color:${levelColor};background:${levelColor}20;margin-top:8px;">
          ${levelLabel}
        </div>
      </div>

      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:20px;">
        ${firstName ? `${firstName}, acabas` : 'Acabas'} de hacer algo valiente. La mayoria de las mujeres en tu situacion nunca llegan a este punto — prefieren no saber.
      </p>

      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:20px;">
        Tu lo hiciste. Y tu resultado no es casualidad.
      </p>

      <div style="background:${COLORS.bg};border-radius:12px;padding:20px;margin-bottom:20px;border-left:4px solid ${COLORS.gold};">
        <p style="color:${COLORS.gold};font-weight:700;margin:0 0 8px;font-size:14px;">
          ${topCat.emoji} Tu area mas alta: ${topCat.label} (${topCat.percentage}%)
        </p>
        <p style="color:${COLORS.muted};font-size:14px;line-height:1.6;margin:0;">
          ${connection}
        </p>
      </div>

      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:8px;">
        Si te sientes confundida, agotada, o como si estuvieras perdiendo tu identidad...
      </p>

      <p style="color:${COLORS.white};font-size:17px;line-height:1.7;font-weight:700;margin-bottom:20px;">
        No estas loca. Lo que sientes tiene nombre. Y no es tu culpa.
      </p>

      <p style="color:${COLORS.muted};font-size:14px;line-height:1.7;">
        Existe un programa disenado para mujeres exactamente en tu situacion. Se llama <strong style="color:${COLORS.gold};">Apego Detox</strong>. No es un curso de videos. Es un espacio donde entras devastada — y sales respondiendo la pregunta que mas duele: <em>quien soy yo antes de el?</em>
      </p>

      ${goldButton('Quiero saber mas', COURSE_CONFIG.url)}

      <p style="color:${COLORS.mutedLight};font-size:13px;text-align:center;margin:0;">
        No tienes que actuar ahora. Pero no borres este email.<br>Puede que lo necesites manana.
      </p>
    </div>`

  return { subject, html: wrapTemplate(content, preheader) }
}

// ─────────────────────────────────────────────
// EMAIL 2: "La Herida Abierta" — PROFUNDIZAR + PRUEBA SOCIAL
// ─────────────────────────────────────────────
export function buildEmail2(data: EmailTemplateData): { subject: string; html: string } {
  const firstName = data.name || ''
  const subject = firstName ? `${firstName}, anoche no dormiste bien, verdad?` : 'Anoche no dormiste bien, verdad?'
  const preheader = 'Tu cerebro te esta mintiendo. Es hora de pararlo.'

  const content = `
    <div style="background:${COLORS.surface};border-radius:16px;padding:30px;margin-bottom:20px;">
      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:20px;">
        ${firstName ? `${firstName}, han` : 'Han'} pasado 24 horas desde tu test.
      </p>

      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:20px;">
        Dejame adivinar: has estado repasando situaciones. Revisando mensajes viejos. Preguntandote si exageraste. Si tal vez fue tu culpa.
      </p>

      <p style="color:${COLORS.white};font-size:17px;line-height:1.7;font-weight:700;margin-bottom:20px;">
        No exageraste. Y no fue tu culpa.
      </p>

      <p style="color:${COLORS.muted};font-size:14px;line-height:1.7;margin-bottom:24px;">
        Lo que te esta pasando tiene un nombre clinico: tu cerebro creo un vinculo traumatico. Es la misma razon por la que Rapunzel podia escapar de la torre pero no lo hacia. Es la misma razon por la que defiendes a quien te destruye. Y es la misma razon por la que, aunque sabes que te hace dano, no puedes dejar de pensar en el.
      </p>

      <hr style="border:none;border-top:1px solid #333;margin:24px 0;">

      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:16px;">
        <strong style="color:${COLORS.gold};">Apego Detox</strong> fue creado para este momento exacto. Para cuando ya sabes que algo esta mal pero no sabes como salir.
      </p>

      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:8px;">
        Esto es lo que obtienen las mujeres que entran:
      </p>

      <table style="width:100%;margin:16px 0 24px;">
        <tr>
          <td style="padding:10px 0;color:${COLORS.white};font-size:14px;line-height:1.6;vertical-align:top;">
            <span style="color:${COLORS.gold};font-weight:700;">01.</span> Entienden por primera vez que le paso a su cerebro — y por que NO es su culpa
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:${COLORS.white};font-size:14px;line-height:1.6;vertical-align:top;">
            <span style="color:${COLORS.gold};font-weight:700;">02.</span> Dejan de defender a quien las destruye — su cerebro les estaba mintiendo
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:${COLORS.white};font-size:14px;line-height:1.6;vertical-align:top;">
            <span style="color:${COLORS.gold};font-weight:700;">03.</span> Reciben un protocolo de emergencia para cuando el les escriba de nuevo
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:${COLORS.white};font-size:14px;line-height:1.6;vertical-align:top;">
            <span style="color:${COLORS.gold};font-weight:700;">04.</span> Recuperan su identidad — descubren quien son ellas, sin el
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:${COLORS.white};font-size:14px;line-height:1.6;vertical-align:top;">
            <span style="color:${COLORS.gold};font-weight:700;">05.</span> No estan solas nunca mas — terapia en vivo 2x/semana + grupo WhatsApp 24/7
          </td>
        </tr>
      </table>

      <div style="background:${COLORS.bg};border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid ${COLORS.gold};">
        <p style="color:${COLORS.muted};font-size:14px;line-height:1.6;margin:0 0 8px;font-style:italic;">
          "Entre pensando que era yo la del problema. A las dos semanas entendi que mi cerebro me estaba mintiendo. Hoy, 3 meses despues, ya no reviso su WhatsApp."
        </p>
        <p style="color:${COLORS.mutedLight};font-size:12px;margin:0;">— Maria, 34 anos</p>
      </div>

      <div style="text-align:center;margin-bottom:16px;">
        <span style="color:${COLORS.mutedLight};font-size:14px;text-decoration:line-through;">$${COURSE_CONFIG.originalPrice} USD</span>
        <span style="color:${COLORS.gold};font-size:28px;font-weight:800;margin-left:12px;">$${COURSE_CONFIG.price} USD</span>
      </div>
      <p style="color:${COLORS.mutedLight};font-size:12px;text-align:center;margin-bottom:4px;">
        Precio de lanzamiento. No lo repetiremos.
      </p>

      ${goldButton('Entrar a Apego Detox — $' + COURSE_CONFIG.price, COURSE_CONFIG.url)}

      <p style="color:${COLORS.mutedLight};font-size:12px;text-align:center;margin:0;">
        Pago unico. Acceso de por vida. Sin suscripciones.
      </p>
    </div>`

  return { subject, html: wrapTemplate(content, preheader) }
}

// ─────────────────────────────────────────────
// EMAIL 3: "Ahora o Nunca" — ESCASEZ + DECISION
// ─────────────────────────────────────────────
export function buildEmail3(data: EmailTemplateData): { subject: string; html: string } {
  const firstName = data.name || ''
  const subject = firstName
    ? `${firstName}, ultimo dia: $${COURSE_CONFIG.price} por dejar de ser Rapunzel`
    : `Ultimo dia: $${COURSE_CONFIG.price} por dejar de ser Rapunzel`
  const preheader = 'Este precio desaparece hoy a las 11:59 PM.'

  const content = `
    <div style="background:${COLORS.surface};border-radius:16px;padding:30px;margin-bottom:20px;">
      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:20px;">
        ${firstName ? `${firstName}, este` : 'Este'} es mi ultimo email sobre esto.
      </p>

      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:20px;">
        Hay dos versiones de ti en este momento:
      </p>

      <p style="color:${COLORS.muted};font-size:14px;line-height:1.7;margin-bottom:8px;">
        <strong style="color:${COLORS.white};">Version A:</strong> La que cierra este email, vuelve a su rutina, y manana se despierta con el mismo nudo en el estomago. Revisando si el escribio. Preguntandose si deberia llamar. Sintiendose culpable por algo que nunca fue su culpa.
      </p>

      <p style="color:${COLORS.muted};font-size:14px;line-height:1.7;margin-bottom:24px;">
        <strong style="color:${COLORS.gold};">Version B:</strong> La que hoy decide responder la pregunta mas importante de su vida: <em>quien soy yo antes de el?</em>
      </p>

      <hr style="border:none;border-top:1px solid #333;margin:24px 0;">

      <p style="color:${COLORS.white};font-size:15px;line-height:1.7;margin-bottom:20px;">
        No necesitas completar todo Apego Detox para sentir alivio. En los primeros 15 minutos vas a entender por primera vez que le paso a tu cerebro.
      </p>

      <p style="color:${COLORS.white};font-size:17px;line-height:1.7;font-weight:700;margin-bottom:24px;">
        Y vas a entender, por fin, que nunca fue tu culpa.
      </p>

      <div style="background:${COLORS.bg};border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid ${COLORS.gold};">
        <p style="color:${COLORS.muted};font-size:14px;line-height:1.6;margin:0 0 8px;font-style:italic;">
          "Desearia haberlo encontrado hace 5 anos. Hubiera ahorrado anos de terapia y lagrimas. Los 8 pasos del protocolo de emergencia literalmente me salvaron la vida cuando el me escribio a las 2 AM."
        </p>
        <p style="color:${COLORS.mutedLight};font-size:12px;margin:0;">— Ana, 41 anos</p>
      </div>

      <div style="text-align:center;margin-bottom:8px;">
        <span style="color:${COLORS.mutedLight};font-size:14px;text-decoration:line-through;">$${COURSE_CONFIG.originalPrice} USD</span>
        <span style="color:${COLORS.gold};font-size:28px;font-weight:800;margin-left:12px;">$${COURSE_CONFIG.price} USD</span>
      </div>
      <p style="color:#ef4444;font-size:13px;text-align:center;font-weight:700;margin-bottom:4px;">
        Este precio desaparece hoy a las 11:59 PM
      </p>
      <p style="color:${COLORS.mutedLight};font-size:12px;text-align:center;margin-bottom:4px;">
        Manana sera $${COURSE_CONFIG.originalPrice}.
      </p>

      ${goldButton('Si, quiero ser libre — $' + COURSE_CONFIG.price, COURSE_CONFIG.url)}

      <hr style="border:none;border-top:1px solid #333;margin:24px 0;">

      <p style="color:${COLORS.muted};font-size:14px;line-height:1.7;margin-bottom:0;">
        Independientemente de tu decision, quiero que sepas algo: tus resultados del test son reales. Lo que sientes es real. Y mereces algo mejor.
      </p>

      <p style="color:${COLORS.muted};font-size:14px;line-height:1.7;margin-top:16px;">
        Cuidate mucho.
      </p>

      <p style="color:${COLORS.mutedLight};font-size:13px;line-height:1.7;margin-top:20px;">
        <strong>P.S.</strong> Si no puedes pagar el programa ahora, responde a este email. Tenemos opciones. Ninguna mujer se queda afuera por dinero.
      </p>
    </div>`

  return { subject, html: wrapTemplate(content, preheader) }
}
