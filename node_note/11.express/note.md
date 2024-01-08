## express 和 koa 的区别

- 选择问题，如果你希望内核比较小，底层自动支持 promise 的写法 koa 更适合。 express 功能强大，整体内置了很多
- node 中有两个 mvc 的框 nestjs （express） eggjs （koa） koa 和 express 是同一个团队开发使用起来基本一致
- express 和 koa 的中间件的实现有区别 （express 基于回调） （koa 基于 promise）
- koa 采用 es6 语法 express 采用的是 es5 语法
- koa 中有一个 context 对象封装了 (req,res,request,response)  express直接在原生的req和res上进行了扩装

- express 内置了一个路由系统(其它的内置属性) 约等于 koa + koa-router
