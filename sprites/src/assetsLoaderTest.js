import { assets } from "../lib/assets.js";
import { makeCanvas } from "../lib/makeCanvas.js";

let canvas = makeCanvas(312, 312);

class DisplayObject {
  constructor() {
    //The sprite's position and size
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    //`pivotX` and `pivotY` let you set the sprite's axis of rotation
    this.pivotX = 0.5;
    this.pivotY = 0.5;

    //A "private" `_layer` property
    this._layer = 0;

    //The sprite's array for its children
    this.children = [];

    //The sprite's `parent` property
    this.parent = undefined;
  }

  /* Essentials */

  //Global position
  get gx() {
    if (this.parent) {
      //The sprite's global x position is a combination of
      //its local x value and its parent's global x value
      return this.x + this.parent.gx;
    } else {
      return this.x;
    }
  }
  get gy() {
    if (this.parent) {
      return this.y + this.parent.gy;
    } else {
      return this.y;
    }
  }

  // add child to the sprite's children container
  addChild(sprite) {
    // remove the sprite from its current parent, if it has one,
    // and the parent isn't already this object
    if (sprite.parent) {
      sprite.parent.removeChild(sprite);
    }
    //Make this object the sprite's parent and
    //add it to this object's `children` array
    sprite.parent = this;
    this.children.push(sprite);
  }

  //The `removeChild` method lets you remove a sprite from its
  //parent container
  removeChild(sprite) {
    if (sprite.parent === this) {
      this.children.splice(this.children.indexOf(sprite), 1);
    } else {
      throw new Error(sprite + "is not a child of " + this);
    }
  }
}

class Sprite extends DisplayObject {
  constructor(source, x = 0, y = 0) {
    // call the object's super
    // console.log("source", source);
    super();

    // assign the argument values to this sprite
    Object.assign(this, { x, y });

    // is the source a JS image object?
    if (source instanceof Image) {
      this.createFromImage(source);
    }
    // or is it a tileset from a texture atlas?
    else if (source.frame) {
      this.createFromAtlas(source);
    }
  }

  createFromImage(source) {
    if (!(source instanceof Image)) {
      throw new Error(`${source} is not an image object`);
    } else {
      this.source = source;
      this.sourceX = 0;
      this.sourceY = 0;
      this.width = source.width;
      this.height = source.height;
      this.sourceWidth = source.width;
      this.sourceHeight = source.height;
    }
  }

  createFromAtlas(source) {
    this.tilesetFrame = source;
    this.source = this.tilesetFrame.source;
    this.sourceX = this.tilesetFrame.frame.x;
    this.sourceY = this.tilesetFrame.frame.y;
    this.width = this.tilesetFrame.frame.w;
    this.height = this.tilesetFrame.frame.h;
    this.sourceWidth = this.tilesetFrame.frame.w;
    this.sourceHeight = this.tilesetFrame.frame.h;
  }

  // the render method
  render(ctx) {
    console.log(
      this.source,
      this.sourceX,
      this.sourceY,
      this.sourceWidth,
      this.sourceHeight
    );
    ctx.drawImage(
      this.source,
      this.sourceX,
      this.sourceY,
      this.sourceWidth,
      this.sourceHeight,
      -this.width * this.pivotX,
      -this.height * this.pivotY,
      this.width,
      this.height
    );
  }
}

/* ****** The Root Stage Object ****** */
let stage = new DisplayObject();
stage.width = canvas.width;
stage.height = canvas.height;

/* ****** The Global Render Function ****** */
function render(canvas) {
  //Get a reference to the context
  let ctx = canvas.ctx;
  //Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Loop through each sprite object in the stage's `children` array
  stage.children.forEach((sprite) => {
    //Display a sprite
    displaySprite(sprite);
  });
  function displaySprite(sprite) {
    //Save the canvas's present state
    ctx.save();

    //Shift the canvas to the center of the sprite's position
    ctx.translate(
      sprite.x + sprite.width * sprite.pivotX,
      sprite.y + sprite.height * sprite.pivotY
    );

    //Use the sprite's own `render` method to draw the sprite
    if (sprite.render) sprite.render(ctx);
    if (sprite.children && sprite.children.length > 0) {
      //Reset the context back to the parent sprite's top-left corner,
      //relative to the pivot point
      ctx.translate(
        -sprite.width * sprite.pivotX,
        -sprite.height * sprite.pivotY
      );
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

/* ****** END Global Featured Render Function ****** */

// load the files
assets
  .load([
    "../images/animals.json",
    "../images/animals.png",
    "../images/tiger.png",
  ])
  .then(() => setUp());

function setUp() {
  // make a sprite from a single image
  let tiger = new Sprite(assets["../images/tiger.png"], 0, 0);
  stage.addChild(tiger);

  let ctx = canvas.ctx;
  let test = new Image();
  test.addEventListener("load", loadHandler, false);
  test.src = "../images/tiger.png";
  stage.addChild(test);
  console.log(stage);

  function loadHandler() {
    ctx.drawImage(test, 64, 64);
  }

  // make a sprite from a texture atlas frame
  // note: hedgehog.png is the texture atlas frame ID not an image
  let hedgehog = new Sprite(assets["hedgehog.png"], 92, 128);
  stage.addChild(hedgehog);

  let cat = new Sprite(assets["cat.png"], 312 - 128, 0);
  stage.addChild(cat);

  render(canvas);
}

/*
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
  //The loadHandler to draw the catIamage
  function loadHandler() {
    ctx.drawImage(catImage, 128, 128);
    ctx.drawImage(tigerImg, 0, 128);
  }
  */
