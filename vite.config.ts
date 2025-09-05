import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: "facturacion",
  plugins: [react()],
  resolve: {
    alias: {
      "#components": path.resolve(__dirname, "src/components"),
      "#hooks": path.resolve(__dirname, "src/hooks"),
      "#utils": path.resolve(__dirname, "src/utils"),
      "#contracts": path.resolve(__dirname, "src/contracts"),
      "#assets": path.resolve(__dirname, "src/assets"),
      "#layaouts": path.resolve(__dirname,"src/layouts")
    },
  },
})
