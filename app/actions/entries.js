export const FETCH_ENTRY = 'FETCH_ENTRY';

export function fetchEntry(slug) {
  return async function (dispatch) {
    // TODO: polyfill fetch here
    const resp = await window.fetch(`/entries/${slug}.json`);
    const data = await resp.json();

    dispatch({
      type: FETCH_ENTRY,
      slug: slug,
      entry: data
    });
  };
}
