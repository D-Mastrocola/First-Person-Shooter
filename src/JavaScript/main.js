import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { PointerLockControls } from "https://threejs.org/examples/jsm/controls/PointerLockControls.js";
import Player from "./Objects/Player.js";
import Block from "./Objects/Block.js";

const GRAVITY = 0.01;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let geometry = new THREE.PlaneGeometry(50, 50, 32);
let material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
plane.position.y = -4;
scene.add(plane);
console.log(Math.PI);
plane.rotateX(Math.PI / 2);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
document.addEventListener("movemouse", () => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
});

let cursorLock = false;
var controls = new PointerLockControls(camera, document.body);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Create a PointLight and turn on shadows for the light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(7, 10, 10);
scene.add(light);

let cube = new Block(0, 0, 0, 2, 10, 2, 0xff0000);
let cube2 = new Block(8, 0, 0, 5, 10, 5, 0x00ffff);

scene.add(cube.mesh);
scene.add(cube2.mesh);

let player = new Player();

camera.position.z = 15;
camera.position.x = 15;

document.addEventListener("click", () => {
  if (cursorLock) {
    console.log("fdsafasfs");
  } else {
    controls.lock();
  }
});

controls.addEventListener("lock", () => {
  cursorLock = true;
});
controls.addEventListener("unlock", () => {
  cursorLock = false;
});
window.addEventListener("keydown", (e) => {
  player.keyPressed(e.keyCode);
});
window.addEventListener("keyup", (e) => {
  player.keyReleased(e.keyCode);
});

function animate() {
  requestAnimationFrame(animate);
  raycaster.setFromCamera(mouse, camera);
  player.update(raycaster.ray, cursorLock, GRAVITY);
  camera.position.x = player.x;
  camera.position.y = player.y;
  camera.position.z = player.z;
  renderer.render(scene, camera);
}
animate();
