const path = require('path');
const fs = require('fs');
const types = require('babel-types'); // 生成和判断节点的工具库
const parser = require('@babel/parser'); // 把源代码转换成AST的编译器
const traverse = require('@babel/traverse').default; // 遍历语法树的工具
const generator = require('@babel/generator').default; // 把转换后的语法树重新生成源代码的工具

function toUnixSeq(filePath) {
  return filePath.replace(/\\/g, '/');
}

class Complication {
  constructor(options) {
    this.options = options;
    this.options.context = this.options.context || toUnixSeq(process.cwd());
    this.fileDependencies = new Set();
  }

  build(onComplied) {
    // 5.根据配置中的entry找出入口文件
    let entry = {};
    if (typeof this.options.entry === 'string') {
      entry.main = this.options.entry;
    } else {
      entry = this.options.entry;
    }

    for (let entryName in entry) {
      // 获取入口文件的绝对路径
      let entryFilePath = path.posix.join(this.options.context, entry[entryName])
      // 把此文件添加到文件依赖列表中
      this.fileDependencies.add(entryFilePath);
      // 从入口文件发出，开始编译模块
      this.buildModule(entryName, entryFilePath);
    }
  }

  buildModule(name, modulePath) {
    // 从入口文件出发，调用所有配置的loader对模块进行转换
    let rawSourceCode = fs.readFileSync(modulePath, 'utf8');
    // 获取loader的配置规则
    let { rules } = this.options.module;
    // 获取适用于此模块的loader
    let loaders = [];
    rules.forEach(rule => {
      // 用模块路径匹配正则表达式
      if (modulePath.match(rule.test)) {
        loaders.push(...rule.use);
      }
    });
    let transformedSourceCode = loaders.reduceRight((sourceCode, loader) => {
      return require(loader)(sourceCode);
    }, rawSourceCode);
    // 经过loader的转换，transformedSourceCode肯定是一个字符串了
    // 7.再找出该模块依赖的模块，再递归本步骤知道所有入口依赖的文件都经过了本步骤的处理
  }
}

module.exports = Complication;