/* gradients.js */
// there are two types of gradients, linear & radial

// linear gradient:
// ctx.createLinearGradient(startX, startY, endX, endY);
// Note: you can make the gradient bigger or smaller
// than the target shape to get different effects
// this gradient from topLeft to bottomRight
let linGrad = ctx.createLinearGradient(0, 170, 85, 256);

// add colour stops. 0 = startPos 1 = endPos
linGrad.addColorStop(0, "yellow");
linGrad.addColorStop(0.25, "red");
linGrad.addColorStop(1, "blue");

/* Fill a shape with the gradient */
// set the line style options
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.fillStyle = linGrad;

// draw the shape
ctx.beginPath();
ctx.rect(0, 170, 85, 256);
ctx.stroke();
ctx.fill();

/* Radial Gradients */
/*
let gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
*/
let radGrad = ctx.createRadialGradient(128, 213, 0, 128, 213, 42.5);

radGrad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
radGrad.addColorStop(0.4999, "rgba(0, 0, 255, 1)");
radGrad.addColorStop(0.5, "rgba(0, 0, 100, 1)");
radGrad.addColorStop(1, "rgba(100, 0, 255, 0.5)");

// define the styles
ctx.strokeStyle = "grey";
ctx.lineWidth = 3;
ctx.fillStyle = radGrad;

//draw the shape
ctx.beginPath();
ctx.rect(85, 170, 85, 85); // xStart, yStart, xSize, ySize
ctx.stroke();
ctx.fill();
