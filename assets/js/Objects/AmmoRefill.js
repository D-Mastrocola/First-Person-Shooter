import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';

class AmmoRefill {
  constructor(x, y, z, scene) {
    this.pos = new THREE.Vector3(x, y, z);
    this.init(scene, this);
  }
  init(scene, player) {
    const loader = new GLTFLoader();

    loader.load(
      "./assets/models/ammo.glb",
      function (gltf) {
        scene.add(gltf.scene);
        console.log(gltf)
        gltf.scene.position.x = player.x;
        gltf.scene.position.y = player.y;
        gltf.scene.position.z = player.z;
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }
}
export default AmmoRefill;