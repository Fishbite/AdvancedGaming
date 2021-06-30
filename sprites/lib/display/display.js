/* display.js */
class DisplayObject {
  constructor(properties) {
    // the sprites positions & size
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    // set rotation, alpha, visible, scale properties
    this.rotation = 0;
    this.alpha = 1;
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

  /* The"put"methods help us position 
  another sprite in and around this sprite.
  We can postion sprites relative tothis sprite's center, top, bottom, right or left sides. The `xOffset` and `yOffset`
  arguments determine hos far the sprite's
  position should be offset from this
  position. In all these methods, `b` is the second sprite that is being
  positioned relative to the first (this one) `a`.
  */

  // center `b` inside `a`
  putCenter(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x + a.halfWidth - b.halfWidth + xOffset;
    b.y = a.y + a.halfWidth - b.halfWidth + yOffset;
  }

  // position `b` above `a`
  putTop(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x + a.halfWidth - b.halfWidth + xOffset;
    b.y = a.y - b.height + yOffset;
  }

  // position `b` to the right of `a`
  putRight(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x + a.width + xOffset;
    b.y = a.y + a.halfWidth - b.halfWidth + yOffset;
  }

  // position `b` below `a`
  putBottom(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x + a.halfWidth - b.halfWidth + xOffset;
    b.y = a.y + a.height;
  }

  // postion `b` to the left of `a`
  putLeft(b, xOffset = 0, yOffset = 0) {
    let a = this;
    b.x = a.x - b.width + xOffset;
    b.y = a.y + a.halfHeight - b.halfHeight + yOffset;
  }

  // some extra conveniences for working with child sprites

  // swap the depth layer positions of the child sprites
  swapChildren(child1, child2) {
    let index1 = this.children.indexOf(child1),
      index2 = this.children.indexOf(child2);
    if (index1 !== -1 && index2 !== -1) {
      // swap the indexes
      child1.childIndex = index2;
      child2.childIndex = index1;

      // swap the array position
      this.children[index1] = child2;
      this.children[index2] = child1;
    } else {
      throw new Error(`Both objects must be a child of the caller ${this}`);
    }
  }
  // `add` and `remove` let you add and remove many sprites
  // at the same time
  add(...spritesToAdd) {
    spritesToAdd.forEach((sprite) => this.addChild(sprite));
  }
  remove(...spritesToRemove) {
    spritesToRemove.forEach((sprite) => this.removeChild(sprite));
  }

  /* advanced features */

  // if the sprite has more than one frame,
  // return the value of `_currentFrame`
  get _currentFrame() {
    return this._currentFrame;
  }

  // the `circular` property lets you define whether a
  // sprite should be interpretd as a circular object. If
  // you set `circular to `true`, the sprite is given
  // `radius` and `diameter` propertiies. If you set
  // `circular` to `false`, the `radius` and `diameter`
  // properties are deleted from the sprite
  getCircular() {
    return this._circular;
  }
  set circular(value) {
    // give the sprite `radius` and `diameter` properties
    // if circular is `true`
    if ((value === true) & (this._circular === false)) {
      Object.defineProperties(this, {
        diameter: {
          get() {
            return this.width;
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

      // set this sprite's `_circular` property to true
      this._circular = true;
    }
    // remove the sprite's `radius` and `diameter` properties
    // if `circular is `false`
    if (value === false && this._circular === true) {
      delete this.diameter;
      delete this.radius;
      this.circular = false;
    }
  }

  //Is the sprite draggable by the pointer? If `draggable` is set
  //to `true`, the sprite is added to a `draggableSprites`
  //array. All the sprites in `draggableSprites` are updated each
  //frame to check whether they're being dragged.
  get draggable() {
    return this.draggable;
  }
  set draggable(value) {
    if (value === true) {
      this.draggableSprites.push(this);
      this._draggable = true;
    }

    // if it is `false`, remove it from the draggable array
    if (value === false) {
      draggableSprites.splice(draggableSprites.indexOf(this), 1);
    }
  }

  //Is the sprite interactive? If `interactive` is set to `true`,
  //the sprite is run through the `makeInteractive` function.
  //`makeInteractive` makes the sprite sensitive to pointer
  //actions. It also adds the sprite to the `buttons` array,
  //which is updated each frame.
  get interactive() {
    return this._interactive;
  }
  set interactive(value) {
    if (value === true) {
      // add interactive properties to the sprite
      // so it can act like a button
      makeInteractive(this);

      // add the sprtie to the global `buttons` array so
      // it can be updated each frame
      buttons.push(this);

      // set this sprite's `_interactive` property to true
      this._interactive = true;
    }
    if (value === false) {
      //remove the sprite's reference from the
      // `buttons` array so that it is no longer affected
      // by mouse and touch activity
      buttons.splice(buttons.indexOf(this), 1);
      this._interactive = false;
    }
  }
}

// A Universal function to remove any sprite, or
// list of sprites, from any parent
function remove(...spritesToRemove) {
  spritesToRemove.forEach((sprite) => {
    sprite.parent.removeChild(sprite);
  });
}
// if you want to remove a sprite and don't know, or don't
// care what its parent is, use this universal remove func'

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
