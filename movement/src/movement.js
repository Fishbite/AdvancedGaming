// ****** Moving Sprites on The Canvas ****** \\

import { assets } from "../lib/assets.js";

import { makeCanvas, stage, circle, render } from "../lib/importer.js";

// ****** Set Up ****** \\
let canvas = makeCanvas(256, 256, "1px solid black", "#ddccab");
stage.width = canvas.width;
stage.height = canvas.height;

/* ****** Bouncing Ball With No Physics ******
// A ball sprite
let ball = circle(32, "grey", "black", 2, 96, 128);

// set the ball's velocity
ball.vx = 3;
ball.vy = 2;

// Start the game loop.
// A basic ball bouncing off the edges of the canvas:
// bouncingBallLoop();

function bouncingBallLoop(timestamp) {
  // tell the browser to call loop function at intervals of ~ 16ms
  // around 60fpps NB: the browser will only call the loop when
  // it is optimal to do so and it's not busy doing other tasks
  requestAnimationFrame(bouncingBallLoop);
  //   console.log(`Elapsed time: ${timestamp}`);

  // move the ball
  ball.x += ball.vx;
  ball.y += ball.vy;

  // bounce the ball off the canvas edges left and right
  if (ball.x < 0 || ball.x + ball.diameter > canvas.width) {
    ball.vx = -ball.vx;
  }

  // bounce the ball off the top and bottom of the canvas
  if (ball.y < 0 || ball.y + ball.diameter > canvas.height) {
    ball.vy = -ball.vy;
  }

  render(canvas);
}

****** End Bouncing Ball With No Physics ****** */

// ****** Bouncing Ball With Some Physics ****** ||

// ****** Add a Bit of Physics: Acceleration & Friction ****** \\

function randInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)); // inc min excl max
}

let ball = circle(32, "grey", "Black", 2, 0, 222);

// Set the ball's velocity to zero
ball.vx = randInt(5, 25);
ball.vy = randInt(5, 25);

// add new props to the sprite

ball.accelerationX = 0.2;
ball.accelerationY = -0.2;

// Physics props
ball.gravity = 0.3;
ball.frictionX = 1;
ball.frictionY = 1;

acceleratedStickyLoop();
// as soon as the ball hits the edge of the canvas, the acceleration
// is set to zero and friction is set to 0.98 so the ball will
// eventually stop

function acceleratedStickyLoop() {
  requestAnimationFrame(acceleratedStickyLoop);
  console.log(Math.floor(ball.x), Math.floor(ball.y));

  // apply gravity to the y velocity
  ball.vy += ball.gravity;

  // apply acceleration to the velocity
  ball.vx += ball.accelerationX;
  ball.vy += ball.accelerationY;

  // apply friction to the velocity
  ball.vx *= ball.frictionX;
  ball.vy *= ball.frictionY;

  // move the ball by applying the new calculated velocity
  // to the ball's x and y position
  ball.x += ball.vx;
  ball.y += ball.vy;

  // bounce the ball of the edge of the canvas and slow it to a stop

  // Bounce off left and right canvas edges
  if (ball.x < 0 || ball.x + ball.diameter > canvas.width) {
    //Turn on friction
    ball.frictionX = 0.99;
    ball.frictionY = 0.99;
    //Turn off acceleration
    ball.accelerationX = 0;
    ball.accelerationY = 0;
    //Bounce the ball on the x axis
    ball.vx = -ball.vx;
  }

  // Bounce off top and bottom canvas edges
  if (ball.y < 0 || ball.y + ball.diameter > canvas.height) {
    //Turn on friction
    ball.frictionX = 0.99;
    ball.frictionY = 0.99;
    //Turn off acceleration
    ball.accelerationX = 0;
    ball.accelerationY = 0;
    //Bounce the ball on the y axis
    ball.vy = -ball.vy;
  }

  render(canvas);
}
