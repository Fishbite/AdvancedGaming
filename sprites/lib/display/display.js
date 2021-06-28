/* display.js */
class DisplayObject {
  constructor(properties) {
    // the sprites positios & size
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    // set rotation, alpha, visible, scale properties
    this.rotation = 0;
    this, (alpha = 1);
    this.visible = true;
    this.scaleX = 1;
    this.scaleY = 1;

    // `pivotX` & `pivotY` set the sprites axis of rotation
    // (0.5 represents the sprite's center point)
    this.pivotX = 0.5;
    this.pivotY = 0.5;

    // velocity variable to help move the sprite
    this.vx = 0;
    this.vy = 0;

    // a "private `_layer` property"
    this.layer = 0;

    // A `children` array on the sprite that will contain
    // all the child sprites in this container
    this.children = [];

    // the sprite's parent property
    this.parent = undefined;

    // the spites children array
    this.children = [];

    // optional drop shadow props. Set `shadow` to true
    // if you want the sprite to display a shadow
    this.shadow = false;
    this.shadowColor = "rgba(100, 100, 100, 0.5)";
    this.shadowOffsetX = 3;
    this.shadowOffsetY = 3;
    this.shadowBlur = 3;

    // optional blend mode
    this.blendMode = undefined;

    /* ****** Properties for Advanced Features ****** */

    // image states and animation
    this.frames = [];
    this.loop = true;
    this._currentFrame = 0;
    this.playing = false;

    // is the sprite draggable?
    this._draggable = undefined;

    // is the sprite circular? If it is,
    // it will be given a `radius` and `diameter`
    this._circular = false;

    // is the sprite interactive? If it is,
    // it can become clickable or touchable
    this._interactive = false;
  }
  /* ****** Essentials ****** */
  // glabal position
  get gx() {
    if (this.parent) {
      // the sprite's global x position is  combination of
      // tis local x value and its parent's global x value
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

  // depth layer
  get layer() {
    return this._layer;
  }

  set layer(value) {
    this._layer = value;
    if (this.parent) {
      this.parent.children.sort((a, b) => a.layer - b.layer);
    }
  }
  // the `addChild` method lets you
  // add sprites to this container
  addChild(sprite) {
    if (sprite.parent) {
      sprite.parent.removeChild(sprite);
    }
    sprite.parent = this;
    this.children.push(sprite);
  }

  removeChild(sprite) {
    if (sprite.parent === this) {
      this.children.splice(this.children.indexOf(sprite), 1);
    }
  }

  // getters that return useful points on the sprite
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

  /* ****** Conveniences ****** */

  // a `position` getter. It returns an object
  // with x and y properties
  get postion() {
    return { x: this.x, y: this.y };
  }

  // a `setPosition` method to quickly set
  // the sprite's x and y props
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /*    The `localBounds` and `globalBounds` methods return
        an object with `x`, `y`, `width` and `height` props
        that define the dimensions and position of the 
        sprite.
        This is a convenience to let us set or test 
        boundaries without having to know these nnumbers or
        request them specifically in our code.
    
  */
  get localBound() {
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
  //`false` depending on whether this sprite's `children`
  //array is empty
  get empty() {
    if (this.children.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  commonMethod() {
    // method code
  }
}

class SpriteType extends DisplayObject {
  constructor() {
    // call the objects constructor to initialise
    // all the default properties
    super();

    // initialise the sprites specific props
  }
  specificMethod() {
    // comment
  }
}
