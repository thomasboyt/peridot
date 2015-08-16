import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

import entries from './reducers/entries';

// TODO: insert window.__data__ here
export default function createAppStore(data) {
  return createStoreWithMiddleware(entries, data);
}
