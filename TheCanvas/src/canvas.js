/* canvas.js */
//set up the canvas:
let canvas = document.createElement("canvas");
canvas.setAttribute("width", "256");
canvas.setAttribute("height", "256");
canvas.style.border = "1px solid black";
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");
