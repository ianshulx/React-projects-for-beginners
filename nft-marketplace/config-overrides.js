// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config) {
  // Disable source map warnings for node_modules
  config.module.rules = (config.module.rules || []).map((rule) => {
    if (rule.loader && rule.loader.includes('source-map-loader')) {
      rule.exclude = [/node_modules/]; // Exclude source maps from node_modules
    }
    return rule;
  });

  config.resolve = {
    ...config.resolve,
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      url: require.resolve('url'),
      process: require.resolve('process/browser.js'), // Specify the extension explicitly
      fs: false, // Set fs to false as it is not available in the browser
    },
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Explicitly specify the extension here
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
