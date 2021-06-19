/* Animal.js */
/*
    If you have a module that only exports one property, you can make that property the default export. This is especially useful if you have a big class that you wan to use as a module.

    This file has one class for creating animals:
*/
export default class {
  constructor() {
    this.legs = 4;
    this.eyes = 2;
    this.say = "Boff!";
  }
  speak() {
    console.log(this.say);
  }
}
