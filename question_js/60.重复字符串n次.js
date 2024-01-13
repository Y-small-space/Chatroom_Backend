Array.prototype.replice = function (times) {
  return Array(times).fill(this).join('');
}