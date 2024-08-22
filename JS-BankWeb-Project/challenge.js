'use strict';

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const juliaCorrect = dogsJulia.slice(); //for shallow copy
  juliaCorrect.splice(0, 1);
  juliaCorrect.splice(-2);
  console.log(juliaCorrect);
  const dogsArr = juliaCorrect.concat(dogsKate);

  dogsArr.forEach(function (dogs, i, arr) {
    const type =
      dogs > 3 ? `an adult, and is ${dogs} years old` : `still a Puppy 🐶`;
    console.log(`Dog number ${i + 1} is ${type}`);
  });
};

checkDogs(dogsJulia, dogsKate);

// Challenge 2-------------------

const dogsArray = [5, 2, 4, 1, 15, 8, 3];
const calAverageHumanAge = function (dogsArray) {
  const humanAge = dogsArray.map((dog, i, arr) => {
    if (dog <= 2) {
      return 2 * dog;
    } else {
      return 16 + dog * 4;
    }
  });
  const filtered = humanAge.filter(age => age > 18);

  ///Method 1
  // const average = filtered.reduce((acc, age) => acc + age,0) / filtered.length;

  ///Method 2
  const average = filtered.reduce(
    (acc, age, _, arr) => acc + age / arr.length,
    0
  );
  console.log(average);
};
calAverageHumanAge(dogsArray);

// Method Chaining
const calcAverage = function (dogsArray) {
  const average = dogsArray
    .map(dogs => (dogs <= 2 ? 2 * dogs : 16 + dogs * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);
  console.log(average);
};
calcAverage(dogsArray);

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
dogs.forEach(dog => (dog.recommend = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

//2.
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah Dog ${
    sarahDog.curFood > sarahDog.recommend ? 'eats too much' : 'eats too little'
  }`
);

//3. 4.
const eatMuch = dogs
  .filter(dog => dog.curFood > dog.recommend)
  .map(dog => dog.owners)
  .flat();
console.log(`${eatMuch.join(' and ')} dogs eat too much`);

const eatlittle = dogs
  .filter(dog => dog.curFood < dog.recommend)
  .map(dog => dog.owners)
  .flat();
console.log(`${eatlittle.join(' and ')} dogs eat too little`);

//5.
const same = dogs.some(dog => dog.curFood === dog.recommend);
console.log(same);

//6.
const okay = dog =>
  dog.curFood > dog.recommend * 0.9 && dog.curFood < dog.recommend * 1.1;
const isOkay = dogs.some(okay);
console.log(isOkay);

//7.
const arrOkay = dogs.filter(okay);
console.log(arrOkay);

//8.
const arr = dogs.slice().sort((a, b) => a.recommend - b.recommend);
console.log(arr);
