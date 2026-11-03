import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react],

  server: {
    host: "0.0.0.0",
    allowedHosts: true,

    proxy: {
      "/products": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
});
