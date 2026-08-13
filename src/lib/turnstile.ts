import { TURNSTILE_SECRET_KEY } from 'astro:env/server';

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface SiteverifyResponse {
  success: boolean;
  'error-codes'?: string[];
}

export async function verifyTurnstileToken(token: string, clientIp?: string): Promise<boolean> {
  const body = new FormData();
  body.append('secret', TURNSTILE_SECRET_KEY);
  body.append('response', token);
  if (clientIp) body.append('remoteip', clientIp);

  try {
    const response = await fetch(SITEVERIFY_URL, { method: 'POST', body });
    const result = (await response.json()) as SiteverifyResponse;

    if (!result.success) {
      console.error('turnstile.verification_failed', result['error-codes']);
    }
    return result.success;
  } catch (error) {
    console.error('turnstile.verification_unreachable', error);
    return false;
  }
}
