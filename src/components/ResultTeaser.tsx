import { Shirt } from 'lucide-react';
import type { Garment } from '@/data/garments';
import WaitlistForm from '@/components/WaitlistForm';

interface ResultTeaserProps {
  garment: Garment;
  imageUrl: string | null;
}

export default function ResultTeaser({ garment, imageUrl }: ResultTeaserProps) {
  return (
    <div className="animate-rise-in grid gap-[var(--space-stack)] md:grid-cols-2 md:items-center">
      <div className="bzk-oval-frame min-w-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Boceto de ${garment.name}`}
            loading="lazy"
            decoding="async"
            width="600"
            height="432"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-secondary/10"
            role="img"
            aria-label={`${garment.name}, imagen no disponible`}
          >
            <Shirt className="h-12 w-12 text-secondary/40" strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-5">
        <span className="text-eyebrow text-white/70">Te entendimos. Tu prenda es</span>
        <h3 className="text-section-title text-white">{garment.name}</h3>
        <p className="text-lg text-white/85">{garment.teaserCopy}</p>

        <div className="card-blazek flex flex-col gap-3 text-foreground">
          <span className="font-display text-xl uppercase">Sé de los primeros en tenerla</span>
          <WaitlistForm variant="result" garmentId={garment.id} />
        </div>
      </div>
    </div>
  );
}
