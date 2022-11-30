'use strict';
/*
    Object-oriented JavaScript
    Paul Funston

    Type Attack game
*/

import {Score} from './Score.js'
import { onEvent, select } from './util.js'

const startBtn = select('.start');



onEvent('click', startBtn, () => {
  startGame();
});

function startGame() {
  // if button says start change value to Try Again, else resetGame()
  // randomize word array
  // display gameinfo(timer points)
  // playBGM()
    // start timer()
      // load word()
    // load input()
    // set Input focus
}



function endGame() {
  //  displayScore(score tryAgain)
  // stopBGM()

}

function resetGame() {
  // timer to 99
  // score to 0
  
}

function playBGM() {
  //start music track

  // increase Tempo after 60?
}

function stopBGM() {
  // stop music
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
