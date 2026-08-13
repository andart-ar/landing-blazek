export type WaitlistVariant = 'general' | 'result';

export interface WaitlistPayload {
  email: string;
  variant: WaitlistVariant;
  garmentId?: string;
  turnstileToken: string;
}

const WAITLIST_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_EMAIL_LENGTH = 254;

export function isValidWaitlistEmail(email: string): boolean {
  return email.length <= MAX_EMAIL_LENGTH && WAITLIST_EMAIL_PATTERN.test(email);
}
