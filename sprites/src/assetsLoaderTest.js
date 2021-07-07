import { assets } from "../lib/assets.js";
import { makeCanvas } from "../lib/makeCanvas.js";

// load the files
assets
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

  let tigerImg = new Image();
  console.log(tigerImg);
  tigerImg.addEventListener("load", loadHandler, false);
  tigerImg.src = "../images/tiger.png";

  // try to use preloaded image fails with Type error
  //ctx.drawImage(assets["tiger.png"], 0, 0);

  // try another way of using preloaded image
  // also fails with the same Type error
  let tiger = new Image();
  tiger.src = assets["images/tiger.png"];
  console.log(tiger);
  let pattern = ctx.createPattern(tiger, "no-repeat");
  ctx.fillStyle = pattern;
  ctx.rect(0, 0, 64, 64);
  ctx.fill();

  //The loadHandler to draw the catIamage
  function loadHandler() {
    ctx.drawImage(catImage, 128, 128);
    ctx.drawImage(tigerImg, 0, 128);
  }

  let image = assets["tiger"];
  ctx.drawImage(image, 0, 0);

  //render(canvas, ctx);
}
