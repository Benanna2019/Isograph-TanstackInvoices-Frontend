import path from 'path';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
    }),
    tanstackRouter(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@iso': path.resolve(__dirname, './src/components/__isograph/iso.ts'),
    },
  },
  optimizeDeps: {
    include: ['@isograph/react'],
  },
});
