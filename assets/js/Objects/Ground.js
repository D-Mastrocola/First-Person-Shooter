import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
class Ground {
    constructor(x, y, z, width, height, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.color = color;
        this.mesh = [];
        this.init();
    }
    init() {
        this.mesh = [];
        this.geometry = new THREE.PlaneGeometry(this.width, this.height);
        this.material = new THREE.MeshPhongMaterial({ color: this.color , side: THREE.DoubleSide});
        this.mesh.push(new THREE.Mesh(this.geometry, this.material));
        this.mesh[0].position.x = this.x;
        this.mesh[0].position.y = this.y;
        this.mesh[0].position.z = this.z;
        //Rotate plane 90deg
        this.mesh[0].rotateX(Math.PI / 2);

        //Sky
        this.geometry = new THREE.BoxGeometry(this.width + 4, 50, this.height + 4);
        this.material = new THREE.MeshBasicMaterial({ color: 0x87ceeb , side: THREE.DoubleSide});
        this.mesh.push(new THREE.Mesh(this.geometry, this.material));
        this.mesh[1].position.x = this.x ;
        this.mesh[1].position.y = this.y + 4;
        this.mesh[1].position.z = this.z;
    }
}

export default Ground;
