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
tileset.src = "./images/tileset.png";

function loadHandler() {}
