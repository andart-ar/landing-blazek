// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      RESEND_AUDIENCE_ID: envField.string({ context: 'server', access: 'secret' }),
      RESEND_FROM_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret' }),
      PUBLIC_SITE_URL: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public' }),
    },
  },
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
});
