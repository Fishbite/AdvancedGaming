/* fullScreen.js */
// console.log("fullScreen.js is Here!");

let stage = document.getElementById("stage");
/*
stage.addEventListener(
  "click",
  (event) => {
    stage.requestFullscreen();
  },
  false
);
*/

let screenSizeBtn = document.getElementById("minMaxBtn");
screenSizeBtn.addEventListener(
  "click",
  (event) => {
    // check if any element is full screen
    if (!document.fullscreenElement) {
      // if not make the stage full screen
      stage.requestFullscreen();
    } else {
      //If there is, exit full screen
      document.exitFullscreen();
    }
  },
  false
);
