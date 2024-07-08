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
const imgTargets = document.querySelectorAll('img[data-src]');
const slidesAll = document.querySelectorAll('.slide');
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

//Sticky Navbar
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Animation
const revealELement = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const observer = new IntersectionObserver(revealELement, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  observer.observe(section);
  section.classList.add('section--hidden');
});

// Lazy Images Loading
const imageLoading = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  // for optimization of netweork and for old phones with poor connectivity
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObersever = new IntersectionObserver(imageLoading, {
  root: null,
  rootMargin: '200px',
  threshold: 0,
});

imgTargets.forEach(image => imgObersever.observe(image));

// Slider
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

const dotContainer = document.querySelector('.dots');

const slider = function () {
  let currentSlide = 0;
  let maxSlide = slidesAll.length;

  const createDots = function () {
    slidesAll.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide = ${i}></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slidesAll.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // init
  const init = function () {
    createDots();
    goToSlide(0);
    activeDot(0);
  };
  init();

  // functions
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  // Click
  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click', nextSlide);

  // KeyBoard
  document.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    }
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const selectSlide = e.target.dataset.slide;
      goToSlide(selectSlide);
      activeDot(selectSlide);
    }
  });
};
slider();
