const width = window.innerWidth;
const height = window.innerHeight;

let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //antialias renders edges of shapes more smoothly
renderer.setSize(width, height);
renderer.setClearColor(0xdddddd, 1);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, width / height);
camera.position.z = 50;
scene.add(camera);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
let basicMaterial = new THREE.MeshBasicMaterial({ color: 0x0095dd });
let cube = new THREE.Mesh(boxGeometry, basicMaterial);
scene.add(cube);
cube.rotation.set(0.4, 0.2, 0);
cube.position.x = -25;

let torusGeometry = new THREE.TorusGeometry(7, 1, 6, 12);
let phongMaterial = new THREE.MeshPhongMaterial({ color: 0xff9500 });
let torus = new THREE.Mesh(torusGeometry, phongMaterial);
torus.rotation.set(0.3, 0.6, 0);
scene.add(torus);

let dodecahedronGeometry = new THREE.DodecahedronGeometry(7);
let lambertMaterial = new THREE.MeshLambertMaterial({ color: 0xeaeff2 });
let dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial);
dodecahedron.position.x = 25;
dodecahedron.rotation.set(0.2, 0.5, 0);
scene.add(dodecahedron);

let light = new THREE.PointLight(0xffffff);
light.position.set(-10, 15, 50);
scene.add(light);
