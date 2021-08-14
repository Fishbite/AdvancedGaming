import { stage, makeCanvas, circle, render } from "../lib/importer.js";

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

  // bounce the ball off the canvas edges and slow it to a stop
  //
  // Left
  if (ball.x < 0) {
    ball.x = 0; // bring the ball back on the canvas
    // Note: this check ensures the ball is completely free
    // from the canvas boundries so it wont get stuck to them
    // when the velocity changes

    // the balls velocity is divided by its mass so that it
    // loses a bit of force every time it hits a canvas edge
    ball.vx = -ball.vx / ball.mass;
  }

  // Right
  if (ball.x + ball.diameter > canvas.width) {
    ball.x = canvas.width - ball.diameter; // bring the ball back on the canvas
    ball.vx = -ball.vx / ball.mass;
  }

  // Top
  if (ball.y < 0) {
    ball.y = 0; // bring the ball back on the canvas
    ball.vy = -ball.vy / ball.mass;
  }

  // Bottom
  // this checks if the ball is hitting the bottom of the
  // canvas and adds a frictionX val of 0.96 so that the
  // ball slows even more if it hits the ground
  if (ball.y + ball.diameter > canvas.height) {
    // bring the ball back on the canvas
    ball.y = canvas.height - ball.diameter;

    // reverse the direction and slow it down with the mass prop
    ball.vy = -ball.vy / ball.mass;

    // the ball's on the ground so add friction
    ball.frictionX = 0.96;
  } else {
    // remove the friction, it's not on the ground so set
    // frictionX to 1 so it moves freely through the air
    ball.frictionX = 1;
  }

  render(canvas);
}
