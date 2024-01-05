const countNum = ()=>{
  let count = 0
  return function(){
    return count++
  }
}