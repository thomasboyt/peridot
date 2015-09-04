/*
 * Custom webpack config that gets merged into default nite-flights config
 */

import webpack from 'webpack';

export default function generateConfig(optimize) {
  let cssLoaderString = 'css-loader';

  if (optimize) {
    cssLoaderString = 'css-loader?minimize=1';
  }

  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: `style-loader!${cssLoaderString}`
        }
      ]
    }
  };
}
