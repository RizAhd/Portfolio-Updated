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
}))
