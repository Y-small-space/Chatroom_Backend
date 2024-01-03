// 方法一：数组标记
const zeroSite1 = function (martix) {
  const m = martix.length;
  const n = martix[0].length;
  const row = new Array(m).fill(false);
  const col = new Array(n).fill(false);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if(martix[i][j]=0){
        row[i] = true;
        col[j] = true;
      }
    }
  }

  for(let i = 0;i<m;i++){
    for(let j = 0;j<n;j++){
      if(row[i]||col[j]){
        martix[i][j] = 0;
      }
    }
  }
}

// 方法二：原地标记
