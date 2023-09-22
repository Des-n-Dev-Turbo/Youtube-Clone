import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve('src/components'),
      '@screens': path.resolve('src/screens'),
      '@store': path.resolve('src/store'),
      '@routes': path.resolve('src/routes'),
      '@axios': path.resolve('src/axios'),
    },
  },
});
