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
    if ((sprite.parent = o)) {
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
          // the sprite's global x pos is a combination of
          // its local x value and its parent's global x pos'
          return o.x + o.parent.gx;
        } else {
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
          o.parent.shildren.sort((a, b) => a.layer - b.layer);
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

console.log("children array: ", children);
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
    console.log("sprite: ", sprite);
    displaySprite(sprite);
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
      if (sprite.childen && sprite.childen.length > 0) {
        // reset the context back to the parent
        // sprite's top left corner
        ctx.translate(-sprite.width / 2, -sprite.height / 2);

        // loop through the parent sprite's children
        sprite.forEach((child) => {
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

// amke the gold box and add it is a child of the blue box
let goldBox = rectangle(64, 64, "gold");
blueBox.addChild(goldBox);

// assign the gold box's local coords relative to blueBox
goldBox.x = 24;
goldBox.y = 24;

// aad a grey box to the gold box
let greyBox = rectangle(48, 48, "grey");
goldBox.addChild(greyBox);
greyBox.x = 8;
greyBox.y = 8;

// add a pink box to the grey box
let pinkBox = rectangle(24, 24, "pink");
greyBox.addChild(pinkBox);
pinkBox.x = 8;
pinkBox.y = 8;

// render the canvas
render(canvas);

// let blueBox = rectangle(64, 64, "blue");

// let redBox = rectangle(32, 32, "red", "yellow", 4, 16, 16);
// redBox.rotation = 0.75;
// redBox.alpha = 0.9;
// redBox.scaleX = 1.25;
// redBox.scaleY = 1.25;

//let catImage = new Image();
//catImage.src = assets["cat.png"];
//Load an image

// let catImage = new Image();
// catImage.addEventListener("load", loadHandler, false);
// catImage.src = "images/cat.png";
// //The loadHandler is called when the image has loaded
// function loadHandler() {
//   ctx.drawImage(catImage, 64, 64);
// }
// }
