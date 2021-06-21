/* circles.js */
/* Notes:

    3.14 rads = 1/2 circle
    6.38 rads = 1 circle

    rads = degrees * (Math.Pi / 180)
    degrees = radians * (180 / Math.Pi)
*/

// Use the arc method to draw a circle
/*
    arc(centerX, centerY, CircleRadiusPixels, startAngle, endAngle, false)

    Note: false = clockwise
    Start angle 0 = 3 O'clock
*/

ctx.arc(42.5, 128, 42.5, 0, 2 * Math.PI, false);

// Set the style options:
ctx.strokeStyle = "rgba(0, 0, 0, 1)";
ctx.lineWidth = 3;

// Create a radial gradient:
let circleGrad = ctx.createRadialGradient(15, 100, 0, 42.5, 128, 42.5);
circleGrad.addColorStop(0, "white");
circleGrad.addColorStop(1, "green");
ctx.fillStyle = circleGrad;

// draw the circle
ctx.beginPath();
ctx.arc(42.5, 128, 42.5, 0, 2 * Math.PI, false);
ctx.stroke();
ctx.fill();

// set the syles:
/*
let gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
*/

ctx.strokeStyle = "rgb(0, 127, 127)";
ctx.lineWidth = 6;
ctx.fillStyle = "rgba(127, 127, 0, 0.5)";
// draw an arc
ctx.beginPath();
ctx.arc(213, 170, 42.5, 0, 1 * Math.PI, true);
ctx.closePath();
ctx.stroke();
ctx.fill();
