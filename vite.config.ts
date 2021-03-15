import { resolve } from 'path';
import preactPlugin from '@preact/preset-vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [preactPlugin()],
  resolve: {
    alias: {
      __: resolve(__dirname, './src'),
    },
  },
});
