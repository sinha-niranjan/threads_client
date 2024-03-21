import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,

    // Get rid of the cors error 
    proxy: {
      "/api": {
        target: "https://threads-server-sinha-niranjan.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
