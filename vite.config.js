import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:5173", // Use the correct HTTPS URL
        changeOrigin: true,
      },
    },
  },
});
