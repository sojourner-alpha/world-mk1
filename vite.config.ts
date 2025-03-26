import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Increase the warning limit for large chunks
    chunkSizeWarningLimit: 1200,
    // Disable CSS minification to avoid errors with keyframes syntax
    cssMinify: false
  }
})
