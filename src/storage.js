/* storage.js */
console.log("Hello!?? storage file here!");
// saving game data with localStorage
let anyNumber = 34;
localStorage.setItem("data", anyNumber);

// retrieve it from localStorage:
let loadedData = localStorage.getItem("data");
console.log(typeof loadedData); // string

// convert the string back to a number
loadedData = parseInt(loadedData);
console.log(typeof loadedData); // number

// clear the local storage of `data` key/value pair
localStorage.removeItem("data");
console.log(localStorage.getItem("data")); //null

// or clear all data in one shot:
localStorage.clear();

// our data is still available locally though:
console.log(loadedData); // 34

// Example game data object
// organise all the data to be saved innto a single object:

let gameData = {
  playerName: "Borris!",
  levelCompleted: 5,
  score: 84,
  items: ["hat", "umbrella", "katana"],
};
// If we store this object as is it will turn all
// the property names and values into one big string of data
// fortunately we can work around it by
// saving the object in JSON data format

let gameDataJSON = JSON.stringify(gameData);

// use localStorage to save this new version:
localStorage.setItem("gameData", gameDataJSON);

// use JSON.parse to convert it back to a normal object:
loadedData = localStorage.getItem("gameData");
let data = JSON.parse(loadedData);
console.log(Object.keys(data));
localStorage.clear();
