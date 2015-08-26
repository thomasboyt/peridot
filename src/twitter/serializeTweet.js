function serializeEntities(entities) {
  // TODO
  return entities;
}

function serializeExtendedEntities(entities) {
  // TODO
  return entities;
}

function serializeUser(user) {
  return {
    screen_name: user.screen_name,
  };
}

export default function serializeTweet(tweet) {
  return {
    created_at: tweet.created_at,
    id_str: tweet.id_str,
    text: tweet.text,
    entities: serializeEntities(tweet.entities),
    extended_entities: serializeExtendedEntities(tweet.extended_entities),
    user: serializeUser(tweet.user),
  };
}
