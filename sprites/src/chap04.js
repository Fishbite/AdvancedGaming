/* chapter 4:
    Making Sprites and a SceneGraph
*/

import { makeCanvas } from "../lib/makeCanvas.js";
// import { assets } from "../lib/assets.js";

// assets
//   .load(["../images/animals.json", "../images/animals.png"])
//   .then(() => setUp());

// function setUp() {
let canvas = makeCanvas(312, 312);
// let ctx = canvas.ctx;

// let children = [];

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

  // a private `_layer` property
  o._layer = 0;

  // sprite's dim's
  o.width = width;
  o.height = height;

  // optional properties go here
  o.rotation = 0;
  o.alpha = 1;
  o.visible = true;
  o.scaleX = 1;
  o.scaleY = 1;

  // velocity vars to help mmove the sprite
  o.vx = 0;
  o.vy = 0;

  // an array to store all the sprite's children
  o.children = [];

  // the sprite's `parent` prop
  o.parent = undefined;

  // `addChild` let's us add sprites to this container
  o.addChild = (sprite) => {
    // remove the sprite from its current parent if it has one
    // and the parent isn't already this object
    if (sprite.parent) {
      sprite.parent.removeChild(sprite);
    }

    // make this object the sprite's parent and
    // add it to this object's children array
    sprite.parent = o;
    o.children.push(sprite);
  };

  // `removeChild` method to remove sprite from
  // its parent conatiner
  o.removeChild = (sprite) => {
    if (sprite.parent === o) {
      o.children.splice(o.children.indexOf(sprite), 1);
    } else {
      throw new Error(sprite + "is not a child of" + o);
    }
  };

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

  // getters and setters for the sprite's internal prop's
  Object.defineProperties(o, {
    // the sprite's global x and y pos'
    gx: {
      get() {
        if (o.parent) {
          console.log(o.parent);
          // the sprite's global x pos is a combination of
          // its local x value and its parent's global x pos'
          return o.x + o.parent.gx;
        } else {
          console.log(o.x);
          return o.x;
        }
      },
      enumerable: true,
      configurable: true,
    },

    gy: {
      get() {
        if (o.parent) {
          return o.y + o.parent.gy;
        } else {
          return o.y;
        }
      },
      enumerable: true,
      configurable: true,
    },

    // the sprite's depth layer (default = 0) set layer to a
    // higher number to force it to be above another sprite
    layer: {
      get() {
        return o._layer;
      },
      set(value) {
        o._layer = value;
        if (o.parent) {
          // sort the sprite's parent's children array so that
          // sprties with a higher layer value are move to
          // the end of the array
          o.parent.children.sort((a, b) => a.layer - b.layer);
        }
      },
      enumerable: true,
      configurable: true,
    },
  });

  // add the object as a child of the stage
  if (stage) stage.addChild(o);

  // return the object
  return o;
};

/* ****** End rectangle sprite ****** */

// The Stage. The root parent for all sprites
let stage = {
  x: 0,
  y: 0,
  gx: 0,
  gy: 0,
  alpha: 1,
  width: canvas.width,
  height: canvas.height,
  parent: undefined,

  // give the stage `addChild` and `removeChild` methods
  children: [],

  addChild(sprite) {
    this.children.push(sprite);
    sprite.parent = this;
  },
  removeChild(sprite) {
    this.children.splice(this.children.indexOf(sprite), 1);
  },
};

/* ****** Start global Render function ****** */

function render(canvas) {
  let ctx = canvas.ctx;
  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // loop through each sprite object in the stage's
  // children array
  stage.children.forEach((sprite) => {
    displaySprite(sprite);
    console.log("sprite: ", sprite);
  });

  function displaySprite(sprite) {
    if (sprite.visible) {
      // save the canvas' state
      ctx.save();

      // shift the canvas to the sprite's pos'
      ctx.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);

      //set sprite's options:
      ctx.rotate(sprite.rotation);
      // set the sprite's alpha transparency to be
      // relative to its parent's alpha
      ctx.globalAlpha = sprite.alpha * sprite.parent.alpha;
      ctx.scale(sprite.scaleX, sprite.scaleY);

      // call the sprite's own render mothod
      sprite.render(ctx);

      // display the children of the sprite by recursively
      // calling the `displaySprite` function
      // this statement is key to making the the whole
      // scene graph work
      if (sprite.children && sprite.children.length > 0) {
        // reset the context back to the parent
        // sprite's top left corner
        ctx.translate(-sprite.width / 2, -sprite.height / 2);

        // loop through the parent sprite's children
        sprite.children.forEach((child) => {
          // display the child
          displaySprite(child);
        });
      }

      // restore the canvas state
      ctx.restore();
    }
  }
}
/* ****** End global Render function ****** */

/* { width, height, fillStyle, strokeStyle, lineWidth, Xpos, Ypos } */

// all components are in place. This is how to use them

// make the canvas

// make the first parent sprite:
let blueBox = rectangle(96, 96, "blue", "none", 0, 64, 54);

let goldBox = rectangle(64, 64, "gold");
blueBox.addChild(goldBox);
goldBox.x = 24;
goldBox.y = 24;
// display goldBox's golbal coords
console.log(goldBox.gx, goldBox.gy);

let greyBox = rectangle(48, 48, "grey");
goldBox.addChild(greyBox);
greyBox.x = 8;
greyBox.y = 8;

let pinkBox = rectangle(24, 24, "pink");
greyBox.addChild(pinkBox);
pinkBox.x = 8;
pinkBox.y = 8;

// rotate the sprites
blueBox.rotation = 0.8;
greyBox.rotation = 0.25;

// set the transparency
blueBox.alpha = 0.5;
greyBox.alpha = 0.5;

// stacking sprites
// sprites are rendered in the order they are created
let redBox = rectangle(64, 64, "red", "black", 4, 220, 180);
let greenBox = rectangle(64, 64, "green", "black", 4, 200, 200);
let purpleBox = rectangle(64, 64, "purple", "black", 4, 180, 220);
// change the layer property
redBox.layer = 1;
// this works because `render` method loops through the
// children array and sprites with a higher layer value
// are moved to the end of the array, so they appear on
// top of any sprites with a lower layer value

/* ****** Using the asset loader ****** */

render(canvas);
