const compress = function (s: string) {
  const n: number = s.length;
  const t: string[] = [];

  for (let i = 0; i < n;) {
    let j = i + 1;
    while (j < n && s.charAt(j) === s.charAt(i)) {
      ++j;
    }
    t.push(s.charAt(i), String(j - i));
    i = j;
  }

  return t.length < n ? t.join('') : s
}