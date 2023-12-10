const person = {
  name:'JY'
}

function func(numA,numB){
  console.log(this)
  console.log(numA,numB)
  return numA+numB
}

// const res = func.apply(person,[12,2])
const res = func.bind(person,12,2)

console.log(res())