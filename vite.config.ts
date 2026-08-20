import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  // الإعدادات الجديدة لمنع تكرار React وحل مشكلة الـ Swiper Hooks
  optimizeDeps: {
    include: ['react', 'react-dom', 'swiper', 'swiper/react', 'swiper/modules'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})