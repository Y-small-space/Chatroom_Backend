// A组件的二级路由表
import { lazy } from "react";
import A1 from "../views/a/a1";
import A2 from "../views/a/a2";
import A3 from "../views/a/a3";

const routes = [{
  redirect: true,
  from: '/a',
  to: '/a/a1',
  exact: true
}, {
  path: '/a/a1',
  name: 'a-a1',
  component: lazy(() => import(/* webpackChunkName:"Achild" */'../views/a/a1')),
  meta: {}
}, {
  path: '/a/a2',
  name: 'a-a2',
  component: lazy(() => import(/* webpackChunkName:"Achild" */'../views/a/a2')),
  meta: {}
}, {
  path: '/a/a3',
  name: 'a-a3',
  component: lazy(() => import(/* webpackChunkName:"Achild" */'../views/a/a3')),
  meta: {}
}]

export default routes;