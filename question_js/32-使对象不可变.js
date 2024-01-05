const makeObjectImmutable = (obj) => {
  const arrayHandler = {
    set: (_, prop) => {
      throw `Error Modifying Index: ${String(prop)}`;
    }
  };

  const objHandler = {
    set: (_, prop) => {
      throw `Error Modifying: ${String(prop)}`;
    }
  };

  const fnHandler = {
    apply: target => {
      throw `Error Calling Method: ${target.name}`;
    }
  };

  const fn = ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

  const dfs = (obj) => {
    for (const key in obj) {
      if (typeof key === 'object' && obj[key] !== null) {
        obj[key] = dfs(obj[key]);
      }
    }

    if (Array.isArray(obj)) {
      fn.forEach(f => (obj[key] = new Proxy({}, fnHandler)));
      return new Proxy({}, arrayHandler);
    }

    return new Proxy({}, objHandler);
  }

  return dfs(obj);
}

const obj = makeObjectImmutable({x: 5});
obj.x = 6; // throws "Error Modifying x"