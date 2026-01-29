class Student {
  name;
  roll;
static count=0;

  constructor(name, roll) {
    this.name = name;
    this.roll = roll;
  }

  display() {
    console.log(`${this.name} has a roll no of ${this.roll}`);
  }
static incrementCount() {
  console.log(++this.count)
  }

}


const newStudent = new Student("ram", 123);
newStudent.display();
Student.incrementCount();
