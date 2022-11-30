'use strict';
/*
    Object-oriented JavaScript
    Paul Funston

    Score class
*/

class Score {
  #date;
  #hits;
  #percent;

  constructor(date, hits, percent) {
    this.#date = date;
    this.#hits = hits;
    this.#percent = percent;
  }

  get date() {
    return this.#date;
  }

  get hits() {
    return this.#hits;
  }

  get percent() {
    return this.#percent;
  }
}


export { Score }