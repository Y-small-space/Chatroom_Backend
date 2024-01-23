const sleep = (m) => {
  return new Promise(r => setTimeout(r, m));
};

// 使用 sleep 函数
console.log('Start');

sleep(2000) // 休眠2秒钟
  .then(() => {
    console.log('After 2 seconds');
    return sleep(1000); // 再休眠1秒钟
  })
  .then(() => {
    console.log('After 1 more second');
  });

console.log('End');
