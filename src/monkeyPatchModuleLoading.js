/*
 * Adapted from https://github.com/patrick-steele-idem/app-module-path-node
 *
 * This ludicrous monkey-patch allows project-local modules to import dependencies from
 * nite-flights.
 *
 * This ensures everything uses the same dependencies for React (required for various context
 * things), react-document-title (required for `DocumentTitle.rewind()` to work in page building),
 * and react-router (not required but at least keeps conflicting versions from existing).
 */

import path from 'path';
import {Module} from 'module';

const prevNodeModulePaths = Module._nodeModulePaths;

const appModules = path.join(__dirname, '../node_modules');

Module._nodeModulePaths = function(from) {
  const paths = prevNodeModulePaths.call(this, from);

  // If we're in project CWD
  if (from.indexOf(process.cwd()) !== -1) {
    // Use cli-app paths, first in order ensuring they take priority
    // (priority is important because React is probably installed in local project bc peer dep :<)
    return [appModules].concat(paths);
  }

  return paths;
};
