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
