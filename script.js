'use strict';

////////////////////////-------------ELEMENTS----------------//////////////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const navLinkAll = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
const allTabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const allTabContents = document.querySelectorAll('.operations__content');
////////////////////////-------------MODAL WINDOW----------------//////////////////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////-----------SMOOTH SCROLLING----------------//////////////////////////////////////////

const s1Coords = section1.getBoundingClientRect();
console.log(s1Coords);

btnScrollTo.addEventListener('click', function (e) {
  // console.log(window.scrollX, window.scrollY);

  //Method 1 --> old
  // window.scrollTo(s1Coords.left, s1Coords.top);

  //Method 2 --> old with behaviour
  // window.scrollTo({
  //   top: s1Coords.top, //also be given as s1Coords.top + window.ScrollY --> (FOR OLDER BROWSERS)
  //   left: s1Coords.left,
  //   behavior: 'smooth',
  // });

  // Method 3 --> new
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

////////////////////////-----------PAGE NAVIGATION----------------//////////////////////////////////////////

//Without Event deligation NOT A OPTIMIZED WAY OF APPROACH

// navLinkAll.forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

//With Event deligation --> A OPTIMIZED WAY OF APPROACH

// 1. Selecting Parent Element
navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  // 2. Matching condition by Determining Parent Element

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Navigaytion Mouse handling
const handleOver = function (e, opacity) {
  console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener('mouseout', handleOver.bind(1));
//Tabbed Component
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if (!clicked) return;

  allTabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  allTabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
