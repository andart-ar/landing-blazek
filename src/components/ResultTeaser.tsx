import type { Garment } from '@/data/garments';
import WaitlistForm from '@/components/WaitlistForm';

interface ResultTeaserProps {
  garment: Garment;
}

export default function ResultTeaser({ garment }: ResultTeaserProps) {
  return (
    <div className="animate-rise-in grid gap-[var(--space-stack)] md:grid-cols-2 md:items-center">
      <div className="bzk-oval-frame">
        <img
          src={garment.image}
          alt={`Boceto de ${garment.name}`}
          loading="lazy"
          decoding="async"
          width="600"
          height="432"
        />
      </div>

      <div className="flex flex-col gap-5">
        <span className="text-eyebrow text-surface-warm-foreground/70">Te entendimos. Tu prenda es</span>
        <h3 className="text-section-title text-surface-warm-foreground">{garment.name}</h3>
        <p className="text-lg text-surface-warm-foreground/85">{garment.teaserCopy}</p>

        <div className="card-blazek flex flex-col gap-3 text-foreground">
          <span className="font-display text-xl uppercase">Sé de los primeros en tenerla</span>
          <WaitlistForm variant="result" garmentId={garment.id} />
        </div>
      </div>
    </div>
  );
}
