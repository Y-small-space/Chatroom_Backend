const isMatch = (str1, str2) => {
  const n = str1.length;
  const m = str2.length;

  const dp = new Array(n).fill(0).map(() => new Array(m)).fill(0);

  const dfs = (i, j) => {
    if (j >= n) {
      return i === m;
    }

    if(f[i][j]){
      return f[i][j] === 1;
    }
  }
}