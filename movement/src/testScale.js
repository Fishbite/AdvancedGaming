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

let canvas, screenWidth, screenHeight, rect1, rect2, c1, sea, sand;

screenWidth = window.innerWidth;
screenHeight = window.innerHeight;

/*
window.addEventListener("resize", createCanvas, false);

function createCanvas() {
  if (screenWidth > screenHeight) {
    canvas = makeCanvas(screenWidth, screenHeight);
  } else {
    canvas = makeCanvas(screenWidth, screenWidth * 0.75);
  }

  return canvas;
}
createCanvas();
*/

function setup() {
  canvas = makeCanvas(screenWidth, screenHeight, "");
  stage.width = canvas.width;
  stage.height = canvas.height;

  let columnwidth = stage.width * 0.1;
  let columnHeight = stage.height * 0.5;
  let ColumnBottom = columnHeight + (stage.height - columnHeight) / 2;
  let columnPos = (stage.width * 0.75) / 2;
  console.log("columnPos:", columnPos);

  c1 = circle(columnwidth + 2, "rgba(0,0,0,0)", "rgb(120, 100, 80)", 2);

  rect1 = rectangle(columnwidth, columnHeight, "white", "rgb(120, 100, 80)", 4);
  stage.putCenter(rect1, -columnPos);
  // rect1.putCenter(c1, 0, -columnHeight / 2);
  rect1.putTop(c1, 0, columnwidth / 2);

  rect2 = rectangle(columnwidth, columnHeight);
  stage.putCenter(rect2, columnPos);

  sea = line("lightblue", 4, 0, ColumnBottom, screenWidth, ColumnBottom);
  sea.shadow = true;

  sand = line("goldenrod", 4, 0, 0, screenWidth, 0);
  stage.putBottom(sand, -stage.halfWidth, -2);

  aniLoop();
}

function aniLoop() {
  requestAnimationFrame(aniLoop);

  render(canvas);
}
