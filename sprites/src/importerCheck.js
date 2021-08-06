/* ***** File to Test `importer.js` ****** */
console.log("OK!");

// import { makeCanvas } from "../lib/makeCanvas.js";

import {
  makeCanvas,
  rectangle,
  circle,
  sprite,
  line,
  group,
  text,
  stage,
  render,
  remove,
  frame,
  frames,
} from "../lib/importer.js";

import { assets } from "../lib/assets.js";

assets
  .load([
    "../images/animals.json",
    "../images/animals.png",
    "../images/button.json",
    "../images/cat.png",
    "../images/fairy.png",
    "../images/hedgehog.png",
    "../images/tiger.png",
  ])
  .then(() => setup());

function setup() {
  console.log("setup OK!");
  // Setup the canvas and stage
  let canvas = makeCanvas(512, 512, "2px solid black", "#ffeeff");
  stage.width = canvas.width;
  stage.height = canvas.height;

  // ****** Make sprites here ****** \\

  // Use bluebox as a parent sprite
  let blueBox = rectangle(
    100,
    100,
    "RGB(0, 0, 255)",
    "rgb(255, 100, 0)",
    0,
    100,
    0
  );
  // Set the pivot points to the center of the sprite
  blueBox.pivotX = 0.5;
  blueBox.pivotY = 0.5;

  // helper function to return radians from degrees
  function deg(degrees) {
    return degrees * (Math.PI / 180);
  }
  console.log(deg(45)); // 0.7853981633974483

  // then we can rotate the sprite like this:
  blueBox.rotation = deg(45); // rads = deg * (Math.PI / 180)
  //blueBox.shadow = true;

  // goldbox is the first child of bluebox
  let goldbox = rectangle(50, 50, "gold");
  blueBox.addChild(goldbox);
  // Assign the goldbox's local coord's relative to bluebox
  goldbox.x = 25;
  goldbox.y = 25;

  let xLine = line("black", 1, 0, 50, 300, 50);
  let yLine = line("black", 1, 150, 0, 150, 150);

  // render the sprites on canvas
  render(canvas);
}
