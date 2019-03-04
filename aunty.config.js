const path = require('path');

module.exports = {
  type: 'react',
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'dist'),
    https: false
  },
  serve: {
    hot: false
  }
};
