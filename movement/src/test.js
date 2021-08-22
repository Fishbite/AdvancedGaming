// file for testing stuufff

/* ****** A Random Integer Function ******
function randInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)); // inc min excl max
}

for (i = 0; i < 10; i++) {
  let n = randInt(0, 15);
  if (n == 0 || n == 14 || n > 14) console.log("Yeah!", n);
  //   console.log(n);
}

****** End OF ****** */
/*
import {
  stage,
  makeCanvas,
  circle,
  sprite,
  render,
  renderWithInterpolation,
} from "../lib/importer.js";

import { contain } from "./contain.js";
*/
// get a random number inclusive of and between min and max
let randInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/* ****** Fixed TimeStep Variable Rendering with Interpolation ****** */
/*
let fps = 15, // frames per second
  previous = 0, // store for the previous timestamp
  frameDuration = 1000 / fps,
  lag = 0;

function gameLoop(timestamp) {
  // console.log(timestamp);
  requestAnimationFrame(gameLoop);

  if (!timestamp) timestamp = 0;
  let elapsed = timestamp - previous;

  if (elapsed > 1000) elapsed = frameDuration;

  lag += elapsed;

  while (lag >= frameDuration) {
    update();

    lag -= frameDuration;
  }

  let lagOffset = lag / frameDuration;

  renderWithInterpolation(canvas, lagOffset);
  // render(canvas);

  previous = timestamp;
}

// ****** Setup the stuff needed
// make canvas
let canvas = makeCanvas(256, 256);
stage.width = canvas.width;
stage.height = canvas.height;

// the ball sprite
let ball = circle(32, "grey", "black", 2, 96, 128);

// Add random velocity
ball.vx = randInt(5, 15);
ball.vy = randInt(5, 15);

// Add physics properties
ball.gravity = 0.3;
ball.frictionX = 1;
ball.frictionY = 0;
ball.mass = 1.2;

// update function that contains the game logic
function update() {
  ball.previousX = ball.x;
  ball.previousY = ball.y;

  // Do the normal stuff to move the sprite

  ball.vy += ball.gravity; // apply gravity

  ball.vx *= ball.frictionX; // apply friction

  ball.x += ball.vx; // move on x
  ball.y += ball.vy; // move on y

  let collision = contain(ball, stage.localBounds, true);

  if (collision === "bottom") {
    ball.frictionX = 0.96;
  } else {
    ball.frictionX = 1;
  }
}
gameLoop();
*/

/* ******  Keyboard Object Testing ****** \\

import { space, left, up, right, down } from "./keyboard.js";
import { makeCanvas, stage, text, render } from "../lib/importer.js";
import { assets } from "../lib/assets.js";

assets.load(["../fonts/puzzler.otf"]).then(() => setup());

let canvas;

function setup() {
  canvas = makeCanvas(256, 256);
  stage.width = canvas.width;
  stage.height = canvas.height;

  let message = text("Press a Key", "16px puzzler", "black", 16, 128);

  space.press = () => (message.content = "Arse!");
  space.release = () => {
    message.content = "Hole!";
  };

  up.press = () => (message.y -= 1);
  left.press = () => (message.x -= 1);
  right.press = () => (message.x += 1);
  down.press = () => (message.y += 1);

  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  render(canvas);
}

****** Keyboard End Testing ****** */

// /* ****** Pointer Testing ***** */

// import { stage, render, makeCanvas } from "../lib/importer.js";
// import { makePointer } from "./pointer.js";
// import { assets } from "../lib/assets.js";

// let output = document.getElementById("output");

// // make the pointer and assign it to the canvas
// let pointer = makePointer(canvas);

// // add a custom press method
// pointer.press = () => console.log("pointer pressed");

// // and a release method
// pointer.release = () => console.log("pointer released");

// // a tap method
// pointer.tap = () => console.log("pointer tapped");

// // call the game loop
// gameLoop();

// function gameLoop() {
//   requestAnimationFrame(gameLoop);

//   // display the pointers properties in the <p> tag
//   output.innerHTML = `Pointer Properties:
//   pointer.x: ${pointer.x}
//   pointer.y: ${pointer.y}
//   pointer.isDown: ${pointer.isDown}
//   pointer.isUp: ${pointer.isUp}
//   pointer.tapped: ${pointer.tapped}
//   `;

//   render(canvas);
// }
