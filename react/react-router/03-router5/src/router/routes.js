/** 
  配置路由表: 数组，数组中每一项就是每一个需要配置的路由规则
    + redirect：true 此配置是重定向
    + from：来源的地址
    + to：重定向的地址
    + path：匹配的路径
    + component：渲染的组件
    + name：路由名称（命名路由）
    + meta：{} 路由元信息
    + ...
*/
import { lazy } from "react";
import A from "../views/A";
import B from "../views/B";
import C from "../views/C";
import aRoutes from "./aRoutes";

const routes = [{
  redirect: true,
  from: '/',
  to: '/a',
  exact: true
}, {
  path: '/a',
  name: 'a',
  component: A,
  meta: {},
  children: aRoutes
}, {
  path: '/b',
  name: 'b',
  component: lazy(() => import('../views/B')),
  meta: {},
}, {
  path: '/c/:id?/:name?',
  name: 'c',
  component: lazy(()=>import('../views/C')),
  meta: {}
}, {
  redirect: true,
  to: '/a'
}];
export default routes;