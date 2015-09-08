import Tweet from './twitter/Tweet';
import Photo from './photos/Photo';

const tweetRe = /https:\/\/twitter.com\/.+\/status\/[0-9]+/;

export default function getMedia(data) {
  if (typeof data === 'string') {
    if (tweetRe.test(data)) {
      return new Tweet(data);
    }

  } else {
    if (data.photo) {
      return new Photo(data);
    }
  }

  throw new Error(`Unrecognized media type: ${data}`);
}
