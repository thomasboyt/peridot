import _ from 'lodash';

import {handleActions} from 'redux-actions';
import createAsyncActionHandlers from '../util/createAsyncActionHandlers';

import {
  FETCH_ENTRY,
  FETCH_ENTRIES_LIST
} from '../actions/entries';

const initialState = {
  // Holds the list of entries
  entries: [],

  // Map slug -> hydration state
  hydratedEntries: {},

  // Whether the full entry list has been hydrated or not
  hydratedList: false
};

const fetchEntryHandlers = createAsyncActionHandlers(FETCH_ENTRY, (state, data) => {
  const {slug, entry} = data;

  // Replace entry by slug
  // TODO: Dis slow.
  const entries = state.entries.map((storedEntry) => {
    if (storedEntry.slug === slug) {
      return entry;
    }

    return storedEntry;
  });

  // Update map of hydrated entries:
  const hydratedEntries = Object.assign({}, state.hydratedEntries);
  hydratedEntries[slug] = true;

  return {entries, hydratedEntries};
});

const fetchListHandlers = createAsyncActionHandlers(FETCH_ENTRIES_LIST, (state, data) => {
  // Merge existing hydrated entries into entry list
  const entries = data.entries.map((entry) => {
    if (state.hydratedEntries[entry.slug]) {
      return _.find(state.entries, {slug: entry.slug});
    }

    return entry;
  });

  return {
    entries,
    hydratedList: true
  };
});

export default handleActions(Object.assign(
  fetchEntryHandlers,
  fetchListHandlers
), initialState);
