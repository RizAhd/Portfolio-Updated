import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {

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

    chunkSizeWarningLimit: 1200,
  },
})
