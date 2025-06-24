import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'Avion.png'],
  strategies: 'generateSW',
  manifest: {
    name: 'AvionesApp - Búsqueda de Vuelos y Hoteles',
    short_name: 'AvionesApp',
    description: 'Aplicación para buscar y reservar vuelos y hoteles',
    theme_color: '#1976d2',
    background_color: '#ffffff',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      {
        src: 'Avion.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'Avion.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.travelpayouts\.com\//,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24
          }
        }
      },
      {
        urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 60 * 60 * 24 * 30
          }
        }
      }
    ]
  },
  devOptions: {
    enabled: true,
    navigateFallback: 'index.html'
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(manifestForPlugin)],
})
