module.exports = class Cache {
  constructor() {
    this.cache = {};
  }

  set(key, value, ttl = 1000 * 60 * 60 * 24) {
    const expiration = Date.now() + ttl;
    this.cache[key] = {
      value: value,
      expiration: expiration
    }
  }

  get(key) {
    if (this._contains(key)) {
      const obj = this.cache[key];
      const currTime = Date.now();
      if (currTime > obj.expiration) {
        this.remove(key);
        return null;
      }
      return obj.value;
    }
    return null;
  }

  has(key) {
    if (this._contains(key)) {
      const obj = this.cache[key];
      const currTime = Date.now();
      if (currTime > obj.expiration) {
        this.remove(key);
        return false;
      }
      return true;
    }
    return false;
  }

  remove(key) {
    delete this.cache[key];
  }

  _contains(key) {
    return Object.keys(this.cache).includes(key);
  }
}
