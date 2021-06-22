/* rotationAndScale.js */
/*
    We decide to put the scale method in
    here too, because just like rotation,
    scale needs to be placed between
    ctx.save(); and ctx.restore();

    ctx.globalAlpha is also placed between
    save and restore. It's another way of
    making objects transparent!
*/

//styles
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.fillStyle = "rgba(255, 200, 0, 1)";

/* !!!!!! IMOPRTANT !!!!! */
// save the current state of the drawing // context, this will allow us to restore it
// to its original state when we're finished
ctx.save();

// set global transparency:
ctx.globalAlpha = 0.25;

//move the drawing context's 0, 0, point
// from the corner to the center of the
// canvas.This will be the square center point:
ctx.translate(128, 128);

// rotate the coordinate system in rads:
// rads = degrees * (Math.PI / 180)
ctx.rotate(45 * (Math.PI / 180));
console.log("rads:", 45 * (Math.PI / 180));

// Set the drawing context's scale method
ctx.scale(1.4, 1.4); // Xscale, Yscale
// draw a square with it's center at 0, 0
ctx.beginPath();
ctx.rect(-64, -64, 128, 128);
ctx.stroke();
ctx.fill();

// restore the drawing context to
// its original postion and rotation
// i.e. 0, 0 = top left corner not rotated
ctx.restore();
