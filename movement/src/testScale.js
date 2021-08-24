console.log(window.innerWidth);

import {
  makeCanvas,
  stage,
  render,
  rectangle,
  line,
  circle,
  text,
} from "../lib/importer.js";

import { assets } from "../lib/assets.js";

assets.load(["../fonts.puzzler.otf"]).then(() => setup());

let canvas, screenWidth, rect1, rect2, l1;

function setup() {
  screenWidth = window.innerWidth * 0.95;
  canvas = makeCanvas(screenWidth, 256);
  stage.width = canvas.width;
  stage.height = canvas.height;

  rect1 = rectangle(stage.width * 0.1, 128);
  stage.putCenter(rect1, -128);

  rect2 = rectangle(stage.width * 0.1, 128);
  stage.putCenter(rect2, 128);

  l1 = line("lightblue", 4, 0, 192, screenWidth, 192);

  aniLoop();
}

function aniLoop() {
  requestAnimationFrame(aniLoop);

  render(canvas);
}
