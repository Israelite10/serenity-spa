/**
 * Minimal in-memory sliding-window rate limiter, keyed by IP.
 * Fine for a single Vercel instance / low traffic. For production at scale,
 * swap this for Upstash Redis (@upstash/ratelimit) which works across
 * serverless invocations.
 */
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return { allowed: false, remaining: 0 };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { allowed: true, remaining: MAX_REQUESTS - timestamps.length };
}
