import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { PointerLockControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/PointerLockControls.js';
import Player from './Objects/Player.js';
import Block from './Objects/Block.js';
import Ground from './Objects/Ground.js';
import AmmoRefill from './Objects/AmmoRefill.js';

const GRAVITY = 0.02;

const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });

const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const ground = new Ground(0, -4, 0, 100, 100, 0x9b7653);
let ammoCrate = new AmmoRefill(-10, -4, -10, scene);
scene.add(...ground.mesh);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
document.addEventListener("movemouse", () => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
});

let cursorLock = false;
var controls = new PointerLockControls(camera, document.body);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Create a PointLight and turn on shadows for the light
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(20, 20, 10);
const light2 = new THREE.PointLight(0xffffff, 0.4, 100);
light2.position.set(-20, 10, -40);
scene.add(light);
scene.add(light2);

let cube = new Block(0, 0, 0, 2, 10, 2, 0xffff00);
let cube2 = new Block(8, 0, 0, 5, 10, 5, 0x00ffff);

scene.add(cube.mesh);
scene.add(cube2.mesh);

let player = new Player(scene);

camera.position.z = 15;
camera.position.x = 15;

document.addEventListener("click", () => {
  if (cursorLock) {
    player.shoot(scene, raycaster);
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
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width  = canvas.clientWidth  * pixelRatio | 0;
  const height = canvas.clientHeight * pixelRatio | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
function animate() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  requestAnimationFrame(animate);

  raycaster.setFromCamera(mouse, camera);
  player.update(raycaster.ray, cursorLock, GRAVITY);
  camera.position.x = player.pos.x;
  camera.position.y = player.pos.y;
  camera.position.z = player.pos.z;
  renderer.render(scene, camera);
}
animate();
