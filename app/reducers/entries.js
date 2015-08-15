import {FETCH_ENTRY} from '../actions/entries';

const initialState = {
  entries: []
};

export default function entries(state = initialState, action) {
  if (action.type === FETCH_ENTRY) {
    // TODO: don't insert if already exists
    const entries = entries.concat([action.entry]);

    return Object.assign({}, state, {
      entries: entries
    });
  }
}
