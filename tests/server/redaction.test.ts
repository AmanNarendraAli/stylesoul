// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  redactObservabilityData,
  reportServerError,
} from "@/lib/observability/redact";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("observability redaction", () => {
  it("redacts profile fields, pixels, emails, cookies, and tokens recursively", () => {
    const result = redactObservabilityData({
      email: "person@example.com",
      userId: "00000000-0000-4000-8000-000000000001",
      profile: { heightCm: 170, waistCm: 65, bodyShape: "hourglass" },
      request: {
        pixels: [1, 2, 3, 255],
        data: new Uint8ClampedArray([1, 2, 3, 255]),
        authorization: "Bearer secret-token",
        note: "Contact person@example.com with Bearer another-secret",
      },
      refresh_token: "secret",
    });

    expect(result).toEqual({
      email: "[REDACTED]",
      userId: "[REDACTED]",
      profile: "[REDACTED]",
      request: {
        pixels: "[REDACTED]",
        data: "[REDACTED]",
        authorization: "[REDACTED]",
        note: "Contact [REDACTED_EMAIL] with Bearer [REDACTED]",
      },
      refresh_token: "[REDACTED]",
    });
  });

  it("logs only redacted error context", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    reportServerError(
      "test_failure",
      new Error(
        "waistCm=65 pixels=[1,2,3,255] cookie=session-secret refresh_token=opaque-secret person@example.com",
      ),
      {
        pixels: [1, 2, 3, 255],
        cookie: "session-secret",
      },
    );

    expect(consoleError).toHaveBeenCalledOnce();
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain(
      "person@example.com",
    );
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain(
      "session-secret",
    );
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain(
      "1,2,3,255",
    );
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain("waistCm=65");
    expect(JSON.stringify(consoleError.mock.calls[0])).not.toContain("opaque-secret");
  });
});
