const Application = require("./application");
const Router = require("./router");
// 创建应用x
function createApplication() {
  return new Application();
}
createApplication.Router = Router; // 这个就是我们的路由
module.exports = createApplication;
