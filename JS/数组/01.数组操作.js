// 增
let color = []
// push 接受任意数量参数 并将它们添加到数组末尾 返回数组的新长度
let count = color.push("J", "Y")

// unshift() 接受任意数量参数 并将它们添加到数组开头 返回数组的新长度
let count1 = color.unshift("7")

// splice() 传入三个参数，分别是开始的位置、删除的元素数量、插入的元素，返回空数组
let count2 = color.splice(1, 0, "1")

// concat() 首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组
let colors = ["red", "yellow", "blue"]
let colors2 = ["1", "2", "3"]
let newColors = colors.concat(colors2)

// 删
// pop() 方法用于删除数组的最后一项，同时减少数组的length值，返回被删除的项
let colors3 = ["red", "green"]
let item = colors3.pop() // green

// shift() 方法用于删除数组的第一项，同时减少数组的length值，返回被删除的项
let colors4 = ["red", "green"]
let item2 = colors4.shift() // red

// splice() 传入三个参数 
let colors5 = ["red", "yellow", "blue"]
let removed = colors5.splice(1, 1) // yellow

// slice() 用于创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组
let colors6 = ["red", "yellow", "blue", "sky"]
let color1 = colors6.slice(1)
let color2 = colors6.slice(1, 3)// ["red","yellow"]

// 改
// splice()传入三个参数
let colors7 = ["red", "yellow", "blue", "sky"]
let removed2 = colors7.splice(1,1,"j","y") //yellow

// 查




