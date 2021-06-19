/* promises.js */
// console.log("Hey! Promises!! Promises!!! :->");
// Promises let you sequence tasks in order

// To display a message once per second

// first create a wait function that uses setTimeout
// to count in milliseconds:
// the wait function will retrun a Promise object
// when setTimeout has finished counting
function wait(duration = 0) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// resolve is a special function built into the promise
//object. Whenever the task is finished, call resolve to
// tell the Promise that the task is done.
// In our wait function, resolve will be called when
// setTimeout is finished counting

// We can now use this wait function to chain
// a series of tasks together using .then() to
// chain each task to the next one
wait(1000)
  .then(() => console.log("One"))
  .then(() => wait(1000))
  .then(() => console.log("Two"))
  .then(() => wait(1000))
  .then(() => console.log("Three"));
/*
You can call resolve when anything important happens

let theAlienMothershipCrashed = true;
if (theAlienMothershipCrashed) {
  resolve();
}

Note: Promises also ave an optional second parameter called
                    `reject`
*/
function task(event) {
  return new Promise((resolve, reject) => {
    if (event) {
      reject(new Error("Oh! Pants! The task failed"));
    } else resolve("Yeah! Task didn't fail!");
  });
}

task(false).then((result) => console.log(result));
