import { EmailTemplateData } from '../types'
import { COURSE_CONFIG } from '../constants'

const COLORS = {
  gold: '#C9A84C',
  dark: '#1A1A2E',
  brown: '#8B5E3C',
  text: '#333333',
  muted: '#999999',
  bg: '#f5f5f5',
  white: '#ffffff',
  divider: '#e8e0d4',
}

function wrapTemplate(content: string, preheader: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};font-family:Georgia,serif;">
<span style="display:none;font-size:1px;color:${COLORS.bg};max-height:0;overflow:hidden;">${preheader}</span>

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.bg};">
<tr><td align="center" style="padding:15px 8px;">

<table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background-color:${COLORS.white};">

${content}

<!-- FOOTER -->
<tr><td style="background-color:${COLORS.white};padding:20px 25px;text-align:center;">
  <p style="margin:0 0 3px 0;font-family:Arial,sans-serif;font-size:10px;color:${COLORS.gold};font-weight:bold;">Historias de la Mente &bull; @historiasdelamente</p>
  <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;color:${COLORS.muted};">Javier Vieira &bull; Psic&oacute;logo Especialista</p>
</td></tr>

</table>
</td></tr>
</table>

</body>
</html>`
}

function goldButton(text: string, url: string): string {
  return `<tr><td style="background-color:${COLORS.white};padding:5px 25px 20px 25px;text-align:center;">
  <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
    <tr><td style="background-color:${COLORS.gold};border-radius:4px;padding:14px 40px;">
      <a href="${url}" style="font-family:Georgia,serif;font-size:13px;color:${COLORS.white};text-decoration:none;font-weight:bold;display:block;">
        ${text} &rarr;
      </a>
    </td></tr>
  </table>
</td></tr>`
}

function divider(): string {
  return `<tr><td style="padding:0 25px;"><table width="100%"><tr><td style="border-bottom:1px solid ${COLORS.divider};font-size:0;">&nbsp;</td></tr></table></td></tr>`
}

function goldDivider(): string {
  return `<tr><td style="padding:0 25px;"><table width="100%"><tr><td style="border-bottom:1px solid ${COLORS.gold};font-size:0;">&nbsp;</td></tr></table></td></tr>`
}

// ─────────────────────────────────────────────
// EMAIL 1: Reporte (se envia desde payment/capture, no desde cron)
// Este builder existe por compatibilidad pero el reporte real esta en payment/capture
// ─────────────────────────────────────────────
export function buildEmail1(data: EmailTemplateData): { subject: string; html: string } {
  const firstName = data.name || ''
  const greeting = firstName || 'Querida'
  const subject = firstName
    ? `${firstName}, tu Reporte Personal - Detectar al Narcisista`
    : 'Tu Reporte Personal - Detectar al Narcisista'
  const preheader = 'Tu reporte personal basado en el DSM-5 esta listo.'

  const content = `
<!-- FRANJA DORADA SUPERIOR -->
<tr><td style="background-color:${COLORS.gold};padding:10px 20px;text-align:center;">
  <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;color:${COLORS.white};font-weight:bold;text-transform:uppercase;">tu reporte personal &bull; detectar al narcisista</p>
</td></tr>

<!-- TITULO -->
<tr><td style="background-color:${COLORS.white};padding:30px 25px 15px 25px;text-align:center;">
  <p style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:18px;color:${COLORS.dark};font-weight:bold;line-height:1.3;">${greeting}, tu reporte esta listo</p>
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:${COLORS.brown};font-style:italic;">Revisa los detalles en el correo que recibiste tras tu pago.</p>
</td></tr>

<!-- FRANJA DORADA CIERRE -->
<tr><td style="background-color:${COLORS.gold};padding:14px 25px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:${COLORS.white};font-style:italic;">Gracias por confiar en Historias de la Mente.</p>
</td></tr>`

  return { subject, html: wrapTemplate(content, preheader) }
}

// ─────────────────────────────────────────────
// EMAIL 2: "La Herida Abierta" — 24h despues del pago
// Profundiza en su resultado + presenta Apego Detox
// ─────────────────────────────────────────────
export function buildEmail2(data: EmailTemplateData): { subject: string; html: string } {
  const firstName = data.name || ''
  const subject = firstName
    ? `${firstName}, hay algo que tu resultado no te dijo`
    : 'Hay algo que tu resultado no te dijo'
  const preheader = 'Tu cerebro te esta mintiendo. Y no es tu culpa.'

  const content = `
