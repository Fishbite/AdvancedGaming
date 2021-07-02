/* chapter 4:
    Making Sprites and a SceneGraph
*/

import { makeCanvas } from "../lib/makeCanvas.js";
import { assets } from "../lib/assets.js";

assets
  .load(["../images/animals.json", "../images/animals.png"])
  .then(() => setUp());

function setUp() {
  let canvas = makeCanvas();

  let ctx = canvas.ctx;

  let children = [];

  /* ****** Start rectangle sprite ****** */
  let rectangle = function (
    width = 32,
    height = 32,
    fillStyle = "grey",
    strokeStyle = "none",
    lineWidth = 0,
    x = 0,
    y = 0
  ) {
    // Object to be returned by this function
    let o = { width, height, fillStyle, strokeStyle, lineWidth, x, y };

    // optional properties go here
    o.rotation = 0;
    o.alpha = 1;
    o.visible = true;
    o.scaleX = 1;
    o.scaleY = 1;

    // velocity vars to help mmove the sprite
    o.vx = 0;
    o.vy = 0;

    // The sprite's render method
    o.render = (ctx) => {
      ctx.strokeStyle = o.strokeStyle;
      ctx.lineWidth = o.lineWidth;
      ctx.fillStyle = o.fillStyle;
      ctx.beginPath();
      ctx.rect(-o.width / 2, -o.height / 2, o.width, o.height);
      if (o.strokeStyle !== "none") ctx.stroke();
      ctx.fill();
    };

    // push the sprite into the children array
    children.push(o);

    // return the object
    return o;
  };
  console.log("children array: ", children);
  /* ****** End rectangle sprite ****** */

  /* ****** Start global Render function ****** */

  function render(canvas, ctx) {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // loop through each sprite in the children array
    // and call displaySrite()
    children.forEach((sprite) => {
      displaySprite(sprite);
    });

    function displaySprite(sprite) {
      if (sprite.visible) {
        // save the canvas' state
        ctx.save();

        // shift the canvas to the sprtie's pos'
        ctx.translate(
          sprite.x + sprite.width / 2,
          sprite.y + sprite.height / 2
        );

        //set sprite's options:
        ctx.rotate(sprite.rotation);
        ctx.globalAlpha = sprite.alpha;
        ctx.scale(sprite.scaleX, sprite.scaleY);

        // call the sprite's own render mothod
        sprite.render(ctx);

        // restore the canvas state
        ctx.restore();
      }
    }
  }
  /* ****** End global Render function ****** */

  /* { width, height, fillStyle, strokeStyle, lineWidth, x, y } */

  let blueBox = rectangle(64, 64, "blue");

  let redBox = rectangle(32, 32, "red", "yellow", 4, 16, 16);
  redBox.rotation = 0.75;
  redBox.alpha = 0.9;
  redBox.scaleX = 1.25;
  redBox.scaleY = 1.25;

  //let catImage = new Image();
  //catImage.src = assets["cat.png"];
  //Load an image

  let catImage = new Image();
  catImage.addEventListener("load", loadHandler, false);
  catImage.src = "images/cat.png";
  //The loadHandler is called when the image has loaded
  function loadHandler() {
    ctx.drawImage(catImage, 64, 64);
  }

  render(canvas, ctx);
}
