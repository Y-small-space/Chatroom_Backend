class Employee{
  constructor(name,age){
    this.name = name
    this.age = age
  }

  say(){
    console.log(this.name+"-",this.age)
  }
}

let employee1 = new Employee("J",100)
let employee2 = new Employee("Y",100)

employee1.say()
employee2.say()