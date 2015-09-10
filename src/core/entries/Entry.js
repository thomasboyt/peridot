import _ from 'lodash';
import slug from 'slug';
import Remarkable from 'remarkable';

import getMedia from './media/getMedia';

const md = new Remarkable();

function getOrRaise(entry, attr) {
  if (!entry[attr]) {
    throw new Error(`Entry missing required attribute: ${attr}`);
  }

  return entry[attr];
}

export default class Entry {
  constructor(entryData) {
    this.title = getOrRaise(entryData, 'title');
    this.date = getOrRaise(entryData, 'date');
    this.body = entryData.body || null;
    this.media = entryData.media || [];
    this.customData = _.omit(entryData, 'title', 'date', 'body', 'media');

    this.mediaQueueIdxs = [];
  }

  renderBody() {
    if (this.body) {
      return md.render(this.body);
    } else {
      return null;
    }
  }

  getSlug() {
    return slug(`${this.date} ${this.title}`, {lower: true});
  }

  getMediaQueue() {
    return this.mediaQueueIdxs.map((mediaIdx) => this.media[mediaIdx]);
  }

  async hydrateMedia() {
    for (let idx in this.media) {
      const media = getMedia(this.media[idx]);
      await media.hydrate();

      if (!media.data) {
        this.mediaQueueIdxs.push(idx);
      }

      this.media[idx] = media;
    }
  }

  serialize() {
    return {
      title: this.title,
      date: this.date,
      slug: this.getSlug(),
      body: this.renderBody(),
      media: this.media.map((media) => media.serialize()),
      hasBody: !!this.body,
      hasMedia: this.media.length > 0,

      ...this.customData
    };
  }
}
