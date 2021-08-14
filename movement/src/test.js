// file for testing stuufff

function randInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)); // inc min excl max
}

for (i = 0; i < 10; i++) {
  let n = randInt(0, 15);
  if (n == 0 || n == 14 || n > 14) console.log("Yeah!", n);
  //   console.log(n);
}
