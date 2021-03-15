import { resolve } from 'path';
import withPreact from '@preact/preset-vite';

export default withPreact({
  resolve: {
    alias: {
      __: resolve(__dirname, './src'),
    },
  },
});
