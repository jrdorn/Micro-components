var L;
window.onload = function () {
  L.mapquest.key = "PcPyGzJOMGYorjNK0SyHqo6RtY4EGvtQ";

  L.mapquest.map("map", {
    center: [53.480759, -2.242631],
    layers: L.mapquest.tileLayer("satellite"),
    zoom: 12,
  });
};
