// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync('../certificates/localhost-key.pem'),
      cert: fs.readFileSync('../certificates/localhost.pem'),
    },
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
        secure: false, // Since we're using self-signed cert in development
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        serviceWorker: path.resolve(__dirname, 'public/serviceWorker.js')
      }
    }
  }
})