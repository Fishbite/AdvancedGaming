/* ****** The Keyboard Function ****** */

/* 
    This keyboard function creates key objects that listen
    for specific keyboard events.

    Use it like this:

    let keyObject = keyboard(asciiKeyCodeNumber)

    where `keyObject` is the key that we want to add an
    event listener for. Then we can assign `press` and `release`
    methods to the keyObject like this:

    keyObject.press = function(){
        // Key object pressed
    }

    keyObject.release = function() {
        // Key object released
    }

    We have also added isUp and isDown methods to our
    keyObjects tht we can check when required. This will let
    us know whether the key has been released or not and do
    something like this:

    if (space.isDown) {
        // Do this!
    }

    if (space.isUp) {
        // Do this!
    }
*/

export function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  // the downHandler
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      //   console.log(
      //     "e:",
      //     event,
      //     "e.keyCode:",
      //     event.keyCode,
      //     "key.isDown",
      //     key.isDown
      //   );
    }
    event.preventDefault();
  };

  // the uphandler
  key.uphandler = function (event) {
    // console.log(event);
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  // Attach the event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);

  window.addEventListener("keyup", key.uphandler.bind(key), false);

  // return the key object
  return key;
}

/* ****** Some Common Key Objects Ready To Go ****** */
export let space = keyboard(32);
space.press = function () {
  console.log("space pressed", this.code);
};

space.release = function () {
  console.log("space released", this.code);
};

export let left = keyboard(37);
left.press = () => console.log("left arrow pressed", left.code);
left.release = () => console.log("left arrow released", left.code);

export let up = keyboard(38);
up.press = () => console.log("up arrow pressed", up.code);
up.release = () => console.log("up arrow released", up.code);

export let right = keyboard(39);
right.press = () => console.log("right arrow pressed", right.code);
right.release = () => console.log("right arrow released", right.code);

export let down = keyboard(40);
down.press = () => console.log("down arrow pressed", down.code);
down.release = () => console.log("down arrow released", down.code);
