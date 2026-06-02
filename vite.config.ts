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
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined
          if (id.includes("/three/")) return "three"
          if (id.includes("/gsap/") || id.includes("/@gsap/")) return "gsap"
          if (id.includes("/framer-motion/") || id.includes("/motion-")) return "motion"
          if (id.includes("/react/") || id.includes("/react-dom/")) return "react-vendor"
          return undefined
        },
      },
    },
    // These libs are large but intentional; silence the size warning noise.
    chunkSizeWarningLimit: 1200,
  },
}))
