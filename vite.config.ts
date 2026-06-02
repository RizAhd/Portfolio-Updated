import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
// `base` must match the GitHub Pages sub-path. The site is served from
// https://rizahd.github.io/Portfolio-Updated/, so production assets need the
// "/Portfolio-Updated/" prefix. Dev server stays at root ("/").
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Portfolio-Updated/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Split heavy libraries into their own long-lived, cacheable chunks so the
    // initial parse is smaller and updates to app code don't bust vendor cache.
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap", "@gsap/react"],
          motion: ["framer-motion"],
          "react-vendor": ["react", "react-dom"],
        },
      },
    },
    // These libs are large but intentional; silence the size warning noise.
    chunkSizeWarningLimit: 1200,
  },
}))
