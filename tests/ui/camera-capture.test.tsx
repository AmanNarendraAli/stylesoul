import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mediaPipe = vi.hoisted(() => ({
  forVisionTasks: vi.fn(),
  createFromOptions: vi.fn(),
}));

vi.mock("@mediapipe/tasks-vision", () => ({
  FilesetResolver: { forVisionTasks: mediaPipe.forVisionTasks },
  FaceLandmarker: { createFromOptions: mediaPipe.createFromOptions },
}));

import { CameraCapture } from "@/components/onboarding/CameraCapture";

let tracks: { stop: ReturnType<typeof vi.fn> }[];
let getUserMedia: ReturnType<typeof vi.fn>;
const props = {
  onCapture: vi.fn(),
  onClose: vi.fn(),
  onPickManually: vi.fn(),
};

beforeEach(() => {
  // Landmarker unavailable: the camera still works, without live guidance.
  mediaPipe.forVisionTasks.mockRejectedValue(new Error("WASM unavailable"));
  tracks = [{ stop: vi.fn() }, { stop: vi.fn() }];
  getUserMedia = vi.fn().mockResolvedValue({ getTracks: () => tracks });
  vi.stubGlobal("navigator", { ...navigator, mediaDevices: { getUserMedia } });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

async function startCamera() {
  render(<CameraCapture {...props} />);
  fireEvent.click(screen.getByRole("button", { name: "Start camera" }));
  await screen.findByLabelText("Camera preview");
  await waitFor(() =>
    expect(
      screen.getByRole<HTMLButtonElement>("button", { name: "Take photo" }).disabled,
    ).toBe(false),
  );
}

describe("camera capture", () => {
  it("shows tips first, then requests the user-facing camera", async () => {
    render(<CameraCapture {...props} />);
    expect(document.activeElement).toBe(screen.getByRole("dialog"));
    expect(screen.getAllByRole("listitem").map((tip) => tip.textContent)).toEqual([
      "Face a window",
      "Glasses off",
      "Hair off your face",
      "Phone at eye level",
    ]);
    expect(screen.getByText(/when the oval turns gold/)).toBeTruthy();
    expect(getUserMedia).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Start camera" }));

    await screen.findByLabelText("Camera preview");
    expect(getUserMedia).toHaveBeenCalledWith({
      video: expect.objectContaining({ facingMode: "user" }),
      audio: false,
    });
  });

  it("stops every track on Escape", async () => {
    await startCamera();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(props.onClose).toHaveBeenCalled();
    for (const track of tracks) expect(track.stop).toHaveBeenCalled();
  });

  it("stops every track when closed with the button", async () => {
    await startCamera();
    fireEvent.click(screen.getByRole("button", { name: "Close camera" }));
    expect(props.onClose).toHaveBeenCalled();
    for (const track of tracks) expect(track.stop).toHaveBeenCalled();
  });

  it("stops every track on unmount", async () => {
    await startCamera();
    cleanup();
    for (const track of tracks) expect(track.stop).toHaveBeenCalled();
  });

  it("offers the manual swatches when camera permission is denied", async () => {
    getUserMedia.mockRejectedValue(new DOMException("denied", "NotAllowedError"));
    render(<CameraCapture {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "Start camera" }));

    expect((await screen.findByRole("alert")).textContent).toMatch(/blocked/);
    fireEvent.click(screen.getByRole("button", { name: "Pick your colours instead" }));
    expect(props.onPickManually).toHaveBeenCalled();
  });

  it("captures a JPEG file manually without live guidance and stops the camera", async () => {
    const drawImage = vi.fn();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => ({ drawImage }) as unknown as CanvasRenderingContext2D,
    );
    vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation((callback) =>
      callback(new Blob(["jpeg"], { type: "image/jpeg" })),
    );
    await startCamera();
    const video = screen.getByLabelText("Camera preview");
    Object.defineProperty(video, "videoWidth", { value: 1280 });
    Object.defineProperty(video, "videoHeight", { value: 960 });

    fireEvent.click(screen.getByRole("button", { name: "Take photo" }));

    expect(drawImage).toHaveBeenCalledWith(video, 0, 0);
    expect(props.onCapture).toHaveBeenCalledWith(expect.any(File));
    expect((props.onCapture.mock.calls[0][0] as File).type).toBe("image/jpeg");
    for (const track of tracks) expect(track.stop).toHaveBeenCalled();
  });
});
