import { InlineConfig, UserConfig, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { compression } from "vite-plugin-compression2";
import Sitemap from "vite-plugin-sitemap";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}
// https://vitejs.dev/config/
export default defineConfig({
  server: { https: {} },
  plugins: [
    react(),
    Sitemap({
      hostname: "https://dokbaro.com/",
      generateRobotsTxt: true,
      robots: [
        {
          userAgent: "*",
          disallow: ["/my/"],
        },
      ],
    }),
    mkcert(),
    compression({
      algorithm: "gzip",
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  css: { preprocessorOptions: { scss: { api: "modern" } } },
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
