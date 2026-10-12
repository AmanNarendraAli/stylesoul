/** Request header the middleware sets to the current pathname. */
export const PATHNAME_HEADER = "x-stylesoul-pathname";

const PLACEHOLDER_ORIGIN = "http://stylesoul.invalid";

/**
 * Returns `value` as a same-origin relative path, or null. Rejects anything
 * that could leave the site: absolute URLs, protocol-relative `//host`, and
 * forms browsers normalise into them (`/\host`, embedded tabs/newlines).
 */
export function safeNextPath(value: unknown): string | null {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return null;
  }
  try {
    const url = new URL(value, PLACEHOLDER_ORIGIN);
    if (url.origin !== PLACEHOLDER_ORIGIN) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

/** Sign-in URL that returns the user to `next` afterwards, when it is safe. */
export function signInPath(next: unknown) {
  const path = safeNextPath(next);
  return path ? `/signin?next=${encodeURIComponent(path)}` : "/signin";
}
