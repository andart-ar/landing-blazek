import { useCallback, useEffect, useState } from 'react';
import { TRAITS, type Trait } from '@/data/traits';
import { GARMENTS } from '@/data/garments';
import { buildVectorFromTraits, matchGarment, type MatchResult } from '@/lib/match';
import ResultTeaser from '@/components/ResultTeaser';
import { cn } from '@/lib/utils';

const REVEAL_DELAY_MS = 900;

export default function Quiz() {
  const [selected, setSelected] = useState<Trait[]>([]);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reveal = useCallback(() => {
    setResult(matchGarment(buildVectorFromTraits(selected), GARMENTS));
    setIsLoading(false);
  }, [selected]);

  useEffect(() => {
    if (selected.length === 0) {
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
          return (
            <button
              key={trait}
              type="button"
              onClick={() => toggleTrait(trait)}
              aria-pressed={isSelected}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors md:text-base',
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-secondary-foreground/30 text-secondary-foreground/70 hover:border-secondary-foreground hover:text-secondary-foreground',
              )}
            >
              {trait}
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-secondary-foreground/30 border-t-primary" />
          <span className="text-eyebrow text-secondary-foreground/70">Buscando tu prenda</span>
        </div>
      )}

      {!isLoading && result && (
        <ResultTeaser garment={result.garment} />
      )}
    </div>
  );
}
