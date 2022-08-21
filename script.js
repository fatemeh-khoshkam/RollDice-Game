'use strict';

//Elements
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
let scorePlayer0 = document.querySelector('#score--0');
let scorePlayer1 = document.querySelector('#score--1');
let currScorePlayer0 = document.querySelector('#current--0');
let currScorePlayer1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let activePlayer = 0;
let currentScore, scores, playing;

function primitive() {
  playing = true;
  scores = [0, 0];
  currentScore = 0;

  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  scorePlayer0.textContent = scores[0];
  scorePlayer1.textContent = scores[1];
  currScorePlayer0.textContent = 0;
  currScorePlayer1.textContent = 0;

  player0.classList.add('player--active');
}
primitive();

const chkActivePlayer = () => {
  if (player0.classList.contains('player--active')) activePlayer = 1;
  else if (player1.classList.contains('player--active')) activePlayer = 0;
};

const addCurrent = () => {
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
};

const switchPlayers = () => {
  currentScore = 0;
  chkActivePlayer();
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

rollBtn.addEventListener('click', () => {
  if (playing) {
    let randomDiceRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDiceRoll}.png`;

    if (randomDiceRoll !== 1) {
      currentScore += randomDiceRoll;
      addCurrent();
    } else {
      currentScore = 0;
      addCurrent();
      switchPlayers();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayers();
    }
  }
});

newBtn.addEventListener('click', primitive);
