/* |||||||||| Load rooms.json into the program |||||||||| */
// empty object to hold the json data:
let rooms = {};

// create a new xhr object:
let xhr = new XMLHttpRequest();

// Use xhr to load the json file:
xhr.open("GET", "rooms.json", true);

// Tell xhr that it's a text file
xhr.responseType = "text";

// create an `onload` callback function that
// will handle the file loading:
xhr.onload = (event) => {
  //check to make sure file has loaded properly
  // `200` means that the load was successful
  if (xhr.status === 200) {
    //Copy the json file into the `rooms` object:
    rooms = JSON.parse(xhr.responseText);
    console.log("JSON data loaded");

    // Use this data to voew the library contents:
    console.log(rooms.livingRoom.contents);

    // check whether the closet light is on:
    if (rooms.closet.light.on === false) {
      console.log("The closet light is off");
    }
  }
};

// Send the request to load the file
xhr.send();
