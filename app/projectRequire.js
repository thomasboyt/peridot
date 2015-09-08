/*
 * For __PROJECT__ source, see:
 *   Node: src/injectGlobals
 *   Webpack: src/builder/generateWebpackConfig
 *
 * Thanks sokra: https://gist.github.com/thomasboyt/736713bc677124e57936#gistcomment-1551872
 */

/* global __PROJECT__ */
const List = require(__PROJECT__ + '/app/components/layouts/List');
const Post = require(__PROJECT__ + '/app/components/layouts/Post');
const Wrapper = require(__PROJECT__ + '/app/components/layouts/Wrapper');
const reducers = require(__PROJECT__ + '/app/reducers');

export {List, Post, Wrapper, reducers};
