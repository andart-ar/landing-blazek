import { TRAITS, type Trait, type TraitVector } from '@/data/traits';
import type { QuizQuestionData } from '@/data/quiz';
import type { Garment } from '@/data/garments';

export function buildUserVector(answers: number[], questions: QuizQuestionData[]): TraitVector {
  const vector = new Array<number>(TRAITS.length).fill(0);
  answers.forEach((optionIndex, questionIndex) => {
    const option = questions[questionIndex]?.options[optionIndex];
    if (!option) return;
    for (const [trait, weight] of Object.entries(option.weights)) {
      const traitIndex = TRAITS.indexOf(trait as Trait);
      if (traitIndex !== -1 && typeof weight === 'number') {
        vector[traitIndex] += weight;
      }
    }
  });
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
