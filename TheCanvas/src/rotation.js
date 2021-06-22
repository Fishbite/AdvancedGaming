/* rotation.js */
//styles
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.fillStyle = "rgba(255, 200, 0, 0.25)";

/* !!!!!! IMOPRTANT !!!!! */
// save the current state of the drawing // context, this will allow us to restore it
// to its original state when we're finished
ctx.save();

//move the drawing context's 0, 0, point
// from the corner to the cneter of the
// canvas.This will be the square center point:
ctx.translate(128, 128);

// rotate the coordinate system in rads:
// rads = degrees * (Math.PI / 180)
ctx.rotate(45 * (Math.PI / 180));
console.log("rads:", 45 * (Math.PI / 180));

// draw a square with it's center at 0, 0
ctx.beginPath();
ctx.rect(-64, -64, 128, 128);
ctx.stroke();
ctx.fill();

// restore the drawing context to
// its original postion and rotation
// i.e. 0, 0 = top left corner not rotated
ctx.restore();
