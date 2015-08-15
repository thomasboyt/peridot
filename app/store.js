import { createStore } from 'redux';
import entries from './reducers/entries';

// TODO: insert window.__data__ here
export default function createAppStore(data) {
  return createStore(entries, data);
}
