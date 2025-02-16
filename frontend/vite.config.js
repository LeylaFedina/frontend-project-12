import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5001',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'ws://0.0.0.0:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
