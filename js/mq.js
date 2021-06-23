let L;
window.onload = function () {
  L.mapquest.key = "API";

  //div element with ID map
  let map = L.mapquest.map("map", {
    center: [53.480759, -2.242631],
    layers: L.mapquest.tileLayer("map"),
    zoom: 12,
  });
};
