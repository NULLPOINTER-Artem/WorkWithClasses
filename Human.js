"use strict"

class Human {
    constructor({name, surname, age}) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    getFullName() {
        return `${name} ${this.surname}`;
    }

    setFullName(fullName) {
        fullName = fullName.split(' ');
        this.name = fullName[0];
        this.surname = fullName[1];
    }
}

class Teacher extends Human {
    constructor({name, surname, age, group = Teacher.#createGroup()}){
        super({name, surname, age});
        this.group = group;
    }

    static #createGroup = function (size = 5) {
        let tempArr = [];

        for(let i = 0; i < size; i++) {
            tempArr[i] = Student.createNewStudent();
        }

        return tempArr;
    }

    static setMarkByStudentName(teacherObj, mark, name) {
        [].find.call(teacherObj.group, (item) => item.name === name ? item.mark.push(mark) : false );
    }

    getListOfNamesByAverageMark() {
        return this.group.sort((a, b) => b.averageMark() - a.averageMark())
        .map( (item) => item.name );
    }

    getStudentByName(name) {
        return this.group.find( (item) => item.name === name);
    }

    removeStudentByName(name) {
        this.group.splice(this.group.indexOf(this.getStudentByName(name)), 1);
    }

    updateStudentByName(student, name) {
        this.group.splice(this.group.indexOf(this.getStudentByName(name)), 1, new Student(student));
    }
}

class Student extends Human {
    #specialization = '';

    constructor({name, surname, age, mark, specialization}) {
        super({name, surname, age});
        this.mark = mark;
        this.#specialization = specialization;
    }

    get specialization() {
        return this.#specialization;
    }

    averageMark() {
        return Math.round(this.mark.reduce( (acc, item) => acc += item, 0) / this.mark.length);
    }

    minMark() {
        return this.mark.sort( (a, b) => b - a )[mark.length - 1];
    }

    maxMark() {
        return this.mark.sort( (a, b) => a - b )[mark.length - 1];
    }

    getFullName() {
        return Human.prototype.getFullName.call(this) + ' - student';
    }

    static createNewStudent() {
        let names = ['William', 'James', 'Ella', 'Jackson', 'Jack', 'Scarlett', 'Robert'];
        let surnames = ['Allen', 'Armstrong', 'Baker', 'Bell', 'Bennett', 'Collins', 'Ford'];
        let specializations = [
            'Service Systems', 'Systems Analysis', 'Software Engineering',
            'Technical Support', 'System and Network Configuration', 
            'Information Security', 'Data Management'
        ];

        return new Student({
            name: names[Math.abs(Math.floor(0 + Math.random() * names.length))],
            surname: surnames[Math.abs(Math.floor(0 + Math.random() * surnames.length))],
            age: Math.abs(Math.floor(18 + Math.random() * 18)),
            specialization: specializations[Math.abs(Math.floor(0 + Math.random() * specializations.length))],
            mark: function() {
                let tempArr = [];

                for(let i = 0; i < Math.abs(Math.floor(4 + Math.random() * 6 - 1)); i++) {
                    tempArr[i] = Math.abs(Math.floor(1 + Math.random() * 9));
                }

                return tempArr;
            }()
        });
    }
}

let group = [
    new Student({
        name: 'William',
        surname: 'Allen',
        age: 19,
        mark: [2, 3, 1, 10, 9],
        specialization: 'Data Management'
    }),
    new Student({
        name: 'James',
        surname: 'Collins',
        age: 29,
        mark: [2, 3, 1, 10, 9],
        specialization: 'Service Systems'
    }),
    new Student({
        name: 'Ella',
        surname: 'Baker',
        age: 20,
        mark: [2, 3, 1, 10, 9],
        specialization: 'Data Management'
    }),
];

let teacher = new Teacher({
    name: 'John',
    surname: 'Benett',
    age: 36,
    group: group
});

teacher.updateStudentByName({
    name: 'Katya',
    surname: 'Orlova',
    age: 20,
    mark: [7, 1, 2, 10, 9, 8],
    specialization: 'Building'
}, 'Ella')

console.log(teacher);