/* rectangleSprite.js */
import { makeCanvas } from "../lib/makeCanvas.js";

let canvas = makeCanvas();

// an array to hold all sprites
let children = [];

// the rectangle sprite
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
