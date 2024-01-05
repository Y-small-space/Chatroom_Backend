import React from 'react';
import { Link } from 'react-router-dom';

/* 基础样式 */
import styled from "styled-components";
const DemoBox = styled.div`
  display:flex;
  font-size:12px;
  .menu{
    a{
      font-size:12px;
      color:#000;
      display:block;
    }
  }
`

export default function A() {
  return <DemoBox>
    <div className='box'>
      <div className='menu'>
        <Link to="/a/a1" >A1</Link>
        <Link to="/a/a2" >A2</Link>
        <Link to="/a/a3" >A3</Link>
      </div>

      <div className="view">

      </div>
    </div>
  </DemoBox>

}
