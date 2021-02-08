import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js";

class AmmoRefill {
  constructor(x, y, z, scene) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.init(scene, this);
  }
  init(scene, player) {
    const loader = new GLTFLoader();

    loader.load(
      "./src/Models/ammo.glb",
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