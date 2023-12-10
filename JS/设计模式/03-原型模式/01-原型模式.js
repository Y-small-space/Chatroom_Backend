// let employee1 = {
//   name: "J",
//   age: 100
// }

// let employee2 = {
//   name: "Y",
//   age: 18
// }

function Employee(name,age){
  this.name = name
  this.age = age
}

Employee.prototype.say = function(){
  console.log(this.name+'-',this.age)
}

let employee1 = new Employee("J",100)
let employee2 = new Employee("Y",100)

console.log(employee1,employee2)

employee1.say()
employee2.say()
