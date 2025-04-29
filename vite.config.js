import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import alias from '@rollup/plugin-alias'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    alias({
      entries: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
        { find: '@pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
        { find: '@api', replacement: fileURLToPath(new URL('./src/api', import.meta.url)) },
        { find: '@hooks', replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)) },
        { find: '@contexts', replacement: fileURLToPath(new URL('./src/contexts', import.meta.url)) },
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@contexts': fileURLToPath(new URL('./src/contexts', import.meta.url))
    }
  }
})