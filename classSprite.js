/*
Sprite
---------

A Sprite class to make sprites from images
*/

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
