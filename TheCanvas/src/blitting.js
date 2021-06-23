/* blitting.js */

/*
    Blitting: All your game characters are
    stored in a single image file called a
    tileset or spritesheet.

    You construct your game world by 
    selectively displaying and positioning
    the parts of the tile set that you need.

    This is called Blitting!!!
*/

// load the tileset
let tileset = new Image();
tileset.addEventListener("load", loadHandler, false);
tileset.src = "./images/spritesheet.png";

function loadHandler() {
  ctx.drawImage(
    // space ship
    tileset, // the image file
    192,
    128, // image top corner on spritesheet
    64,
    64, // image size on spritesheet
    0,
    0, // image pos on canvas
    32,
    32 // image size on canvas
  );
  ctx.drawImage(
    // whiskers cat
    tileset, // the image file
    0,
    0, // image top corner on spritesheet
    64,
    64, // image size on spritesheet
    96,
    96, // image pos on canvas
    64,
    64 // image size on canvas
  );
  ctx.drawImage(
    // fang cat
    tileset, // the image file
    0,
    64, // image top corner on spritesheet
    64,
    64, // image size on spritesheet
    160,
    96, // image pos on canvas
    64,
    64 // image size on canvas
  );
  ctx.drawImage(
    // spikey cat
    tileset, // the image file
    64,
    0, // image top corner on spritesheet
    64,
    64, // image size on spritesheet
    32,
    96, // image pos on canvas
    64,
    64 // image size on canvas
  );
}
