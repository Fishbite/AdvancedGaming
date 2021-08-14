// return a random int between a max and min value

export let randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*

contain
-------

Keep a sprite contained inside a boundary

*/

export function contain(sprite, bounds, bounce = false, extra = undefined) {
  let x = bounds.x,
    y = bounds.y,
    width = bounds.width,
    height = bounds.height;

  //The `collision` object is used to store which
  //side of the containing rectangle the sprite hits
  let collision;

  //Left
  if (sprite.x < x) {
    //Bounce the sprite if `bounce` is true
    if (bounce) sprite.vx *= -1;
    //If the sprite has `mass`, let the mass
    //affect the sprite's velocity
    if (sprite.mass) sprite.vx /= sprite.mass;
    sprite.x = x;
    collision = "left";
  }
  //Top
  if (sprite.y < y) {
    if (bounce) sprite.vy *= -1;
    if (sprite.mass) sprite.vy /= sprite.mass;
    sprite.y = y;
    collision = "top";
  }
  //Right
  if (sprite.x + sprite.width > width) {
    if (bounce) sprite.vx *= -1;
    if (sprite.mass) sprite.vx /= sprite.mass;
    sprite.x = width - sprite.width;
    collision = "right";
  }
  //Bottom
  if (sprite.y + sprite.height > height) {
    if (bounce) sprite.vy *= -1;
    if (sprite.mass) sprite.vy /= sprite.mass;
    sprite.y = height - sprite.height;
    collision = "bottom";
  }

  //The `extra` function runs if there was a collision
  //and `extra` has been defined
  if (collision && extra) extra(collision);

  //Return the `collision` object
  return collision;
}
