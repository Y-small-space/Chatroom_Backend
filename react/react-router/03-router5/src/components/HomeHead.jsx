import React from "react";
import { NavLink, withRouter } from "react-router-dom/cjs/react-router-dom.min";

/* 导航区域的样式 */
import styled from "styled-components";
const NavBox = styled.nav`
  a {
    margin-right: 30px;
    color: blue;
    /* 选中样式 */
    &.active{
      color: red;
    }
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
      {/* 
        NavLink VS Link 
          都是实现路由跳转的，语法上几乎一样，区别：
          每一次页面加载或者路由切换完毕，都会拿最新的路由地址，和NavLink中to指定的定制「或者pathname地址」
          进行匹配
            + 匹配上的这一样，会默认设置active选中样式类「我们基于activeClassName重新设置选中的样式类名」
            + 我们也可以设置exact精准匹配
          基于这样的机制，我们就可以给选中的导航设置相关的选中样式！！！
       */}
      <NavLink to="/a">A</NavLink>
      <NavLink to="/b">B</NavLink>
      <NavLink to="/c">C</NavLink>
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

