import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mediaPipe = vi.hoisted(() => ({
  forVisionTasks: vi.fn(),
  createFromOptions: vi.fn(),
}));

vi.mock("@mediapipe/tasks-vision", () => ({
  FilesetResolver: { forVisionTasks: mediaPipe.forVisionTasks },
  FaceLandmarker: { createFromOptions: mediaPipe.createFromOptions },
}));

import { detectFromPhoto } from "@/components/onboarding/colour-detection-client";

let landmarkerGate: PromiseWithResolvers<never>;
let fetchMock: ReturnType<typeof vi.fn>;
let createImageBitmapMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  landmarkerGate = Promise.withResolvers<never>();
  mediaPipe.forVisionTasks.mockReturnValue(landmarkerGate.promise);
  createImageBitmapMock = vi
    .fn()
    .mockResolvedValue({ width: 20, height: 20, close: vi.fn() });
  vi.stubGlobal("createImageBitmap", createImageBitmapMock);
  const context = {
    drawImage: vi.fn(),
    getImageData: vi.fn().mockReturnValue({
      width: 20,
      height: 20,
      data: new Uint8ClampedArray(20 * 20 * 4),
    }),
  };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    () => context as unknown as CanvasRenderingContext2D,
  );
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("photo fallback consent", () => {
  it("does not upload when consent is withdrawn during client initialization", async () => {
    let consented = true;
    const detection = detectFromPhoto(
      new File(["photo"], "portrait.jpg", { type: "image/jpeg" }),
      () => consented,
    );
    await vi.waitFor(() => expect(mediaPipe.forVisionTasks).toHaveBeenCalled());

    consented = false;
    landmarkerGate.reject(new Error("WASM unavailable"));

    await expect(detection).resolves.toMatchObject({
      ok: false,
      kind: "fallback",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("re-checks consent after fallback decoding and before the pixel POST", async () => {
    let consented = true;
    const fallbackDecode = Promise.withResolvers<ImageBitmap>();
    const bitmap = {
      width: 20,
      height: 20,
      close: vi.fn(),
    } as unknown as ImageBitmap;
    createImageBitmapMock
      .mockReset()
      .mockResolvedValueOnce(bitmap)
      .mockReturnValueOnce(fallbackDecode.promise);
    const detection = detectFromPhoto(
      new File(["photo"], "portrait.jpg", { type: "image/jpeg" }),
      () => consented,
    );
    await vi.waitFor(() => expect(mediaPipe.forVisionTasks).toHaveBeenCalled());
    landmarkerGate.reject(new Error("WASM unavailable"));
    await vi.waitFor(() =>
      expect(createImageBitmapMock).toHaveBeenCalledTimes(2),
    );

    consented = false;
    fallbackDecode.resolve(bitmap);

    await expect(detection).resolves.toMatchObject({
      ok: false,
      kind: "fallback",
      message: expect.stringContaining("consent is off"),
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("honours consent granted before fallback is actually needed", async () => {
    let consented = false;
    fetchMock.mockResolvedValue(new Response(null, { status: 503 }));
    const detection = detectFromPhoto(
      new File(["photo"], "portrait.jpg", { type: "image/jpeg" }),
      () => consented,
    );
    await vi.waitFor(() => expect(mediaPipe.forVisionTasks).toHaveBeenCalled());

    consented = true;
    landmarkerGate.reject(new Error("WASM unavailable"));

    await expect(detection).resolves.toMatchObject({
      ok: false,
      kind: "fallback",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/analysis",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
