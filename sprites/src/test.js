console.log("All good...");

import { makeCanvas } from "../lib/makeCanvas.js";
let canvas = makeCanvas(312, 312);

let rectangle = function (
  width = 32,
  height = 32,
  fillStyle = "gray",
  strokeStyle = "none",
  lineWidth = 0,
  x = 0,
  y = 0
) {
  //Create an object called `o` that is going to be returned by this
  //function. Assign the function's arguments to it
  let o = { width, height, fillStyle, strokeStyle, lineWidth, x, y };
  //Create a "private" `_layer` property. (Private properties are prefixed
  //by an underscore character.)
  o._layer = 0;
  //The sprite's width and height
  o.width = width;
  o.height = height;
  //Add optional rotation, alpha, visible and scale properties
  o.rotation = 0;
  o.alpha = 1;
  o.visible = true;
  o.scaleX = 1;
  o.scaleY = 1;
  //Add `vx` and `vy` (velocity) variables that will help us move
  //the sprite in later chapters
  o.vx = 0;
  o.vy = 0;
  //Create a `children` array on the sprite that will contain all the
  //child sprites
  o.children = [];
  //The sprite's `parent` property
  o.parent = undefined;
  //The `addChild` method lets you add sprites to this container
  o.addChild = (sprite) => {
    //Remove the sprite from its current parent, if it has one and
    //the parent isn't already this object
    if (sprite.parent) {
      sprite.parent.removeChild(sprite);
    }
    //Make this object the sprite's parent and
    //add it to this object's `children` array
    sprite.parent = o;
    o.children.push(sprite);
  };
  //The `removeChild` method lets you remove a sprite from its
  //parent container
  o.removeChild = (sprite) => {
    if (sprite.parent === o) {
      o.children.splice(o.children.indexOf(sprite), 1);
    } else {
      throw new Error(sprite + "is not a child of " + o);
    }
  };
  //Add a `render` method that explains how to draw the sprite
  o.render = (ctx) => {
    ctx.strokeStyle = o.strokeStyle;
    ctx.lineWidth = o.lineWidth;
    ctx.fillStyle = o.fillStyle;
    ctx.beginPath();
    ctx.rect(-o.width / 2, -o.height / 2, o.width, o.height);
    if (o.strokeStyle !== "none") ctx.stroke();
    ctx.fill();
  };
  //Getters and setters for the sprite's internal properties
  Object.defineProperties(o, {
    //The sprite's global x and y position
    gx: {
      get() {
        if (o.parent) {
          //The sprite's global x position is a combination of
          //its local x value and its parent's global x value
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
    //The sprite's depth layer. Every sprite and group has its depth layer
    //set to `0` (zero) when it's first created. If you want to force a
    //sprite to appear above another sprite, set its `layer` to a
    //higher number
    layer: {
      get() {
        return o._layer;
      },
      set(value) {
        o._layer = value;
        if (o.parent) {
          //Sort the sprite's parent's `children` array so that sprites with a
          //higher `layer` value are moved to the end of the array
          o.parent.children.sort((a, b) => a.layer - b.layer);
        }
      },
      enumerable: true,
      configurable: true,
    },
  });
  //Add the object as a child of the stage
  if (stage) stage.addChild(o);
  //Return the object
  return o;
};

let stage = {
  x: 0,
  y: 0,
  gx: 0,
  gy: 0,
  alpha: 1,
  width: canvas.width,
  height: canvas.height,
  parent: undefined,
  //Give the stage `addChild` and `removeChild` methods
  children: [],
  addChild(sprite) {
    this.children.push(sprite);
    sprite.parent = this;
  },
  removeChild(sprite) {
    this.children.splice(this.children.indexOf(sprite), 1);
  },
};

function render(canvas) {
  //Get a reference to the drawing context
  let ctx = canvas.ctx;
  //Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Loop through each sprite object in the stage's `children` array
  stage.children.forEach((sprite) => {
    displaySprite(sprite);
    console.log("sprite: ", sprite);
  });
  function displaySprite(sprite) {
    //Display a sprite if it's visible
    if (sprite.visible) {
      //Save the canvas's present state
      ctx.save();
      //Shift the canvas to the center of the sprite's position
      ctx.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);
      //Set the sprite's `rotation`, `alpha`, and `scale`
      ctx.rotate(sprite.rotation);
      ctx.globalAlpha = sprite.alpha * sprite.parent.alpha;
      ctx.scale(sprite.scaleX, sprite.scaleY);
      //Use the sprite's own `render` method to draw the sprite
      sprite.render(ctx);
      //If the sprite contains child sprites in its
      //`children` array, display them by recursively calling this very same
      //`displaySprite` function again
      if (sprite.children && sprite.children.length > 0) {
        //Reset the context back to the parent sprite's top-left corner
        ctx.translate(-sprite.width / 2, -sprite.height / 2);
        //Loop through the parent sprite's children
        sprite.children.forEach((child) => {
          //display the child
          displaySprite(child);
        });
      }
      //Restore the canvas to its previous state
      ctx.restore();
    }
  }
}

//Make the canvas
// let canvas = makeCanvas(312, 312);
//Make the first parent sprite: the blueBox
let blueBox = rectangle(96, 96, "blue", "none", 0, 64, 54);
//Make the goldBox and add it as a child of the blueBox
let goldBox = rectangle(64, 64, "gold");
blueBox.addChild(goldBox);
//Assign the goldBox's local coordinates (relative to the blueBox)
goldBox.x = 24;
goldBox.y = 24;
//Add a grayBox to the goldBox
let grayBox = rectangle(48, 48, "gray");
goldBox.addChild(grayBox);
grayBox.x = 8;
grayBox.y = 8;
//Add a pinkBox to the grayBox
let pinkBox = rectangle(24, 24, "pink");
grayBox.addChild(pinkBox);
pinkBox.x = 8;
pinkBox.y = 8;
//Render the canvas
render(canvas);
