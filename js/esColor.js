export { getColor };

/*************** */

let records = [
  { id: 1, name: "turquoise" },
  { id: 2, name: "cyan" },
  { id: 3, name: "magenta" },
];

function getColor(colorID) {
  let color = records.find((color) => color.id === colorID);
  return color.name;
}
