Array.prototype.myForEach = function (cb, context) {
  for (let i = 0; i < this.length; i++) {
    cb.call(context, this[i], i, this);
  }
}