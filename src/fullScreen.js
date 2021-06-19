/* fullScreen.js */
console.log("fullScreen.js is Here!");

let stage = document.getElementById("stage");

stage.addEventListener(
  "click",
  (event) => {
    stage.requestFullscreen();
  },
  false
);
