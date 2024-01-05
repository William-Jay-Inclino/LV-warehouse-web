import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  base: process.env.VITE_BASE_URL || '/',
  plugins: [vue()],
  server: {
    host: true,
  // @ts-ignore
    port: process.env.VITE_PORT,
    proxy: {
      // @ts-ignore
      "/api": { target: process.env.VITE_PROXY, secure: false, changeOrigin: true },
    },
},
})
