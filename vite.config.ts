import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      eth: '/src/eth/index.ts',
      utils: '/src/utils',
    },
  },
  plugins: [react()],
})
