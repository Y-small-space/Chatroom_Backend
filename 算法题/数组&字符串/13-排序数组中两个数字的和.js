let numbers = [1, 2, 4, 6, 10],
  target = 8;
// 二分法
const towSum1 = (arr, t) => {

}
// 双指针
const towSum2 = (arr, t) => {
  for (let i = 0, j = arr.length-1; ;) {
    const x = arr[i] + arr[j];
    if (x === t) {
      return [i, j]
    }
    if (x > t) {
      j--
    } else {
      i++
    }
  }
}


// 自己写的：
// const towSum2 = (arr, t) => {
//   let fast = 0;
//   let slow = 0;
//   let n = arr.length;

//   for (let i = 0; i < n; i++) {
//     fast = 0;
//     for (let j = 0; j < n; j++) {
//       const sum = arr[i] + arr[j];
//       if (sum === t) {
//         return [i, j]
//       }
//       fast++
//     }
//     slow++
//   }
//   return false;
// }

console.log(towSum2(numbers, target));