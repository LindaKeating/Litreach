import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA( { 
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'],
        sourcemap: true,
        runtimeCaching: [{
          handler: 'NetworkOnly',
          urlPattern: /^https:\/\/litreach.ie/,
          method: 'GET',
          options: {
            backgroundSync: {
              name: 'LitreachCaching',
              options: {
                maxRetentionTime: 24 * 60
              }
            }
          }
        }]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Litreach',
        short_name: 'Cluiche Litrithe',
        start_url: "/",
        display: "standalone",
        lang: "ga",
        description: 'Cluiche litrithe ina mbíonn ar an imreoir 5 fhocal a litriú gach lá. Cluintear na focail a rá sna 3 canúintí agus bíonn 5 iarracht agat an focal a litriú i gceart.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            "purpose": "any maskable"
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            "purpose": "any"
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        dir: "ltr",
        orientation: "portrait",
        display_override: [
          "standalone"
        ],
        categories: [
          "education",
          "games"
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
})
