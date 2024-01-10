import React from 'react'
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

export default function B() {
  const navigate = useNavigate();
  const handle = () => {
    // 问号传参
    /* navigate({
      pathname: '/c',
      search: qs.stringify({
        id: 100,
        name: 'J'
      })
    }); */

    // 路径参数
    // navigate(`/c/100/J`);

    //隐式穿参
    navigate('/c', {
      replace: true, // 从历史记录池替换现有的地址
      state: {
        id:100,
        name:'JY'
      } // 隐式传参信息
    });
  };

  return <div className='box'>
    B组件的内容
    <button onClick={handle}>Button</button>
  </div>
}


/* 
  在react-router-dom v6中，实现路由跳转的方式：
    + <Link/NavLink to="/a"> 点击跳转路由
    + <Navigate to="/a"/> 遇到这个组件就会跳转
    + 编程式导航
      import {useNavigate} from 'react-router-dom';
      const navigate = useNavigate();
      navigate('/c');
      navigate('/c',{replace:true});
      navigate({
        pathname:'/c'
      });
      navigate({
        pathname:'/c',
        search:'?id=100&name=J'
      });
      ....
 */
/* 
  在 react-router-dom v6 中，即便当前组件是基于<Route>匹配渲染的，也不会基于属性，把history/
  location/match传递给组件！！！想获取相关的信息，我们只能基于Hook函数处理！！！
    + 首先要确保，需要使用“路由hook”的组件，是在Router「HashRouter或BrowserRouter」内部包着，
    否则使用这些Hook会报错！！！
    + 只要<Router>内部 包裹的组件，不论是否基于<Router>匹配渲染的
      + 默认都不可能再基于props获取相关的对象信息了
      + 只能基于“路由Hook”去获取！！！

  为了放在类组件汇总
  得想办法继续让基于<Route>匹配渲染的组件，可以基于属性获取需要的信息
  不是基于<Route>匹配渲染的组件，我们需要组件重写withRouter「V6中干掉了这个API」，让其和基于<Route>
  匹配渲染的组件，具备相同的属性！！！
*/