<!-- FRANJA DORADA SUPERIOR -->
<tr><td style="background-color:${COLORS.gold};padding:10px 20px;text-align:center;">
  <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;color:${COLORS.white};font-weight:bold;text-transform:uppercase;">historias de la mente &bull; un mensaje para ti</p>
</td></tr>

<!-- TITULO -->
<tr><td style="background-color:${COLORS.white};padding:30px 25px 15px 25px;text-align:center;">
  <p style="margin:0 0 3px 0;font-family:Georgia,serif;font-size:18px;color:${COLORS.dark};font-weight:bold;line-height:1.3;">Hay algo que tu resultado</p>
  <p style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:18px;color:${COLORS.dark};font-weight:bold;line-height:1.3;">no te dijo</p>
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:${COLORS.brown};font-style:italic;line-height:1.5;">Pero necesitas saberlo</p>
</td></tr>

${goldDivider()}

<!-- MENSAJE PRINCIPAL -->
<tr><td style="background-color:${COLORS.white};padding:20px 25px;">
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    ${firstName ? firstName + ',' : 'Querida,'}
  </p>
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    Han pasado 24 horas desde que recibiste tu reporte. D&eacute;jame adivinar: has estado repasando situaciones. Revisando mensajes viejos. Pregunt&aacute;ndote si exageraste. Si tal vez fue tu culpa.
  </p>
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.dark};line-height:1.8;margin:0 0 14px 0;font-weight:bold;">
    No exageraste. Y no fue tu culpa.
  </p>
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    Lo que te est&aacute; pasando tiene un nombre cl&iacute;nico: tu cerebro cre&oacute; un <strong style="color:${COLORS.dark};">v&iacute;nculo traum&aacute;tico</strong>. Es la misma raz&oacute;n por la que Rapunzel pod&iacute;a escapar de la torre pero no lo hac&iacute;a. Es la misma raz&oacute;n por la que defiendes a quien te destruye.
  </p>
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0;">
    Y es la misma raz&oacute;n por la que, aunque sabes que te hace da&ntilde;o, no puedes dejar de pensar en &eacute;l.
  </p>
</td></tr>

${divider()}

<!-- APEGO DETOX -->
<tr><td style="background-color:${COLORS.white};padding:20px 25px;">
  <p style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:2px;color:${COLORS.gold};font-weight:bold;margin:0 0 14px 0;text-transform:uppercase;">existe un camino</p>

  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    <strong style="color:${COLORS.dark};">Apego Detox</strong> fue creado para este momento exacto. Para cuando ya sabes que algo est&aacute; mal pero no sabes c&oacute;mo salir.
  </p>

  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    Esto es lo que obtienen las mujeres que entran:
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Georgia,serif;font-size:12px;margin-bottom:14px;">
    <tr><td style="padding:8px 0;border-bottom:1px solid ${COLORS.divider};color:${COLORS.text};line-height:1.6;">
      <strong style="color:${COLORS.gold};">01.</strong> Entienden por primera vez qu&eacute; le pas&oacute; a su cerebro &mdash; y por qu&eacute; NO es su culpa
    </td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid ${COLORS.divider};color:${COLORS.text};line-height:1.6;">
      <strong style="color:${COLORS.gold};">02.</strong> Dejan de defender a quien las destruye
    </td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid ${COLORS.divider};color:${COLORS.text};line-height:1.6;">
      <strong style="color:${COLORS.gold};">03.</strong> Reciben un protocolo de emergencia para cuando &eacute;l les escriba de nuevo
    </td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid ${COLORS.divider};color:${COLORS.text};line-height:1.6;">
      <strong style="color:${COLORS.gold};">04.</strong> Recuperan su identidad &mdash; descubren qui&eacute;n son ellas, sin &eacute;l
    </td></tr>
    <tr><td style="padding:8px 0;color:${COLORS.text};line-height:1.6;">
      <strong style="color:${COLORS.gold};">05.</strong> Terapia en vivo 2 veces por semana + comunidad de apoyo 24/7
    </td></tr>
  </table>
