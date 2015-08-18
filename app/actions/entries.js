import apiRequest from '../util/apiRequest';
import createAsyncAction from '../util/createAsyncAction';

export const FETCH_ENTRY = 'fetchEntry';
export const FETCH_ENTRIES_LIST = 'fetchEntriesList';

export const fetchEntry = createAsyncAction(FETCH_ENTRY, async (slug) => {
  const data = await apiRequest(`/entries/${slug}/data.json`);

  return {
    slug: slug,
    entry: data
  };
});

export const fetchEntriesList = createAsyncAction(FETCH_ENTRIES_LIST, async () => {
  const data = await apiRequest('/entries.json');

  return {
    entries: data
  };
});
