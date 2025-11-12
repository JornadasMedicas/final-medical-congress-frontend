import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteImagemin from 'vite-plugin-imagemin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      webp: {
        quality: 50
      },
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 100,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      }
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    outDir: 'docs',
    target: ['es2019', 'safari13']
  },
  /* base: "/final-medical-congress-frontend" */ //route base for github pages without domain
  base: "/",
})
