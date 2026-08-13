import type { WaitlistVariant } from '@/lib/waitlist';

interface WaitlistEmailOptions {
  siteUrl: string;
}

interface WaitlistEmailContent {
  subject: string;
  html: string;
}

const BRAND_RED = '#5d1015';
const BRAND_NAVY = '#182848';
const BRAND_GOLD = '#f0c43a';
const BRAND_CREAM = '#faf3e4';
const BRAND_INK = '#141d33';
const BRAND_INK_SOFT = '#4d5a78';
const BRAND_BORDER = '#e7dbc4';

const FONT_BODY = "'Hanken Grotesk', Helvetica, Arial, sans-serif";
const FONT_DISPLAY = "'Hanken Grotesk', Helvetica, Arial, sans-serif";

const VARIANT_COPY: Record<
  WaitlistVariant,
  { badge: string; heading: string; body: string; cta: string }
> = {
  general: {
    badge: 'Estás en la lista',
    heading: 'Bienvenido al cambio',
    body: 'Te sumaste a la waitlist de BLAZEK. En cuanto abramos las puertas, sos de los primeros en enterarte.',
    cta: 'Ver la comunidad',
  },
  result: {
    badge: 'Prenda reservada',
    heading: 'Vas a ser de los primeros',
    body: 'Ya elegiste tu prenda en el quiz. Te avisamos a este mail apenas esté disponible para vos.',
    cta: 'Volver a BLAZEK',
  },
};

export function buildWaitlistWelcomeEmail(
  variant: WaitlistVariant,
  { siteUrl }: WaitlistEmailOptions,
): WaitlistEmailContent {
  const copy = VARIANT_COPY[variant];
  const logoUrl = `${siteUrl}/email/blazek-logo.png`;

  return {
    subject: `BLAZEK — ${copy.heading}`,
    html: `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${copy.heading}</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&display=swap"
    />
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND_CREAM};font-family:${FONT_BODY};color:${BRAND_INK};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND_CREAM};padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border:1px solid ${BRAND_BORDER};border-radius:20px;overflow:hidden;">

            <tr>
              <td align="center" style="padding:36px 32px 24px;">
                <img
                  src="${logoUrl}"
                  width="64"
                  height="43"
                  alt="BLAZEK"
                  style="display:block;width:64px;height:auto;"
                />
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td height="4" style="line-height:4px;font-size:4px;background-color:${BRAND_RED};border-radius:999px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:32px 40px 8px;" align="center">
                <span style="display:inline-block;padding:6px 16px;border:1.5px solid ${BRAND_RED};border-radius:999px;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND_RED};">
                  ${copy.badge}
                </span>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 40px 0;" align="center">
                <h1 style="margin:0;font-family:${FONT_DISPLAY};font-weight:800;font-size:30px;line-height:1.1;letter-spacing:-0.01em;text-transform:uppercase;color:${BRAND_NAVY};text-align:center;">
                  ${copy.heading}
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 40px 32px;" align="center">
                <p style="margin:0;font-size:16px;line-height:1.6;color:${BRAND_INK_SOFT};text-align:center;">
                  ${copy.body}
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:0 40px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:12px;background-color:${BRAND_RED};">
                      <a
                        href="${siteUrl}"
                        style="display:inline-block;padding:16px 32px;font-family:${FONT_DISPLAY};font-weight:800;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;color:#ffffff;text-decoration:none;"
                      >
                        ${copy.cta}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-top:1px dashed ${BRAND_BORDER};font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 40px 32px;" align="center">
                <p style="margin:0 0 4px;font-family:${FONT_DISPLAY};font-weight:800;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND_NAVY};">
                  El cambio es lo único seguro
                </p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:${BRAND_INK_SOFT};">
                  Recibiste este mail porque te anotaste en BLAZEK. Si no fuiste vos, ignoralo.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}
