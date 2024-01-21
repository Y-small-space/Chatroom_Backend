/* createElement:创建虚拟DOM对象 */
function createElement(ele, props, ...children) {
  let virtualdom = {
    $$typeof: Symbol('react.element'),
    key: null,
    ref: null,
    type: null,
    props: {}
  }

  let len = children.length;

  virtualdom.type = ele;

  if (props !== null) {
    virtualdom.props = { ...props }
  }

  if (len === 1) virtualdom.props.children = children[0];

  return virtualdom
}