</td></tr>

${divider()}

<!-- TESTIMONIO -->
<tr><td style="background-color:${COLORS.white};padding:20px 25px;">
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.brown};line-height:1.8;margin:0 0 8px 0;font-style:italic;">
    &ldquo;Entr&eacute; pensando que era yo la del problema. A las dos semanas entend&iacute; que mi cerebro me estaba mintiendo. Hoy, 3 meses despu&eacute;s, ya no reviso su WhatsApp.&rdquo;
  </p>
  <p style="font-family:Arial,sans-serif;font-size:10px;color:${COLORS.muted};margin:0;">&mdash; Mar&iacute;a, 34 a&ntilde;os</p>
</td></tr>

<!-- PRECIO -->
<tr><td style="background-color:${COLORS.white};padding:15px 25px;text-align:center;">
  <span style="font-family:Arial,sans-serif;font-size:13px;color:${COLORS.muted};text-decoration:line-through;">$${COURSE_CONFIG.originalPrice} USD</span>
  <span style="font-family:Georgia,serif;font-size:28px;font-weight:bold;color:${COLORS.gold};margin-left:12px;">$${COURSE_CONFIG.price} USD</span>
  <p style="font-family:Arial,sans-serif;font-size:9px;color:${COLORS.muted};margin:8px 0 0 0;">Precio de lanzamiento. Pago &uacute;nico. Acceso de por vida.</p>
</td></tr>

${goldButton('CONOCER APEGO DETOX', COURSE_CONFIG.url)}

<!-- FRASE CIERRE -->
<tr><td style="background-color:${COLORS.white};padding:0 25px 10px 25px;text-align:center;">
  <p style="font-family:Georgia,serif;font-size:11px;color:${COLORS.muted};margin:0;">No tienes que actuar ahora. Pero no borres este email.</p>
</td></tr>

<!-- FRANJA DORADA CIERRE -->
<tr><td style="background-color:${COLORS.gold};padding:14px 25px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:${COLORS.white};font-style:italic;line-height:1.5;">
    Cu&iacute;date mucho. Ya no est&aacute;s sola en esto.
  </p>
</td></tr>`

  return { subject, html: wrapTemplate(content, preheader) }
}

// ─────────────────────────────────────────────
// EMAIL 3: "Ahora o Nunca" — 48h despues del pago
// Urgencia + decision final para Apego Detox
// ─────────────────────────────────────────────
export function buildEmail3(data: EmailTemplateData): { subject: string; html: string } {
  const firstName = data.name || ''
  const subject = firstName
    ? `${firstName}, este es mi ultimo mensaje sobre esto`
    : 'Este es mi ultimo mensaje sobre esto'
  const preheader = 'Hay dos versiones de ti en este momento.'

  const content = `
<!-- FRANJA DORADA SUPERIOR -->
<tr><td style="background-color:${COLORS.gold};padding:10px 20px;text-align:center;">
  <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;letter-spacing:3px;color:${COLORS.white};font-weight:bold;text-transform:uppercase;">historias de la mente &bull; mensaje final</p>
</td></tr>

<!-- TITULO -->
<tr><td style="background-color:${COLORS.white};padding:30px 25px 15px 25px;text-align:center;">
  <p style="margin:0 0 3px 0;font-family:Georgia,serif;font-size:18px;color:${COLORS.dark};font-weight:bold;line-height:1.3;">Hay dos versiones de ti</p>
  <p style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:18px;color:${COLORS.dark};font-weight:bold;line-height:1.3;">en este momento</p>
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:${COLORS.brown};font-style:italic;line-height:1.5;">Solo t&uacute; puedes elegir cu&aacute;l gana</p>
</td></tr>

${goldDivider()}

