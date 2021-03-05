import prefresh from '@prefresh/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [prefresh()],
  esbuild: {
    jsxInject: `import React from 'react';`,
    minify: true,
  },
  resolve: {
    alias: {
      __: resolve(__dirname, './src'),
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
});
