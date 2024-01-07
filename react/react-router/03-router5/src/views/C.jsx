import React from 'react'
// import { useLocation } from 'react-router-dom'
// import qs from 'qs';
// import { useParams, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

export default function C() {
  // const location = useLocation();
  // console.log(location.search); // "?id=100&name=zhufeng"

  /* // 获取传递的问号参数信息
  // let { id, name } = qs.parse(location.search.substring(1));
  // console.log(id, name);

  // 也可以基于URLSearchParams来处理
  // let usp = new URLSearchParams(location.search);
  // console.log(usp.get('id'), usp.get('name'), usp); */

  /* // const match = useRouteMatch()
  // console.log(match.params);
  // let params = useParams();
  // console.log(params); */

  /*   console.log(location.state); */
  return (
    <div className='box'>
      C组件的内容
    </div>
  )
}
