// @vitest-environment node
import { describe, expect, it } from "vitest";
import { safeNextPath, signInPath } from "@/lib/auth-redirect";

describe("post-sign-in return path", () => {
  it("accepts same-origin relative paths", () => {
    expect(safeNextPath("/products")).toBe("/products");
    expect(safeNextPath("/onboarding/body?step=2#top")).toBe(
      "/onboarding/body?step=2#top",
    );
  });

  it.each([
    undefined,
    null,
    "",
    "products",
    "https://evil.example/",
    "javascript:alert(1)",
    "//evil.example/path",
    "/\\evil.example",
    "/\t/evil.example",
    "/\n/evil.example",
  ])("rejects %j", (value) => {
    expect(safeNextPath(value)).toBeNull();
  });

  it("only adds a validated next param to the sign-in URL", () => {
    expect(signInPath("/profile")).toBe("/signin?next=%2Fprofile");
    expect(signInPath("//evil.example")).toBe("/signin");
    expect(signInPath(null)).toBe("/signin");
  });
});
