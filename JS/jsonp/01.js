/* 
  同源策略：同域名 同端口号 同协议
  不符合同源策略，浏览器回为了安全问题，阻止请求
 */

/* 
  解决：
    1. cors 由后端设置，Access-Contorl-Allow-Origin: *
    2. jsonp 前后端协作
*/

/* 
  jsonp : JSON with Padding
*/