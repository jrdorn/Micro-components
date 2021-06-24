import * as THREE from "https://cdn.skypack.dev/pin/three@v0.129.0-quMKpfghAJYitzSsDf58/mode=imports,min/optimized/three.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cube;

let loader = new THREE.TextureLoader();

loader.load("http://localhost:3000/shrek.png", function (texture) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  let geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
  let material = new THREE.MeshLambertMaterial({
    map: texture,
    shading: THREE.FlatShading,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  draw();
});

let light = new THREE.AmbientLight("rgb(255,255,255)");
scene.add(light);

function draw() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(draw);
}
