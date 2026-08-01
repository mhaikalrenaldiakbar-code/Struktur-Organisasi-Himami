import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relatif './' bekerja sempurna baik di Vercel, GitHub Pages, maupun Local
  base: "./",
});
