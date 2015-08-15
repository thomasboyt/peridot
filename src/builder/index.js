import buildFiles from './buildFiles';
import buildWebpack from './buildWebpack';

export default async function(options) {
  options = options || {};

  const builders = [buildFiles()];

  if (!options.skipWebpack) {
    builders.push(buildWebpack());
  }

  await* builders;
}
