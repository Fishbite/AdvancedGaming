/* main.js */
import { hello } from "./module.js";
console.log(hello);
import { hey } from "./module2.js";
console.log(hey);
import { colour, shape } from "./module3.js";
console.log(colour, shape);
// import the whole of module 4 by defining it as a module
// with the name of position:
//module position from "./module4.js";
//console.log(`x: ${position.x}`)
/* The above doesn't work! VS Code complains:
'module' declarations can only be used in TypeScript files.ts(8006)

                Ho! Bloody Hum!
*/
import { x, y } from "./module4.js";
console.log(`x: ${x} y:${y}`);

// Importing a default class from a module:
// Note: you can give the class any name when you import it
// It doesn't have to match the module's filename
import ArsenVenger from "./Animal.js";
var cat = new ArsenVenger();
cat.say = "Meow!";
cat.speak();
