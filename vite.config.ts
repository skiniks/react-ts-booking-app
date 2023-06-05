import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { transformerDirectives } from 'unocss'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        'react',
        {
          imports: ['React'],
          from: 'react',
        },
        {
          imports: ['createClient'],
          from: '@supabase/supabase-js',
        },
        {
          imports: ['Appointment'],
          from: './src/types/Appointment',
          type: true,
        },
      ],
      dirs: [
        './src/components',
        './src/hooks',
        './src/services',
      ],
      dts: './src/@types/auto-imports.d.ts',
    }),
    react(),
    UnoCSS({ transformers: [transformerDirectives()] })],

  optimizeDeps: {
    include: ['@supabase/supabase-js'],
  },
})
