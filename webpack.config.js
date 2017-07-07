var path = require('path');


module.exports = {
  entry: './amoeba.js',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
