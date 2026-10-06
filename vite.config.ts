import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const pages = [
  "index.html",
  "kwikkart-project/index.html",
  "soar-playbooks-project/index.html",
  "ueba-project/index.html",
  "figma-initiative/index.html",
  "qradar-ngsiem-project/index.html",
];

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: pages.map((page) => resolve(import.meta.dirname, page)),
    },
  },
});
