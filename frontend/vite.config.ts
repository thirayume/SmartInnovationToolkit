import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync('../certificates/localhost-key.pem'),
      cert: fs.readFileSync('../certificates/localhost.pem'),
    },
    proxy: {
      '/api': {
        target: 'https://localhost:8000',
        secure: true,
        changeOrigin: true
      }
    }
  }
});