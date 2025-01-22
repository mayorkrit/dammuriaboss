import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // Здесь можно подключать общий файл с переменными, миксинами и т.д.
        // additionalData: `@import "./src/styles/_variables.scss";`
      }
    }
  }
})
