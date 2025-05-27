// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '127.0.0.1',   // жёстко биндимся на IPv4 loopback
    port: 5173,
    strictPort: true
  }
})
