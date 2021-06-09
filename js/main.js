let firstName = "Kevin";
let names = ["Sam", "Pam", "Jam"];
console.log("My name is ${firstName}");
console.log(`My name is ${firstName}`); //interpolation
console.log(`My name is ${names[0]}`);

//Symbols are almost exclusively used as special keys on objects

let meaningOfLife = Symbol("meaningOfLife");
let hitchhikersGuide = { [meaningOfLife]: 42 };
console.log(hitchhikersGuide[meaningOfLife]);
