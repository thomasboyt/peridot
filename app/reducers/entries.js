import {FETCH_ENTRY, FETCH_ENTRIES_LIST} from '../actions/entries';

const initialState = {
  // Holds the list of entries
  entries: null,

  // Holds the currently-viewed entry
  entryDetail: {}
};

export default function entries(state = initialState, action) {
  if (action.type === FETCH_ENTRY) {
    return Object.assign({}, state, {
      entryDetail: action.entry
    });

  } else if (action.type === FETCH_ENTRIES_LIST) {
    return Object.assign({}, state, {
      entries: action.entries
    });

  } else {
    return state;
  }
}
