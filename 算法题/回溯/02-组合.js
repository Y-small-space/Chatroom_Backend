/* 
给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
你可以按 任何顺序 返回答案。
 */

const combine  = (n,k)=>{
  const result = []

  const backtrack = (start,path)=>{
    if(path.length === k){
      result.push([...path])
      return
    }

    for(let i = start;i<n;i++){
      path.push(i)
      backtrack(i+1,path)
      path.pop()
    }
  }

  backtrack(1,[])

  return result
}