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
