import path from 'path';
import {readFileSync, writeFileSync} from 'fs';
import {sync as mkdirpSync} from 'mkdirp';
import {execSync} from 'child_process';

import {Promise} from 'es6-promise';
import recursive from 'recursive-readdir';
import inquirer from 'inquirer';
import {copySync} from 'fs-extra';

import exists from '../../util/exists';

const templateDir = path.join(__dirname, '../../../template');

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

function showPrompt(...args) {
  return new Promise((resolve) => {
    inquirer.prompt(...args, (answers) => resolve(answers));
  });
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

  const fullPath = path.resolve(outPath);

  copySync(path.join(fullPath, '_private.example.yml'), path.join(fullPath, '_private.yml'));

  console.log(`Created new Peridot project in ${fullPath}.`);

  const {shouldNPMInstall} = await showPrompt([{
    type: 'confirm',
    name: 'shouldNPMInstall',
    message: 'Run npm install?',
    default: true
  }]);

  if (shouldNPMInstall) {
    execSync('npm install', {
      cwd: fullPath,
      stdio: 'inherit'
    });
  }
}
