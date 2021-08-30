/* rectangleSprite.js */
import { makeCanvas } from "../lib/makeCanvas.js";

let canvas = makeCanvas();

// Note: we made canvas.ctx = canvas.getContext("2d")
// in the `makeCanvas` module so make it simple to access
let ctx = canvas.ctx;

// an array to hold all sprites
let children = [];

/* ********** The Rectangle Sprite ********** */

// create and return an abstracted rectangle
// it contains all the sprites params that we want to
// control: size, position, colour
// alpha, rotation, scale & visibility plus
// vx, vy props that represent velocity
let rectangle = function (
  // param's with default values
  width = 32,
  height = 32,
  fillStyle = "grey",
  strokeStyle = "none",
  lineWidth = 0,
  x = 0,
  y = 0
) {
  // an object called `o` returned by this function
  // assign the functions args to it:
  // this creates an object with values that are the
  // the same as the function's argument values
  let o = {};
  Object.assign(o, { width, height, fillStyle, strokeStyle, lineWidth, x, y });

  // add additional rotation, alpha, visible & scale props
  o.rotation = 0;
  o.alpha = 1;
  o.visible = true;
  o.scaleX = 1;
  o.scaleY = 1;

  // add velocity vars to help us move the sprite
  o.vx = 0;
  o.vy = 0;

  // add a render method that explains how to draw the sprite
  o.render = (ctx) => {
    ctx.strokeStyle = o.strokeStyle;
    ctx.lineWidth = o.lineWidth;
    ctx.fillStyle = o.fillStyle;
    ctx.beginPath();
    ctx.rect(-o.width / 2, -o.height / 2, o.width, o.height);
    if (o.strokeStyle !== "none") ctx.stroke();
    ctx.fill();
  };

  // push the sprite object into the `children` array
  children.push(o);

  // return the object
  return o;
};

/* ********** The Global Render Function ********** */

/* The job of this function is to loop through all the objects in the `children` array and use eaach sprite's own internal `render` function to draw the shape on the canvas.

The function will only draw the sprite if it is visible. It will set the canvas's properties to match the sprite's. */
function render(canvas, ctx) {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // loop through each sprite in the `children` array
  children.forEach((sprite) => {
    displaySprite(sprite);
  });

  function displaySprite(sprite) {
    // display a sprite if it's visible
    if (sprite.visible) {
      // save tha canvas current state
      ctx.save();

      // shift the canvas to the sprite's position
      ctx.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);

      // set the sprite's rotation, alpha & scale
      ctx.rotate(sprite.rotation);
      ctx.globalAlpha = sprite.alpha;
      ctx.scale(sprite.scaleX, sprite.scaleY);

      // use the sprite's own render method to draw the sprite
      sprite.render(ctx);

      // restore the canvas to its previous state
      ctx.restore();
    }
  }
}

/* ******* And now! Let's make mome Sprites! ******* */

// A reminder of the rectangle function params:
//width, height, fillStyle, strokeStyle, lineWidth, x, y

let blueBox = rectangle(64, 64, "blue", "none", 0, 32, 32);
blueBox.rotation = 0.25;

let redBox = rectangle(64, 64, "red", "black", 8, 160, 100);
redBox.alpha = 0.75;
redBox.rotation = 0.5;
redBox.scaleY = 1.5;

let greenBox = rectangle(64, 64, "green", "black", 4, 64, 160);

// render the sprites

render(canvas, ctx);
