/* rectangle.js */
// use the rect method:
//rect(xStart, yStart, width, height)

// set the line & fill style options
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.fillStyle = "rgba(255, 100, 100, 0.5)";

// draw the rectangle
// an 85 x 85 square starting at x:85, y:85
ctx.beginPath();
ctx.rect(85, 85, 85, 85);
ctx.stroke();
ctx.fill();

// Alternatively use the shortcuts
// strokeRect and fillRect:
ctx.strokeStyle = "rgb(0, 127, 127)";
ctx.lineWidth = 6;
ctx.fillStyle = "rgba(127, 127, 0, 0.5)";
ctx.strokeRect(170, 170, 85, 85);
ctx.fillRect(170, 170, 85, 85);
