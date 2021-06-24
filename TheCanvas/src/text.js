/* text.js */
/*
    Using text o the canvas
*/

// A line through the middle of the canvas
ctx.beginPath();
ctx.moveTo(0, 128);
ctx.lineTo(256, 128);
ctx.stroke();

// Set up the text
let string = "Hey! You!";
ctx.font = "24px 'Verdana', 'sans-serif";
ctx.fillStyle = "rgba(0, 0, 150, 1)";

// figure out the width height of the text
let width = ctx.measureText(string).width;
let height = ctx.measureText("M").width;

// Set the x/y registration point
// to its top left corner
ctx.textBaseline = "top";

// use `ctx.fillText` to draw the
// text in the center of the canvas
ctx.fillText(
  string, // The text string
  canvas.width / 2 - width / 2, // text X pos
  canvas.height / 2 - height / 2 // text Y pos
);

// text in the top left of canvas
ctx.fillText(
  string,
  0, // X pos
  0 // Y pos
);

// text in bottom right corner of canvas
ctx.textBaseline = "top";
ctx.fillText(string, 0, canvas.height - height);
// Note: this drops the little "y" tail off the
// bottom of the canvas. Fix it with textBaseline

// text in the bottom left of canvas
ctx.textBaseline = "hanging"; // manage little "y"
ctx.fillText(
  string,
  canvas.width - width, // X pos
  canvas.height - height
);
