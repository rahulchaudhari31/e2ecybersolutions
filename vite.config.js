import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The three.js chunk is intentionally large but only fetched by the idle-loaded hero scene.
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler|react-helmet-async)[\\/]/,
              priority: 30,
            },
            {
              name: 'motion',
              test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/,
              priority: 20,
            },
            {
              name: 'motion-graphics',
              test: /node_modules[\\/](gsap|@gsap[\\/]react|lenis)[\\/]/,
              priority: 20,
            },
            {
              name: 'three',
              test: /node_modules[\\/](three|three-stdlib|maath|meshline|troika-three-text|@react-three[\\/](fiber|drei))[\\/]/,
              priority: 25,
            },
            {
              name: 'icons',
              test: /node_modules[\\/]lucide-react[\\/]/,
              priority: 20,
            },
          ],
        },
      },
    },
  },
})
