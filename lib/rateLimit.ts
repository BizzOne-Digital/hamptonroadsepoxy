interface Bucket {
  timestamps: number[];
}

const store = new Map<string, Bucket>();

/**
 * Simple in-memory sliding-window rate limiter.
 * NOTE: resets on server restart / cold start and is per-instance only.
 * Good enough for basic abuse protection on a small contractor site.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number } {
  const now = Date.now();
  const bucket = store.get(key) ?? { timestamps: [] };

  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= limit) {
    store.set(key, bucket);
    return { success: false, remaining: 0 };
  }

  bucket.timestamps.push(now);
  store.set(key, bucket);
  return { success: true, remaining: limit - bucket.timestamps.length };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
