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

let canvas = makeCanvas(512, 512, "2px solid black", "#ffeeff");

import { assets } from "../lib/assets.js";

assets.load([
  "../images/animals.json",
  "../images/animals.png",
  "../images/button.json",
  "../images/cat.png",
  "../images/fairy.png",
  "../images/hedgehog.png",
  "../images/tiger",
]);
