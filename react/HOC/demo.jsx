/* 
  React高阶组件：利用JSX中的闭包「柯理化函数」实现的组件代理
 */

import React from "react";

const Demo = function Demo(props) {
  console.log('Demo中的属性：', props);
  return <div className="demo">
    我是DEMO
  </div>
};

const ProxtTest = function ProxtTest() { };

export default Demo;
