const path = require('path');
const RunPlugin = 
module.exports = {
  mode: 'developement',
  devTool: false,
  entry: {
    entry1: 'entry1.js',
    entry2: 'entry2.js'
  },
  output:{
    path:path.resolve('./dist'),
    filename:'[name].js'
  },
  resolve:{ // 模块查找模块的路径的规则
    // 当引入模块的时候，可以不写扩展名
    extensions:['.js','.jsx','.ts','.json']
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          path.resolve(__dirname,'loaders/logger-loader.js'),
          path.resolve(__dirname,'loaders/logger2-loader.js')
        ]
      }
    ]
  },
  plugins:[
    new RunPlugin()
  ]
}