const flat = (arr,n)=>{
  if(n<=0){
    return arr;
  }

  const ann = [];
  for(const i of arr){
    if(Array.isArray(i)){
      ann.push(...flat(i,n-1));
    }else{
      ann.push(i);
    }
  }
  return ann
}

arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
console.log('====================================');
console.log(flat(arr,1));
console.log('====================================');