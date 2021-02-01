class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 5;
    this.speed = 0.15;
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
      space: 0
    };
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
    if( key === 32) {
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
    if( key === 32) {
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
      if(this.keys.space === 1 && this.jumped === false) {
        this.ySpeed = .25;
        this.jumped = true;
      }
    }
    this.ySpeed -= GRAVITY;
  }
  setPosition() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.z += this.zSpeed;
    if(this.y <= -2.5) {
      this.y = -2.5;
      this.ySpeed = 0;
      this.jumped = false;
    }
  }

  update(raycaster, cursorLock, GRAVITY) {
    this.setSpeed(raycaster.direction, cursorLock, GRAVITY);
    this.setPosition();
  }
}

export default Player;
