import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css:{
    postcss:'./postcss.config.cjs',
  },
  server: {
    host: true, // Permitir que el servidor sea accesible externamente
    port: 5173, // Asegúrate de que el puerto esté disponible
    hmr: {
      protocol: 'ws', // Cambia a 'wss' si usas HTTPS
      host: 'frontend.local', // Configura esto para que coincida con tu nombre de host
      port: 5173, // Puerto para la conexión HMR
    },
  },
})
