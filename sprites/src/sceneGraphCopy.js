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

  // create a "private" properety `layer`.
  // prefix with an underscore `_`
  o._layer = 0;

  // add additional rotation, alpha, visible & scale props
  o.rotation = 0;
  o.alpha = 1;
  o.visible = true;
  o.scaleX = 1;
  o.scaleY = 1;

  // add velocity vars to help us move the sprite
  o.vx = 0;
  o.vy = 0;

  // create a `children` array to hold child sprites
  o.children = [];
  //the `addChild` method to add child sprites to this container
  o.addChild = (sprite) => {
    // console.log("adding child", sprite);
    // remove the sprite from its current parent, if it
    // has one and the parent isn't this object
    if (sprite.parent) {
      sprite.parent.removeChild(sprite);
    }

    // make this object the sprite's parent and
    // add it to this objects children array
    sprite.parent = o;
    // console.log(sprite.parent);
    o.children.push(sprite);
    // console.log("o.children: ", o.children);
  };

  // the `removeChild` method lets us remove a sprite
  // from its parent container
  o.removeChild = (sprite) => {
    if (sprite.parent === o) {
      o.children.splice(o.children.indexOf(sprite), 1);
    } else {
      throw new Error(`${sprite} is not a child of ${o}`);
    }
  };

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

  // getters & setters for the sprite's internal props
  Object.defineProperties(o, {
    // the sprite's global x & y position
    gx: {
      get() {
        if (o.parent) {
          //the sprite's global position  is a
          // combination of its local x value
          // and its parent's global x value
          return o.x + o.parent.gx;
        } else {
          return o.x;
        }
      },
      enumerable: true,
      configurable: true,
    },

    // the sprite's y position
    gy: {
      get() {
        if (parent.o) {
          return o.y + o.parent.gy;
        } else {
          return o.y;
        }
      },
      enumerable: true,
      configurable: true,
    },

    // the sprite's depth layer. Every sprite & group
    // has its depth layer set to 0 when it is first
    // created. If you want to force a sprite to appear
    // above another sprite, set its layer value higher
    layer: {
      get() {
        return o._layer;
      },
      set(value) {
        o._layer = value;
        if (o.parent) {
          // sort the sprite's parent's `chilrdren`
          // array so that sprites with a higher `layer`
          // value are moved to the end of the array
          o.parent.children.sort((a, b) => a.layer - b.layer);
        }
      },
      enumerable: true,
      configurable: true,
    },
  });

  // add the object as a child of the stage:
  if (stage) stage.addChild(o);
  // console.log("stage's children: ", stage.children);

  // push the sprite object into the `children` array
  //children.push(o);

  // return the object
  return o;
};

//The stage. The root container for all sprites
let stage = {
  // set some default props for the sprites
  x: 0,
  y: 0,
  gx: 0,
  gy: 0,
  alpha: 1,
  width: canvas.width,
  height: canvas.height,
  parent: undefined,
  // give the stage `addChild` & `removeChild` methods
  children: [],
  addChild(sprite) {
    // console.log("addChild(sprite):", sprite);
    this.children.push(sprite);
    sprite.parent = this;
  },
  removeChild(sprite) {
    this.children.splice(this.children.indexOf(sprite), 1);
  },
};

/* ********** The Global Render Function ********** */

/* The job of this function is to loop through all the objects in the `children` array and use eaach sprite's own internal `render` function to draw the shape on the canvas.

The function will only draw the sprite if it is visible. It will set the canvas's properties to match the sprite's. */
function render(canvas, ctx) {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // loop through each sprite in the stage's `children` array
  stage.children.forEach((sprite) => {
    // console.log("stage.children: ", stage.children);
    displaySprite(sprite);
  });

  function displaySprite(sprite) {
    // console.log("displaySprite():", sprite);
    // display a sprite if it's visible
    if (sprite.visible) {
      // save tha canvas current state
      ctx.save();

      // shift the canvas to the center of the sprite's position
      ctx.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);

      // set the sprite's rotation, alpha & scale
      ctx.rotate(sprite.rotation);
      ctx.globalAlpha = sprite.alpha;
      ctx.scale(sprite.scaleX, sprite.scaleY);

      // use the sprite's own render method to draw the sprite
      sprite.render(ctx);

      // If the sprite contains child sprites in its
      // `children` array, display them by recursively calling this
      // very same `displaySprite` function again
      if (sprite.children && sprite.children.length > 0) {
        // reset the context back to the parent sprite's
        // top left corner
        ctx.translate(-sprite.width / 2, -sprite.height / 2);

        // loop through the parent sprite's children
        sprite.children.forEach((child) => {
          // display the child
          displaySprite(child);
        });
      }

      // restore the canvas to its previous state
      ctx.restore();
    }
  }
}

/* ******* And now! Let's make nested Sprites! ******* */
/* *********** Playground *********** */
// A reminder of the rectangle function params:
//width, height, fillStyle, strokeStyle, lineWidth, x, y

// The first parent sprite
let blueBox = rectangle(96, 96, "blue", "none", 0, 64, 54);

// Make the goldBox and
// add it as a child of the blueBox
let goldBox = rectangle(64, 64, "gold");
blueBox.addChild(goldBox);

// assign the goldBox's local coordinates
// relative to the blueBox
goldBox.x = 24;
goldBox.y = 24;

// add a greyBox to the goldBox
let greyBox = rectangle(48, 48, "grey");
goldBox.addChild(greyBox);
greyBox.x = 8;
greyBox.y = 8;

let pinkBox = rectangle(24, 24, "pink");
greyBox.addChild(pinkBox);
pinkBox.x = 8;
pinkBox.y = 8;

// Note: we're just messing around here and
// set the pinkBox rotation to counter the
// greyBox rotation by -2, else it would stay
// aligned with the grey box
greyBox.rotation = 0.5;
pinkBox.rotation = greyBox.rotation * -2;
// like the goldBox is aligned to the blueBox
blueBox.rotation = 0.25;
// and transparency:
greyBox.alpha = 0.1;

let redBox = rectangle(64, 64, "Red", "black", 6, 189, 189);
let greenBox = rectangle(64, 64, "green", "black", 6, 173, 173);
let yellowBox = rectangle(64, 64, "yellow", "black", 6, 157, 157);

// adjust a sprites layer value
greenBox.layer = 1;

// render the sprites
render(canvas, ctx);
