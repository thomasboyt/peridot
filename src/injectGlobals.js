// See app/projectRequire.js
global.__PROJECT__ = process.cwd();

// Global React is used so components imported from project directory use the same instance of
// React *in Node*
// See: https://gist.github.com/thomasboyt/873ee81a5ddf65a1af08
global.React = require('react');
