// ****** Contain a Sprite ****** *\\
/*
    Containing a sprite inside an area is a
    pretty common task. This function can
    be used in any project that requires it.
*/

// ****  The `contain()` Function and its Args ***** *\\

// contain(sprite, bounds, bounce, callbackFunc)

// sprite: The sprite we want to contain
// bounds: an object with x, y, width, height props that
// define the containment area
// bounce: set to true if the sprite should bounce off
// the boundary edges
// callbackFunc: an optional callback function that should run
// if the sprite hits any of the boundry edges
export function contain(sprite, bounds, bounce = false, callback = undefined) {
  let x = bounds.x,
    y = bounds.y,
    width = bounds.width,
    height = bounds.height;

  // Store the side of the containing rectangle that the
  // sprite hits in this variable
  let collision;

  // set what happens to the sprite when the sprite
  // hits an edge of the canvas

  // Left
  if (sprite.x < x) {
    // bounce the sprite if `bounce` is true
    if (bounce) sprite.vx *= -1;

    // if the sprite has mass, let it affect
    // (dampen) the sprite's velocity
    if (sprite.mass) sprite.vx /= sprite.mass;

    // bring the sprite back onto the canvas
    sprite.x = x;
    // this stops the sprite sticking to the edges
    // and doing odd stuff like sinking through
    // the bottom of the canvas!

    // store the side of the containment area that the sprite hit
    collision = "left";
  }

  // right
  if (sprite.x + sprite.width > width) {
    if (bounce) sprite.vx *= -1;
    if (sprite.mass) sprite.vx /= sprite.mass;
    sprite.x = width - sprite.width; // bring it back
    let collision = "right";
  }

  // Top
  if (sprite.y < y) {
    if (bounce) sprite.vy *= -1;
    if (sprite.mass) sprite.vy /= sprite.mass;
    sprite.y = y; // bring it back
    let collision = "top";
  }

  // Bottom
  if (sprite.y + sprite.height > height) {
    if (bounce) sprite.vy *= -1;
    if (sprite.mass) sprite.vy /= sprite.mass;
    sprite.y = height - sprite.height; // bring it back
    collision = "bottom";
  }
  // run the callbackFunc if there was a collision and
  // the callback has been defined
  if (collision && callback) callback(collision);
  // Return the collision object
  return collision;
}

/* ****** How to Use The `contain` function ****** *\
  Replace the four `if   statements in the gravity.js file
  with this:

    let collision = contain(ball, stage.localBounds, true);

  Note: localBounds is an object with x, y, width & height props
  that define a rectangular area.

  As an alterantive to localBounds, we could supply a custom bounds object like this:

    let collision = contain(
      ball,
      {x: 0, y: 0, width: canvas.width, height: canvas.height},
      true
    );


*/
