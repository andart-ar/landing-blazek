import { useEffect, useRef, type MutableRefObject } from 'react';
import { PUBLIC_TURNSTILE_SITE_KEY } from 'astro:env/client';

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | undefined;

function loadTurnstileScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Turnstile script failed to load'));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export interface TurnstileHandle {
  reset: () => void;
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
  handleRef: MutableRefObject<TurnstileHandle | null>;
}

export default function TurnstileWidget({ onVerify, onExpire, handleRef }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);

  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let widgetId: string | undefined;
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widgetId = window.turnstile.render(container, {
          sitekey: PUBLIC_TURNSTILE_SITE_KEY,
          callback: (token) => onVerifyRef.current(token),
          'expired-callback': () => onExpireRef.current(),
          'error-callback': () => onExpireRef.current(),
        });
        handleRef.current = {
          reset: () => {
            if (widgetId) window.turnstile?.reset(widgetId);
          },
        };
      })
      .catch(() => onExpireRef.current());

    return () => {
      cancelled = true;
      handleRef.current = null;
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, [handleRef]);

  return <div ref={containerRef} />;
}
