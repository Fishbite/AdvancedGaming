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
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  sea,
  sand;

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

  /* masking to create the sea waves */
  // a transparent circle to cut out a
  // bit of a rectangle
  let waveSize = screenWidth / 8;

  let waves = [];
  for (let i = 2; i < 8; i++) {
    // make the waves in this loop
    waves[i] = circle(waveSize, "rgba(0, 0, 0, 0)");
    console.log(waves[i]);
  }
  console.log(waves);

  /* ****** wave 1 ****** */
  c2 = circle(waveSize, "rgba(0, 0, 0, 0)");
  c2.mask = true; // set mask property

  // a rectangle to cut a bit out of
  let rect3 = rectangle(waveSize, 8, "lightblue");

  // add rectangle as a child of circle
  // the circle will mask the rectangle
  c2.addChild(rect3);

  // position the cut-out at the bottom of rect1
  rect1.putBottom(c2, 0, -8);

  /* ****** wave 2 ****** */
  c3 = circle(waveSize, "rgba(0, 0, 0,0)");
  c3.mask = true;
  let rect4 = rectangle(waveSize, 8, "lightblue");
  c3.addChild(rect4);
  // put cut-out to the right of the last one
  c2.putRight(c3);

  c4 = circle(waveSize, "rgba(0,0,0,0)");
  c4.mask = true;
  let rect5 = rectangle(waveSize, 8, "lightblue");
  c4.addChild(rect5);
  c3.putRight(c4);

  c5 = circle(waveSize, "rgba(0,0,0,0)");
  c5.mask = true;
  let rect6 = rectangle(waveSize, 8, "lightblue");
  c5.addChild(rect6);
  c4.putRight(c5);

  c6 = circle(waveSize, "rgba(0,0,0,0)");
  c6.mask = true;
  let rect7 = rectangle(waveSize, 8, "lightblue");
  c6.addChild(rect7);
  c5.putRight(c6);

  c7 = circle(waveSize, "rgba(0,0,0,0)");
  c7.mask = true;
  let rect8 = rectangle(waveSize, 8, "lightblue");
  c7.addChild(rect8);
  c6.putRight(c7);
  /* ***** end masking to create sea ***** */

  sea = line("lightblue", 8, 0, columnBottom, screenWidth, columnBottom);
  sea.shadow = true;

  // mask an image
  /*
  let cMask = circle(64);
  cMask.mask = true;
  let cat = sprite(assets["../images/cat.png"]);
  cMask.addChild(cat);
  */

  sand = line("goldenrod", 4, 0, 0, screenWidth, 0);
  stage.putBottom(sand, -stage.halfWidth, -2);

  aniLoop();
}

function aniLoop() {
  requestAnimationFrame(aniLoop);

  let vx = 1; // velocity

  c2.x += vx;
  if (c2.x > stage.width) c2.x = -32;

  c3.x += vx;
  if (c3.x > stage.width) c3.x = -32;

  c4.x += vx;
  if (c4.x > stage.width) c4.x = -32;

  c5.x += vx;
  if (c5.x > stage.width) c5.x = -32;
  c6.x += vx;
  if (c6.x > stage.width) c6.x = -32;

  c7.x += vx;
  if (c7.x > stage.width) c7.x = -32;

  /* **** running waves animation ****
   ***** ------------------------- **** */

  render(canvas);
}
