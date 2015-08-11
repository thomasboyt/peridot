import React from 'react';
import _ from 'lodash';

const MEDIA_TYPE = 'media';
const MENTION_TYPE = 'user_mentions';
const URL_TYPE = 'urls';

export default function parseTweetText(text, entities) {
  // Go from entities dictionary to sorted array
  const entitiesList =
    _.chain(entities)
      .mapValues((val, key) => {
        val.forEach((entity) => {
          entity._type = key;
        });
        return val;
      })
      .values()
      .flatten()
      .sortBy((entity) => entity.indices[0])
      .value();

  if (entitiesList.length === 0) {
    return text;
  }

  const tokens = [];

  let lastIdx = 0;
  entitiesList.forEach((entity) => {
    const [startIdx, endIdx] = entity.indices;

    // Add anything before this token into the list
    const before = text.slice(lastIdx, startIdx);
    tokens.push(before);

    // Add this entity into the list
    let entityContent;

    if (entity._type === URL_TYPE) {
      entityContent = (
        <a href={entity.expanded_url}>
          {entity.display_url}
        </a>
      );

    } else if (entity._type === MENTION_TYPE) {
      entityContent = (
        <a href={`https://twitter.com/${entity.screen_name}`}>
          @{entity.screen_name}
        </a>
      );

    } else if (entity._type === MEDIA_TYPE) {
      // Strip media
      entityContent = null;
    } else {
      // hashtags, symbols, etc. we ignore
      entityContent = text.slice(startIdx, endIdx);
    }

    tokens.push(entityContent);

    lastIdx = endIdx;
  });

  // Add any leftover text
  const after = text.slice(lastIdx);
  if (after.length > 0) {
    tokens.push(after);
  }

  return tokens;
}
