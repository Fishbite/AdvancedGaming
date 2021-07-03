import { assets_rex } from "../lib/assets_rex.js";
import { makeCanvas } from "../lib/makeCanvas.js";

// load the files
assets_rex
  .load(["../images/animals.json", "../images/animals.png"])
  .then(() => setUp());

function setUp() {
  let canvas = makeCanvas();
  let ctx = canvas.ctx;

  // let catImage = new Image();
  // catImage.src = assets["cat.png"];

  //Load an image to test that everything works
  let catImage = new Image();
  console.log(catImage);
  catImage.addEventListener("load", loadHandler, false);
  catImage.src = "../images/cat.png";

  // try to use preloaded image fails with Tyoe error
  //ctx.drawImage(assets["tiger.png"], 0, 0);

  // try another way of using preloaded image
  // also fails with the same Type error
  let tiger = assets_rex["tiger.png"];
  console.log(typeof tiger);
  let pattern = ctx.createPattern(tiger, "no-repeat");
  ctx.fillStyle = pattern;
  ctx.rect(0, 0, 64, 64);
  ctx.fill();

  //The loadHandler to draw the catIamage
  function loadHandler() {
    ctx.drawImage(catImage, 128, 128);
  }

  //render(canvas, ctx);
}
