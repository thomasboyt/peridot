import Tweet from './twitter/Tweet';
import fetchTweets from './twitter/fetchTweets';

export default async function fetchMediaQueue(queue) {
  const tweets = queue.filter((item) => item instanceof Tweet);

  await fetchTweets(tweets);
}
