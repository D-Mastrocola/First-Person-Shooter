import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js";
import Bullet from "./Bullet.js";

class Player {
  constructor(scene) {
    this.x = 0;
    this.y = 0;
    this.z = 5;
    this.speed = 0.3;
    //horizontal
    this.xSpeed = 0;
    this.zSpeed = 0;
    //vertical
    this.ySpeed = 0;
    this.jumped = true;
    this.keys = {
      w: 0,
      a: 0,
      s: 0,
      d: 0,
      space: 0,
    };
    this.ammo = 25;
    this.bullets = [];
    this.model;
  }
  keyPressed(key) {
    //w
    if (key === 87) {
      this.keys.w = 1;
    }
    //s
    if (key === 83) {
      this.keys.s = 1;
    }
    //a
    if (key === 65) {
      this.keys.a = 1;
    }
    //d
    if (key === 68) {
      this.keys.d = 1;
    }
    if (key === 32) {
      this.keys.space = 1;
    }
  }
  keyReleased(key) {
    //w
    if (key === 87) {
      this.keys.w = 0;
    }
    //s
    if (key === 83) {
      this.keys.s = 0;
    }
    //a
    if (key === 65) {
      this.keys.a = 0;
    }
    //d
    if (key === 68) {
      this.keys.d = 0;
    }
    if (key === 32) {
      this.keys.space = 0;
    }
  }
  setSpeed(raycaster, cursorLock, GRAVITY) {
    this.xSpeed = 0;
    this.zSpeed = 0;
    if (
      cursorLock &&
      (this.keys.w === 1 ||
        this.keys.s === 1 ||
        this.keys.a === 1 ||
        this.keys.d === 1)
    ) {
      if (this.keys.w === 1 || this.keys.s === 1) {
        if (this.keys.w === 1) {
          if (this.keys.s !== 1) {
            this.zSpeed = this.speed * raycaster.z;
            this.xSpeed = this.speed * raycaster.x;
          }
        } else if (this.keys.s === 1) {
          if (this.keys.w !== 1) {
            this.zSpeed = -this.speed * raycaster.z;
            this.xSpeed = -this.speed * raycaster.x;
          }
        }
      }
      if (this.keys.a === 1 || this.keys.d === 1) {
        if (this.keys.a === 1) {
          if (this.keys.d !== 1) {
            this.xSpeed = this.speed * raycaster.z;
            this.zSpeed = -this.speed * raycaster.x;
          }
        } else if (this.keys.d === 1) {
          if (this.keys.a !== 1) {
            this.xSpeed = -this.speed * raycaster.z;
            this.zSpeed = this.speed * raycaster.x;
          }
        }
      }
    }
    if (this.keys.space === 1 && this.jumped === false) {
      this.ySpeed = 0.4;
      this.jumped = true;
    }
    this.ySpeed -= GRAVITY;
  }
  setPosition() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.z += this.zSpeed;
    if (this.y <= -2.5) {
      this.y = -2.5;
      this.ySpeed = 0;
      this.jumped = false;
    }
  }
  shoot(scene, raycaster) {
    if (this.ammo > 0) {
      console.log(raycaster);
      let bullet = new Bullet(this.x, this.y, this.z, raycaster.ray.direction);
      this.bullets.push(bullet);
      this.ammo--;
      scene.add(bullet.mesh);
    } else {
      console.log("no ammo");
    }
  }
  update(raycaster, cursorLock, GRAVITY) {
    this.setSpeed(raycaster.direction, cursorLock, GRAVITY);
    this.setPosition();
    this.bullets.forEach((e) => {
      e.update();
    });
    document.getElementById('ammo').innerHTML = this.ammo;
  }
}

export default Player;
