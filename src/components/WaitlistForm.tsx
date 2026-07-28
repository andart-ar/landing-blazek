import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { WAITLIST_EMAIL_PATTERN, type WaitlistVariant } from '@/lib/waitlist';

interface WaitlistFormProps {
  variant: WaitlistVariant;
  garmentId?: string;
  orientation?: 'stack' | 'inline';
  tone?: 'default' | 'dark';
}

type SubmissionStatus = 'idle' | 'invalid' | 'submitting' | 'success' | 'error';

const COPY: Record<WaitlistVariant, { cta: string; success: string }> = {
  general: {
    cta: 'Quiero mi lugar',
    success: 'Listo. Te avisamos apenas lancemos.',
  },
  result: {
    cta: 'Quiero ser de los primeros',
    success: 'Anotado. Vas a ser de los primeros en tenerla.',
  },
};

const ERROR_MESSAGE = 'Algo falló. Probá de nuevo en un rato.';

export default function WaitlistForm({
  variant,
  garmentId,
  orientation = 'stack',
  tone = 'default',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const isInline = orientation === 'inline';
  const isDark = tone === 'dark';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!WAITLIST_EMAIL_PATTERN.test(email)) {
      setStatus('invalid');
      return;
    }
    setStatus('submitting');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, garmentId, variant }),
      });
      if (!response.ok) {
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
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
      <div className={cn('flex flex-col gap-2', isInline && 'sm:flex-row sm:items-start sm:gap-3')}>
        <div className="flex flex-1 flex-col gap-2">
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
              if (status === 'invalid' || status === 'error') setStatus('idle');
            }}
            aria-invalid={status === 'invalid' || status === 'error'}
            className={cn(
              'h-14',
              isDark && 'border-foreground/25 bg-white/5 text-foreground placeholder:text-foreground/50',
            )}
          />
          {status === 'invalid' && (
            <span className="text-sm font-medium text-destructive">
              Poné un email válido para sumarte.
            </span>
          )}
          {status === 'error' && (
            <span className="text-sm font-medium text-destructive">{ERROR_MESSAGE}</span>
          )}
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          className={cn(isInline ? 'sm:w-auto' : 'w-full')}
        >
          {COPY[variant].cta}
        </Button>
      </div>
    </form>
  );
}
