import { stage, makeCanvas, circle, render } from "../lib/importer.js";

import { contain } from "./contain.js";

// get a random number inclusive of and between min and max
let randInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

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
ball.mass = 1.1;

// call the game loop to start it
gameLoop();

function gameLoop() {
  requestAnimationFrame(gameLoop);
  //   console.log(`vx: ${ball.vx} vy: ${ball.vy}`);

  // Apply gravity to the vertical velocity
  ball.vy += ball.gravity;

  // Friction: ball.frictionX = 0.96 if the ball is on the
  // ground and 1 if it's in the air
  ball.vx *= ball.frictionX;

  // move the ball by applying the new calculated velocity
  // to the ball's x and y position
  ball.x += ball.vx;
  ball.y += ball.vy;

  let collision = contain(ball, stage.localBounds, true, () => {
    console.log("Thud");
  });

  // Apply some friction if the sprite hits the bottom of the canvas
  if (collision === "bottom") {
    ball.frictionX = 0.96;
  } else {
    ball.frictionX = 1;
  }

  render(canvas);
}
