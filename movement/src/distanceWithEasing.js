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

/* ****** Distance testing ****** */

import {
  stage,
  makeCanvas,
  circle,
  line,
  render,
  text,
} from "../lib/importer.js";

import { assets } from "../lib/assets.js";
import { distance } from "./distance.js";
import { makePointer } from "./pointer.js";

assets.load(["../fonts/puzzler.otf"]).then(() => setup());

// shared variables:
let canvas, pointer, message, c1, c2, c3, c4, connection;

function setup() {
  canvas = makeCanvas(256, 256, "2px solid orange");
  stage.width = canvas.width;
  stage.height = canvas.height;

  message = text("0", "16px puzzler", "darkgreen", 8, 8);

  c3 = circle(32, "lightpink", "darkblue", 4);
  c1 = circle(32, "orange", "orangered", 4);
  c2 = circle(8, "darkblue", "orangered", 2);

  stage.putCenter(c3);
  stage.putCenter(c1, -32, -32);
  stage.putCenter(c2, 32, 32);

  connection = line(
    "lightblue",
    2,
    c1.centerX,
    c1.centerY,
    c2.centerX,
    c2.centerY
  );

  pointer = makePointer(canvas);

  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);

  c2.x = pointer.x - c2.halfWidth;
  c2.y = pointer.y - c2.halfHeight;

  connection.ax = c1.centerX;
  connection.ay = c1.centerY;
  connection.bx = c2.centerX;
  connection.by = c2.centerY;

  let circleCenters = distance(c1, c2);

  message.content = `Line length ${Math.floor(circleCenters)}`;

  // the follow easing function used here
  followEase(c3, pointer, 0.025);

  render(canvas);
}

/* ****** A Function Employing a Standard Easing formula ****** */
// Easing makes a sprite gently settle into a destintion point
function followEase(follower, leader, speed) {
  //Figure out the distance between the sprites
  let vx = leader.centerX - follower.centerX,
    vy = leader.centerY - follower.centerY,
    distance = Math.sqrt(vx * vx + vy * vy);

  //Move the follower if it's more than 1 pixel
  //away from the leader
  if (distance >= 1) {
    follower.x += vx * speed;
    follower.y += vy * speed;
  }
}

/*
function followEase(follower, leader, speed) {
  //Figure out the distance between the sprites
  let vx = leader.centerX - follower.centerX,
    vy = leader.centerY - follower.centerY,
    distance = Math.sqrt(vx * vx + vy * vy);

  //Move the follower if it's more than 1 pixel
  //away from the leader
  if (distance >= 1) {
    follower.x += vx * speed;
    follower.y += vy * speed;
  }
}
*/

/*
function setup() {
  //Make the canvas and initialize the stage
  canvas = makeCanvas(256, 256);
  stage.width = canvas.width;
  stage.height = canvas.height;

  //Create a circle sprite offset by 32 pixels to the
  //left and top of the stage
  c1 = circle(32, "gray");
  stage.putCenter(c1);

  //Make the pointer
  pointer = makePointer(canvas);

  //Start the game loop
  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);

  //Make the circle ease towards the pointer's position
  followEase(c1, pointer, 0.1);

  //Render the canvas
  render(canvas);
}
*/
