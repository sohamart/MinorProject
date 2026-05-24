import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import fs from 'fs'

import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // ✅ PWA
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Class Routine',
        short_name: 'Routine',
        description: 'Class Routine App',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',

        icons: [
          {
            src: '/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),

    // ✅ redirects fix
    {
      name: 'copy-redirects',
      closeBundle() {
        fs.copyFileSync(
          resolve(__dirname, 'public/_redirects'),
          resolve(__dirname, 'dist/_redirects')
        )
      }
    }
  ],

  server: {
    host: true
  }
})