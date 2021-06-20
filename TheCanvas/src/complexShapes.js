/* complexShapes.js */
// use a 2d array of points that define your shape
let traingle = [
  [128, 85],
  [170, 170],
  [85, 170],
];

// then use a loop to connect those points together
// using moveTo and lineTo.
// keep the code simple by starting at the last point
// and connect the points clockwise
function drawPath(shape) {
  // start from the last point:
  let lastPoint = shape.length - 1;
  //console.log("Last point", lastPoint);
  ctx.moveTo(shape[lastPoint][0], shape[lastPoint][1]);

  // ue a loop to plot each point
  shape.forEach((point) => {
    console.log(point);
    ctx.lineTo(point[0], point[1]);
  });
}

// set styles else the last defined styles will be used
ctx.lineWidth = 4;
ctx.lineJoin = "round";
ctx.fillStyle = "rgba(100, 100, 255, 0.5)";

// use the function to draw the shape:
ctx.beginPath();
drawPath(traingle);
// close the path to make a smooth connection
ctx.closePath();
ctx.stroke();
ctx.fill();
