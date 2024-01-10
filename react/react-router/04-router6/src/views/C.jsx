import React from 'react';
import { useLocation, useSearchParams, useParams } from 'react-router-dom';

export default function C() {
  // const location = useLocation();
  // location.search:"?id=100&name=J"
  // const usp = new URLSearchParams(location.search);
  // console.log(usp.get('id'),usp.get('name'));
  // let [] = useSearchParams();

  // let location = useLocation(),
  // match = useMatch(location.pathname); // useMatch中必须传递一个地址进来
  // console.log(match)

  // const params = useParams();

  const location = useLocation();
  console.log(location.state);
  // 基于这种方式，在router5中，目标组件只要刷新，传递的信息就消失了；但是在router6中，这个隐式
  // 传递的信息，却被保留下来！！！


  /* 
    在react-router-dom v6中，常用路由Hook
    + useNavigate -> 代替5中的useHistory：实现编程式导航
    + useLocation 「5中也有」：获取location对象信息 pathname/search/state...
    + useSearchParams 「新增的」：获取问号传参信息，取到的结果是一个URL/SearchParams对象
    + useParams 「5中也有」：获取路径参数匹配的信息

    + useMatch(pathname) -> 代替5中的useRouterMatch「5中的这个Hook有用，可以基于params
    获取路径参数匹配的信息，但是在6中，这个hook需要我们自己params中也没有获取匹配的信息，用的就比
    较少了！！！」
   */


  return <div className='box'>
    C组件内容
  </div>
}

