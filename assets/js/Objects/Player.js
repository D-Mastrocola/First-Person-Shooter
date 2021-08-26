import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js";
import Bullet from "./Bullet.js";

class Player {
  constructor() {
    this.pos = new THREE.Vector3(1.8, 0, 5);
    console.log(this.pos);
    this.speed = 0.2;
    //horizontal
    this.vel = new THREE.Vector3(0, 0, 0);
    //vertical
    this.jumped = true;
    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      space: false,
    };
    this.size = new THREE.Vector3(2.5, 4, 2.5);
    this.ammo = 25;
    this.bullets = [];
    this.model;
  }
  keyPressed(key) {
    //w
    if (key === 87) {
      this.keys.w = true;
    }
    //s
    if (key === 83) {
      this.keys.s = true;
    }
    //a
    if (key === 65) {
      this.keys.a = true;
    }
    //d
    if (key === 68) {
      this.keys.d = true;
    }
    if (key === 32) {
      this.keys.space = true;
    }
  }
  keyReleased(key) {
    //w
    if (key === 87) {
      this.keys.w = false;
    }
    //s
    if (key === 83) {
      this.keys.s = false;
    }
    //a
    if (key === 65) {
      this.keys.a = false;
    }
    //d
    if (key === 68) {
      this.keys.d = false;
    }
    if (key === 32) {
      this.keys.space = false;
    }
  }
  setSpeed(raycaster, cursorLock, GRAVITY) {
    this.vel.x = 0;
    this.vel.z = 0;
    if (
      cursorLock &&
      (this.keys.w || this.keys.s || this.keys.a || this.keys.d)
    ) {
      let direction = raycaster.direction.clone();
      direction.y = 0;
      direction.normalize();
      direction.multiplyScalar(this.speed);

      if (this.keys.w) {
        this.vel.add(direction);
      }
      if (this.keys.a) {
        let newDir = direction.clone();
        //Rotates the vector 90 degrees
        let axis = new THREE.Vector3(0, 1, 0);
        newDir.applyAxisAngle(axis, Math.PI / 2);
        this.vel.add(newDir);
      }
      if (this.keys.s) {
        this.vel.sub(direction);
      }
      if (this.keys.d) {
        let newDir = direction.clone();
        //Rotates the vector 90 degrees
        let axis = new THREE.Vector3(0, 1, 0);
        newDir.applyAxisAngle(axis, Math.PI / 2);
        newDir.negate();
        this.vel.add(newDir);
      }
    }

    if (this.keys.space && !this.jumped) {
      this.vel.y = 0.4;
      this.jumped = true;
    }
    this.vel.y -= GRAVITY;
  }
  setPosition(world) {
    this.pos.add(this.vel);
    this.checkCollisions(world);
  }
  checkCollisions(world) {
    if (this.pos.y <= -2.5) {
      this.pos.y = -2.5;
      this.vel.y = 0;
      this.jumped = false;
    }

    world.objects.forEach((object) => {
      if (
        this.pos.x + this.size.x / 2 > object.pos.x - object.size.x / 2 &&
        this.pos.x - this.size.x / 2 < object.pos.x + object.size.x / 2
      ) {
        if (
          this.pos.z + this.size.z / 2 > object.pos.z - object.size.z / 2 &&
          this.pos.z - this.size.z / 2 < object.pos.z + object.size.z / 2
        ) {
          if (
            this.pos.y + this.size.y / 2 > object.pos.y - object.size.y / 2 &&
            this.pos.y - this.size.y / 2 < object.pos.y + object.size.y / 2
          ) {
            /*let playerRay = new THREE.Raycaster(
              this.pos.sub(this.vel),
              this.pos
            );
            //console.log(playerRay.ray)*/
          }
        }
      }
    });
  }
  shoot(scene, raycaster) {
    if (this.ammo > 0) {
      let bullet = new Bullet(this.pos.x, this.pos.y, this.pos.z, raycaster);
      this.bullets.push(bullet);
      this.ammo--;
      scene.add(bullet.mesh);
    } else {
      console.log("no ammo");
    }
  }
  update(raycaster, cursorLock, GRAVITY, world) {
    this.setSpeed(raycaster, cursorLock, GRAVITY);
    this.setPosition(world);
    this.bullets.forEach((e) => {
      e.update();
    });
    document.getElementById("ammo").innerHTML = this.ammo;
  }
}

export default Player;
