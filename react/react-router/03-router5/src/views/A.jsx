import React from 'react';
import { NavLink } from 'react-router-dom';
import RouterView from '../router';
import routes from '../router/aRoutes';

/* 基础样式 */
import styled from "styled-components";
import A1 from './a/a1';
import A2 from './a/a2';
import A3 from './a/a3';
const DemoBox = styled.div`
  display:flex;
  font-size:12px;
  .menu{
    a{
      font-size:12px;
      color:#000;
      display:block;
      &.active{
        color: red;
      }
    }
  }
`

export default function A() {
  return <DemoBox>
    <div className='box'>
      <div className='menu'>
        <NavLink to="/a/a1" >A1</NavLink>
        <NavLink to="/a/a2" >A2</NavLink>
        <NavLink to="/a/a3" >A3</NavLink>
      </div>

      <div className="view">
        {/* 配置二级路由的匹配规则：需要把一级路由地址带上，不能省略 */}
        {/* <Switch>
          <Redirect exact from="/a" to="/a/a1" />
          <Route path="/a/a1" component={A1} />
          <Route path="/a/a2" component={A2} />
          <Route path="/a/a3" component={A3} />
        </Switch> */}
        <RouterView routes={routes} />
      </div>
    </div>
  </DemoBox>

}
