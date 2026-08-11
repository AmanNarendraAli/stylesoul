const REDACTED = "[REDACTED]";
const EMAIL_REDACTED = "[REDACTED_EMAIL]";

const sensitiveKeys = new Set([
  "authorization",
  "cookie",
  "setcookie",
  "password",
  "token",
  "accesstoken",
  "refreshtoken",
  "pixels",
  "pixelbuffer",
  "measurements",
  "heightcm",
  "weightkg",
  "bustcm",
  "waistcm",
  "hipscm",
  "profile",
  "styleprofile",
  "shoulderscm",
  "skintone",
  "undertone",
  "eyecolour",
  "haircolour",
  "userid",
  "email",
]);

export function redactObservabilityData(value: unknown): unknown {
  return redact(value, new WeakSet<object>());
}

export function reportServerError(
  event: string,
  error: unknown,
  context: Record<string, unknown> = {},
) {
  const details = {
    event,
    error: { name: error instanceof Error ? error.name : "UnknownError" },
    context,
  };
  console.error("StyleSoul server error", redactObservabilityData(details));
}

function redact(value: unknown, seen: WeakSet<object>): unknown {
  if (typeof value === "string") return redactString(value);
  if (value === null || typeof value !== "object") return value;
  if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) return REDACTED;
  if (seen.has(value)) return "[CIRCULAR]";
  seen.add(value);

  if (Array.isArray(value)) {
    return value.map((item) => redact(item, seen));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      isSensitiveKey(key) ? REDACTED : redact(item, seen),
    ]),
  );
}

function isSensitiveKey(key: string) {
  const normalized = key.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
  return sensitiveKeys.has(normalized) || normalized.endsWith("token");
}

function redactString(value: string) {
  return value
    .replace(/Bearer\s+[^\s,;]+/gi, `Bearer ${REDACTED}`)
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, EMAIL_REDACTED)
    .replace(/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, REDACTED);
}
