import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type WaitlistVariant = 'general' | 'result';

interface WaitlistFormProps {
  variant: WaitlistVariant;
  garmentId?: string;
}

type SubmissionStatus = 'idle' | 'invalid' | 'submitting' | 'success';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY: Record<WaitlistVariant, { cta: string; success: string }> = {
  general: {
    cta: 'Sumarme',
    success: 'Listo. Te avisamos apenas lancemos.',
  },
  result: {
    cta: 'Quiero ser de los primeros',
    success: 'Anotado. Vas a ser de los primeros en tenerla.',
  },
};

export default function WaitlistForm({ variant, garmentId }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus('invalid');
      return;
    }
    setStatus('submitting');
    const payload = { email, garmentId, variant };
    console.info('waitlist.submit', payload);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-2 rounded-lg border-2 border-accent bg-accent/10 p-6">
        <span className="font-display text-xl uppercase">¡Adentro!</span>
        <span className="text-muted-foreground">{COPY[variant].success}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`waitlist-${variant}`} className="sr-only">
          Tu email
        </Label>
        <Input
          id={`waitlist-${variant}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === 'invalid') setStatus('idle');
          }}
          aria-invalid={status === 'invalid'}
        />
        {status === 'invalid' && (
          <span className="text-sm font-medium text-destructive">
            Poné un email válido para sumarte.
          </span>
        )}
      </div>
      <Button type="submit" size="lg" disabled={status === 'submitting'}>
        {COPY[variant].cta}
      </Button>
    </form>
  );
}
