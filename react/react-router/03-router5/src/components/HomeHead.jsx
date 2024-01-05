import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useHistory, useRouteMatch, withRouter } from "react-router-dom/cjs/react-router-dom.min";

/* 导航区域的样式 */
import styled from "styled-components";
const NavBox = styled.nav`
  a {
    margin-right: 10px;
    color: #000;
  }
`;

/* 
  只要在<HashRouter>/<BrowserRouter>中渲染的组件：
    我们在组件内部，基于useHistory/useLocation/useRouteMatch这些hook函数，就可以获取history/
    location/match这些对象信息！！！
    即便这个组件并不是基于<Route>匹配渲染的！！！
  
  只有基于<Route>匹配渲染的组件，才可以基于props属性，获取这三个对象信息！！！

  问题：如果当前组件是一个类组件，在<HashRouter>内，
  但是并没有经过<Route>匹配渲染，我们如何获取三个对象信息呢？
    
    解决方案：基于函数高阶组件，自己包裹一层进行处理！！！
    在react-router-dom v5版本中，自带了一个高阶组件 withRouter 就是来解决这个问题的
 */

class HomeHead extends React.Component {
  render() {
    console.log(this.props);
    return <NavBox>
      <Link to="/a">A</Link>
      <Link to="/b">B</Link>
      <Link to="/c">C</Link>
    </NavBox>
  }
}

/* const HomeHead = function HomeHead(props) {
  console.log(props);
  console.log(useHistory());
  return <NavBox>
    <Link to="/a">A</Link>
    <Link to="/b">B</Link>
    <Link to="/c">C</Link>
  </NavBox>
} */

/* const Handle = function Handle(Component) {
  // Component：真正需要渲染的组件
  // 返回一个代理/高阶组件「导出去供别的地方调用的就是HOC」
  return function HOC(props) {
    // props:调用HOC传递的属性，其实这些属性原本是想传递给HomeHead的
    // hoc是个函数组件，我们可以在这里基于Hook函数获取需要的三个对象信息，然后手动设置为属性，传递给HomeHead
    let history = useHistory(),
      location = useLocation(),
      mach = useRouteMatch();
    return <Component {...props} history={history} location={location} mach={mach} />
  }
} */

export default withRouter(HomeHead);

