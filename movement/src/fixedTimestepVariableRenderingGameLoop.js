/*
 ****** The Game Loop with a Set Frame Rate & Interpolation ******

 The set frame rate: `reqestAnimationFrame()` tells the
 browser that it can render frames at the rate of the
 screen refresh rate, usually 60Hz, which will equate to
 60 frames per second. Fixing the frame rate ensures that
 the animation will run at a consistent speed across
 devices, even if the screen refresh rate is 120Hz.

 Interpolation is used to average out the sprite's position
 between the time of the last render and the current frame
 to be rendered. This ensure that the animation runs
 smoothly without "jankiness"

 The objective of employing these techniques is to win a
 bit of time to accomodate browser background processes
 such as 'garbage collection' which we have no control
 over.

 We can split the render and frame update functions and
 run them at different rates. The update function is
 responsible for updating the animation logic (moving something) whereas the render function is responsible for
 exactly that, rendering the frame! So, we could allow the
 render function to run at 60 frames per second but only
 update the animation logic at 30 frames per second.

 Due to real world jankiness caused by background processes
 the frame rate of the render function may dip, this is
 where we employ interploation to iron out the 
 inconsistences in the frame rate so that we have smooth
 movement and scene changes
 */

let fps = 30, // frames per second
  previous = 0, // store for the previous timestamp
  frameDuration = 1000 / fps,
  lag = 0;

function gameLoop(timestamp) {
  requestAnimationFrame(timestamp);

  // calculate the elapsed time since the last frame
  if (!timestamp) timestamp = 0;
  let elapsed = timestamp - previous;

  // correct any huge gaps in the elapsed time
  if (elapsed > 1000) elapsed = frameDuration;

  // add the elapsed time to the lag counter. This
  // conunts the amount of elapsed time between frames
  lag += elapsed;

  // update the frame if the lag counter is greater
  // than or equal to the frame duration. This will
  // call the update function as many times as needed
  // until lag has caught up with the current frame rate
  while (lag >= frameDuration) {
    // uppdate the scene logic
    update();

    // reduce the lag conter by the frame duration
    lag -= frameDuration;
  }

  // calculate the lag offset so that we know how
  // far we are into the next frame
  let lagOffset = lag / frameDuration;

  // render the sprites using the lagOffset to
  // interpolate the sprites' previous position
  renderWithInterpolation(canvas, lagOffset);

  // capture the current time to ba used as the
  // previous time in the next frame
  previous = timestamp;
}

function update() {
  // capture the ball's previous position
  ball.previousX = sprite.x;
  ball.previousY = sprite.y;

  // move the ball and bounce it off the stage edges
  ball.vy += ball.gravity;
  ball.vx *= ball.frictionX;
  ball.x += ball.vx;
  ball.y += ball.vy;

  let collision = contain(ball, stage.localBounds, true);
  if (collision === "bottom") {
    ball.friction = 0.96;
  } else {
    ball.friction = 1;
  }
}
