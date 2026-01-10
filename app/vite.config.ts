import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import webfontDownload from "vite-plugin-webfont-dl";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    webfontDownload(
      "https://fonts.googleapis.com/css2?family=Domine:wght@400..700&display=swap"
    ),
  ],
});
