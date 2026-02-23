export const siteConfig = {
  name: 'Detectar al Narcisista',
  description: 'Test psicológico basado en DSM-5 para identificar patrones narcisistas',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  pricing: {
    amount: 9900,
    currency: 'COP',
    originalAmount: 29900,
    label: '$9.900 COP',
  },
  quiz: {
    totalQuestions: 10,
    maxScore: 40,
    categories: 5,
  },
  emails: {
    from: 'Detectar al Narcisista <noreply@historiasdelamente.com>',
  },
  seo: {
    siteTitle: 'Detectar al Narcisista | Test Psicológico Basado en DSM-5',
    defaultDescription: 'Descubre si tu relación tiene patrones narcisistas. Test científico de 10 preguntas.',
    locale: 'es_CO',
  },
}
