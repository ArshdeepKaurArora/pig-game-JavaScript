'use strict';

// Collect elements

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


let currentScore, finalScores, playing
let activePlayer = 0;
// starting conditions
const startGame = function () {
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.toggle('hidden');
  currentScore = 0;
  activePlayer = 0;
  finalScores = [0, 0];
  playing = true;
  player0El.classList.add("player--active");
  document.getElementById("current--0").textContent = 0
  document.getElementById("current--1").textContent = 0
};

startGame();

// set current score

const setCurrentScore = function (i) {
  const currentEl = document.getElementById(`current--${i}`);
  currentEl.textContent = currentScore;
};

// shift players

const shiftPlayer = function () {
  currentScore = 0;
  setCurrentScore(activePlayer);
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice > 1) {
      currentScore += dice;
      setCurrentScore(activePlayer);
    } else {
      shiftPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    finalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScores[activePlayer];
    if (finalScores[activePlayer] < 20) {
      shiftPlayer();
    } else {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
  }
});

btnNew.addEventListener('click', startGame);

