import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
};
