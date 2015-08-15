import {range} from 'lodash';
import readline from 'readline';

let indentLevel = 0;

export function enterLogSection() {
  indentLevel += 1;
}

export function exitLogSection() {
  indentLevel -= 1;
  if (indentLevel < 0) {
    throw new Error('Attempted to exit root logging section');
  }
}

export function log(msg) {
  const indentation = range(indentLevel).map(() => '\t').join('');
  const msgStr = msg + '';
  const formatted = msgStr.split('\n').map((line) => indentation + line).join('\n');
  console.log(formatted);
}

export function createProcessLogger(proc) {
  readline.createInterface({
    input: proc.stdout,
    terminal: false
  }).on('line', (line) => {
    log(line);
  });

  readline.createInterface({
    input: proc.stderr,
    terminal: false
  }).on('line', (line) => {
    log(line);
  });
}
