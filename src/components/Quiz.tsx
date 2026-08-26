import { useCallback, useEffect, useState, type ComponentType } from 'react';
import { Sparkles, Target, Users, Sun, Shield, ScanSearch, Leaf, Check } from 'lucide-react';
import { TRAITS, type Trait } from '@/data/traits';
import { GARMENTS } from '@/data/garments';
import { buildVectorFromTraits, matchGarment, type MatchResult } from '@/lib/match';
import ResultTeaser from '@/components/ResultTeaser';
import { cn } from '@/lib/utils';

const REVEAL_DELAY_MS = 900;
const MIN_TRAITS_TO_REVEAL = 2;

const TRAIT_ICON: Record<Trait, ComponentType<{ className?: string }>> = {
  Creativo: Sparkles,
  Ambicioso: Target,
  Sociable: Users,
  Optimista: Sun,
  Reservado: Shield,
  Detallista: ScanSearch,
  Tranquilo: Leaf,
};

interface QuizProps {
  garmentImages: Record<string, string>;
}

export default function Quiz({ garmentImages }: QuizProps) {
  const [selected, setSelected] = useState<Trait[]>([]);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reveal = useCallback(() => {
    setResult(matchGarment(buildVectorFromTraits(selected), GARMENTS));
    setIsLoading(false);
  }, [selected]);

  useEffect(() => {
    if (selected.length < MIN_TRAITS_TO_REVEAL) {
      setResult(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timeoutId = setTimeout(reveal, REVEAL_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, [selected, reveal]);

  const toggleTrait = (trait: Trait) => {
    setSelected((current) =>
      current.includes(trait)
        ? current.filter((item) => item !== trait)
        : [...current, trait],
    );
  };

  const statusMessage = isLoading
    ? 'Buscando tu prenda'
    : result
      ? `Tu prenda es ${result.garment.name}`
      : '';

  return (
    <div className="flex flex-col gap-8">
      <p role="status" className="sr-only">
        {statusMessage}
      </p>

      <div className="flex flex-wrap gap-2.5">
        {TRAITS.map((trait) => {
          const isSelected = selected.includes(trait);
          const Icon = isSelected ? Check : TRAIT_ICON[trait];
          return (
            <button
              key={trait}
              type="button"
              onClick={() => toggleTrait(trait)}
              aria-pressed={isSelected}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm md:text-base',
                isSelected
                  ? 'border-white bg-white text-surface-warm ring-4 ring-white/30 hover:bg-white/90'
                  : 'border-white/70 bg-transparent text-white hover:-translate-y-0.5 hover:border-white hover:bg-white/15',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {trait}
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
          <span className="text-eyebrow text-white/70">Buscando tu prenda</span>
        </div>
      )}

      {!isLoading && result && (
        <ResultTeaser
          garment={result.garment}
          imageUrl={garmentImages[result.garment.id] ?? null}
        />
      )}
    </div>
  );
}
