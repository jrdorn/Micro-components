//Red - global scope
const menu = [
  { cost: 5, item: "coffee" },
  { cost: 7, item: "latte" },
  { cost: 8, item: "biscuit" },
];

function purchaseItem(product) {
  let order = 0;
  //Orange
  for (let menuItem of menu) {
    //Yellow
    if (menuItem.item === product) {
      order = menuItem;
    }
  }

  if (order === 0) {
    //Violet
    return console.log("Not found");
  }

  let fruitLife = prompt("Would you like fruit with that? (y/n)");
  function withFruit() {
    //Lavender
    let order = "Fruit"; //shadowing
    return console.log(`${order} is awesome`);
  }
  if (fruitLife === "y") {
    //Green
    withFruit();
  } else {
    //Blue
    console.log(`Your total is $${order.cost}`);
  }
}

let userOrder = prompt("What would you like to order?");
purchaseItem(userOrder);
