import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import requireFromProject from '../util/requireFromProject';

export default function generateWebpackConfig() {
  const root = path.join(__dirname, '../..');

  const customConfig = requireFromProject('./webpack.config.js');

  const defaultConfig = {
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

      // See app/projectRequire.js
      new webpack.DefinePlugin({
        __PROJECT__: JSON.stringify(process.cwd())
      }),

      // Globalize singleton deps
      // See src/injectGlobals.js
      new webpack.ProvidePlugin({
        'React': 'react',
        'DocumentTitle': 'react-document-title'
      }),

      // TODO: Move this to project-specific config after
      // https://github.com/thomasboyt/nite-flights/issues/18
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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

  return merge(defaultConfig, customConfig);
}
