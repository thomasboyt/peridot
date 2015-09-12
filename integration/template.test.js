/*eslint-env mocha */

import expect from 'expect';
import {spawnSync} from 'child_process';
import path from 'path';
import {sync as mkdirpSync} from 'mkdirp';
import {sync as rimrafSync} from 'rimraf';

import exists from '../src/util/exists';

/*
 * Really dumb integration test.
 *
 * 1. `peridot new temp-folder`
 * 2. `peridot build`
 * 3. exit code 0 = pass
 */

const peridotPath = path.join(__dirname, '../bin/peridot');

const projectPath = `${path.join(process.cwd(), 'temp/')}`;
describe('Peridot template', function() {
  this.timeout(0);

  it('can be created and built', () => {
    if (exists(projectPath)) {
      rimrafSync(projectPath);
    }

    mkdirpSync(projectPath);

    const newProc = spawnSync(peridotPath, ['new', projectPath, '--force', '--npm-install'], {
      stdio: ['ignore', process.stdout, process.stderr],
      encoding: 'utf-8'
    });
    expect(newProc.status).toEqual(0);

    const buildProc = spawnSync(peridotPath, ['build'], {
      cwd: projectPath,
      stdio: 'inherit',
      encoding: 'utf-8'
    });
    expect(buildProc.status).toEqual(0);
  });
});
