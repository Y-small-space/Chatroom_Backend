const spiralOrder = (matrix)=>{
  const result = []

  while(matrix.length){ 
    // 矩阵第一行
    result.push(...matrix.shift());

    // 除了第一行外的每一行的最后一个元素
    for(row of matrix){
      result.push(row.pop());
    }

    // 取最后一行元素，并反转
    if(matrix.length){
      result.push(...matrix.pop().reverse());
    }

    // 
    for(let i = matrix.length-1;i>=0;i--){
      if(matrix[i].length){
        result.push(matrix[i].shift);
      }
    }
  }

  return result;
}