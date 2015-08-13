import webpack from 'webpack';
import path from 'path';

export default function generateWebpackConfig() {
  const root = path.join(__dirname, '../..');

  return {
    resolve: {
      root: root,
      alias: {
        __PROJECT__: process.cwd()
      }
    },

    resolveLoader: {
      modulesDirectories: [path.join(root, 'node_modules/')]
    },

    entry: {
      post: path.join(root, './frontend/pages/post.js'),
      list: path.join(root, './frontend/pages/list.js'),
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
}