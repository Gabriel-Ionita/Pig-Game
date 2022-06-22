'use strict';

//-----Pig Game----

//Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions

const init = function () {
  //Array to hold the csores
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('plyer--active');
  player0EL.classList.remove('plyer--active');
};
init();

const swichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  //veryfy wich player is active and swich
  //"Ternary operator" is activePlayer 0 return 1 else 0,  value 1 or 0 to activePlayer Swich to next player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //.toglle adds or removes a class if is there
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Rolling the dice .functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating dice roll number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Remove hiden img, Display dice img
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, swich to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      //Active player current--0 or current--1
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //else reser currentScore to 0 and swich player
      swichPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // if plying is true the click function will work
  if (playing) {
    //1. add current score to active player
    //ex scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore;
    //Active player score--0 or score--1 and store the value in html score-- ID
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player is >=100
    // finish game with current player win
    if (scores[activePlayer] >= 100) {
      //Finish Game
      // playing will be false when scores[activePlayer] is >= 100 and the btnRoll ,btnHold will stop working.
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //swich to next player
      swichPlayer();
    }
  }
});

//****this reset the game to restart new game*****
btnNew.addEventListener('click', init);
