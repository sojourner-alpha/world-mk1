import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to backend during development
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // The homepage will be deployed to GitHub Pages
  // Use '/world-mk1/' for GitHub Pages without custom domain, '/' for custom domain
  base: command === 'build' ? '/world-mk1/' : '/',
  build: {
    // Increase the warning limit for large chunks
    chunkSizeWarningLimit: 1200,
    // Disable CSS minification to avoid errors with keyframes syntax
    cssMinify: false
  }
}))
