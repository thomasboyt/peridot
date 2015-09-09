import getPhoto from './getPhoto';
import Media from '../Media';

export default class Photo extends Media {
  constructor(yamlData) {
    super(yamlData);

    this.type = 'photo';
  }

  async hydrate() {
    const imgInfo = await getPhoto(this.meta.photo);

    this.data = {
      caption: this.meta.caption,
      ...imgInfo
    };
  }
}
