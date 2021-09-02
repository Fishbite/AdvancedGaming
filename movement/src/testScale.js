console.log(window.innerWidth);

import {
  makeCanvas,
  stage,
  render,
  rectangle,
  line,
  circle,
  text,
  sprite,
} from "../lib/importer.js";

import { assets } from "../lib/assets.js";

assets.load(["../fonts.puzzler.otf", "../images/cat.png"]).then(() => setup());

let canvas,
  screenWidth,
  screenHeight,
  rect1,
  rect2,
  c1,
  sea,
  sand,
  waves = [],
  waves2 = [];

screenWidth = window.innerWidth;
screenHeight = window.innerHeight;
// let waves = [];
// let waves2 = [];

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
  // set up the canvas and stage sprite
  canvas = makeCanvas(screenWidth, screenHeight, "");
  stage.width = canvas.width;
  stage.height = canvas.height;

  let message = text("Prototype", "32px puzzler", "blue");

  // vars to dictate the column sizes
  let columnwidth = stage.width * 0.1;
  let columnHeight = stage.height * 0.5;

  // convenience var to help position the sea
  let columnBottom = columnHeight + (stage.height - columnHeight) / 2;
  // position var for the columns
  let columnPos = (stage.width * 0.75) / 2;
  console.log("columnPos:", columnPos);

  // dome on top of rect1
  c1 = circle(columnwidth + 2, "rgba(0,0,0,0)", "rgb(120, 100, 80)", 2);

  rect1 = rectangle(columnwidth, columnHeight, "white", "rgb(120, 100, 80)", 4);
  stage.putCenter(rect1, -columnPos);
  // rect1.putCenter(c1, 0, -columnHeight / 2);
  rect1.putTop(c1, 0, columnwidth / 2);

  rect2 = rectangle(columnwidth, columnHeight, "red");
  stage.putCenter(rect2, columnPos);

  /* ****** masking to create the sea waves ****** */
  // a transparent circle to cut out a
  // bit of a rectangle
  let waveSize = screenWidth / 8;

  // rectangles to mask
  let rects = [];
  // loop to do the masking
  for (let i = 0; i < 8; i++) {
    // make the waves in this loop
    waves[i] = circle(waveSize, "rgba(0, 0, 0, 0)");
    waves[i].mask = true;
    rects[i] = rectangle(waveSize, 8, "lightblue");
    waves[i].addChild(rects[i]);
  }

  // position the first wave
  rect1.putBottom(waves[0], 0, -8);
  // position each wave to the right of the previous
  for (let i = 1; i < waves.length; i++) {
    waves[i - 1].putRight(waves[i]);
  }

  let rects2 = [];
  for (let i = 0; i < 8; i++) {
    // make the waves in this loop
    waves2[i] = circle(waveSize * 1.5, "rgba(0, 0, 0, 0)");
    waves2[i].mask = true;
    rects2[i] = rectangle(waveSize, 8, "lightblue");
    waves2[i].addChild(rects2[i]);
  }

  // position the first wave
  rect1.putBottom(waves2[0], 0, -8);
  // position each wave to the right of the previous
  for (let i = 1; i < waves2.length; i++) {
    waves2[i - 1].putRight(waves2[i]);
  }

  sea = line("lightblue", 8, 0, columnBottom, screenWidth, columnBottom);
  sea.shadow = true;

  // mask an image
  /*
  let cMask = circle(64);
  cMask.mask = true;
  let cat = sprite(assets["../images/cat.png"]);
  cMask.addChild(cat);
  */

  sand = line("goldenrod", 32, 0, 0, screenWidth, 0);
  stage.putBottom(sand, -stage.halfWidth, -16);

  aniLoop();
}

function aniLoop() {
  requestAnimationFrame(aniLoop);

  let vx = 1; // velocity

  for (let wave of waves) {
    wave.x += vx;
    if (wave.x > stage.width) wave.x = -wave.width;
  }

  for (let wave of waves2) {
    wave.x += vx / 1.25;
    if (wave.x > stage.width) wave.x = -wave.width;
  }
  // console.log("!!!", waves);

  // c2.x += vx;
  // if (c2.x > stage.width) c2.x = -32;

  // c3.x += vx;
  // if (c3.x > stage.width) c3.x = -32;

  // c4.x += vx;
  // if (c4.x > stage.width) c4.x = -32;

  // c5.x += vx;
  // if (c5.x > stage.width) c5.x = -32;
  // c6.x += vx;
  // if (c6.x > stage.width) c6.x = -32;

  // c7.x += vx;
  // if (c7.x > stage.width) c7.x = -32;

  /* **** running waves animation ****
   ***** ------------------------- **** */

  render(canvas);
}
