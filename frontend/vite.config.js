import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    
    // 👇 THIS IS THE FIX
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