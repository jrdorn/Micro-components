function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next()); //10
console.log(gen.next()); //20
console.log(gen.next()); //undef

function* idMaker() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

const gem = idMaker();

console.log(gem.next());
console.log(gem.next());
console.log(gem.next());
gem.done = true;
