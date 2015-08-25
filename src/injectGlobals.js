// See app/projectRequire.js
global.__PROJECT__ = process.cwd();

// Global React is used so components imported from project directory use the same instance of
// React *in Node*
// See: https://gist.github.com/thomasboyt/873ee81a5ddf65a1af08
global.React = require('react');

// Same dealio. Stateful components :(
global.DocumentTitle = require('react-document-title');

// TODO: I don't love the idea of stubbing out web APIs like this...
// There might be an alternative through JSDOM? ask around
global.window = {};
