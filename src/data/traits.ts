export const TRAITS = [
  'Creativo',
  'Ambicioso',
  'Sociable',
  'Optimista',
  'Reservado',
  'Detallista',
  'Tranquilo',
] as const;

export type Trait = (typeof TRAITS)[number];

export type TraitVector = number[];
