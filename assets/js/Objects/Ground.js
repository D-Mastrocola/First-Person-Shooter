import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js";
class Ground {
  constructor(x, y, z, width, height, color) {
    this.pos = new THREE.Vector3(x, y, z);
    this.size = new THREE.Vector3(width, height, 0)
    this.color = color
    this.mesh = [];
    this.init();
  }
  init() {
    this.mesh = [];
    this.geometry = new THREE.PlaneGeometry(this.size.x, this.size.y);
    this.material = new THREE.MeshPhongMaterial({
      color: this.color,
      side: THREE.DoubleSide,
    });
    this.mesh.push(new THREE.Mesh(this.geometry, this.material));
    this.mesh[0].position.x = this.pos.x;
    this.mesh[0].position.y = this.pos.y;
    this.mesh[0].position.z = this.pos.z;
    //Rotate plane 90deg
    this.mesh[0].rotateX(Math.PI / 2);

    //Sky
    this.geometry = new THREE.BoxGeometry(this.size.x + 4, 50, this.size.y + 4);
    this.material = new THREE.MeshBasicMaterial({
      color: 0x87ceeb,
      side: THREE.DoubleSide,
    });
    this.mesh.push(new THREE.Mesh(this.geometry, this.material));
    this.mesh[1].position.x = this.pos.x;
    this.mesh[1].position.y = this.pos.y + 4;
    this.mesh[1].position.z = this.pos.z;
  }
}

export default Ground;
