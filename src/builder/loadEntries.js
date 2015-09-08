import _ from 'lodash';
import Entry from './Entry';
import fetchMediaQueue from '../media/fetchMediaQueue';

export default async function loadEntries(entryData) {
  // Create Entry models
  const entries = entryData.map((data) => new Entry(data));

  // Hydrate media
  for (let entry of entries) {
    await entry.hydrateMedia();
  }

  // Hydrate queued (batched) media
  const mediaQueue = _.flatten(entries.map((entry) => entry.getMediaQueue()));
  await fetchMediaQueue(mediaQueue);

  // Return serialized entries for now (later may make build code use models)
  return entries.map((entry) => entry.serialize());
}
