/* 
    ****** Distance ******

A standard function that returns the distance
between two sprites.

s1 = sprite 1
s2 = sprite 2
*/

export function distance(s1, s2) {
  // calculate the vector
  let vx = s2.centerX - s1.centerX,
    vy = s2.centerY - s1.centerY;

  // return the length of the vector
  return Math.sqrt(vx * vx + vy * vy);
}
