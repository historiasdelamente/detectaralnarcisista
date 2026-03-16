import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Detectar al Narcisista | Test Psicologico Gratuito Basado en DSM-5',
  description: 'Descubre si tu relacion tiene patrones narcisistas. Test cientifico de 10 preguntas basado en el DSM-5. Resultados inmediatos y reporte detallado.',
  openGraph: {
    title: 'Detectar al Narcisista | Test Psicologico Gratuito',
    description: 'Test cientifico de 10 preguntas para identificar patrones narcisistas en tu relacion.',
    locale: 'es_CO',
    siteName: 'Detectar al Narcisista',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
