var path = require('path');


module.exports = {
  entry: './amoebas_refactored/main.js',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
