class DonePlugin {
  apply(complier) {
    complier.hooks.run.tap('RunPlugin', () => {
      console.log('====================================');
      console.log('run 开始编译');
      console.log('====================================');
    })
  }
}

module.exports = DonePlugin;