<!-- MENSAJE PRINCIPAL -->
<tr><td style="background-color:${COLORS.white};padding:20px 25px;">
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    ${firstName ? firstName + ',' : 'Querida,'}
  </p>
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    Este es mi &uacute;ltimo email sobre esto.
  </p>
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    Hay dos versiones de ti en este momento:
  </p>

  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 6px 0;">
    <strong style="color:${COLORS.text};">Versi&oacute;n A:</strong> La que cierra este email, vuelve a su rutina, y ma&ntilde;ana se despierta con el mismo nudo en el est&oacute;mago. Revisando si &eacute;l escribi&oacute;. Pregunt&aacute;ndose si deber&iacute;a llamar. Sinti&eacute;ndose culpable por algo que nunca fue su culpa.
  </p>

  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    <strong style="color:${COLORS.gold};">Versi&oacute;n B:</strong> La que hoy decide responder la pregunta m&aacute;s importante de su vida: <em>qui&eacute;n soy yo antes de &eacute;l?</em>
  </p>
</td></tr>

${divider()}

<!-- LO QUE OBTIENE -->
<tr><td style="background-color:${COLORS.white};padding:20px 25px;">
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    No necesitas completar todo Apego Detox para sentir alivio. En los primeros 15 minutos vas a entender por primera vez qu&eacute; le pas&oacute; a tu cerebro.
  </p>
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.dark};line-height:1.8;margin:0;font-weight:bold;">
    Y vas a entender, por fin, que nunca fue tu culpa.
  </p>
</td></tr>

${divider()}

<!-- TESTIMONIO -->
<tr><td style="background-color:${COLORS.white};padding:20px 25px;">
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.brown};line-height:1.8;margin:0 0 8px 0;font-style:italic;">
    &ldquo;Desear&iacute;a haberlo encontrado hace 5 a&ntilde;os. Hubiera ahorrado a&ntilde;os de terapia y l&aacute;grimas. Los 8 pasos del protocolo de emergencia literalmente me salvaron la vida cuando &eacute;l me escribi&oacute; a las 2 AM.&rdquo;
  </p>
  <p style="font-family:Arial,sans-serif;font-size:10px;color:${COLORS.muted};margin:0;">&mdash; Ana, 41 a&ntilde;os</p>
</td></tr>

<!-- PRECIO CON URGENCIA -->
<tr><td style="background-color:${COLORS.white};padding:15px 25px;text-align:center;">
  <span style="font-family:Arial,sans-serif;font-size:13px;color:${COLORS.muted};text-decoration:line-through;">$${COURSE_CONFIG.originalPrice} USD</span>
  <span style="font-family:Georgia,serif;font-size:28px;font-weight:bold;color:${COLORS.gold};margin-left:12px;">$${COURSE_CONFIG.price} USD</span>
  <p style="font-family:Arial,sans-serif;font-size:10px;color:#c0392b;font-weight:bold;margin:8px 0 0 0;">Este precio no estar&aacute; disponible por mucho tiempo</p>
  <p style="font-family:Arial,sans-serif;font-size:9px;color:${COLORS.muted};margin:4px 0 0 0;">Pago &uacute;nico. Acceso de por vida. Sin suscripciones.</p>
</td></tr>

${goldButton('SI, QUIERO SER LIBRE', COURSE_CONFIG.url)}

${divider()}

<!-- MENSAJE FINAL -->
<tr><td style="background-color:${COLORS.white};padding:20px 25px;">
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    Independientemente de tu decisi&oacute;n, quiero que sepas algo: tus resultados del test son reales. Lo que sientes es real. Y mereces algo mejor.
  </p>
  <p style="font-family:Georgia,serif;font-size:12px;color:${COLORS.text};line-height:1.8;margin:0 0 14px 0;">
    Cu&iacute;date mucho.
  </p>
  <p style="font-family:Georgia,serif;font-size:11px;color:${COLORS.muted};line-height:1.8;margin:0;">
    <strong>P.S.</strong> Si no puedes pagar el programa ahora, responde a este email. Tenemos opciones. Ninguna mujer se queda afuera por dinero.
  </p>
</td></tr>

<!-- FRANJA DORADA CIERRE -->
<tr><td style="background-color:${COLORS.gold};padding:14px 25px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:${COLORS.white};font-style:italic;line-height:1.5;">
    Llevas mucho tiempo sobreviviendo. Ahora vamos a ense&ntilde;arte a vivir de nuevo.
  </p>
</td></tr>`

  return { subject, html: wrapTemplate(content, preheader) }
}
