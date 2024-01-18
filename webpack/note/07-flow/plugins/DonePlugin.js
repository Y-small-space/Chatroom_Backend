class DonePlugin {
  apply(complier) {
    complier.hooks.done.tap('DonePlugin', () => {
      console.log('====================================');
      console.log('Done 结束编译');
      console.log('====================================');
    })
  }
}

module.exports = DonePlugin;