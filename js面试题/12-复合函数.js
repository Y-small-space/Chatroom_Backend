function functionCompose(funcArray) {
  return function (x) {
    return funcArray.reduceRight((acc, func) => func(acc), x);
  };
}

function x1(x) {
  return x + 2;
}

function x2(x) {
  return x * 3;
}

function x3(x) {
  return x - 4;
}

const funcArray = [x1, x2, x3];
const composedFn = functionCompose(funcArray);

console.log(composedFn(5));