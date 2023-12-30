function canPermutePalindrome(s){
  const set = new Set();
  for (const c of s) {
      if (set.has(c)) {
          set.delete(c);
      } else {
          set.add(c);
      }
  }
  return set.size <= 1;
}
