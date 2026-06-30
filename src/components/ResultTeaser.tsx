import type { Garment } from '@/data/garments';
import { Button } from '@/components/ui/button';
import WaitlistForm from '@/components/WaitlistForm';

interface ResultTeaserProps {
  garment: Garment;
  onRestart: () => void;
}

export default function ResultTeaser({ garment, onRestart }: ResultTeaserProps) {
  return (
    <div className="animate-rise-in grid gap-10 md:grid-cols-2 md:items-center">
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
        <span className="text-eyebrow">Te entendimos. Tu prenda es</span>
        <h3 className="text-section-title bzk-gradient-text">{garment.name}</h3>
        <p className="text-lg text-muted-foreground">{garment.teaserCopy}</p>

        <div className="flex flex-col gap-3 rounded-lg border-2 border-border bg-card p-6">
          <span className="font-display text-xl uppercase">Sé de los primeros en tenerla</span>
          <WaitlistForm variant="result" garmentId={garment.id} />
        </div>

        <Button variant="ghost" size="sm" className="w-fit" onClick={onRestart}>
          Probar de nuevo
        </Button>
      </div>
    </div>
  );
}
