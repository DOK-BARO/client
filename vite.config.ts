import { InlineConfig, UserConfig, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}
// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [react(), mkcert()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  css: { preprocessorOptions: { scss: { api: "modern" } } },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
} as VitestConfigExport);
