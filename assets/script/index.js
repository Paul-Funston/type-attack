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
let sessionHighScores = [];

const backgroundMusic = new Audio('./assets/media/bgm.wav');
backgroundMusic.type = 'audio/wav';

const swoosh = new Audio('./assets/media/Swooosh.wav');
swoosh.type = 'audio/wav';



const gameTime = 60;  // How long is a round in seconds
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
const scoreBoard = select('.score-board');


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
  resultModal.classList.add('hidden');

  
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
  scoreBoard.style.visibility = 'hidden';
  scoreBoard.classList.remove('slide');



  if (startBtn.innerHTML === 'Start') {
    // initializing for first play
    startBtn.innerHTML = 'Try Again';
    statusDisplay.style.visibility = 'visible';
    restartBtn.style.visibility = 'visible';
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
  let percentage = (points / dictionary.length);
  let score = new Score(now, points, percentage);
  displayScore(score);
  sessionHighScores.push(score);
  saveScore(points, percentage);
  updateScoreBoard();
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

  resultDisplay.append(createHighScoreButton());
  resultDisplay.append(startBtn);
}

function toggleModal() {
  resultModal.classList.toggle('hidden');
}


function fireLaser(keycode) {

  if (keycode >= 65 && keycode < 97) {
    let color = 'rgb(255 0 0)';
    if(matchCharacter()) {
      color = 'rgb(0 255 0)'
    };
    const shootLaser = new Audio('./assets/media/laser.mp3');
    shootLaser.type = 'audio/mp3';
    shootLaser.playbackRate = 4;
    shootLaser.play();

    let laser = document.createElement("div");
    laser.classList = "laser";
    select('.ship-input').append(laser);
    laser.style.backgroundColor = color;
  
    setTimeout(function() {
      laser.remove();
    }, 1000);

  }
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

function matchCharacter() {
  let typedChar = playerWordInput.value.slice(-1);
  let inputLength = playerWordInput.value.length;
  let targetChar = target.slice(inputLength - 1, inputLength);
  return (typedChar === targetChar);
}

onEvent('blur', playerWordInput, function() {
  setTimeout(() => {
    playerWordInput.focus();
  }, 500)
})

function saveScore(points, percentage) {
  let scores = JSON.parse(localStorage.getItem('scores'));
  let highScores;
  let percent = (percentage * 100).toFixed(1);

  if (scores) {
    highScores = scores;
  } else {
    highScores = [];
  }

  let score = {
    'hits': points,
    'percent': percent,
    'date': formatDate(new Date())
  }

  highScores.push(score);

  highScores.sort((a,b) => {
    return b.hits - a.hits;
  })

  if (highScores.length > 9) {
    highScores = highScores.slice(0,9);
  }
  
  localStorage.setItem('scores', JSON.stringify(highScores));
}

function formatDate(date) {
  if (date instanceof Date) {
    const options = {
      // year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    return date.toLocaleDateString('en-ca', options);
  }
}

function updateScoreBoard() {
  let highScores = JSON.parse(localStorage.getItem('scores'));
  scoreBoard.innerHTML = '<p>High Scores<p>';
  if (highScores.length > 0) {
    for (let i = 0; i < highScores.length; i++) {
      let element = document.createElement('p');
      element.innerText = `#${i + 1}: ${highScores[i].hits} Hits ${highScores[i].percent}%`;
      scoreBoard.append(element);
    }
  }
};


function createHighScoreButton() {
  let element = document.createElement('div');
  element.classList = 'reveal-highscore';
  element.innerHTML = '<p>Highscores</p>';

  element.addEventListener('click', showHighScores);

  return element;
}


function showHighScores() {
  if (JSON.parse(localStorage.getItem('scores')).length > 0) {
    scoreBoard.style.visibility = 'visible'; 
    scoreBoard.classList.toggle('slide');
  }
}