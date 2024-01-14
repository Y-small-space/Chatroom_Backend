function allPathsSourceTarget(graph) {
  const n = graph.length;
  const result = [];

  // 深度优先
  const dfs = (node, path) => {
    path.push(node);

    if(node === n-1){
      result.push([...path]);
    }else{
      for(const nextNode of graph[node]){
        dfs(nextNode,path);
      }
    }
    path.pop();
  }

  dfs(0,[]);
  return result;
}