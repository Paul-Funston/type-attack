'use strict';
/*
    Object-oriented JavaScript
    Paul Funston

    Type Attack game
*/

import {Score} from './Score.js'
import { onEvent, select } from './util.js'

const dictionary = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];

let activeDictionary = [];
let highscores = [];

const backgroundMusic = new Audio('./assets/media/bgm.wav');
backgroundMusic.type = 'audio/wav';

const swoosh = new Audio('./assets/media/Swooosh.wav');
swoosh.type = 'audio/wav';



const gameTime = 99;  // How long is a round in seconds
const startBtn = select('.start');
const restartBtn = select('.restart');
const statusDisplay = select('.status');
const timerDisplay = select('.time');
const pointsDisplay = select('.points');
const targetDisplay = select('.target');
const playerWordInput = select('.player-word');
const resultDisplay = select('.score');
const resultModal = select('.result');
const spaceShip = select('.form-ship figure');

let points = 0;
let time = gameTime;
let interval;
let timeout;
let timeoutAnimation;
let target;


onEvent('click', startBtn, () => {
  startGame();
  toggleModal();
});

onEvent('click', restartBtn, () => {
  startGame();
});

onEvent('keyup', playerWordInput, function(event) {
  if (time > 0) {
    checkWord();
    fireLaser(event.keyCode);
  }
})

function startGame() {
  time = gameTime;
  points = 0;

  if (startBtn.innerHTML === 'Start') {
    // initializing for first play
    startBtn.innerHTML = 'Try Again';
    statusDisplay.style.visibility = 'visible';
    resultDisplay.style.backgroundImage = 'url(./assets/media/station.png)';
      //change modal result
  } else {
    resetGame();
  }

  flyIn();
  activateGameElements();

  nextWord();
}

function activateGameElements() {
  playerWordInput.value = '';
  playerWordInput.style.visibility = 'visible';
  playerWordInput.focus();

  targetDisplay.style.visibility = 'visible';
  targetDisplay.classList.remove('grow');

  timerDisplay.innerHTML = `<p> ${time}</p>`;
  pointsDisplay.innerHTML = `<p> ${points}</p>`;
  newDictionary();
  startTimer();
  playBGM();
}

function gameTimeout() {
  clearInterval(interval);
  let now = new Date();
  let percentage = points / dictionary.length;
  let score = new Score(now, points, percentage);
  displayScore(score);
  highscores.push(score);
  stopBGM();
  flyAway();

  targetDisplay.style.visibility = 'hidden';
  toggleModal();
  targetDisplay.classList.remove('grow');
}

function resetGame() {
  clearInterval(interval);
  clearTimeout(timeout);
  stopBGM();
}

function playBGM() {
  backgroundMusic.play();
}

function stopBGM() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

function checkWord() {
  let playerWord = playerWordInput.value.toString().trim().toLowerCase();
  let targetWord = target.toString().trim().toLowerCase();

  if (playerWord === targetWord) {
    targetDisplay.classList.remove('grow');
    swoosh.play();
    playerWordInput.value = '';
    points++;
    pointsDisplay.innerHTML = `<p> ${points}</p>`;   
    nextWord();
  }
}

function nextWord() {
  target = activeDictionary.pop().toLowerCase();
  targetDisplay.innerHTML = `<p>${target.toUpperCase()}</p>`;
  targetDisplay.firstElementChild.classList.add('flash');

  timeoutAnimation = setTimeout(function() {
    targetDisplay.classList.add('grow');
    targetDisplay.firstElementChild.classList.remove('flash');

  }, 200)
}


function newDictionary() {
  activeDictionary = [...dictionary];
  activeDictionary.sort(function() {return 0.5 - Math.random()});
  return activeDictionary
}

function startTimer() {
  interval = setInterval(function() {
    --time;
    timerDisplay.innerHTML = `<p> ${time}</p>`;

  }, 1000)
  timeout = setTimeout(gameTimeout, ((gameTime + 1) * 1000));
}

function displayScore(score) {
  let hits = score.hits;
  let percent = score.percent;
  let date = score.date;
  percent = Math.trunc(percent * 100);
  date = date.toDateString().slice(4, 15);
  resultDisplay.innerHTML = `<p>${hits} Hits!</p> <p>${percent}%</p>`;
  resultDisplay.append(startBtn);
}

function toggleModal() {
  resultModal.classList.toggle('hidden');
}


function fireLaser(keycode) {
  if (keycode >= 65 && keycode < 97) {
    const shootLaser = new Audio('./assets/media/laser.mp3');
    shootLaser.type = 'audio/mp3';
    shootLaser.playbackRate = 4;
    shootLaser.play();
  }

  let laser = document.createElement("div");
  laser.classList = "laser";
  select('form').append(laser);

  setTimeout(function() {
    laser.remove();
  }, 1000);

}

function flyAway() {
  engineOn();
  spaceShip.classList = 'fly-away';
  playerWordInput.style.visibility = 'hidden';
}

function flyIn() {
  engineOn();
  spaceShip.classList = 'fly-in';
  spaceShip.style.visibility = 'visible';
  playerWordInput.style.visibility = 'hidden';

}

function engineOn() {
  const engine = new Audio('./assets/media/flame.mp3');
  engine.type = 'audio.mp3';
  engine.play();
}