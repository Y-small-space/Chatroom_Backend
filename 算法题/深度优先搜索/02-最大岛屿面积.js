const maxArea = (area) => {
  const m = area.length;
  const n = area[0].length;
  const dirs = [0, -1, 0, 1, 0];

  const dfs = (i, j) => {
    if (area[i][j] === 0) return 0;

    let ans = 1;

    for (let x = 0; x < 4; x++) {
      const [x, y] = [i + dirs[x], j + dirs[x + 1]];
      if (x > 0 && x < m && y > 0 && y < n) {
        ans += dfs(x, y);
      }
    }

    return ans
  }
  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      return Math.max(ans, dfs(i, j));
    }
  }
}