import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import requireFromProject from '../util/requireFromProject';

export default function generateWebpackConfig(optimize) {
  const root = path.join(__dirname, '../..');

  const customConfig = requireFromProject('./webpack.config.js')(optimize);

  const nodeEnv = optimize ? 'production' : 'development';

  let defaultConfig = {
    resolve: {
      root: path.join(root, 'node_modules/')
    },

    resolveLoader: {
      modulesDirectories: [
        path.join(root, 'node_modules/'),
        path.join(process.cwd(), 'node_modules/')
      ]
    },

    entry: {
      app: path.join(root, './app/entry.js'),
      vendor: [
        'babel-runtime/regenerator',
        'react',
        'react-router',
        'react-redux',
        'redux-actions',
        'redux-promise-middleware',
        'react-document-title',
        'lodash',
        'whatwg-fetch'
      ]
    },

    output: {
      path: '_site/assets/',
      filename: '[name].bundle.js'
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),

      new webpack.DefinePlugin({
        // See app/projectRequire.js
        __PROJECT__: JSON.stringify(process.cwd()),

        'process.env': {
          NODE_ENV: JSON.stringify(nodeEnv)
        }
      }),
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

  if (optimize) {
    defaultConfig = merge(defaultConfig, {
      plugins: [
        new webpack.optimize.UglifyJsPlugin()
      ],
      devtool: null
    });
  }

  return merge(defaultConfig, customConfig);
}
