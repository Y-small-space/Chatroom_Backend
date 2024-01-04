const exist = (board, word) => {
  const rows = board.length;
  const cols = board[0].length;

  const dfs = (i, j, idx) => {
    // 如果当前索引越界，或者字符不匹配 则返回false
    if (i < 0 || i >= rows || j < 0 || j >= cols || word[idx] !== board[i][j]) return false;

    // 如果整个单词都已经匹配好 则返回true
    if (idx === word.length - 1) return true;

    const temp = board[i][j]; // 保存当前字符串
    board[i][j] = '#'; // 将当前字符串设置为已访问

    // 在当前字符串的四个方向进行寻找
    const found = dfs(i, j - 1, idx + 1) ||
      dfs(i, j + 1, idx + 1) ||
      dfs(i + 1, j, idx + 1) ||
      dfs(i - 1, j, idx + 1);

    board[i][j] = temp; // 恢复当前字符串

    return found;
  }

  // 遍历整个网络寻找起始点
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (word[0] === board[i][j] && dfs(i, j, 0)) return true;
    }
  }

  return false
}

const board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
];

const word1 = "ABCCED"; // 存在于网格中的单词
const word2 = "SEE";    // 存在于网格中的单词
const word3 = "ABCB";   // 不存在于网格中的单词

console.log(exist(board, word1)); // 输出 true
console.log(exist(board, word2)); // 输出 true
console.log(exist(board, word3)); // 输出 false
