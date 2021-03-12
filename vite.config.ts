import prefresh from '@prefresh/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [prefresh()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'preact'`,
  },
  resolve: {
    alias: {
      __: resolve(__dirname, './src'),
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
});
