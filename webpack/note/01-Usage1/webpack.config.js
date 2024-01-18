const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 获取环境变量
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  // entry:['./src/entry1.js','./src/entry2.js'],
  // entry: {
  //   entry1: './src/entry1.js',
  //   entry2: './src/entry2.js'
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // clean: true // 在新的打包之前清除历史文件
  },
  devServer: {
    host: 'localhost', // 主机名
    port: 9000, // 访问端口号
    open: true, // 构建结束后自动打开浏览器预览项目
    compress: true, // 启动gzip压缩
    hot: true, // 启动支持模块热替换
    watchFiles: [ // 监听文件的变化，如果这些文件变化了，可以重新编译
      "src/**/*.js" // 如果不配置watchFiles就是监听所有的文件
    ],

    // 不管访问哪个路径，都会把请求重定向到index.html，交给前端路由来进行处理
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,//匹配的条件 一般是一个正则，用来匹配文件的路径
        use: [// use指定的转换的方式
          // 'style-loader', // 通过style标签动态插入样式到HTML里
          // MiniCssExtractPlugin.loader,
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader', // 作用是把css代码转换为js代码
          'postcss-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[
          isProduction?MiniCssExtractPlugin.loader:'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './src/entry1.html',
    //   filename: 'entry1.html',
    //   chunks: ['entry1']
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/entry2.html',
    //   filename: 'entry2.html',
    //   chunks: ['entry2']
    // })
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin()
    /* 
      MiniCssExtractPlugin
      1. 把css文件提取到单独的文件中
      2. 减少了main.js文件体积
      3. 可以让css和js并行加载，提高了加载效率，减少了加载时间
     */
  ]
}

/* 
  
 */