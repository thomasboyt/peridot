import path from 'path';
import {statSync, readFileSync, writeFileSync} from 'fs';
import {sync as mkdirpSync} from 'mkdirp';

import {Promise} from 'es6-promise';
import recursive from 'recursive-readdir';

const templateDir = path.join(__dirname, '../../template');

function getTemplateFiles() {
  return new Promise((resolve, reject) => {
    recursive(templateDir, function(err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function exists(path) {
  try {
    statSync(path)
    return true;
  } catch(err) {
    if (err.code === 'ENOENT') {
      return false;
    }

    throw err;
  }
}

export default async function(outPath, options) {
  if (!options.force) {
    if (exists(outPath)) {
      console.log(`Destination ${outPath} already exists; refusing to build.`);
      console.log('Use --force to override.');
      return;
    }
  }

  // Read template files
  const files = await getTemplateFiles();

  files.forEach((file) => {
    const content = readFileSync(file, {encoding: 'utf-8'});

    const relPath = path.relative(templateDir, file);
    const dirname = path.dirname(relPath);

    let basename = path.basename(relPath);

    // TODO: would be nice to have a real convention for this
    if (basename === 'gitignore') {
      basename = '.gitignore';
    } else if (basename === 'eslintrc') {
      basename = '.eslintrc';
    }

    const dirOutPath = path.join(process.cwd(), outPath, dirname);
    const fileOutPath = path.join(dirOutPath, basename);

    mkdirpSync(dirOutPath);

    writeFileSync(fileOutPath, content, {encoding: 'utf-8'});
  });

  // TODO: Run NPM install
  // TODO: copy _private.example.yml to _private.yml
}
