/* makeCanvas.js */

// a module to create a canvas
export function createCanvas(
  width = 256,
  height = 256,
  border = "1px solid black",
  backgroundColor = "white"
) {
  // make the canvas element and add it to the DOM
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = border;
  canvas.style.backgroundColor = backgroundColor;
  document.body.appendChild(canvas);
  canvas.ctx = canvas.getContext("2d");

  // return the canvas
  return canvas;
}
