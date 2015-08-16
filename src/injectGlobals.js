// See app/projectRequire.js
global.__PROJECT__ = process.cwd();

// Global React is used so components imported from project directory use the same instance of
// React
global.React = require('react');
