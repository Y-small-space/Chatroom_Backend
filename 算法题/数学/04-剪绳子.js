const cuttingpope = (n) => {
  if (n < 4) {
    return n - 1;
  }

  const m = Math.floor(n / 3);
  if (n % 3 === 0) {
    return 3 ** m;
  }
  if (n % 3 === 1) {
    return 3 ** (m - 1) * 4;
  }
  return 3 ** m * 2;
}

console.log(cuttingpope(10))