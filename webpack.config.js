var webpack = require('webpack');

module.exports = {
  entry: {
    post: './frontend/pages/post.js',
    list: './frontend/pages/list.js',
    vendor: [
      'react'
    ]
  },

  output: {
    path: '_site/js/',
    filename: '[name].bundle.js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ],

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules\/)/,
        loader: 'babel-loader',
        query: {
          'optional': ['es7.asyncFunctions', 'runtime']
        }
      }
    ]
  }
};
