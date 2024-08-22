'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKWEB

// Data--------------------------------------------------------------------------------------------------
const account1 = {
  owner: 'Prabhu Prathaban',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-GB', // de-DE
};

const account2 = {
  owner: 'Benjamin Tennyson',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Arthur Morgan',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account4 = {
  owner: 'Monkey D Luffy',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const accounts = [account1, account2, account3, account4];

// Elements------------------------------------------------------------------------------------------
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const labelTransferText = document.querySelector('.transfer__text');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//////////////Formating date
const formatDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed < 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

//////////////Formating Currency
const formatCurreny = function (value, locale, currency) {
  const options = {
    style: 'currency',
    currency: currency,
  };
  return new Intl.NumberFormat(locale, options).format(value);
};
////////Container Movements--------------------------------------------------------------------
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i, arr) {
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatDate(date, acc.locale);
    const displayCurrency = formatCurreny(
      Math.abs(mov),
      acc.locale,
      acc.currency
    );

    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${displayCurrency}</div>
        </div>
        
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Displaying Total account Balance--------------------------------------------------------------------
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurreny(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

//Displaying Summary for an Account--------------------------------------------------------------------
const calcDisplaySummary = function (acc) {
  // Creating Desposit (IN) Summary
  const inSummary = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurreny(inSummary, acc.locale, acc.currency);

  // Creating Withdrawal (OUT) Summary
  const outSummary = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurreny(
    Math.abs(outSummary),
    acc.locale,
    acc.currency
  );

  // Creating INTERST Summary
  const interestSummary = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((interest, i, arr) => interest >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCurreny(
    interestSummary,
    acc.locale,
    acc.currency
  );
};

// Creating UserName in each Objects--------------------------------------------------------------------
const createUserNames = function (accs) {
  //forEach --> do some changes without returning (sideEffects)
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

//Update UI------------------------------------------------------------------------------
const updateUI = function (acc) {
  //Displaying Movements
  displayMovements(acc);

  //Balance
  calcDisplayBalance(acc);

  //Displaying Summary
  calcDisplaySummary(acc);
};

// LogOut Timer
const startLogOutTimer = function () {
  const tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//Login Authentication--------------------------------------------------------------------
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  //preventing form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  //give Number in inputLoginPin as value returns in string
  // '+inputLoginPin.value' is a type cohesion of converting String into Number
  if (currentAccount?.pin === +inputLoginPin.value) {
    //Displaying UI
    containerApp.style.opacity = 100;

    //Internationalization API Way of Date+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //Displaying Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    //Creating blur spot in nav
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //checking and Updating timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //update timer
    updateUI(currentAccount);
  }

  //Wrong Credentials Message Timer
  else {
    labelWelcome.textContent = 'Wrong Credentials';
    labelWelcome.style.color = 'red';
    setTimeout(function () {
      labelWelcome.textContent = 'Log in to get started';
      labelWelcome.style.color = '#444';
    }, 1000);
  }
});

///Transfering Amount to one to another--------------------------------------------------------------------
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  //Assigning values
  const amount = +inputTransferAmount.value;
  const receiveAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    receiveAccount &&
    receiveAccount?.userName !== currentAccount.userName &&
    amount <= currentAccount.balance
  ) {
    currentAccount.movements.push(-amount);
    receiveAccount.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiveAccount.movementsDates.push(new Date().toISOString());

    clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  } else {
    labelTransferText.textContent = 'Wrong Transaction';

    // Changes from Wrong to Transfer in 1s
    setTimeout(() => {
      labelTransferText.textContent = 'Transfer money';
    }, 1000);
  }
});

///Request Loan Feature--------------------------------------------------------------------
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      clearInterval(timer);
      timer = startLogOutTimer();

      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
});

///Close Account Feature--------------------------------------------------------------------
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    // console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

///Total Movements done
const overallBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log(overallBalance);

///Movements Sort Feature--------------------------------------------------------------------

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///Extra Practices
//Use of Remainder in DOM

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();

  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace(' INR', '')
  );
  console.log(movementsUI);
  Array.from(document.querySelectorAll('.movements__row')).forEach(
    (rows, i) => {
      if (i % 2 == 0) {
        rows.style.backgroundColor = '#222';
      }
    }
  );
});
