/*
Practice
===========

Create a class hierarchy related to a school catalog. The minimum classes should be:

* Person
  * Student
  * Employee
     * Administrator
     * Teacher
	* DepartmentHead
	
All information regarding the entities must be stored in SQL, so a static method named "create" must be used to
fetch the data from SQL and instantiate the entity (explain why this is needed).

Give them some miscellaneous properties and methods, such as (name, birthDate, grades etc and fire(),
promote(), evaluateStudent() etc). Be careful the state must be persistent -> SQL

Create one version with the "class" keyword and one in the explicit "prototype" + "function" way
*/

class Person {

    constructor(firstName, lastName, birthDate) {
        this._firstName = firstName
        this._lastName = lastName
        this._birthDate = birthDate
    }   
    get fullName() {
        return this._firstName + ' ' + this._lastName
    }
    get birthDate() {
        return this._birthDate
    }

    static sql_connect() {
        
        var pg = require("pg");
        var connectionString = "postgres://postgres:3838@uni/localhost:5432/Unidb";
        console.log("Connected")

        var pgClient = new pg.Client(connectionString);
        return pgClient;
    }
}
class Student extends Person {
    constructor(firstName, lastName, birthDate, year, gradesNumber, grades) {
        super(firstName, lastName, birthDate) 
        this._year = year;
        this._gradesNumber = gradesNumber;
        this._grades = grades;
    }
    add_grade(new_grade) {
        this._gradesNumber += 1;
        this._grades.push(new_grade);
    }
    get passed() {
        for (currentGrade in grades)
            if (currentGrade < 5)
                return false;
        return true;
    }
    static create_students() {
        var pg = Student.sql_connect()
        pg.query('CREATE TABLE students', function(err, result) {
                if (err) {
                    console.log("Create error")
                    throw err;
                }
                console.log(result)}
                )
        }

    static get_students() {
        var pg = Student.sql_connect()
        pg.query('SELECT * from students', function(err, result) {
                if (err) {
                    console.log("Select error")
                    throw err;
                }
                console.log("Created Table")}
                )
        }

    static add_student(current_student) {
        var pg = Student.sql_connect()

        let fields = [current_student._firstName, current_student._lastName, current_student._birthDate]

        pg.query('INSERT INTO students (firstName, lastName, birthDate), VALUES ?', fields, function(err, result){
            if (err) {
                console("Insert error")
                throw err;
            }
    
            console.log('A new student inserted')}
        )
    }
}


class Employee extends Person {
    
    constructor(firstName, lastName, birthDate, hireDate, active) {
        super(firstName, lastName, birthDate);
        this._hireDate = hireDate;
        this._active = active;
    }
    get years_worked() {
        return this._years_worked
    }
    set years_worked(years) {
        this._years_worked = years;
    }
    fire() {
        this._active = false
    }
}
class Administrator extends Employee {

    constructor(firstName, lastName, birthDate, hireDate, active, keys, role) {
        super(firstName, lastName, birthDate, hireDate, active)
        this._keys = keys
        this._role = role
    }
}
class Teacher extends Employee {

    constructor (firstName, lastName, birthDate, hireDate, active, subject, PhD) {
        super(firstName, lastName, birthDate, hireDate, active)
        this._subject = subject
        this._PhD = PhD
    }
}

class DepartmentHead extends Teacher {

    constructor(firstName, lastName, birthDate, hireDate, active, subject, PhD, departmentName) {
        super(firstName, lastName, birthDate, hireDate, active, subject, PhD)
        this._departmentName = departmentName;
    }
}

new_student = new Student('Adi', 'Badea', '30-04-1999')

Student.create_students()
Student.add_student(new_student)

