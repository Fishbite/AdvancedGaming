import { makeCanvas } from "../lib/makeCanvas.js";

let canvas = makeCanvas(512, 512);

// The base class that contains props & methods
// shared by all the different sprite types
/*
class DisplayObject {
  constructor(props) {
    commonMethod();
  }
}
*/

class DisplayObject {
  constructor() {
    //The sprite's position and size
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    //Rotation, alpha, visible and scale properties
    this.rotation = 0;
    this.alpha = 1;
    this.visible = true;
    this.scaleX = 1;
    this.scaleY = 1;

    //`pivotX` and `pivotY` let you set the sprite's axis of rotation
    this.pivotX = 0.5;
    this.pivotY = 0.5;

    //Add `vx` and `vy` (velocity) variables that will help us move the sprite
    this.vx = 0;
    this.vy = 0;

    //A "private" `_layer` property
    this._layer = 0;

    //A `children` array on the sprite that will contain all the
    //child sprites in this container
    this.children = [];

    //The sprite's `parent` property
    this.parent = undefined;

    //The sprite's `children` array
    // this.children = [];

    //Optional drop shadow properties.
    //Set `shadow` to `true` if you want the sprite to display a
    //shadow
    this.shadow = false;
    this.shadowColor = "rgba(100, 100, 100, 0.5)";
    this.shadowOffsetX = 3;
    this.shadowOffsetY = 3;
    this.shadowBlur = 3;

    //Optional blend mode property
    this.blendMode = undefined;

    //Properties for advanced features:

    //Image states and animation
    this.frames = [];
    this.loop = true;
    this._currentFrame = 0;
    this.playing = false;

    //Can the sprite be dragged?
    this._draggable = undefined;

    //Is the sprite circular? If it is, it will be given a `radius`
    //and `diameter`
    this._circular = false;

    //Is the sprite `interactive`? If it is, it can become click-able
    //or touchable
    this._interactive = false;

    //The sprite's previous x and y positions
    this.previousX = 0;
    this.previousY = 0;
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

  //Depth layer
  get layer() {
    return this._layer;
  }
  set layer(value) {
    this._layer = value;
    if (this.parent) {
      //Sort the sprite’s parent’s `children` array so that sprites with a
      //higher `layer` value are moved to the end of the array
      this.parent.children.sort((a, b) => a.layer - b.layer);
    }
  }

  //The `addChild` method lets you add sprites to this container
  addChild(sprite) {
    //Remove the sprite from its current parent, if it has one, and
    //the parent isn't already this object
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

  //Getters that return useful points on the sprite

  get halfWidth() {
    return this.width / 2;
  }
  get halfHeight() {
    return this.height / 2;
  }
  get centerX() {
    return this.x + this.halfWidth;
  }
  get centerY() {
    return this.y + this.halfHeight;
  }

  /* Conveniences */

  //A `position` getter. It returns an object with x and y properties
  get position() {
    return { x: this.x, y: this.y };
  }

  //A `setPosition` method to quickly set the sprite's x and y values
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  //The `localBounds` and `globalBounds` methods return an object
  //with `x`, `y`, `width`, and `height` properties that define
  //the dimensions and position of the sprite. This is a convenience
  //to help you set or test boundaries without having to know
  //these numbers or request them specifically in your code.
  get localBounds() {
    return {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
    };
  }
  get globalBounds() {
    return {
      x: this.gx,
      y: this.gy,
      width: this.gx + this.width,
      height: this.gy + this.height,
    };
  }

  //`empty` is a convenience property that will return `true` or
  //`false` depending on whether or not this sprite's `children`
  //array is empty
  get empty() {
    if (this.children.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  //The "put" methods help you position
  //another sprite in and around this sprite. You can position
  //sprites relative to this sprite's center, top, eight, bottom or
  //left sides. The `xOffset` and `yOffset`
  //arguments determine by how much the other sprite's position
  //should be offset from the position.
  //In all these methods, `b` is the second sprite that is being
  //positioned relative to the first sprite (this one), `a`

  //Center `b` inside `a`
  putCenter(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x + a.halfWidth - b.halfWidth + xOffset;
    b.y = a.y + a.halfHeight - b.halfHeight + yOffset;
  }
  //Position `b` above `a`
  putTop(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x + a.halfWidth - b.halfWidth + xOffset;
    b.y = a.y - b.height + yOffset;
  }
  //Position `b` to the right of `a`
  putRight(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x + a.width + xOffset;
    b.y = a.y + a.halfHeight - b.halfHeight + yOffset;
  }
  //Position `b` below `a`
  putBottom(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x + a.halfWidth - b.halfWidth + xOffset;
    b.y = a.y + a.height + yOffset;
  }
  //Position `b` to the left of `a`
  putLeft(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x - b.width + xOffset;
    b.y = a.y + a.halfHeight - b.halfHeight + yOffset;
  }

  //Some extra conveniences for working with child sprites

  //Swap the depth layer positions of two child sprites
  swapChildren(child1, child2) {
    let index1 = this.children.indexOf(child1),
      index2 = this.children.indexOf(child2);
    if (index1 !== -1 && index2 !== -1) {
      //Swap the indexes
      child1.childIndex = index2;
      child2.childIndex = index1;
      //Swap the array positions
      this.children[index1] = child2;
      this.children[index2] = child1;
    } else {
      throw new Error(`Both objects must be a child of the caller ${this}`);
    }
  }

  //`add` and `remove` let you add and remove many sprites at the same time
  add(...spritesToAdd) {
    spritesToAdd.forEach((sprite) => this.addChild(sprite));
  }
  remove(...spritesToRemove) {
    spritesToRemove.forEach((sprite) => this.removeChild(sprite));
  }

  /* Advanced features */

  //If the sprite has more than one frame, return the
  //value of `_currentFrame`
  get currentFrame() {
    return this._currentFrame;
  }

  //The `circular` property lets you define whether a sprite
  //should be interpreted as a circular object. If you set
  //`circular` to `true`, the sprite is given `radius` and `diameter`
  //properties. If you set `circular` to `false`, the `radius`
  //and `diameter` properties are deleted from the sprite
  get circular() {
    return this._circular;
  }
  set circular(value) {
    //Give the sprite `diameter` and `radius` properties
    //if `circular` is `true`
    if (value === true && this._circular === false) {
      Object.defineProperties(this, {
        diameter: {
          get() {
            return this.width;
          },
          set(value) {
            this.width = value;
            this.height = value;
          },
          enumerable: true,
          configurable: true,
        },
        radius: {
          get() {
            return this.halfWidth;
          },
          set(value) {
            this.width = value * 2;
            this.height = value * 2;
          },
          enumerable: true,
          configurable: true,
        },
      });
      //Set this sprite's `_circular` property to `true`
      this._circular = true;
    }
    //Remove the sprite's `diameter` and `radius` properties
    //if `circular` is `false`
    if (value === false && this._circular === true) {
      delete this.diameter;
      delete this.radius;
      this._circular = false;
    }
  }

  //Is the sprite draggable by the pointer? If `draggable` is set
  //to `true`, the sprite is added to a `draggableSprites`
  //array. All the sprites in `draggableSprites` are updated each
  //frame to check whether they're being dragged
  get draggable() {
    return this._draggable;
  }
  set draggable(value) {
    if (value === true) {
      //Push the sprite into the `draggableSprites` array
      draggableSprites.push(this);
      this._draggable = true;
    }
    //If it's `false`, remove it from the `draggableSprites` array
    if (value === false) {
      //Splice the sprite from the `draggableSprites` array
      draggableSprites.splice(draggableSprites.indexOf(this), 1);
    }
  }

  //Is the sprite interactive? If `interactive` is set to `true`,
  //the sprite is run through the `makeInteractive` function.
  //`makeInteractive` makes the sprite sensitive to pointer
  //actions. It also adds the sprite to the `buttons` array,
  //which is updated each frame
  get interactive() {
    return this._interactive;
  }
  set interactive(value) {
    if (value === true) {
      //Add interactive properties to the sprite
      //so that it can act like a button
      makeInteractive(this);

      //Add the sprite to the global `buttons` array so
      //it can be updated each frame
      buttons.push(this);

      //Set this sprite’s private `_interactive` property to `true`
      this._interactive = true;
    }
    if (value === false) {
      //Remove the sprite's reference from the
      //`buttons` array so that it it's no longer affected
      //by mouse and touch interactivity
      buttons.splice(buttons.indexOf(this), 1);
      this._interactive = false;
    }
  }
}

// A universal function to remove any sprite or list of
// sprites from any parent

function remove(...spritesToRemove) {
  spritesToRemove.forEach((sprite) => {
    sprite.parent.removeChild(sprite);
  });
}

// A specific sprite type that extends DisplayObject
// and implements its own unique methods and props
class SpriteType extends DisplayObject {
  constructor() {
    // call DisplayObject's constructor to init
    // all the default props
    super();
    // init the sprite's specific props
  }
}

/* ****** The Root Stage Object ****** */
let stage = new DisplayObject();
stage.width = canvas.width;
stage.height = canvas.height;

// The `Rectangle` class
class Rectangle extends DisplayObject {
  constructor(
    width = 32,
    height = 32,
    fillStyle = "gray",
    strokeStyle = "none",
    lineWidth = 0,
    x = 0,
    y = 0
  ) {
    //Call the DisplayObject's constructor
    super();

    //Assign the argument values to this sprite
    Object.assign(this, {
      width,
      height,
      fillStyle,
      strokeStyle,
      lineWidth,
      x,
      y,
    });

    //Add a `mask` property to enable optional masking
    this.mask = false;
  }
  //The `render` method explains how to draw the sprite
  render(ctx) {
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.rect(
      //Draw the sprite around its `pivotX` and `pivotY` point
      -this.width * this.pivotX,
      -this.height * this.pivotY,
      this.width,
      this.height
    );
    if (this.strokeStyle !== "none") ctx.stroke();
    if (this.fillStyle !== "none") ctx.fill();
    if (this.mask && this.mask === true) ctx.clip();
  }
}

//A higher level wrapper for the rectangle sprite
export function rectangle(
  width,
  height,
  fillStyle,
  strokeStyle,
  lineWidth,
  x,
  y
) {
  //Create the sprite
  let sprite = new Rectangle(
    width,
    height,
    fillStyle,
    strokeStyle,
    lineWidth,
    x,
    y
  );

  //Add the sprite to the stage
  stage.addChild(sprite);

  //Return the sprite to the main program
  return sprite;
}

// The `Circle` class
class Circle extends DisplayObject {
  constructor(
    diameter = 32,
    fillStyle = "gray",
    strokeStyle = "none",
    lineWidth = 0,
    x = 0,
    y = 0
  ) {
    // Call the DisplaObject's constructor
    super();

    // enable radius and diameter props
    this.circular = true;

    // assign the arguent values to this sprite
    Object.assign(this, {
      diameter,
      fillStyle,
      strokeStyle,
      lineWidth,
      x,
      y,
    });

    // add a mask prop to enable optional masking
    this.mask = false;
  }

  // The render method
  render(ctx) {
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.arc(
      this.radius + -this.diameter * this.pivotX,
      this.radius + -this.diameter * this.pivotY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    if (this.strokeStyle !== "none") ctx.stroke();
    if (this.fillStyle !== "none") ctx.fill();
    if (this.mask && this.mask === true) ctx.clip();
  }
}

// A higher level wrapper for the circle sprite
export function circle(diameter, fillStyle, strokeStyle, lineWidth, x, y) {
  let sprite = new Circle(diameter, fillStyle, strokeStyle, lineWidth, x, y);
  stage.addChild(sprite);
  return sprite;
}

// The Line class
class Line extends DisplayObject {
  constructor(
    strokeStyle = "none",
    lineWidth = 0,
    ax = 0,
    ay = 0,
    bx = 32,
    by = 32
  ) {
    // call the DisplayObject's constructor:
    super();

    // Assign the argument values to this sprite
    Object.assign(this, {
      strokeStyle,
      lineWidth,
      ax,
      ay,
      bx,
      by,
    });

    // The `lineJoin` style: round, mitre or bevel
    this.lineJoin = "round";
  }

  // The render method
  render(ctx) {
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.lineJoin = this.lineJoin;
    ctx.beginPath();
    ctx.moveTo(this.ax, this.ay);
    ctx.lineTo(this.bx, this.by);
    if (this.strokeStyle !== "none") ctx.stroke();
  }
}

// A higher level wrapper for the line sprite
function line(strokeStyle, lineWidth, ax, ay, bx, by) {
  let sprite = new Line(strokeStyle, lineWidth, ax, ay, bx, by);
  stage.addChild(sprite);
  return sprite;
}

// The Text class
class Text extends DisplayObject {
  constructor(
    content = "Hello!",
    font = "12px sans-serif",
    fillStyle = "red",
    x = 0,
    y = 0
  ) {
    // call the DisplayObject's constructor
    super();

    // Assign the arguments values to this sprite
    Object.assign(this, { content, font, fillStyle, x, y });

    // set the default text baseline to "top"
    this.textBaseline = "top";

    // set `strokeText` to none
    this.strokeText = "none";
  }

  // the render method describes how to draw the sprite
  render(ctx) {
    ctx.font = this.font;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillStyle;

    // measure the width and height of the text
    if (this.width === 0) this.width = ctx.measureText(this.content).width;
    if (this.height === 0) this.height = ctx.measureText("M").width;

    ctx.translate(-this.width * this.pivotX, -this.height * this.pivotY);
    ctx.textBaseline = this.textBaseline;
    ctx.fillText(this.content, 0, 0);
    if (this.strokeText !== "none") ctx.strokeText();
  }
}

// A higher level wrapper for the Text class
function text(content, font, fillStyle, x, y) {
  let sprite = new Text(content, font, fillStyle, x, y);
  stage.addChild(sprite);
  return sprite;
}

// The Group class. This does not display any of its own
// graphics, but is used to group sprites together. It can
// be used for complex game characters, game scenes or levels
// A groups height & width is calculated dynamically based on
// the content that it contains.
class Group extends DisplayObject {
  constructor(...spritesToGroup) {
    // call the DisplayObject's constructor
    super();

    // group all the sprites listed in the constructor args
    spritesToGroup.forEach((sprite) => this.addChild(sprite));
  }

  // Groups have custom `addChild` & `removeChild` methods that
  // call a `calculateSize` method when sprites are added
  // or removed from the group
  addChild(sprite) {
    if (sprite.parent) {
      sprite.parent.removeChild(sprite);
    }
    sprite.parent = this;
    this.children.push(sprite);

    // figure out the new  size of the group
    this.calculateSize();
  }

  removeChild(sprite) {
    if (sprite.parent === this) {
      this.children.splice(this.children.indexOf(sprite), 1);

      // figure out the new size of the group
      this.calculateSize();
    } else {
      throw new Error(`${sprite} is not a child of ${this}`);
    }
  }

  calculateSize() {
    // calculate the width based on the size of the largest child
    // that this sprite contains
    if (this.children.length > 0) {
      // temp private vars to help track the new
      // calculated height and width
      this._newWidth = 0;
      this._newHeight = 0;

      // find the width and height of the child sprites furthest
      // from the top left corner of the group
      this.children.forEach((child) => {
        // find the child sprites that combined x value and width
        // that's greater than the current `_newWidth` value
        if (child.x + child.width > this._newWidth) {
          // The new width is a combination of the child's
          // x position and its width
          this._newWidth = child.x + child.width;
        }
        if (child.y + child.height > this._newHeight) {
          this._newHeight = child.y + child.height;
        }
      });

      // Apply `_newWidth` & `_newHeight` to the sprite's
      // width and height
      this.width = this._newWidth;
      this.height = this._newHeight;
    }
  }
}

// A higher level wrapper for the Group sprite
function group(...spritesToGroup) {
  let sprite = new Group(...spritesToGroup);
  stage.addChild(sprite);
  return sprite;
}

/* ******Full Featured Render Function ****** */
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
    //Only display the sprite if it's visible
    //and within the area of the canvas
    if (
      sprite.visible &&
      sprite.gx < canvas.width + sprite.width &&
      sprite.gx + sprite.width >= -sprite.width &&
      sprite.gy < canvas.height + sprite.height &&
      sprite.gy + sprite.height >= -sprite.height
    ) {
      //Save the canvas's present state
      ctx.save();

      //Shift the canvas to the center of the sprite's position
      ctx.translate(
        sprite.x + sprite.width * sprite.pivotX,
        sprite.y + sprite.height * sprite.pivotY
      );
      //Set the sprite's `rotation`, `alpha` and `scale`
      ctx.rotate(sprite.rotation);
      ctx.globalAlpha = sprite.alpha * sprite.parent.alpha;
      ctx.scale(sprite.scaleX, sprite.scaleY);
      //Display the sprite's optional drop shadow
      if (sprite.shadow) {
        ctx.shadowColor = sprite.shadowColor;
        ctx.shadowOffsetX = sprite.shadowOffsetX;
        ctx.shadowOffsetY = sprite.shadowOffsetY;
        ctx.shadowBlur = sprite.shadowBlur;
      }
      //Display the optional blend mode
      if (sprite.blendMode) ctx.globalCompositeOperation = sprite.blendMode;
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
}
/* ****** END Full Featured Render Function ****** */

class Sprite extends DisplayObject {
  constructor(source, x = 0, y = 0) {
    //Call the DisplayObject's constructor
    super();

    //Assign the argument values to this sprite
    Object.assign(this, { x, y });

    //We need to figure out what the source is, and then use
    //use that source data to display the sprite image correctly
    //Is the source a JavaScript Image object?
    if (source instanceof Image) {
      this.createFromImage(source);
    }
    //Is the source a tileset from a texture atlas?
    //(It is if it has a `frame` property)
    else if (source.frame) {
      this.createFromAtlas(source);
    }
    //If the source contains an `image` sub-property, this must
    //be a `frame` object that's defining the rectangular area of an inner sub-image
    //Use that sub-image to make the sprite. If it doesn't contain a
    //`data` property, then it must be a single frame.
    else if (source.image && !source.data) {
      this.createFromTileset(source);
    }
    //If the source contains an `image` sub-property
    //and a `data` property, then it contains multiple frames
    else if (source.image && source.data) {
      this.createFromTilesetFrames(source);
    }
    //Is the source an array? If so, what kind of array?
    else if (source instanceof Array) {
      if (source[0] && source[0].source) {
        //The source is an array of frames on a texture atlas tileset
        this.createFromAtlasFrames(source);
      }
      //It must be an array of image objects
      else if (source[0] instanceof Image) {
        this.createFromImages(source);
      }
      //throw an error if the sources in the array aren't recognized
      else {
        throw new Error(`The image sources in ${source} are not recognized`);
      }
    }
    //Throw an error if the source is something we can't interpret
    else {
      throw new Error(`The image source ${source} is not recognized`);
    }
  }
  createFromImage(source) {
    //Throw an error if the source is not an Image object
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
  createFromTileset(source) {
    //Throw an error if the source is not an image object
    if (!(source.image instanceof Image)) {
      throw new Error(`${source.image} is not an image object`);
    } else {
      this.source = source.image;
      this.sourceX = source.x;
      this.sourceY = source.y;
      this.width = source.width;
      this.height = source.height;
      this.sourceWidth = source.width;
      this.sourceHeight = source.height;
    }
  }
  createFromTilesetFrames(source) {
    //Throw an error if the source is not an Image object
    if (!(source.image instanceof Image)) {
      throw new Error(`${source.image} is not an image object`);
    } else {
      this.source = source.image;
      this.frames = source.data;
      //Set the sprite to the first frame
      this.sourceX = this.frames[0][0];
      this.sourceY = this.frames[0][1];
      this.width = source.width;
      this.height = source.height;
      this.sourceWidth = source.width;
      this.sourceHeight = source.height;
    }
  }
  createFromAtlasFrames(source) {
    this.frames = source;
    this.source = source[0].source;
    this.sourceX = source[0].frame.x;
    this.sourceY = source[0].frame.y;
    this.width = source[0].frame.w;
    this.height = source[0].frame.h;
    this.sourceWidth = source[0].frame.w;
    this.sourceHeight = source[0].frame.h;
  }
  createFromImages(source) {
    this.frames = source;
    this.source = source[0];
    this.sourceX = 0;
    this.sourceY = 0;
    this.width = source[0].width;
    this.height = source[0].width;
    this.sourceWidth = source[0].width;
    this.sourceHeight = source[0].height;
  }

  //Add a `gotoAndStop` method to go to a specific frame.
  gotoAndStop(frameNumber) {
    if (this.frames.length > 0 && frameNumber < this.frames.length) {
      //a. Frames made from tileset sub-images.
      //If each frame is an array, then the frames were made from an
      //ordinary Image object using the `frames` method
      if (this.frames[0] instanceof Array) {
        this.sourceX = this.frames[frameNumber][0];
        this.sourceY = this.frames[frameNumber][1];
      }

      //b. Frames made from texture atlas frames.
      //If each frame isn't an array, and it has a sub-object called `frame`,
      //then the frame must be a texture atlas id name.
      //In that case, get the source position from the atlas's `frame` object.
      else if (this.frames[frameNumber].frame) {
        this.sourceX = this.frames[frameNumber].frame.x;
        this.sourceY = this.frames[frameNumber].frame.y;
        this.sourceWidth = this.frames[frameNumber].frame.w;
        this.sourceHeight = this.frames[frameNumber].frame.h;
        this.width = this.frames[frameNumber].frame.w;
        this.height = this.frames[frameNumber].frame.h;
      }

      //c. Frames made from individual image objects.
      //If neither of the above are true, then each frame must be
      //an individual Image object
      else {
        this.source = this.frames[frameNumber];
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = this.source.width;
        this.height = this.source.height;
        this.sourceWidth = this.source.width;
        this.sourceHeight = this.source.height;
      }
      //Set the `_currentFrame` value to the chosen frame
      this._currentFrame = frameNumber;
    }
    //Throw an error if this sprite doesn't contain any frames
    else {
      throw new Error(`Frame number ${frameNumber} does not exist`);
    }
  }

  //The `render` method explains how to draw the sprite
  render(ctx) {
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

// a higher level wrapper
function sprite(source, x, y) {
  let sprite = new Sprite(source, x, y);
  stage.addChild(sprite);
  return sprite;
}

// A function to help capture individual tileset frames
function frame(source, x, y, width, height) {
  var o = {};
  o.image = source;
  o.x = x;
  o.y = y;
  o.width = width;
  o.height = height;
  return o;
}

/* ****** Testing by Drawing ****** */

// let box = rectangle(96, 96, "blue", "none", 0, 54, 64);
// box.pivotX = 0.5;
// box.pivotY = 0.5;
// box.rotation = 0.0;

// load the assets needed
import { assets } from "../lib/assets.js";
assets
  .load([
    "../images/cat.png",
    "../images/tiger.png",
    "../images/animals.json",
    "../images/fairy.png",
    "../images/button.json",
  ])
  .then(() => setup());

function setup() {
  let box = rectangle(128, 128, "blue", "none", 0, 156, 156);
  box.pivotX = 0.5;
  box.pivotY = 0.5;
  box.rotation = 0;
  //   box.addChild(cat);
  console.log("box:", box);

  // use the circle function
  // (diameter, fillStyle, strokeStlye, lineWidth, Xpos, Ypos)
  let cyanCircle = circle(64, "cyan", "red", 2, 64, 248);
  console.log("cyanCircle:", cyanCircle);

  // use the line function
  // (strokeStyle, lineWidth, ax, ay, bx, by)
  let blackLine = line("black", 4, 64, 248, 128, 312);
  let greenLine = line("green", 4, 64, 280, 128, 280);
  let redLine = line("red", 4, 64, 312, 128, 248);
  let blueLine = line("blue", 4, 96, 248, 96, 312);
  console.log("blackLine:", blackLine);

  // use the text function:
  let message = text("Hey Dude!", "24px Futura", "black", 156, 230);
  message.content = "Grumble bugs!";

  // To create a group, list the sprites in the group's constructor
  let lines = group(blackLine, greenLine, redLine, blueLine);
  console.log("Gouped lines:", lines);
  lines.shadow = true;

  // Alternatively, create an empty group and use `addChild` or `add`
  // to group sprites together:
  // let lines2 = group();
  // lines2.addChild(blackLine);
  // lines2.add(greenLine, redLine, blueLine);
  // console.log("Grouped lines2:", lines2);
  // lines2.rotation = -0.5;

  // Making sprites from simgle images
  // let cat = sprite(assets["path"], posX, posY);
  let cat = sprite(assets["../images/cat.png"], 92, 92);
  cat.shadow = true;

  let tiger = new Sprite(assets["../images/tiger.png"], 0, 0);
  stage.addChild(tiger);

  // Making sprites from texture atlas frames
  let tiger2 = sprite(assets["tiger.png"], 184, 0);

  console.log("tiger2:", tiger2);

  // Blitting a subimage from a tileset with no json file
  // using the `frame` function created to do this
  /* ****** Problem `image` is 'undefined' ****** */

  let fairyFrame = frame(
    assets["../images/fairy.png"], //the tileset source image
    0, //The subimage's x
    0, //The subimage's y
    48, //The subimage's width
    32 //The subimage's height
  );
  console.log("fairyFrame", fairyFrame);

  // then initialise the sprite using the returned fairyFrame object
  let fairy = sprite(fairyFrame, 0, 128); // have error!

  /* ****** End Problem ****** */

  /* ****** Same Problem ****** */

  // Blitting multiple tileset frames
  function frames(source, arrayOfPositions, width, height) {
    var o = {};
    o.image = source;
    o.data = arrayOfPositions;
    o.width = width;
    o.height = height;
    return o;
  }
  let fairyFrames = frames(
    assets["../images/fairy.png"],
    [
      [0, 0],
      [48, 0],
      [96, 0],
    ],
    48,
    32
  );
  console.log("fairyFrames:", fairyFrames);

  let fairy2 = sprite(fairyFrames, 72, 128);
  fairy2.gotoAndStop(2);

  let buttonFrames = [assets["up.png"], assets["over.png"], assets["down.png"]];
  console.log("buttonFrames:", buttonFrames);

  // create a sprite and supply the buttonFrames
  // array as the source:
  let button = sprite(buttonFrames, 300, 280);

  render(canvas);
}

// render(canvas);
