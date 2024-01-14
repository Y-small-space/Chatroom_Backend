const Complier = require("./Complier");
function webpack(config){
  // 1.初始化参数：从配置文件和shell 语句中读取并合并参数 ，得出最终的配置对象
  const argv = process.argv.slice(2);
  const shellOptions = argv.reduce((shellOptions,options)=>{
    const [key,value] = options.split('=');
    shellOptions[key.slice(2)] = value;
    return shellOptions;
  })
}
module.exports = webpack;