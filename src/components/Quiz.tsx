import { useCallback, useEffect, useState, type ComponentType } from 'react';
import { Sparkles, Target, Users, Sun, Shield, ScanSearch, Leaf } from 'lucide-react';
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

export default function Quiz() {
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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2.5">
        {TRAITS.map((trait) => {
          const isSelected = selected.includes(trait);
          const Icon = TRAIT_ICON[trait];
          return (
            <button
              key={trait}
              type="button"
              onClick={() => toggleTrait(trait)}
              aria-pressed={isSelected}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all md:text-base',
                isSelected
                  ? 'border-white bg-white text-primary hover:bg-transparent hover:text-white'
                  : 'border-white/40 bg-white text-surface-warm-foreground hover:border-white hover:text-primary',
              )}
            >
              <Icon className="h-4 w-4" />
              {trait}
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-surface-warm-foreground/25 border-t-surface-warm-foreground" />
          <span className="text-eyebrow text-surface-warm-foreground/70">Buscando tu prenda</span>
        </div>
      )}

      {!isLoading && result && (
        <ResultTeaser garment={result.garment} />
      )}
    </div>
  );
}
