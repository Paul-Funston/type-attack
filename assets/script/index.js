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
const backgroundMusic = new Audio('./assets/media/Ludum Dare 28 - Track 8.wav');
backgroundMusic.type = 'audio/wav';

const startBtn = select('.start');
const restartBtn = select('.restart');
const timerDisplay = select('.time');
const pointsDisplay = select('.points');
let points = 0;
let time = 99;
let interval,timeout,percentage;


onEvent('click', startBtn, () => {
  startGame();
});

onEvent('click', restartBtn, () => {
  stopBGM();
  startGame();
})

function startGame() {
  time = 99;
  points = 0;
  if (startBtn.value === 'Start') {
    startBtn.value = 'Try Again';
  } else {
    resetGame();
  }
  // if button says start change value to Try Again, else resetGame()
  newDictionary();
  startTimer();
  // display gameinfo(timer points)
  playBGM();
}



function gameTimeout() {
  interval.clearInterval();
  //  displayScore(score tryAgain)
  stopBGM()
}

function resetGame() {
  interval.clearInterval();
  timeout.clearTimeout();
  
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
  // isInputCorrect()
  // nextWord()
  // clearInput
  // playFX() 
}

function nextWord() {
  // same as loadWord or call loadWord()?
}


function newDictionary() {
  activeDictionary = [...dictionary];
  activeDictionary.sort(function() {return 0.5 - Math.random()});
  return activeDictionary
}

function startTimer() {
  interval = setInterval(function() {
    --time
    timerDisplay.innerHTML = `<p> ${time}</p>`
  }, 1000)
  timeout = setTimeout(gameTimeout, 99000)
}