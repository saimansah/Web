import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "index.html"),
        notFound: resolve(projectRoot, "404.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/three/")) return "three-vendor";
        },
      },
    },
  },
});
