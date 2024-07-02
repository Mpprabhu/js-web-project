/////////EVENT BUBBLING//////////////////////
const randomNumber = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
});

// //////////////Cookies Message
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies to improve the website functionalities and analytics <button class="btn btn--close-cookie">Got it</button>`;
header.append(message);

const btnCloseCookie = document.querySelector('.btn--close-cookie');
btnCloseCookie.addEventListener('click', () => message.remove());

// DOM Traversing
const h1 = document.querySelector('h1');
// console.log(h1.parentNode.children);
const headerArr = Array.from(h1.parentNode.children);
console.log(headerArr);
headerArr.forEach(el => {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});

//Closet in DOM
const closeHeader = h1.closest('.header');
console.log(close);
closeHeader.style.backgroundColor = 'blue';

///Same when closet is given in terms of same element
const closeh1 = h1.closest('h1');
closeh1.style.backgroundColor = 'red';
