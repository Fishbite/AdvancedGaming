/* ****** Pointer Testing ***** */
import { stage, render, makeCanvas } from "../lib/importer.js";
import { makePointer } from "./pointer.js";
import { assets } from "../lib/assets.js";

let canvas = makeCanvas(256, 256, "2px solid orange");
stage.width = canvas.width;
stage.height = canvas.height;

let output = document.getElementById("output");

// make the pointer and assign it to the canvas
let pointer = makePointer(canvas);

// add a custom press method
pointer.press = () => console.log("pointer pressed");

// and a release method
pointer.release = () => console.log("pointer released");

// a tap method
pointer.tap = () => console.log("pointer tapped");

// call the game loop
gameLoop();

function gameLoop() {
  requestAnimationFrame(gameLoop);

  // display the pointers properties in the <p> tag
  output.innerHTML = `Pointer Properties: <br>
  pointer.x: ${pointer.x} <br>
  pointer.y: ${pointer.y} <br>
  pointer.isDown: ${pointer.isDown} <br>
  pointer.isUp: ${pointer.isUp} <br>
  pointer.tapped: ${pointer.tapped} <br>
  `;

  render(canvas);
}
