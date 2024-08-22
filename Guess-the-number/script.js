'use strict';

let secretNumber = Math.trunc(Math.random() * 20 + 1);

// let score = Number(document.querySelector('.score').textContent); //DOM Manipulated Value
let score = 20; //Value as variable to store in this Program
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  //given inside the listener to fetch updated data
  const guess = Number(document.querySelector('.guess').value);

  // No Number
  if (!guess) {
    displayMessage(`🚫No Number`);
  }
  // Player Wins!
  else if (guess === secretNumber) {
    displayMessage('🎉Correct Number🎉');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#2f9e44';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
    }
    document.querySelector('.highscore').textContent = highScore;
  }
  // Guessed Wrong!
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber ? '📈Guessed High' : '📉Guessed Low...'
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('😥You Lost the Game');
      document.querySelector('body').style.backgroundColor = '#c92a2a';
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  // location.reload();
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  score = 20;
  displayMessage('Start Guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#111';
  document.querySelector('.number').style.width = '15rem';
});
