import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Detectar al Narcisista | Test Psicológico Basado en DSM-5',
  description: 'Descubre si tu relación tiene patrones narcisistas. Test científico de 10 preguntas basado en el DSM-5. Resultados inmediatos y reporte detallado.',
  openGraph: {
    title: 'Detectar al Narcisista | Test Psicológico',
    description: 'Test científico de 10 preguntas para identificar patrones narcisistas en tu relación.',
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
