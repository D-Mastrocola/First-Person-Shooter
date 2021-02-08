import * as THREE from "https://unpkg.com/three/build/three.module.js";
class Bullet {
    constructor(x, y, z, raycaster) {
        this.x = x;
        this.y = y; 
        this.z = z;
        this.size = .1;
        this.speed = .5;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.zSpeed = 0;
        this.init(raycaster);
    }
    init(raycaster) {
        this.geometry = new THREE.SphereGeometry(this.size, 32, 32);
        this.material = new THREE.MeshPhongMaterial({ color: 0xff00ff });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = this.x;
        this.mesh.position.y = this.y;
        this.mesh.position.z = this.z;
        this.xSpeed = raycaster.x * this.speed;
        this.ySpeed = raycaster.y * this.speed;
        this.zSpeed = raycaster.z * this.speed;
    }
    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.z += this.zSpeed;
        this.mesh.position.x = this.x;
        this.mesh.position.y = this.y;
        this.mesh.position.z = this.z;
    }
}
export default Bullet;