/**
 * Vercel Edge & Origin CDN Caching Utilities
 *
 * Directs Vercel's global edge network (and downstream CDNs / browsers)
 * to cache responses at the edge. Stale-while-revalidate ensures incoming
 * concurrent users receive instantaneous 10ms responses directly from CDN edge
 * memory without hitting serverless origin Lambdas or MongoDB Atlas connections.
 */

export interface CacheOptions {
  /** Edge TTL in seconds (default: 60s) */
  sMaxAge?: number;
  /** Stale-while-revalidate window in seconds (default: 300s) */
  staleWhileRevalidate?: number;
  /** Browser client max-age in seconds (default: 10s) */
  maxAge?: number;
}

/**
 * Returns response headers optimized for Vercel Edge CDN caching.
 */
export function cdnCacheHeaders(options: CacheOptions = {}): Record<string, string> {
  const { sMaxAge = 60, staleWhileRevalidate = 300, maxAge = 10 } = options;
  const cacheValue = `public, max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`;

  return {
    "Cache-Control": cacheValue,
    "CDN-Cache-Control": `public, s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
    "Vercel-CDN-Cache-Control": `public, s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
  };
}

/**
 * Returns response headers that strictly bypass caching (for Admin sessions & mutations).
 */
export function noStoreHeaders(): Record<string, string> {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };
}

