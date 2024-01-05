function fn(a, b) {
  return a + b
}

function reduceArray(nums, fn, init) {
  if (nums.length === 0) {
    return init;
  }

  let result = init;

  for (let i of nums) {
    result = fn(result, i);
  }

  return result;
}

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let result = reduceArray(nums, fn, 1);

console.log('====================================');
console.log(result);
console.log('====================================');


// ==================reduce实现=========================

Array.prototype.myReduce = function myReduce(callback, init) {
  let accumulator = init === undefined ? undefined : init;

  for (let i = 0; i < this.length; i++) {
    if(accumulator===undefined){
      accumulator = this[i]
    }else{
      accumulator = callback(accumulator,this[i],i,this);
    }
  }

  return accumulator
}

function sum(a,b){
  return a + b
}

console.log(nums.myReduce(sum,1))

