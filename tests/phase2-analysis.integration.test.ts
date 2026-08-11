// @vitest-environment node
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAuthenticatedUserState: vi.fn(),
  consumeAnalysisRateLimit: vi.fn(),
}));

vi.mock("@/lib/server/auth", () => ({
  getAuthenticatedUserState: mocks.getAuthenticatedUserState,
}));
vi.mock("@/lib/server/analysis-rate-limit", () => ({
  consumeAnalysisRateLimit: mocks.consumeAnalysisRateLimit,
}));
import { POST } from "@/app/api/analysis/route";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";
import { readFallbackResponse } from "@/components/onboarding/colour-detection-client";


beforeEach(() => {
  vi.clearAllMocks();
  mocks.getAuthenticatedUserState.mockResolvedValue({
    available: true,
    user: { id: "user-1" },
  });
  mocks.consumeAnalysisRateLimit.mockResolvedValue({
    allowed: true,
    remaining: 4,
    retryAfterSeconds: 60,
  });
});
const WIDTH = 20;
const HEIGHT = 20;

function solidPixels(red: number, green: number, blue: number) {
  return Array.from({ length: WIDTH * HEIGHT }, () => [red, green, blue, 255]).flat();
}

function analysisRequest(red: number, green: number, blue: number) {
  return new NextRequest("http://localhost/api/analysis", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      consent: true,
      width: WIDTH,
      height: HEIGHT,
      pixels: solidPixels(red, green, blue),
    }),
  });
}

describe("photo-analysis server fallback", () => {
  it("requires authentication before reading a pixel payload", async () => {
    mocks.getAuthenticatedUserState.mockResolvedValue({
      available: true,
      user: null,
    });

    const response = await POST(analysisRequest(197, 141, 102));

    expect(response.status).toBe(401);
    expect(mocks.consumeAnalysisRateLimit).not.toHaveBeenCalled();
  });

  it("requires explicit server-fallback consent", async () => {
    const request = new NextRequest("http://localhost/api/analysis", {
      method: "POST",
      body: JSON.stringify({
        width: 1,
        height: 1,
        pixels: [197, 141, 102, 255],
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Explicit consent is required for server photo analysis",
    });
  });

  it("rate limits an authenticated user before reading the body", async () => {
    mocks.consumeAnalysisRateLimit.mockResolvedValue({
      allowed: false,
      remaining: 0,
      retryAfterSeconds: 17,
    });

    const response = await POST(analysisRequest(197, 141, 102));

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("17");
  });

  it("rejects analysis after account deletion begins", async () => {
    mocks.consumeAnalysisRateLimit.mockRejectedValue(new AccountDeletedError());

    const response = await POST(analysisRequest(197, 141, 102));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      message: "Account deletion is in progress",
    });
  });
  it("returns an editable suggestion for a usable skin-like buffer", async () => {
    const response = await POST(analysisRequest(197, 141, 102));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.source).toBe("photo");
    expect(payload.detected.skinTone.value).toBe("medium");
    expect(payload.detected.skinTone.confidence).toBeGreaterThanOrEqual(0.45);
  });

  it.each([
    [0, 0, 0, "too_dark"],
    [255, 255, 255, "too_bright"],
  ])("rejects unusable brightness", async (red, green, blue, reason) => {
    const response = await POST(analysisRequest(red, green, blue));
    const payload = await response.json();

    expect(response.status).toBe(422);
    expect(payload.reason).toBe(reason);
  });

  it("rejects a colour that cannot be matched confidently", async () => {
    const response = await POST(analysisRequest(0, 90, 255));
    const payload = await response.json();

    expect(response.status).toBe(422);
    expect(payload.reason).toBe("low_confidence");
  });

  it("rejects dimensions and channel values outside the accepted payload", async () => {
    const oversizedDimensions = await POST(
      new NextRequest("http://localhost/api/analysis", {
        method: "POST",
        body: JSON.stringify({
          consent: true,
          width: 161,
          height: 1,
          pixels: Array.from({ length: 161 * 4 }, () => 0),
        }),
      }),
    );
    expect(oversizedDimensions.status).toBe(400);
    expect(await oversizedDimensions.json()).toEqual({
      message: "Image too large; downscale to 160px or less per edge",
    });

    const invalidByte = await POST(
      new NextRequest("http://localhost/api/analysis", {
        method: "POST",
        body: JSON.stringify({
          consent: true,
          width: 1,
          height: 1,
          pixels: [0, 0, 256, 255],
        }),
      }),
    );
    expect(invalidByte.status).toBe(400);
    expect(await invalidByte.json()).toEqual({
      message: "pixels must be byte values from 0 to 255",
    });
  });

  it("cancels a dishonest oversized stream despite a small Content-Length", async () => {
    let cancelled = false;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(" ".repeat(600_001)));
      },
      cancel() {
        cancelled = true;
      },
    });
    const init: RequestInit & { duplex: "half" } = {
      method: "POST",
      headers: {
        "content-length": "10",
        "content-type": "application/json",
      },
      body: stream,
      duplex: "half",
    };
    const request = new NextRequest(
      new Request("http://localhost/api/analysis", init),
    );

    const response = await POST(request);

    expect(response.status).toBe(413);
    expect(cancelled).toBe(true);
  });

  it("stops an oversized body even without Content-Length", async () => {
    const request = new NextRequest("http://localhost/api/analysis", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: " ".repeat(600_001),
    });
    expect(request.headers.get("content-length")).toBeNull();

    const response = await POST(request);

    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ message: "Request body is too large" });
  });
});

describe("photo-analysis client fallback", () => {
  it("preserves a server quality failure for the manual fallback UI", async () => {
    const outcome = await readFallbackResponse(
      Response.json(
        { message: "The photo is too dark.", reason: "too_dark" },
        { status: 422 },
      ),
    );

    expect(outcome).toEqual({
      ok: false,
      kind: "quality",
      message: "The photo is too dark.",
    });
  });

  it("returns detected values after a successful fallback", async () => {
    const detected = {
      skinTone: { value: "medium" as const, confidence: 0.9 },
    };
    const outcome = await readFallbackResponse(
      Response.json({ detected, source: "photo" }),
    );

    expect(outcome).toEqual({ ok: true, detected, source: "photo" });
  });

  it("uses a generic message for fallback infrastructure failures", async () => {
    const outcome = await readFallbackResponse(
      Response.json({ message: "Internal error" }, { status: 500 }),
    );

    expect(outcome).toEqual({
      ok: false,
      kind: "fallback",
      message: "Photo detection is unavailable right now.",
    });
  });
});
