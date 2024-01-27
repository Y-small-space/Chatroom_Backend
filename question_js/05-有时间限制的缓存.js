class TimeLimitedCache {
  constructor() {
    this.cache = new Map()
  }

  set(key, value, duration) {
    // 清理过期项
    this.removeExpire()
    // 检查缓存中是否已存在键
    const ans = this.cache.has(key);
    // 设置键值对，以及缓存时间
    this.cache.set(key, [value, this.now() + duration]);

    return ans;
  }

  get(key) {
    this.removeExpire();
    return (this.cache.get(key) || [])[0] || -1;
  }

  count() {
    this.removeExpire()
    return this.cache.size;
  }

  now() {
    return new Date().getTime()
  }

  removeExpire() {
    // 清理过期项
    const now = this.now();
    for (const [key, [, expire]] of this.cache) {
      if (expire <= now) {
        this.cache.delete(key);
      }
    }
  }
}

// Your TimeLimitedCache object will be instantiated and called as such:
var obj = new TimeLimitedCache()
console.log(obj.set(1, 42, 1000)); // false
console.log(obj.get(1)); // 42
console.log(obj.count()) // 1
