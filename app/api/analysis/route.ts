import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUserState } from "@/lib/server/auth";
import { consumeAnalysisRateLimit } from "@/lib/server/analysis-rate-limit";
import { AccountDeletedError } from "@/lib/server/account-lifecycle";
import { reportServerError } from "@/lib/observability/redact";
import {
  detectColouringHeuristic,
  type DetectedColouring,
} from "@/lib/colour-detection/detect";
import type { PixelSource } from "@/lib/colour-detection/regions";

/**
 * Self-hosted colour-detection fallback. Runs only when the client's in-browser
 * MediaPipe landmarking is unavailable. The client always decodes and
 * downscales the photo locally (canvas is universal); we receive a small RGBA
 * buffer and run the same pure Lab/ΔE pipeline server-side over heuristic
 * regions (no external vision API, no GCP dependency).
 *
 * Privacy/security baseline (WORKPLAN §4.8): the buffer is processed in memory
 * and never persisted; pixel data is never logged; payload size is capped.
 */
export const runtime = "nodejs";

// Matches the client's FALLBACK_MAX_EDGE (160px). 160×160 RGBA = 102,400 bytes.
const MAX_EDGE = 160;
const MAX_PIXEL_BYTES = MAX_EDGE * MAX_EDGE * 4;
const MAX_JSON_BYTES = 600_000;

type AnalysisRequest = {
  width: number;
  height: number;
  pixels: number[];
  consent: true;
};

type ReadBodyResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413; message: string };

export async function POST(request: NextRequest) {
  const auth = await getAuthenticatedUserState();
  if (!auth.available) {
    return NextResponse.json(
      { message: "Authentication unavailable" },
      { status: 503 },
    );
  }
  if (!auth.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let rateLimit: Awaited<ReturnType<typeof consumeAnalysisRateLimit>>;
  try {
    rateLimit = await consumeAnalysisRateLimit(auth.user.id);
  } catch (error) {
    if (error instanceof AccountDeletedError) {
      return NextResponse.json(
        { message: "Account deletion is in progress" },
        { status: 409 },
      );
    }
    throw error;
  }
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: "Too many photo analysis requests. Try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const contentLength = request.headers.get("content-length");
  if (
    contentLength !== null &&
    Number.parseInt(contentLength, 10) > MAX_JSON_BYTES
  ) {
    return NextResponse.json({ message: "Request body is too large" }, { status: 413 });
  }

  const body = await readJsonBody(request);
  if (!body.ok) {
    return NextResponse.json(
      { message: body.message },
      { status: body.status },
    );
  }

  const parsed = validate(body.value);
  if (!parsed.ok) {
    return NextResponse.json({ message: parsed.message }, { status: 400 });
  }

  let detection;
  try {
    detection = detectColouringHeuristic(toPixelSource(parsed.value));
  } catch (error) {
    reportServerError("analysis_detection_failed", error);
    return NextResponse.json(
      { message: "Photo detection is unavailable right now" },
      { status: 500 },
    );
  }
  if (!detection.ok) {
    return NextResponse.json(
      {
        message: detection.quality.message,
        reason: detection.quality.reason,
      },
      { status: 422 },
    );
  }

  return NextResponse.json({ detected: detection.detected, source: "photo" } satisfies {
    detected: DetectedColouring;
    source: "photo";
  });
}

async function readJsonBody(request: NextRequest): Promise<ReadBodyResult> {
  const reader = request.body?.getReader();
  if (!reader) {
    return { ok: false, status: 400, message: "Invalid JSON body" };
  }

  const decoder = new TextDecoder();
  let byteLength = 0;
  let json = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    byteLength += value.byteLength;
    if (byteLength > MAX_JSON_BYTES) {
      await reader.cancel();
      return {
        ok: false,
        status: 413,
        message: "Request body is too large",
      };
    }
    json += decoder.decode(value, { stream: true });
  }
  json += decoder.decode();

  try {
    return { ok: true, value: JSON.parse(json) as unknown };
  } catch {
    return { ok: false, status: 400, message: "Invalid JSON body" };
  }
}

function validate(
  body: unknown,
):
  | { ok: true; value: AnalysisRequest }
  | { ok: false; message: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, message: "Expected an object body" };
  }
  const { width, height, pixels, consent } = body as Record<string, unknown>;
  if (consent !== true) {
    return {
      ok: false,
      message: "Explicit consent is required for server photo analysis",
    };
  }

  if (!isPositiveInt(width) || !isPositiveInt(height)) {
    return { ok: false, message: "width and height must be positive integers" };
  }
  if (width > MAX_EDGE || height > MAX_EDGE) {
    return {
      ok: false,
      message: `Image too large; downscale to ${MAX_EDGE}px or less per edge`,
    };
  }
  if (!Array.isArray(pixels)) {
    return { ok: false, message: "pixels must be an array" };
  }
  if (pixels.length > MAX_PIXEL_BYTES) {
    return { ok: false, message: "pixel buffer exceeds the size limit" };
  }
  if (pixels.length !== width * height * 4) {
    return { ok: false, message: "pixel buffer length must equal width*height*4" };
  }
  if (!pixels.every(isByte)) {
    return { ok: false, message: "pixels must be byte values from 0 to 255" };
  }

  return {
    ok: true,
    value: { width, height, pixels: pixels as number[], consent: true },
  };
}

function toPixelSource({ width, height, pixels }: AnalysisRequest): PixelSource {
  return {
    width,
    height,
    getPixel: (x, y) => {
      const i = (y * width + x) * 4;
      return { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2] };
    },
  };
}

function isPositiveInt(n: unknown): n is number {
  return typeof n === "number" && Number.isInteger(n) && n > 0;
}

function isByte(n: unknown): n is number {
  return typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 255;
}
