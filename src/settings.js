import {readFileSync} from 'fs';
import yaml from 'js-yaml';

let settings = null;

export default function getSettings() {
  if (!settings) {
    const settingsYaml = readFileSync('_settings.yml', {encoding: 'utf8'});

    // TODO: some kind of validation/transformation here, maybe?
    settings = yaml.safeLoad(settingsYaml);
  }

  return settings;
}
