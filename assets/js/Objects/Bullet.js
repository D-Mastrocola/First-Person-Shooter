import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js";
class Bullet {
  constructor(x, y, z, raycaster) {
    this.pos = new THREE.Vector3(x, y, z);
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 0.1;
    this.speed = 0.5;
    this.vel = raycaster.ray.direction.clone();
    this.vel.multiplyScalar(this.speed);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.zSpeed = 0;
    this.init();
  }
  init() {
    this.geometry = new THREE.SphereGeometry(this.size, 32, 32);
    this.material = new THREE.MeshPhongMaterial({ color: 0xff00ff });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = this.pos.x;
    this.mesh.position.y = this.pos.y;
    this.mesh.position.z = this.pos.z;
  }
  update() {
    this.pos.add(this.vel);
    this.mesh.position.x = this.pos.x;
    this.mesh.position.y = this.pos.y;
    this.mesh.position.z = this.pos.z;
  }
}
export default Bullet;
