'use strict';
/*
    JavaScript Basics
    Paul Funston

    Utility Functions
*/

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}


function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
} 

// get a random number from a to b inclusive
function numFrom(a, b) {
    return Math.trunc(Math.random() * (b - (a + 1)) + a);
}

// Print
function print(arg) {
    console.log(arg);
}



export {select, onEvent, selectAll, sleep, numFrom, print};