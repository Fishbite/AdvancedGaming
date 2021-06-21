/* curves.js */
/*
    quadratic and bezier curves are available
*/
// define styles:
/* !!!! Warning !!!!
    defining styles will affect any other arcs that aren't full circles!!!!
*/
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
//ctx.fill(); // affects the arc drawn in circles.js!

/*
    **** Bezier curves ****
    Bezier curves are similar to
    quadratics but add a second
    control point:
bezierCurveTo(control1X, control1Y, control2X, control2Y, endX, endY);
*/
ctx.lineWidth = 1;
//ctx.fillStyle = "yellow"; // affects other arcs & curves
ctx.strokeStyle = "grey";
ctx.moveTo(0, 128);
ctx.bezierCurveTo(16, 0, 240, 0, 256, 128);
ctx.bezierCurveTo(240, 10, 16, 10, 0, 128);
ctx.closePath();
//ctx.stroke(); // you don't have to stroke to fill!
ctx.fill(); // affects other arcs & curves
