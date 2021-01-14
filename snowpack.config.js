/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-sass',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],

  optimize: {
    bundle: false,
    minify: true,
    preload: true,
    splitting: true,
    treeshake: true,
  },
  alias: {
    __: './src',
  },
};
