import { useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TurnstileWidget, { type TurnstileHandle } from '@/components/TurnstileWidget';
import { cn } from '@/lib/utils';
import { isValidWaitlistEmail, type WaitlistVariant } from '@/lib/waitlist';

interface WaitlistFormProps {
  variant: WaitlistVariant;
  garmentId?: string;
  orientation?: 'stack' | 'inline';
  tone?: 'default' | 'dark';
}

type SubmissionStatus = 'idle' | 'invalid' | 'unverified' | 'submitting' | 'success' | 'error';

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
const UNVERIFIED_MESSAGE = 'Esperá un segundo a que terminemos de verificar y probá de nuevo.';
const INVALID_MESSAGE = 'Poné un email válido para sumarte.';

export default function WaitlistForm({
  variant,
  garmentId,
  orientation = 'stack',
  tone = 'default',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<TurnstileHandle | null>(null);
  const isInline = orientation === 'inline';
  const isDark = tone === 'dark';

  const resetChallenge = () => {
    setTurnstileToken('');
    turnstileRef.current?.reset();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidWaitlistEmail(email)) {
      setStatus('invalid');
      return;
    }
    if (!turnstileToken) {
      setStatus('unverified');
      return;
    }
    setStatus('submitting');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, garmentId, variant, turnstileToken }),
      });
      if (!response.ok) {
        resetChallenge();
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      resetChallenge();
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
              if (status !== 'idle' && status !== 'submitting') setStatus('idle');
            }}
            aria-invalid={status === 'invalid' || status === 'error'}
            className={cn(
              'h-14',
              isDark && 'border-foreground/25 bg-white/5 text-foreground placeholder:text-foreground/50',
            )}
          />
          {status === 'invalid' && (
            <span className="text-sm font-medium text-destructive">{INVALID_MESSAGE}</span>
          )}
          {status === 'unverified' && (
            <span className="text-sm font-medium text-destructive">{UNVERIFIED_MESSAGE}</span>
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

      <TurnstileWidget
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken('')}
        handleRef={turnstileRef}
      />
    </form>
  );
}
