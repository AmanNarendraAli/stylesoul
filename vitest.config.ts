import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
      "server-only": fileURLToPath(
        new URL("./tests/shims/server-only.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
    clearMocks: true,
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
