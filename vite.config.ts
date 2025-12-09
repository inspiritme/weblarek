import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          './src/scss'
        ],
      },
    },
  },
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, './src/types/index.ts'),
      '@models': path.resolve(__dirname, './src/components/Models'),
      '@services': path.resolve(__dirname, './src/components/services'),
      '@base': path.resolve(__dirname, './src/components/base'),
      '@classes': path.resolve(__dirname, './src/classes'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
})