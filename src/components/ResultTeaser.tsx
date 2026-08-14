import {
  buildGarmentImageFallback,
  buildGarmentImageSrcSet,
  type Garment,
} from '@/data/garments';
import WaitlistForm from '@/components/WaitlistForm';

interface ResultTeaserProps {
  garment: Garment;
}

export default function ResultTeaser({ garment }: ResultTeaserProps) {
  return (
    <div className="animate-rise-in grid gap-[var(--space-stack)] md:grid-cols-2 md:items-center">
      <div className="bzk-oval-frame min-w-0">
        <img
          src={buildGarmentImageFallback(garment.photoId)}
          srcSet={buildGarmentImageSrcSet(garment.photoId)}
          sizes="(min-width: 768px) 45vw, 90vw"
          alt={`Boceto de ${garment.name}`}
          loading="lazy"
          decoding="async"
          width="600"
          height="432"
        />
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
