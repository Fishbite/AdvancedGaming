/*
    Fixed Timestep, Variable Rendering With Interpolation Game Loop
          Testing With Our Bouncing Ball With Physics
*/

import {
  stage,
  makeCanvas,
  circle,
  sprite,
  render,
  renderWithInterpolation,
} from "../lib/importer.js";

import { contain } from "./contain.js";

// get a random number inclusive of and between min and max
let randInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/* ****** Fixed TimeStep Variable Rendering with Interpolation ****** */

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

  renderWithInterpolation(canvas, lagOffset); // disable to enable render(canvas);
  // render(canvas); // enable this to run without interpolation

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
