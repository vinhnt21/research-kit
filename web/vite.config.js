import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Absolute asset URLs so /docs and /roadmap never resolve scripts relatively.
  base: '/',
  define: {
    __APP_BUILD_TIME__: JSON.stringify(Date.now()),
  },
  build: {
    // Keep hashed filenames; new content after cache-poison fixes must bust
    // browsers that cached SPA HTML under an old /assets/*.js URL.
    assetsDir: 'assets',
  },
})
