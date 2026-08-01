import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Otomatis '/' jika di Vercel, '/HIMAMI/' untuk GitHub Pages
  base: process.env.VERCEL ? "/" : "/HIMAMI/",
});
