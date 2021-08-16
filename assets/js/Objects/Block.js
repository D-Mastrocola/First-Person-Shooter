import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
class Block {
    constructor(x, y, z, width, height, depth, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.geometry;
        this.material;
        this.mesh;
        this.init();
    }
    init() {
        this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.material = new THREE.MeshPhongMaterial({ color: this.color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = this.x;
        this.mesh.position.y = this.y;
        this.mesh.position.z = this.z;
    }
}
export default Block;