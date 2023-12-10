/* 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。 */
// 原地交换法
const findRepeateNumber = (num)=>{
  for(let i = 0;i<num.length;i++){
    while(num[i]!==i){
      if(num[i]==num[num[i]]){
        return num[i];
      }
      [num[num[i]],num[i]] = [num[i],num[num[i]]];
    }
  }
  return -1
}

// 哈希表法
const findRepeateNumber2 = (num)=>{
  
}