# 组件

## 函数组件

创建：在SRC目录中，创建一个 xxx.jsx 的文件，就是创建一个组件；我们在此文件中，创建一个函数返回JSX视图「或者JSX元素、virtualDOM虚拟DOM对象」；这就是创建了一个“函数组件”！！！

调用：基于ES6Moudule规范，导入创建的组件「可以忽略.jsx后缀名」，然后像写标签一样调用这个组件即可！！！

    <Component/>单闭合调用
    <Component></Component>双闭合调用

命名：组件的名字，我们一般使用PascalCase「大驼峰命名法」这种方式命名

调用组件的时候，我们可以给调用的组件设置（传递）各种各样的属性

    <DemoOne title="我是标题" x = {10} data = {[100,200]} className = "box" style={{fontSize:'20px'}}/>
  
+ 如果传递的属性值不是字符串格式，需要基于“{}”胡子语法进行嵌套
+ 调用组件的时候，我们可以把一些数据/信息基于属性props的方式，传選给组件！！

## 函数组件的渲染机制

1. 基于babel-preset-react-app把调用的组件转换为createElement格式

        React.createElement(DemoOne.{
          title:"\u6211\662F\u6807\u9898",
          x:10,
          data:[100,200],
          className:"box",
          stle:{
            fontSize:'20px'
          }
        })

2. 把createElement方法执行，创建出一个virtualDOM对象！！！

        {
          $$typeof: Symbol(react.element), 
          key: null,
          props: {title：'我是标题'，x:10，data：数组，className：'box'，style:{fontSize：'20px'}}//如果有子节点「双闭合调用」，则也包含children！！,
          ref: null, 
          type: DemoOne
        }

3. 基于root. render把virtua LDOM变为真实的DOM
  
  type值不再是一个字符串，而是一个函数了，此时：

    + 把函数执行 DemoOne（）
    + 把virtuaLDOM中的props，作为实参传递给函数 ->DemoOne（props）
    + 接收函数执行的返回结果「也就是当前组件的virtualDOM对象」
    + 最后基于render把组件返回的虚拟DOM变为真实DOM，插入到#root容器中！！

## 属性props的处理

1. 调用组件，传递进来的属性是“只读”的
  
    + 获取：props.xxx
    + 修改：props.xxx=xxx =>报错

2. 作用：父组件（index.jsx）调用子组件（DemoOne.jsx）的时候，可以基于属性，把不同的信息传递给子组件；子组件接收相应的属性值，呈现出不同的效果，让组件的复用性更强！！

    + 虽然对于传递进来的属性，我们不能直接修改，但是可以做一些规则校验
    + 设置默认值

          函数组件.defaultProps = {
            x: 0,
            .....
          };
    + 设置其它规则，例如：数据值格式、是否必传•••「依赖于官方的一个插件：prop-types」[https://github.com/facebook/prop-types]

          import PropTypes from 'prop-types';
          函数組件・propTypes = {
          // 类型是字符串、必传
          title: PropTypes.string. isRequired,
          // 类型是数字
          x: PropTypes. number,
          // 多种校验规则中的一个
          y: PropTypes. oneOfType([
          PropTypes. number,
          PropTypes.bool,
          ])
          }

传递进来的属性，首先会经历规则的校验，不管校验成功还是失败，最后都会把属性给形参propS，只不过如果不符合设定的规则，控制台会抛出警告错误｛不影响属性值的获取｝！！

## 扫盲知识点：关于对象的规则设置

1. 冻结
  
    冻结对象：Object.freeze(obj)

    检测是否被冻结：Object.isFrozen(obj)=>true/false

      + 被冻结的对象：不能修改成员值、不能新增成员、不能删除现有成员、不能给成员做劫持「Object.defineProperty」

2. 密封

    密封对象：Object.seal(obj)

    检测是否被密封：Object.isSealed(obj)
  
      + 被密封的对象：可以修改成员的值，但也不能删、不能新增、不能劫持！！

3. 扩展

    把对象设置为不可扩展：Object.preventExtensions(obj)

    检测是否可扩展：Object.isExtensible(obj)

    + 被设置不可扩展的对象：除了不能新增成员、其余的操作都可以处理！！
    + 被冻结的对象，即是不可扩展的，也是密封的！！同理，被密封的对象，也是不可扩展的！！
