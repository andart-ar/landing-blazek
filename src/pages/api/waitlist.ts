import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RESEND_API_KEY, RESEND_AUDIENCE_ID, RESEND_FROM_EMAIL } from 'astro:env/server';
import { PUBLIC_SITE_URL } from 'astro:env/client';
import { GARMENTS } from '@/data/garments';
import { buildWaitlistWelcomeEmail } from '@/emails/waitlistWelcome';
import { getClientId, getClientIp, isRateLimited } from '@/lib/rateLimit';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { isValidWaitlistEmail, type WaitlistPayload, type WaitlistVariant } from '@/lib/waitlist';

export const prerender = false;

const MAX_BODY_BYTES = 2048;
const JSON_CONTENT_TYPE = 'application/json';

type PayloadResult =
  | { ok: true; payload: Partial<WaitlistPayload> }
  | { ok: false; status: number; message: string };

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': JSON_CONTENT_TYPE },
  });
}

function isSameOrigin(request: Request): boolean {
  return request.headers.get('origin') === PUBLIC_SITE_URL;
}

function findGarmentName(garmentId: unknown): string | undefined {
  if (typeof garmentId !== 'string') return undefined;
  return GARMENTS.find((garment) => garment.id === garmentId)?.name;
}

async function readPayload(request: Request): Promise<PayloadResult> {
  if (!request.headers.get('content-type')?.includes(JSON_CONTENT_TYPE)) {
    return { ok: false, status: 415, message: 'Formato no soportado.' };
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return { ok: false, status: 413, message: 'Solicitud demasiado grande.' };
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return { ok: false, status: 413, message: 'Solicitud demasiado grande.' };
  }

  try {
    return { ok: true, payload: JSON.parse(raw) };
  } catch {
    return { ok: false, status: 400, message: 'Cuerpo inválido.' };
  }
}

function isExistingContactError(error: { message?: string }): boolean {
  return Boolean(error.message?.toLowerCase().includes('already exists'));
}

async function saveContactAndSendWelcome(
  email: string,
  variant: WaitlistVariant,
  garmentName?: string,
) {
  const resend = new Resend(RESEND_API_KEY);

  const contactResult = await resend.contacts.create({
    email,
    audienceId: RESEND_AUDIENCE_ID,
    unsubscribed: false,
  });

  if (contactResult.error && !isExistingContactError(contactResult.error)) {
    console.error('waitlist.contact_error', contactResult.error);
    return jsonResponse({ ok: false, message: 'No pudimos guardar tu email.' }, 500);
  }

  const content = buildWaitlistWelcomeEmail(variant, { siteUrl: PUBLIC_SITE_URL, garmentName });
  const sendResult = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: email,
    subject: content.subject,
    html: content.html,
    text: content.text,
  });

  if (sendResult.error) {
    console.error('waitlist.send_error', sendResult.error);
  }

  return jsonResponse({ ok: true }, 200);
}

export const POST: APIRoute = async ({ request }) => {
  if (!isSameOrigin(request)) {
    return jsonResponse({ ok: false, message: 'Origen no permitido.' }, 403);
  }

  const clientId = getClientId(request);
  if (isRateLimited(clientId)) {
    return jsonResponse({ ok: false, message: 'Demasiados intentos. Esperá un momento.' }, 429);
  }

  const result = await readPayload(request);
  if (!result.ok) {
    return jsonResponse({ ok: false, message: result.message }, result.status);
  }

  const { email, variant, garmentId, turnstileToken } = result.payload;
  if (
    typeof email !== 'string' ||
    !isValidWaitlistEmail(email) ||
    (variant !== 'general' && variant !== 'result') ||
    typeof turnstileToken !== 'string' ||
    turnstileToken.length === 0
  ) {
    return jsonResponse({ ok: false, message: 'Datos inválidos.' }, 400);
  }

  if (!(await verifyTurnstileToken(turnstileToken, getClientIp(request)))) {
    return jsonResponse({ ok: false, message: 'No pudimos verificar que seas humano.' }, 403);
  }

  return saveContactAndSendWelcome(email, variant, findGarmentName(garmentId));
};
