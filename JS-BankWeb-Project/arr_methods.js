'use strict';

let arr = ['a', 'b', 'c', 'd', 'e'];

//Slice Method --> doesn't change original array
let arrSlice = arr.slice(2); //[ c , d , e ]
arrSlice = arr.slice(1, 2); // [ b ]
console.log(arrSlice);
console.log(arr);

//Splice Method --> change original array
let arrSplice = arr.splice(-1);
console.log(arrSplice); //[ e ]
console.log(arr); // [ a , b , c , d ]

//Reverse Method --> change original array
let arr1 = ['U', 'H', 'B', 'A', 'R', 'P'];
console.log(arr1.reverse());
console.log(arr1); // [ P , R , A , B , H , U ]

// join Method --> changes original array
console.log(arr1.join('')); //PRABHU

//ES2022 Method --> at
let arrNew = ['a', 'b', 'c', 'd'];
///// Retriving elements
console.log(arrNew[0]);
/////Last Element
console.log(arrNew[arrNew.length - 1]);
console.log(arrNew.slice(-1)[0]);
///// Retriving elements using 'at' method
console.log(arrNew.at(0));
console.log(arrNew.at(-1));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//// for of approach
for (const [i, mov] of movements.entries()) {
  if (mov > 0) {
    console.log(`Tranasaction ${i + 1} : ${mov} Credited`);
  }
  if (mov < 0) {
    console.log(`Tranasaction ${i + 1} : ${Math.abs(mov)} Debited`);
  }
}

console.log(
  `-------------------------FOREACH------------------------------------------`
);
//// forEach approach
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Tranasaction ${i + 1} : ${mov} Credited`);
  }
  if (mov < 0) {
    console.log(`Tranasaction ${i + 1} : ${Math.abs(mov)} Debited`);
  }
});

//// Data Transformation --> map

const euroToUsd = 1.1;

////Without Map method
const movementsForUSD = [];
for (const mov of movements) {
  movementsForUSD.push(Math.trunc(mov * euroToUsd));
}
console.log(movementsForUSD);

////With Map method

const movementsUSD = movements.map(function (mov, i, arr) {
  return Math.trunc(mov * euroToUsd);
});
console.log(movementsUSD);

////With Map method --> Arrow Function

const movementsArrowUSD = movements.map(
  (mov, i) =>
    `Tranasaction ${i + 1} : ${Math.abs(mov)} ${
      mov > 0 ? `Credited` : `Debited`
    }`
);
console.log(movementsArrowUSD);

// forEach based on Maps and Sets
const currencies = new Map([
  ['INR', 'Indian Rupees'],
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//// ForEach in Map
currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

////ForEach in Sets
const currenciesUnique = new Set(['INR', 'USD', 'INR', 'EUR', 'GBP']);
currenciesUnique.forEach(function (value, _, map) {
  //Set do not have Keys so '_' --> throwable Variable
  console.log(`${value}`);
});

////Data Transformation --> Filter
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

const depositsArrow = movements.filter(mov => mov > 0);
console.log(depositsArrow);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

////Data Transformation --> Filter

const balance = movements.reduce(function (acc, mov, i, arr) {
  return acc + mov;
}, 0);
console.log(balance);

const balanceArrow = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balanceArrow);

const maxValue = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  }
  return mov;
}, movements[0]);
console.log(maxValue);

//Method Chaining
const totalDeposits = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov);
console.log(totalDeposits);

//Data transformation --> find
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

let withdrawal;
for (const mov of movements) {
  if (mov < 0) {
    withdrawal = mov;
    break;
  }
}

console.log(firstWithdrawal);

//Some Method --> any (Boolean)
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

//Every Method --> returns true when all are true
const depositsCheck = movements.every(mov => mov > 0);
console.log(depositsCheck);

//Seperate callback in methods
const depositsFn = mov => mov > 0;
console.log(movements.some(depositsFn));
console.log(movements.every(depositsFn));
console.log(movements.filter(depositsFn));
console.log(movements.find(depositsFn));
console.log(movements.findIndex(depositsFn));
console.log(movements.indexOf(450));

//flat
const array1 = [1, [2, 3], 4, [5, 6]];
const array2 = [1, [2, 3], 4, [5, 6, [7, 9]]];
const array3 = [
  [12, 3],
  [3, 4],
  [5, 6],
];
console.log(array1.flat());
console.log(array2.flat(2));

//flatMap --> flat + map --> can go upto one level --> flat(1)
const flatmapArray = array3.flatMap(mov => mov);
console.log(flatmapArray);

//Sort Method

//return < 0 , a  b --> keep order
//return > 0 , a  b --> switch order
// const sorted = movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
// console.log(sorted)

//-------------------also can be done by below-----------------------------

//a < b => a-b = negative --> keep order
//a > b => a-b = positive --> switch order

//Ascending
const sortedAsc = movements.sort((a, b) => a - b);
console.log(sortedAsc);

//decending
const sortedDsc = movements.sort((a, b) => b - a);
console.log(sortedDsc);

//fill the array
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const b = new Array(7);
b.fill(1);
b.fill(5, 2, 6); //fill(value, start, end)
console.log(b);

//Array from for creation of array
const randomDice = Array.from({ length: 100 }, cur =>
  Math.trunc(Math.random() * 100)
);
console.log(randomDice);

//Array Practice --> reduce
const sums = movements.reduce(
  (sum, cur) => {
    sum[cur > 0 ? 'd' : 'w'] += cur;
    return sum;
  },
  {
    d: 0,
    w: 0,
  }
);
console.log(sums);
