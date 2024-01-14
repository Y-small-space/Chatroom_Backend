function EventEmitter() {
  this._events = {};
}
// 订阅
EventEmitter.prototype.on = function (evetName, callback) {
  if (!this._events) this._events = {};
  
  if(evetName!=='newListener'){
    this.emit('newListener')
  }

  (this._events[evetName] || (this._events[evetName] = [])).push(callback);

}
// 发布
EventEmitter.prototype.emit = function (evetName, ...args) {
  if (!this._events) this._events = {}
  this._events[evetName].forEach(fn => fn(...args));
}
module.exports = EventEmitter;