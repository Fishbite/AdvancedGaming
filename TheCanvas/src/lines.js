/* lines.js */
// Set line style options:
ctx.strokeStyle = "black";
ctx.lineWidth = 3;

// Draw the line
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(128, 128);
ctx.lineTo(256, 0);
// Optional: connect last point to first
ctx.closePath();
//make the line visible
ctx.stroke();

/* Notes: Linecap styles: */
// ctx.lineCap = "round";
// ctx.lineCap = "butt";
// ctx.lineCap = "square";
/* linCap styles must be defined before ctx.stroke */

/* connecting lines to create shapes */
// once you've joined lines and created a shape
// you can fill the shape with colour:
//define the fill style
ctx.fillStyle = "rgba(120, 124, 128, 0.5)";
// fill the shape
ctx.fill();
