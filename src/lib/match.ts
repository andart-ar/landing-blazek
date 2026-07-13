import { TRAITS, type Trait, type TraitVector } from '@/data/traits';
import type { Garment } from '@/data/garments';

export function buildVectorFromTraits(selected: Trait[]): TraitVector {
  const vector = new Array<number>(TRAITS.length).fill(0);
  for (const trait of selected) {
    const index = TRAITS.indexOf(trait);
    if (index !== -1) vector[index] = 1;
  }
  return vector;
}

export function cosineSimilarity(a: TraitVector, b: TraitVector): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export interface MatchResult {
  garment: Garment;
  score: number;
}

export function matchGarment(userVector: TraitVector, garments: Garment[]): MatchResult {
  let best = garments[0];
  let bestScore = -Infinity;
  for (const garment of garments) {
    const score = cosineSimilarity(userVector, garment.vector);
    if (score > bestScore) {
      bestScore = score;
      best = garment;
    }
  }
  return { garment: best, score: bestScore };
}
