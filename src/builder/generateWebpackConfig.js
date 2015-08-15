import webpack from 'webpack';
import path from 'path';

export default function generateWebpackConfig() {
  const root = path.join(__dirname, '../..');

  return {
    resolve: {
      root: path.join(root, 'node_modules/')
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
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),

      // See app/projectRequire.js
      new webpack.DefinePlugin({
        __PROJECT__: JSON.stringify(process.cwd())
      })
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
