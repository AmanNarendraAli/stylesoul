import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FirstEditViewTracker } from "@/components/recommendations/FirstEditViewTracker";

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockImplementation(() =>
    Promise.resolve(new Response(null, { status: 204 })),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("mounted weekly-edit tracking", () => {
  it("records the first-edit view once on mount", async () => {
    render(
      <>
        <article>Test dress</article>
        <FirstEditViewTracker />
      </>,
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/funnel/first-edit",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("does not disrupt the rendered edit when tracking fails", async () => {
    fetchMock.mockRejectedValue(new Error("Network unavailable"));

    render(
      <>
        <article>Test dress</article>
        <FirstEditViewTracker />
      </>,
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Test dress")).toBeTruthy();
  });
});
