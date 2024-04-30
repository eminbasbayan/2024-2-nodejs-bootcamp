/* const superHero = require("./super-hero.js");

console.log(superHero.getName()); // Batman

superHero.setName("Superman");
console.log(superHero.getName()); // Superman

const newSuperHero = require("./super-hero.js");
console.log(newSuperHero.getName()); // Batman
 */

const SuperHero = require("./super-hero.js");
const superman = new SuperHero("Superman")
console.log(superman.getName());
const batman = new SuperHero("Batman")
console.log(batman.getName());