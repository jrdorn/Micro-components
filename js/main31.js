const width = window.innerWidth;
const height = window.innerHeight;

let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //antialias renders edges of shapes more smoothly
renderer.setSize(width, height);
renderer.setClearColor(0xdddddd, 1);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(70, width / height);
camera.position.z = 50;
scene.add(camera);

// cube
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
let basicMaterial = new THREE.MeshBasicMaterial({ color: 0x42f5ec }); //blue
let cube = new THREE.Mesh(boxGeometry, basicMaterial);
cube.rotation.set(0.4, 0.2, 0);
cube.position.x = -25;
scene.add(cube);

//torus
let torusGeometry = new THREE.TorusGeometry(7, 1, 6, 12);
let phongMaterial = new THREE.MeshPhongMaterial({ color: 0xebcf34 }); //yellow
let torus = new THREE.Mesh(torusGeometry, phongMaterial);
torus.rotation.set(0.3, 0.6, 0);
scene.add(torus);

//dodecahedron
let dodecahedronGeometry = new THREE.DodecahedronGeometry(7);
let lambertMaterial = new THREE.MeshLambertMaterial({ color: 0xef42f5 }); //purple
let dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial);
dodecahedron.position.x = 25;
dodecahedron.rotation.set(0.2, 0.5, 0);
scene.add(dodecahedron);

//lighting
let light = new THREE.SpotLight(0xffffff);
light.position.set(-10, 20, 250);
scene.add(light);

let t = 0; //counting elapsed time

//display and animate shapes
function render() {
  requestAnimationFrame(render);
  t += 0.01;

  cube.rotation.y += 0.01;
  cube.scale.x = Math.abs(Math.sin(t));

  torus.scale.y = Math.abs(Math.sin(t));
  torus.rotation.y += 0.01;

  dodecahedron.rotation.y += 0.01;
  renderer.render(scene, camera);
}
render();
