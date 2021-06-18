/* just taking notes! */

/* ********** COMPOSITION ********** */
// Composition: how does composition work?
// just wrap an object in a function and get it to return that object:
function anAnimal() {
  return {
    legs: 4,
    eyes: 2,
    say: "Huh?",
    speak() {
      console.log(this.say);
    },
  };
}

// by creating a function that returns an object we
// are creating a completely fresh new object everytime
// the function is called

let aCat = anAnimal();
aCat.say = "Meow!";
aCat.speak();

let aBird = anAnimal();
aBird.legs = 2;
aBird.wings = 2;
aBird.say = "chirp";

console.log(aBird);

/* ********** CLOSURE ********** */
// we're going to make our animal speak a random word
// choosing a random number is a common task
// so we'll create a helper function

function aRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(aRandom(1, 10));

function animal() {
  // vars
  let newObject, words;

  // helper function to retrun a random int
  // within a min & max range
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // the animals vocabulary
  words = ["Food!", "Sleep!", "Video Games!"];

  // A Speak function that chooses random words
  function speak() {
    let say = words[random(0, 2)];
    console.log(say);
  }

  // create a new object and add the 'speak' function to it
  newObject = {};
  newObject.speak = speak;

  // return the new object
  return newObject;
}

// use this code to create an animal and make it speak
let cat = animal();
cat.speak(); // speak is a public method available to the cat object

/* Configuring Objects */

let myCat = animal2({
  say: "Meow!",
  fur: "Black",
});

function animal2(config) {
  // create the 'newObject'
  let newObject = {
    legs: 4,
    eyes: 2,
    say: "Huh?",
    speak() {
      console.log(this.say);
    },
  };
  // Copy the config object's properties onto the 'newObject'
  // They will override the default properties
  Object.assign(newObject, config);
  // Return the new object
  return newObject;
}

console.log(Object.keys(myCat));
// Array(5) [ "legs", "eyes", "say", "speak", "fur" ]
myCat.speak(); // Meow!

/* ********** Mixing and Matching Objects ********** */
// Use Object.assign to create a cyborg by combining
// a robot with a human

// first create 2 functions to return human & robot objects
function robot() {
  return {
    skill: "vaporizing death ray",
  };
}

function human() {
  return {
    hobby: "bake cookies",
  };
}

// create a cyborg function that combines these
// two objects into a new one

function cyborg() {
  // make a 'newObject' and add the robot & human properties to it
  let newObject = {};
  Object.assign(newObject, robot());
  Object.assign(newObject, human());

  // Create a speak function
  function speak() {
    console.log("I like to " + this.hobby + " using a " + this.skill);
  }

  // attach the speak function to the `newObject`
  // adding the function like this ensures that
  // `this` points to `newObject`
  newObject.speak = speak;

  //return the new object
  return newObject;
}

console.log(cyborg);
// Now let's create a cyborg and make it speak

let zxlorb = cyborg();
zxlorb.speak();
// I like to bake cookies using a vaporizing death ray

/*
So what's going on here? 
The newObject contains both the robot's skills and the human's hobby. When it speaks it uses both of them:

 function speak() {
    console.log("I like to " + this.hobby + " using a " + this.skill);
  }

  the identifier `this` will refere to whatever object the function is attached to. This next line attaches it to the `newObject`:

  newObject.speak = speak;

  This means that this.hobby & this.skill in the function will interpreted as newObject.hobby & newObject.skill

  This general technique of composing new objects from other objects is sometime called the
    ****** MIXIN PATTERN *****
    there are many variations on it.
*/

/*  ****** Classes ***** */
// So, we've made functions that return new objects
/*
function animal() {
let newObject = {};
newObject.eyes = 2;
newObject.feet = 4;
return newObject;
}
*/
// Classes return themselves as an object
class Animal {
  constructor(config) {
    this.eyes = 2;
    this.feet = 4;
    this.say = "Arse!";

    // Use the `config` objects properties:
    Object.assign(this, config);
  }

  speak() {
    console.log(this.say);
  }
}

// Note: the capital A in Animal tells us
// the function returns itself as an object

let myBird = new Animal();
console.log(`Eyes: ${myBird.eyes}`);

myBird.legs = 2;
myBird.feet = 2;
console.log(`Legs: ${myBird.legs}`);

myBird.speak();

// now we'll send a config object to the constructor
let mouse = new Animal({
  say: "Squeak!",
  tail: "Curly",
});

mouse.speak();
console.log(Object.keys(mouse));
console.log(mouse.feet);

/* ****** Inheritance ****** */
/*
  To set up a basic innheritance chain, first create
  a general class with properties and methods that
  could apply to mnay objects of a similar kind
*/

// A general Monster class:

class Monster {
  constructor(htiPoints, scariness) {
    this.name = "Monster";
    this.htiPoints = htiPoints;
    this.scariness = scariness;
  }
  speak() {
    console.log(
      `I'm a ${this.scariness} scary ${this.name}  with ${this.htiPoints} hit points`
    );
  }
  attack(skill) {
    console.log(`The ${this.name} attacks with ${skill}`);
  }
}

/*
  This class is know as the parent or super class.
  You can onnw make a specific monster that
  extends the Monnster class
  */

// here's a Dragon class that extends the Monster class:

class Dragon extends Monster {
  constructor(htiPoints, scariness, weapon) {
    // call the parent class's constructor with `super`
    super(htiPoints, scariness);
    this.name = "Dragon";
    this.weapon = weapon;
  }
  breathFire() {
    // call the parent class's `attack` method
    super.attack(`flaming ${this.weapon}`);
  }
}

/*
  This Dragon class is a child of the Monster class.
  The Dragon has inherited all the properties of the
  Monster class, but it also includes its own custom
  ones. It can call methods on the Monster class with
  the keyword `super`. Nowe lets create a new Dragon
  object and make it speak:
*/

let fluffyDragon = new Dragon(10, "somewhat", "furballs");
fluffyDragon.speak();
// I'm a somewhat scary Dragon with 10 hit points

fluffyDragon.breathFire();
// The Dragon attacks with flaming furballs
