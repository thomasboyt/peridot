import buildFiles from './buildFiles';
import buildWebpack from './buildWebpack';

export default async function(options) {
  options = options || {};

  const builders = [];

  if (!options.skipPages) {
    builders.push(buildFiles());
  }

  if (!options.skipWebpack) {
    builders.push(buildWebpack(options));
  }

  await* builders;
}
