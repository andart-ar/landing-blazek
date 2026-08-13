const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_CLIENTS = 10_000;

const requestTimestampsByClient = new Map<string, number[]>();

function pruneExpiredClients(now: number) {
  for (const [client, timestamps] of requestTimestampsByClient) {
    if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
      requestTimestampsByClient.delete(client);
    }
  }
}

export function isRateLimited(clientId: string): boolean {
  const now = Date.now();

  if (requestTimestampsByClient.size > MAX_TRACKED_CLIENTS) {
    pruneExpiredClients(now);
  }

  const previous = requestTimestampsByClient.get(clientId) ?? [];
  const withinWindow = previous.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (withinWindow.length >= MAX_REQUESTS_PER_WINDOW) {
    requestTimestampsByClient.set(clientId, withinWindow);
    return true;
  }

  withinWindow.push(now);
  requestTimestampsByClient.set(clientId, withinWindow);
  return false;
}

export function getClientIp(request: Request): string | undefined {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || undefined;
}

export function getClientId(request: Request): string {
  return getClientIp(request) ?? 'unknown';
}
