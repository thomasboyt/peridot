import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware
)(createStore);

import entries from './reducers/entries';
import {reducers as customReducers} from './projectRequire';

const appReducers = combineReducers(Object.assign({entries}, customReducers));

export default function createAppStore(data) {
  return createStoreWithMiddleware(appReducers, data);
}
