console.log(3 / 2); //1.5, not 1
console.log(Math.floor(3 / 2)); //1
//apparent integer is implicitly a float

console.log(0.1 + 0.2 == 0.30000000000000004); //true

console.log(parseInt("123", 10)); //123
console.log(parseInt("010", 10)); //10

//older browsers assume strings starting with 0 are octal (radix 8)
console.log(parseInt("010")); //8

//convert binary to integer
console.log(parseInt("11", 2)); //3
