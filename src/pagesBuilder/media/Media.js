export default class Media {
  constructor(yamlData) {
    // "meta" == poor name for user-defined data
    this.meta = yamlData;

    this.data = null;
  }

  async hydrate() {
    throw new Error('Not implemented: `hydrate` method on Media subclass');
  }

  serialize() {
    return {
      type: this.type,
      data: this.data
    };
  }
}
