function oneEditAway(strF: string, strS: string) {
  let m: number = strF.length;
  let n: number = strS.length;

  if (m < n) {
    return oneEditAway(strS, strF);
  }

  if (m - n > 1) {
    return false;
  }

  let cnt: number = 0;
  if (m === n) {
    for (let i: number = 0; i < n; ++i) {
      if (strF[i] !== strS[i]) {
        if (++cnt > 1) {
          return false;
        }
      }
    }
    return true;
  }

  for (let i: number = 0, j: number = 0; i < m; ++i) {
    if(j===n||(j<n && strF[i]!==strS[i])){
      ++cnt
    }else{
      ++j
    }
  }

  return cnt<2;
}