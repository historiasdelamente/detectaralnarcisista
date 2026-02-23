import { Category, CategoryInfo, Question } from '../types'

export const CATEGORIES: Record<Category, CategoryInfo> = {
  manipulacion: {
    id: 'manipulacion',
    label: 'Manipulación',
    emoji: '🎭',
    description: 'Uso de tácticas emocionales para controlar',
  },
  empatia: {
    id: 'empatia',
    label: 'Falta de Empatía',
    emoji: '💔',
    description: 'Incapacidad de conectar con tus emociones',
  },
  control: {
    id: 'control',
    label: 'Necesidad de Control',
    emoji: '⛓️',
    description: 'Dominio sobre decisiones y relaciones',
  },
  gaslighting: {
    id: 'gaslighting',
    label: 'Gaslighting',
    emoji: '🌫️',
    description: 'Distorsión de la realidad para confundirte',
  },
  grandiosidad: {
    id: 'grandiosidad',
    label: 'Superioridad',
    emoji: '👑',
    description: 'Sentido exagerado de importancia propia',
  },
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'manipulacion',
    text: '¿Tu pareja utiliza tus emociones o vulnerabilidades para conseguir lo que quiere?',
  },
  {
    id: 2,
    category: 'manipulacion',
    text: '¿Te hace sentir culpable cuando intentas establecer límites saludables?',
  },
  {
    id: 3,
    category: 'empatia',
    text: '¿Ignora o minimiza tus sentimientos cuando estás pasando por un momento difícil?',
  },
  {
    id: 4,
    category: 'empatia',
    text: '¿Cuando compartes algo importante, cambia el tema hacia sí mismo/a?',
  },
  {
    id: 5,
    category: 'control',
    text: '¿Intenta controlar con quién te relacionas, a dónde vas o qué haces?',
  },
  {
    id: 6,
    category: 'control',
    text: '¿Sientes que necesitas pedir permiso para tomar tus propias decisiones?',
  },
  {
    id: 7,
    category: 'gaslighting',
    text: '¿Niega cosas que dijo o hizo, haciéndote dudar de tu propia memoria?',
  },
  {
    id: 8,
    category: 'gaslighting',
    text: '¿Alguna vez te has sentido como si estuvieras "volviéndote loca" en la relación?',
  },
  {
    id: 9,
    category: 'grandiosidad',
    text: '¿Actúa como si fuera superior a los demás y mereciera un trato especial?',
  },
  {
    id: 10,
    category: 'grandiosidad',
    text: '¿Espera que todo gire en torno a sus necesidades, sin considerar las tuyas?',
  },
]

export const ANSWER_OPTIONS = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'Raramente' },
  { value: 2, label: 'A veces' },
  { value: 3, label: 'Frecuentemente' },
  { value: 4, label: 'Siempre' },
]
