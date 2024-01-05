/** @type {import('webpack').Configuration} */

const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  // entry:['./src/entry1.js','./src/entry2.js'],
  // entry:{
  //   entry1:'./src/entry1.js',
  //   entry2:'./src/entry2.js'
  // }
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  }
}