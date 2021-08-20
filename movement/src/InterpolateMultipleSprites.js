/*
    Fixed Timestep, Variable Rendering With Interpolation Game Loop
                  ++++++ Multiple Sprites ++++++
*/

import {
  stage,
  makeCanvas,
  circle,
  render,
  renderWithInterpolation,
} from "../lib/importer.js";

import { contain } from "./contain.js";
import { colours } from "../lib/utils.js";

// get a random number inclusive of and between min and max
let randInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let randFloat = function (min, max) {
  return min + Math.random() * (max - min);
};

// ****** Setup the stuff needed
// make canvas
let canvas = makeCanvas(256, 256, "2px solid grey", "FireBrick");
stage.width = canvas.width;
stage.height = canvas.height;

let balls = [];

// create some balls
for (let i = 0; i < 5; i++) {
  // create a ball
  let ball = circle(32);

  // set the ball's colour
  ball.fillStyle = colours[randInt(0, colours.length - 1)];
  // console.log(ball.fillStyle);
  // and the ball's stroke colour and line width
  ball.strokeStyle = "black";
  ball.lineWidth = 2;
  ball.alpha = 0.5;

  // set a random position
  ball.y = randInt(0, canvas.height - ball.diameter);
  ball.x = randInt(0, canvas.width - ball.diameter);
  // console.log(ball.x, ball.y, ball.localBounds);

  // set a random velocity
  ball.vx = randInt(-10, 10);
  ball.vy = randInt(-10, 10);

  // Add physics properties
  ball.gravity = 0.3;
  ball.frictionX = 1;
  ball.frictionY = 0;
  ball.mass = 0.99; // set > 1 for normal behaviour

  // Add and set acceleration and friction props
  ball.accelerationX = randFloat(-0.2, 0.2);
  ball.accelerationY = randFloat(-0.2, 0.2);
  ball.frictionX = 1;
  ball.frictionY = 1;

  balls.push(ball);
  // console.log(balls);
}

/* ****** Fixed TimeStep, Variable Rendering with Interpolation ****** */

let fps = 30, // frames per second
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
    // function to loop through the stage's children
    capturePreviousPositions(stage);

    update();

    // reduce the lag counter
    lag -= frameDuration;
  }

  let lagOffset = lag / frameDuration;

  renderWithInterpolation(canvas, lagOffset); // disable to enable render(canvas);
  // render(canvas); // enable this to run without interpolation

  previous = timestamp;
}

// update function that contains the game logic
function update() {
  // ball.previousX = ball.x;
  // ball.previousY = ball.y;

  // loop through the balls
  // Do the normal stuff to move them
  balls.forEach((ball) => {
    ball.vy += ball.gravity; // apply gravity
    ball.vx *= ball.frictionX; // apply friction
    ball.x += ball.vx; // move on x
    ball.y += ball.vy; // move on y
    // console.log(ball.vy);

    let collision = contain(ball, stage.localBounds, true, () => {
      ball.fillStyle = colours[randInt(0, colours.length - 1)];
    });

    if (collision === "bottom") {
      // console.log(collision);
      ball.frictionX = 0.96;
    } else {
      ball.frictionX = 1;
    }

    // Stop the ball from going into hyperdrive!
    if (ball.vy > 15) {
      ball.vy /= 2;
    }
  });
}

function capturePreviousPositions(stage) {
  // loop through the children
  stage.children.forEach((sprite) => {
    setPreviousPosition(sprite);
  });

  function setPreviousPosition(sprite) {
    // set previousX & Y which will be used by interpolation
    sprite.previousX = sprite.x;
    sprite.previousY = sprite.y;

    // loop through all the sprite's children
    if (sprite.children && sprite.children.length > 0) {
      sprite.children.forEach((child) => {
        setPreviousPosition(child);
      });
    }
  }
}

gameLoop();
