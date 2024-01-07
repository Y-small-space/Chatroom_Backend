import React from "react";
import { NavLink } from "react-router-dom";

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

class HomeHead extends React.Component {
  render() {
    console.log(this.props);
    return <NavBox>
      <NavLink to="/a">A</NavLink>
      <NavLink to="/b">B</NavLink>
      <NavLink to="/c">C</NavLink>
    </NavBox>
  }
}

export default HomeHead;

