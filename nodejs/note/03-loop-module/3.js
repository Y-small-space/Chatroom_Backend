const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module._extension = {
  '.js'(module) {
    const content = fs.readFileSync(module.id,'utf8');

  }
}