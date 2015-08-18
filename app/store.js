import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware
)(createStore);

import entries from './reducers/entries';

export default function createAppStore(data) {
  return createStoreWithMiddleware(entries, data);
}
