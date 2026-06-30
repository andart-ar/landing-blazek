import type { Trait } from './traits';

export interface QuizOption {
  label: string;
  weights: Partial<Record<Trait, number>>;
}

export interface QuizQuestionData {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export const QUESTIONS: QuizQuestionData[] = [
  {
    id: 'weekend',
    prompt: 'Un finde ideal arranca con...',
    options: [
      { label: 'Una juntada con toda la banda', weights: { Sociable: 3, Optimista: 2 } },
      { label: 'Patinar y explorar la ciudad por mi cuenta', weights: { Creativo: 2, Reservado: 2, Tranquilo: 1 } },
      { label: 'Un proyecto personal que tengo entre manos', weights: { Ambicioso: 3, Detallista: 2 } },
      { label: 'No planear nada y ver qué pasa', weights: { Optimista: 2, Tranquilo: 3 } },
    ],
  },
  {
    id: 'garment',
    prompt: 'Tu prenda tiene que...',
    options: [
      { label: 'Que no la tenga nadie más', weights: { Creativo: 3, Reservado: 1 } },
      { label: 'Combinar con todo, sin esfuerzo', weights: { Tranquilo: 2, Detallista: 1, Reservado: 1 } },
      { label: 'Estar impecable en los detalles', weights: { Detallista: 3, Ambicioso: 1 } },
      { label: 'Que se note cuando entro', weights: { Sociable: 2, Optimista: 2, Ambicioso: 1 } },
    ],
  },
  {
    id: 'change',
    prompt: 'Cuando algo cambia de golpe, vos...',
    options: [
      { label: 'Lo tomo como una oportunidad', weights: { Optimista: 3, Ambicioso: 2 } },
      { label: 'Me adapto tranquilo, fluyo', weights: { Tranquilo: 3, Reservado: 1 } },
      { label: 'Lo uso para crear algo nuevo', weights: { Creativo: 3, Optimista: 1 } },
      { label: 'Planeo cada paso de nuevo', weights: { Detallista: 3, Ambicioso: 1 } },
    ],
  },
  {
    id: 'group',
    prompt: 'En un grupo sos el/la que...',
    options: [
      { label: 'Conecta a todos, el alma', weights: { Sociable: 3, Optimista: 2 } },
      { label: 'Observa y tira la idea justa', weights: { Creativo: 2, Reservado: 2 } },
      { label: 'Lleva las cosas a cabo', weights: { Ambicioso: 3, Detallista: 1 } },
      { label: 'Está, tranqui, sin hacer ruido', weights: { Tranquilo: 3, Reservado: 2 } },
    ],
  },
  {
    id: 'mood',
    prompt: 'Tu mood la mayoría de los días...',
    options: [
      { label: 'A mil, con mil ideas', weights: { Creativo: 3, Ambicioso: 1, Optimista: 1 } },
      { label: 'En paz, sin apuro', weights: { Tranquilo: 3 } },
      { label: 'Enfocado en mis metas', weights: { Ambicioso: 3, Detallista: 2 } },
      { label: 'De buena, todo va a estar bien', weights: { Optimista: 3, Sociable: 1 } },
    ],
  },
  {
    id: 'core',
    prompt: 'Lo que más te define es...',
    options: [
      { label: 'Crear, cambiar, no quedarme quieto', weights: { Creativo: 3, Ambicioso: 1 } },
      { label: 'La gente, mi comunidad', weights: { Sociable: 3, Optimista: 1 } },
      { label: 'Hacer las cosas bien hechas', weights: { Detallista: 3, Ambicioso: 1 } },
      { label: 'Mi propio ritmo, mi espacio', weights: { Reservado: 3, Tranquilo: 2 } },
    ],
  },
];
