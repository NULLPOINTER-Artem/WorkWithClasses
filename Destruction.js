// С помощью деструктуризации создайте правильный объект.
let info = {
    neme: "Michael",
    surname: "Scofield",
    specializatin: "Architect"
}

let {neme: name, surname, specializatin} = info;

// Обновите функцию фичей деструктуризация
const student = {
    name: 'John Doe',
    age: 16,
    scores: {
      maths: 74,
      english: 63,
      science: 85
    }
};

function showInfo({name, scores: {maths = 0, english = 0, science = 0} = {}} = {}) {
    console.log('Hello, ' + name);
    console.log('Your Maths score is ' + maths);
    console.log('Your English score is ' + english);
    console.log('Your Science score is ' + science);
}

// showInfo(student);


// С помощью деструктуризации создайте новый массив (используйте rest и spread операторы)
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

let [first, second, ...rest] = rainbow;

rest.push(first, second);

console.log(rest);