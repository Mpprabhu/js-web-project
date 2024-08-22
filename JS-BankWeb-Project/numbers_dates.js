//conversion of String into Number-------------------------------------------
//Normal way:
console.log(Number('34'));

//type cohesion:
console.log(+'34'); //plus converts its following value into Number

// Parsing-----------------------------------------------------------
console.log(parseFloat('  2.5rem  '));
console.log(parseInt('  2.5rem  '));
console.log(parseInt('e532'));

// to check the number---------------------------------------------------------
console.log(Number.isFinite(24));
console.log(isFinite(23));
console.log(isFinite('20'));
console.log(isFinite('a'));
console.log(isFinite(23.0));
console.log(isFinite(23 / 0));

//Number methods --> isInteger
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));

//to check NaN --> Not a Number
console.log(isNaN(23 / 0));
console.log(isNaN(23));
console.log(isNaN('a'));
console.log(isNaN());

//Range of Random Numbers
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;

console.log(randomInt(2, 6));

//rounding Numbers
console.log(Math.trunc(20.7));
console.log(Math.trunc(20.2));

console.log(Math.ceil(20.3));
console.log(Math.ceil(20.7));

console.log(Math.round(20.7));
console.log(Math.round(20.3));

console.log(Math.floor(20.3));
console.log(Math.floor(20.8));

//Math trunc vs floor
console.log(Math.trunc(-23.4));
console.log(Math.floor(-23.4));

//Rounding Decimals
console.log(+(3.6454464).toFixed(4));

//Numeric Seperator --> _
console.log(23_45_46);
console.log(Number('23_34'));
console.log(+'23_34');
console.log(parseInt('23_34'));

//Timer Exercise --> SetTimeOut()
const ingredients = ['tomato', 'onions', 'cheese'];
const pizzaTimer = setTimeout(
  (ing1, ing2, ing3) => console.log(`You're Pizza has ${ing1} ${ing2} ${ing3}`),
  3000,
  ...ingredients
);
console.log(`Your Order is Ready!!!!!`);
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//////////Displaying Date---------------------------------------------------------------------------------------
//Normal Way+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const now = new Date();
// const date = `${now.getDate()}`.padStart(2, '0');
// const month = `${now.getMonth() + 1}`.padStart(2, '0');
// const year = now.getFullYear();
// const hour = `${
//   now.getHours() > 12 ? now.getHours() - 12 : now.getHours()
// }`.padStart(2, '0');
// const minutes = `${now.getMinutes()}`.padStart(2, '0');
// labelDate.textContent = `${date}/${month}/${year}, ${hour}:${minutes}`;

// Real Clock
setInterval(function () {
  const now = new Date();
  const hour = `${
    now.getHours() > 12 ? now.getHours() - 12 : now.getHours()
  }`.padStart(2, 0);
  const minute = `${now.getMinutes()}`.padStart(2, 0);
  const seconds = `${now.getSeconds()}`.padStart(2, 0);
  console.log(`${hour}:${minute}:${seconds}`);
}, 1000);
