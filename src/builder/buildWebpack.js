import webpack from 'webpack';
import generateWebpackConfig from './generateWebpackConfig';

const compiler = webpack(generateWebpackConfig());


// TODO: This currently just returns immediately since I need to promiseify webpack to make it awaitable
export default async function buildWebpack() {
  console.log('Building frontend assets...');

  compiler.run((err, stats) => {
    console.log('* Built with webpack!');

    if (err) {
      console.log('*** Webpack fatal error:');
      console.log(err);
    }

    const jsonStats = stats.toJson();

    if (jsonStats.errors.length > 0) {
      console.log('*** Webpack errors:');
      jsonStats.errors.map((err) => {
        console.log(err);
        console.log('');
      });
    }
    if (jsonStats.warnings.length > 0) {
      console.log('*** Webpack warnings:');
      jsonStats.warnings.map((err) => {
        console.log(err);
        console.log('');
      });
    }
  });
}


