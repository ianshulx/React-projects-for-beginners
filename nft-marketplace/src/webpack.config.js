// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
  },
  // Other Webpack configurations...
};
