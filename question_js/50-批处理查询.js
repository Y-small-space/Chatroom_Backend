class QueryBatcher {
  constructor(queryBatcher, t) {
    this.queryBatcher = queryBatcher;
    this.throttleTime = t;
    this.keys = [];
    this.timeout = null;
  }

  async getValue(key) {
    this.keys.push(key);

    if (!this.throttleTime) {
      this.timeout = setTimeout(async () => {
        const result = await this.queryBatcher(this.keys);
        this.keys = [];
        this.timeout = null;
        console.log('Querying:', this.keys);
        console.log('Result:', result);
      }, this.throttleTime);
    }

    return new Promise((resolve) => {
      resolve(`Resolved value for key: ${key}`);
    })
  }
}

async function queryMultiple(keys) {
  // Simulating asynchronous querying based on keys.
  return keys.map(key => `Value for key: ${key}`);
}

const batcher = new QueryBatcher(queryMultiple, 400);

// Simulating multiple calls to getValue with different keys.
batcher.getValue('key1');
setTimeout(() => {
  console.log(batcher.getValue('key2'))
}, 150);
setTimeout(() => {
  console.log(batcher.getValue('key3'))
}, 300);
setTimeout(() => {
  console.log(batcher.getValue('key4'))
}, 500);