import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Relative base for GitHub Pages, Vercel, and custom domain deployment
  server: {
    port: 3000,
    open: false
  }
});
