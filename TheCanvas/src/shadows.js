/* shadows.js */
/*
    Drop shadows can be added to any
    line or shape. They take upto four
    properties:

    shadowColor = "rgba()"
    shadowOffsetX = number
    shadowOffsetY = number
    shadowBlur = number

    Use the alpha channel on the
    shadowColor proerty to make them
    look more realistic.
*/
// styles
ctx.fillStyle = "rgba(255, 200, 0, 1)";
ctx.lineWidth = 1;
// define the shadow:
ctx.shadowColor = "rgba(20, 24, 28, 0.9)";
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 10;
// make a shape
ctx.beginPath();
ctx.arc(213.5, 106.5, 21.5, 0, 2 * Math.PI, false);
ctx.closePath();
//ctx.stroke();
ctx.fill();
