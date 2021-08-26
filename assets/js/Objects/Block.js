import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
class Block {
    constructor(x, y, z, width, height, depth, color) {
        this.pos = new THREE.Vector3(x, y, z);
        this.size =  new THREE.Vector3(width, height, depth);
        this.color = color;
        this.geometry;
        this.material;
        this.mesh;
        this.init();
    }
    init() {
        this.geometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
        this.material = new THREE.MeshPhongMaterial({ color: this.color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = this.pos.x;
        this.mesh.position.y = this.pos.y;
        this.mesh.position.z = this.pos.z;
        console.log(this.mesh);
    }
}
export default Block;