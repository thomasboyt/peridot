import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

import entries from './reducers/entries';

export default function createAppStore(data) {
  return createStoreWithMiddleware(entries, data);
}
