async function promiseAll(fns) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const ans = new Array(fns.length);
    for (let i = 0; i < fns.length; i++) {
      const f = fns[i];
      f()
        .then((res) => {
          ans[i] = res;
          count++;
          if (count === fns.length) {
            resolve(ans);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}


// 三个异步函数示例
function asyncTask1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Task 1 Done');
    }, 2000);
  });
}

function asyncTask2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Task 2 Done');
    }, 1500);
  });
}

function asyncTask3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Task 3 Done');
    }, 1000);
  });
}

// 并发执行三个异步任务
async function executeParallelTasks() {
  try {
    const results = await promiseAll([asyncTask1, asyncTask2, asyncTask3]);
    console.log(results); // Output: ['Task 1 Done', 'Task 2 Done', 'Task 3 Done']
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

executeParallelTasks();
