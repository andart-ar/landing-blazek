export type WaitlistVariant = 'general' | 'result';

export interface WaitlistPayload {
  email: string;
  variant: WaitlistVariant;
  garmentId?: string;
}

export const WAITLIST_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
