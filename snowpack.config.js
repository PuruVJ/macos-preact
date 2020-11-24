/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-sass',
    [
      '@snowpack/plugin-optimize',
      {
        preloadModules: true,
        target: 'es2015',
      },
    ],
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    sourceMap: true,
    rollup: {},
  },
  devOptions: {},
  buildOptions: {
    clean: true,
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
