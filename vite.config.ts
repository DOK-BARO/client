import { InlineConfig, UserConfig, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { compression } from "vite-plugin-compression2";
import { visualizer } from "rollup-plugin-visualizer";

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
      plugins: [
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      ],
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
