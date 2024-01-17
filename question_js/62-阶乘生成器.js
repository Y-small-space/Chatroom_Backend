function* factorial(n) {
  if (n === 0) {
    yield 1;
  }

  let ans = 1;
  for (let i = 0; i <= n; i++) {
    ans += 1;
    yield ans;
  }
}