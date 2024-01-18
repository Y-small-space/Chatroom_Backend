"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var path = require('path');

var fs = require('fs');

function toUnixSeq(filePath) {
  return filePath.replace(/\\/g, '/');
}

var Complication =
/*#__PURE__*/
function () {
  function Complication(options) {
    _classCallCheck(this, Complication);

    this.options = options;
    this.options.context = this.options.context || toUnixSeq(process.cwd());
    this.fileDependencies = new Set();
  }

  _createClass(Complication, [{
    key: "build",
    value: function build(onComplied) {
      // 5.根据配置中的entry找出入口文件
      var entry = {};

      if (typeof this.options.entry === 'string') {
        entry.main = this.options.entry;
      } else {
        entry = this.options.entry;
      }

      for (var entryName in entry) {
        var entryValue = entry[entryName]; // 获取入口文件的绝对路径

        var entryFilePath = path.posix.join(context, entry[entryName]); // 把此文件添加到文件依赖列表中

        this.fileDependencies.add(entryFilePath); // 从入口文件发出，开始编译模块

        this.buildModule(entryName, entryFilePath);
      }
    }
  }, {
    key: "buildModule",
    value: function buildModule(name, modulePath) {
      // 从入口文件出发，调用所有配置的loader对模块进行转换
      var rawSourceCode = fs.readFileSync(modulePath, 'utf8'); // 获取loader的配置规则

      var rules = this.options.module.rules; // 获取适用于此模块的loader

      var loaders = [];
      rules.forEach(function (rule) {
        // 用模块路径匹配正则表达式
        if (modulePath.match(rule.test)) {
          loaders.push.apply(loaders, _toConsumableArray(rules.use));
        }
      });
      var transformedSourceCode = loaders.reduceRight(function (sourceCode, loader) {
        return require(loader)(sourceCode);
      }, rawSourceCode);
    }
  }]);

  return Complication;
}();

module.exports = Complication;