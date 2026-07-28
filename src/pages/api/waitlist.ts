import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { WAITLIST_EMAIL_PATTERN, type WaitlistPayload } from '@/lib/waitlist';
import { buildWaitlistWelcomeEmail } from '@/emails/waitlistWelcome';

export const prerender = false;

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let payload: Partial<WaitlistPayload>;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, message: 'Cuerpo inválido.' }, 400);
  }

  const { email, variant, garmentId } = payload;

  if (
    typeof email !== 'string' ||
    !WAITLIST_EMAIL_PATTERN.test(email) ||
    (variant !== 'general' && variant !== 'result')
  ) {
    return jsonResponse({ ok: false, message: 'Datos inválidos.' }, 400);
  }

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
  const siteUrl = import.meta.env.PUBLIC_SITE_URL;

  if (!resendApiKey || !audienceId || !fromEmail || !siteUrl) {
    console.error('waitlist.config_missing', {
      hasApiKey: Boolean(resendApiKey),
      hasAudienceId: Boolean(audienceId),
      hasFromEmail: Boolean(fromEmail),
      hasSiteUrl: Boolean(siteUrl),
    });
    return jsonResponse({ ok: false, message: 'Servicio no disponible.' }, 500);
  }

  const resend = new Resend(resendApiKey);

  const contactResult = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (contactResult.error) {
    console.error('waitlist.contact_error', contactResult.error);
    return jsonResponse({ ok: false, message: 'No pudimos guardar tu email.' }, 500);
  }

  const emailContent = buildWaitlistWelcomeEmail(variant, { siteUrl });
  const sendResult = await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: emailContent.subject,
    html: emailContent.html,
  });

  if (sendResult.error) {
    console.error('waitlist.send_error', sendResult.error, { garmentId });
  }

  return jsonResponse({ ok: true }, 200);
};
