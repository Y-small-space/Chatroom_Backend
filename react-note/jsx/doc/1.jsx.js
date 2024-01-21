let element = <h1 className="title" style={{ color: 'red' }}>hello</h1>;

//会经过babel的编译变成
//如果runtime配置为classic,代表就是老的转换
//let React = {};
//React.createElement(type,props,...children)


React.createElement("h1", {
  className: "title",
  style: {
    color: 'red'
  }
}, "hello", 'world');
//如果说runtime配置成了automatic,代表就是新的转换
import { jsx } from "react/jsx-runtime";
//jsx(type,props);
jsx("h1", {
  className: "title",
  style: {
    color: 'red'
  },
  children: "hello"
});

jsx("h1", {
  className: "title",
  style: {
    color: 'red'
  },
  children: [1,"hello",null,undefined, jsx("span", {
    children: "world"
  })]
});




/*#__PURE__*/React.createElement("h1", {
  className: "title",
  style: {
    color: 'red'
  }
}, "hello", /*#__PURE__*/React.createElement("span", null, "world"));