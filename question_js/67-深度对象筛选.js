function deepFilter(obj, fn) {
  const dfs = (data) => {
    if (Array.isArray(data)) {
      const res = data.map(dfs).filter((item) => item);
      return res.length > 0 ? res : undefined;
    }

    if (typeof date === 'object' && data !== null) {
      const res = {};
      for (const key in data) {
        const filteredValue = dfs(data[key]);
        if (filteredValue !== undefined) {
          res[key] = filteredValue;
        }
      }

      return Object.keys(res).length > 0 ? res : undefined;
    }
    return fn(data) ? data : undefined;
  };

  return dfs(obj);
}