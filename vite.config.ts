import { InlineConfig, UserConfig, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { compression } from "vite-plugin-compression2";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}
// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [
    react(),
    mkcert(),
    compression({
      algorithm: "gzip",
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "jotai", "@tanstack/react-query"],
          reactRouter: ["react-router-dom"],
          animations: ["lottie-react", "lottie-web"],
        },
      },
    },
  },
} as VitestConfigExport);
