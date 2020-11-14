"use strict";

// adapted from http://fluid.nl/content/designengaged/index.htm

//////////////////////////////////

const canvas = {
  init() {
    this.elem = document.querySelector("canvas");
    this.resize();
    window.addEventListener("resize", () => this.resize(), false);
    return this.elem.getContext("2d");
  },
  resize() {
    this.width = this.elem.width = this.elem.offsetWidth;
    this.height = this.elem.height = this.elem.offsetHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.size = 1.25 * Math.sqrt(this.width * this.width + this.height);
  },
  clear() {
    ctx.clearRect(0, 0, this.width, this.height);
  }
};

////////////////////////////////////7

const pointer = {
  x: 0,
  y: 0,
  init(x, y) {
    window.addEventListener("pointermove", (e) => this.move(e), false);
    this.x = canvas.centerX;
    this.y = canvas.centerY + 100;
  },
  move(e) {
    this.x = e.clientX;
    this.y = e.clientY;
  }
};

/////////////////////////////////////////

const Sprite = class {
  constructor(x) {
    this.x = x * 10;
    this.rot = 0;
    this.scale = 1;
  }
  update() {
    const x = Math.cos(rot) * this.x;
    const y = Math.sin(rot) * this.x;
    const dx = Math.abs(pointer.x - canvas.centerX + x);
    const dy = Math.abs(pointer.y - canvas.centerY + y);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const scale = Math.max(0, (0.5 * canvas.size - dist));
    this.scale += (scale - this.scale) * 0.1;
    this.rot += ((dy / 120) * Math.PI - this.rot) * 0.1;
    this.draw(x, y, rot + this.rot, this.scale);
  }
  draw(x, y, r, s) {
    ctx.save();
    ctx.translate(canvas.centerX + x, canvas.centerY + y);
    ctx.rotate(r);
    ctx.scale(s, s);
    ctx.drawImage(sprite, -0.75, -0.25, 1, 0.5);
    ctx.restore();
  }
};

/////////////////////////////////////7

const run = () => {
  requestAnimationFrame(run);
  canvas.clear();
  rot += 0.01;
  for (const sprite of sprites) sprite.update();
};

//////////////////////////////////////////7

const ctx = canvas.init();
pointer.init();
console.clear();

let rot = 0;

const sprite = new Image();
sprite.src = "https://assets.codepen.io/222599/sprite.PNG";
const sprites = [];
for (let i = -60; i < 60; i++) {
  sprites.push(new Sprite(i));
}
run();