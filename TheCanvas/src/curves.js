/* curves.js */
/*
    quadratic and bezier curves are available
*/
// define styles:
ctx.lineWidth = 3;
// a quadratic curve:
// define left start point:
ctx.moveTo(85, 85);
/*
    Then use quadraticCurveTo to
    define the curve. The first two
    arguments define the control points
    x & y positions:

    quadraticCurveTo(ctrl-X, ctrl-Y, XLineEnd, YLineEnd )
*/
ctx.quadraticCurveTo(128, 0, 170, 85);
ctx.stroke();

// draw a curve back to the start pos:
ctx.quadraticCurveTo(128, 42.5, 85, 85);
ctx.stroke();
ctx.closePath();
ctx.fill();
