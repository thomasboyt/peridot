// See app/projectRequire.js
global.__PROJECT__ = process.cwd();

// TODO: I don't love the idea of stubbing out web APIs like this...
// There might be an alternative through JSDOM? ask around
global.window = {};
