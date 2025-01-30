import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false, // Adjust if needed
      },
    },
  },
  plugins: [react()],
  build: {
    sourcemap: true, // Ensure source maps are enabled
  },
})
