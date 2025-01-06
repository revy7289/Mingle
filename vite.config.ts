import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // '@'는 'src' 폴더를 가리킴
    },
  },
  server: {
    proxy: {
      "/proxy": {
        target: "https://www.chakra-ui.com/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
    },
  },
});
