import webpack from 'webpack';
import path from 'path';

export default function generateWebpackConfig() {
  const root = path.join(__dirname, '../..');

  const alias = {
    __PROJECT__: process.cwd(),
  };
  const projectRequire = path.join(__dirname, '../../app/projectRequire');
  alias[projectRequire] = './app/projectRequireWebpack';
    // './app/projectRequire': './app/projectRequireWebpack'

  return {
    resolve: {
      root: path.join(root, 'node_modules/'),
      alias: alias
    },

    resolveLoader: {
      modulesDirectories: [path.join(root, 'node_modules/')]
    },

    entry: {
      app: path.join(root, './app/entry.js'),
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
