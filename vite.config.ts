import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/tic-tac-toe-test/",
  plugins: [react()],
  server: {
    open: true,
    port: 5000,
  },
});
