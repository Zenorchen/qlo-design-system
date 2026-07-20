import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig(({ command }) => ({
  // 只有正式 build（GitHub Pages 子路徑）用 /qlo-design-system/；本地 dev 維持根路徑 /
  base: command === "build" ? "/qlo-design-system/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@tokens": fileURLToPath(new URL("./src/tokens", import.meta.url)),
    },
  },
}));
