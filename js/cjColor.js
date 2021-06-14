var module = { exports: {} };
module.exports.getColor = getColor;

/**********************/

const palette = [
  { id: 1, color: "Red" },
  { id: 2, color: "Blue" },
  { id: 3, color: "Green" },
  { id: 4, color: "Indigo" },
];

function getColor(chosenID) {
  let chosen = palette.find((chosen) => chosen.id === chosenID);
  return chosen.color;
}

console.log(getColor(1));
