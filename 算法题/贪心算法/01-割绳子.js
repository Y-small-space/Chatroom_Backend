const cuttingpope = (n) => {
  if (n < 2) return 0;
  if (n === 2) return 1;
  if (n === 3) return 2;

  let max = 1;

  while (n > 4) {
    max *= 3;
    n -= 3;
  }

  return max * n;
}

console.log(cuttingpope(10))