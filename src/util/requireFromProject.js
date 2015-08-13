import {join as pathJoin} from 'path';

export default function requireFromProject(path) {
  const cwd = process.cwd();
  return require(pathJoin(cwd, path));
}
