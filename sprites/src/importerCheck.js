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
    "../fonts/Moonhouse-yE5M.ttf",
    "../fonts/PetMe64.ttf",
    "../fonts/puzzler.otf",
  ])
  .then(() => setup());

function setup() {
  console.log("setup OK!");
  // Setup the canvas and stage
  let canvas = makeCanvas(512, 512, "2px solid black", "#5a5b5c");
  stage.width = canvas.width;
  stage.height = canvas.height;

  // ****** Make sprites here ****** \\

  // Use bluebox as the first parent sprite
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
  console.log("45deg = ", deg(45), "rads"); // 0.7853981633974483

  // then we can rotate the sprite like this:
  blueBox.rotation = deg(45); // rads = deg * (Math.PI / 180)
  //blueBox.shadow = true;

  // goldBox is the first child of bluebox
  let goldBox = rectangle(50, 50, "gold");
  blueBox.addChild(goldBox);
  // Assign the goldBox's local coord's relative to bluebox
  goldBox.x = 37.5;
  goldBox.y = 37.5;

  // lines through center of bluebox
  let xLine = line("black", 1, 0, 50, 300, 50);
  let yLine = line("black", 1, 150, 0, 150, 150);

  // Add a grey box to the gold box
  let greyBox = rectangle(25, 25, "grey");
  goldBox.addChild(greyBox);

  // Set greyBox's local coord's relative to goldBox
  greyBox.x = 12.5;
  greyBox.y = 12.5;

  // Add pinkBox to greyBox
  let pinkBox = rectangle(10, 10, "pink");
  greyBox.addChild(pinkBox);
  pinkBox.x = 6.25;
  pinkBox.y = 6.25;

  // return pinkBox's global coord's
  console.log("gx:", pinkBox.gx);
  console.log("gy:", pinkBox.gy);

  // rotate greyBox
  greyBox.rotation = deg(22.5);

  // Scale bluebox along x
  blueBox.scaleX = 1.5;

  // set alpha channel on greyBox
  greyBox.alpha = 0.75;

  // ****** Depth Layering ****** \\
  let redBox = rectangle(64, 64, "red", "black", 4, 220, 180);
  let greenBox = rectangle(64, 64, "green", "black", 4, 200, 200);
  let violetBox = rectangle(64, 64, "violet", "black", 4, 180, 220);

  // move the redBox to a higher layer
  redBox.layer = 1;

  // Swap the depths of the redBox and greenBox
  // stage.swapChildren(redBox, greenBox);

  // ****** Positioning ****** \\
  // Create a box around which to center things
  let limeBox = rectangle(64, 64, "lime");
  limeBox.shadow = true;
  limeBox.setPosition(350, 80);

  // position a box above the limeBox
  let brownBox = rectangle(32, 32, "brown");
  limeBox.putTop(brownBox, 0, -16);

  // position a box to the right of limeBox
  let navyBox = rectangle(32, 32, "navy");
  limeBox.putRight(navyBox, 16, 0);

  // position a box below the limeBox
  let peruBox = rectangle(32, 32, "peru");
  limeBox.putBottom(peruBox, 0, 16);

  // position a box to the left of limeBox
  let wheatBox = rectangle(32, 32, "wheat");
  limeBox.putLeft(wheatBox, -16, 0);

  // put a box in the center of limeBox
  let hotPinkBox = rectangle(32, 32, "hotPink");
  limeBox.putCenter(hotPinkBox);

  // test the circular prop
  limeBox.circular = true;
  console.log("diameter:", limeBox.diameter); // 64
  limeBox.circular = false;
  console.log("rad", limeBox.radius); // undefined

  // ****** Circles ****** \\
  let transparentCircle = circle(
    128,
    "RGBA(0, 0, 0, 0.1)",
    "black",
    2,
    64,
    280
  );
  transparentCircle.pivotX = 0.5;
  transparentCircle.pivotY = 0.5;

  let cyanCircle = circle(64, "cyan", "green", 4);
  transparentCircle.addChild(cyanCircle);
  cyanCircle.x = 32;
  cyanCircle.y = 32;

  let orangeCircle = circle(32, "orange", "green", 4);
  transparentCircle.addChild(orangeCircle);
  orangeCircle.x = 48;
  orangeCircle.y = -4;

  let goldenrodCircle = circle(32, "goldenrod", "green", 4);
  transparentCircle.addChild(goldenrodCircle);
  goldenrodCircle.x = 100;
  goldenrodCircle.y = 48;

  let orangeRedCircle = circle(32, "orangeRed", "green", 4);
  transparentCircle.addChild(orangeRedCircle);
  orangeRedCircle.x = 48;
  orangeRedCircle.y = 100;

  let redOrangeCircle = circle(32, "rgba(210,100,0,1)", "green", 4);
  transparentCircle.addChild(redOrangeCircle);
  redOrangeCircle.x = -4;
  redOrangeCircle.y = 48;

  // ****** Lines ****** \\
  let blackLine = line("black", 4, 0, 0, 64, 64);
  let redLine = line("red", 4, 0, 64, 64, 0);
  let greenLine = line("green", 4, 0, 32, 64, 32);
  let blueLine = line("blue", 4, 32, 0, 32, 64);
  let centerLineX = line("grey", 1, 0, 256, 512, 256);
  let centerLineY = line("grey", 1, 256, 0, 256, 512);
  let centerLineGroup = group(centerLineX, centerLineY);
  centerLineGroup.layer = 9;

  // ****** Groups ****** \\
  // NB! Grouping the boxes actually screws up the layer settings
  // let boxGroup = group(redBox, greenBox, violetBox);
  // console.log(
  //   "boxGroup width:",
  //   boxGroup.width,
  //   "boxGroup height:",
  //   boxGroup.height
  // );

  let lineGroup = group(blackLine, redLine, blueLine, greenLine);
  transparentCircle.addChild(lineGroup);
  lineGroup.x = 32;
  lineGroup.y = 32;

  // Now we can manipulate the transparentCircle
  // and all its children
  transparentCircle.rotation = deg(0);
  transparentCircle.layer = 10;
  transparentCircle.setPosition(384, 256);

  // ****** Text ****** \\
  let message = text("Oh! Grumble Bugs!", "24px puzzler", "black", 16, 384);
  message.content = `Jibberdy! :-P`;

  // ****************** Images ****************** \\
  // From an image object
  let cat = sprite(assets["../images/cat.png"], 512 - 128, 384);

  // From a texture atlas frame
  let tiger = sprite(assets["tiger.png"], 0, 192);
  tiger.width = 64;
  tiger.height = 64;
  tiger.tiling = true; // what does tiling do?
  tiger.tileX = 20;
  tiger.tileY = 20;

  // From a tileset frame
  let fairyFrame = frame(assets["../images/fairy.png"], 0, 0, 48, 32);
  let fairy = sprite(fairyFrame, 68, 326);

  // From multiple tilset frames
  let fairyFrames = frames(
    assets["../images/fairy.png"],
    [
      [0, 0],
      [48, 0],
      [96, 0],
    ],
    48,
    32
  );
  let fairy2 = sprite(fairyFrames, 140, 326);
  // Use gotToAndStop to set the frame number
  fairy2.gotoAndStop(1);

  // From an array of image objects
  let animalImages = [
    assets["../images/hedgehog.png"],
    assets["../images/tiger.png"],
    assets["../images/cat.png"],
  ];

  let animals = sprite(animalImages, 256, 448);
  animals.gotoAndStop(1); // set frame number before width/height!
  animals.width = 64;
  animals.height = 64;

  // From an array of texture atlas frames
  let buttonFrames = [assets["up.png"], assets["over.png"], assets["down.png"]];

  let button = sprite(buttonFrames, 64, 448);
  button.gotoAndStop(1);
  button.width = 128;
  button.height = 64;

  gameLoop();

  function gameLoop() {
    requestAnimationFrame(gameLoop, canvas);
    blueBox.rotation += deg(0.1);
    goldBox.rotation -= deg(0.2);
    pinkBox.rotation += deg(0.3);
    transparentCircle.rotation -= deg(0.1);
    render(canvas);
  }

  // render the sprites on canvas
  render(canvas);
}
