import React from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import qs from 'qs';

export default function B(props) {
  let history = useHistory(),
    location = useLocation(),
    match = useRouteMatch();
  console.log(history, location, match);
  return <div className='box'>
    B组件的内容

    {/*  <button onClick={() => {
    传参方案一：问号传参数
    + 传递的信息出现在URL地址上：丑、不安全、长度限制
    + 信息是显示的，即便在目标内刷新，传递的信息也在


    // history.push('/c?id=100&name=J');
    history.push({
      pathname: '/c',
    // search存储的就是问号传参信息，要求是urlencoded字符串
    search: qs.stringify({
      id:100,
    name:'J'
        })
      })
    }}>按钮</button> */}
    <button onClick={() => {
      /* 
        传参方案2:路径参数「把需要传递的值，作为路由路径中的一部分」
          + 传递的信息也在URL地址中：比问号传参看起来漂亮一些、但是也存在安全和长度的限制
          + 因为信息都子啊地址中，即便目标组件刷新，传递的信息也在        
          history.push(`/c/100/J`);
       */
      /* 
        传参方案3:隐式传参数
          + 传递的信息不会出现在URL地址中：安全、美观，也没有限制
          + 在目标组件内刷新，传递的信息就丢失了
      */
      history.push({
        pathname: '/c',
        state: {
          id: 100,
          name: 'JY'
        }
      })
    }}></button>
  </div >
}
