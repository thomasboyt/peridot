export const FETCH_ENTRY = 'FETCH_ENTRY';
export const FETCH_ENTRIES_LIST = 'FETCH_ENTRIES_LIST';

export function fetchEntry(slug) {
  return async function (dispatch) {
    const resp = await window.fetch(`/entries/${slug}/data.json`);

    // TODO: handle errors
    const data = await resp.json();

    dispatch({
      type: FETCH_ENTRY,
      slug: slug,
      entry: data
    });
  };
}

export function fetchEntriesList() {
  return async function (dispatch) {
    const resp = await window.fetch('/entries.json');

    // TODO: handle errors
    const data = await resp.json();

    dispatch({
      type: FETCH_ENTRIES_LIST,
      entries: data
    });
  };
}
