// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// chaining multiple assignments
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// class for balls

class Ball {
  constructor(x, y, size, color, velx = 0, vely = 0) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velx = velx;
    this.vely = vely;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  // update() {
  //   if (this.x + this.size >= width) {
  //     this.velX = -this.velX;
  //   }

  //   if (this.x - this.size <= 0) {
  //     this.velX = -this.velX;
  //   }

  //   if (this.y + this.size >= height) {
  //     this.velY = -this.velY;
  //   }

  //   if (this.y - this.size <= 0) {
  //     this.velY = -this.velY;
  //   }

  //   this.x += this.velX;
  //   this.y += this.velY;
  // }

  update() {
    // detecting right side edge
    if (this.x - this.size >= width) {
      this.velx = -this.velx;
    }
    // detecting left side edge
    if (this.x + this.size <= 0) {
      this.velx = -this.velx;
    }
    // detecting downside edge
    if (this.y - this.size >= height) {
      this.vely = -this.vely;
    }
    // detecting upside edge
    if (this.y + this.size <= 0) {
      this.vely = -this.vely;
    }

    // adding velocity to x and y to cause movement
    this.x += this.velx;
    this.y += this.vely;
  }
  
  collisionDetect() {
    for (const ball of Balls) {
      // ignoring the same ball's distance from itself
      if (this !== ball) {
        // applying pythogores thoeram [ c = sqt(a**2 + b**2)]
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // changing color if distance lesser then sum of their radii
        if (distance < this.size + ball.size) {
          ball.color =  randomRGB();
          this.color = randomRGB();
        }
      }
    }
  }
}

// creating a Balls array and storing all 10 ball instances of the Ball constructor object using a loop
const Balls = [];

for (let i = 0; i < 20; i++) {
  const Size = random(15, 20);
  const X = random(0 + Size, width - Size);
  const Y = random(0 + Size, height - Size);
  const VelX = random(-5, 5);
  const VelY = random(-5, 5);
  const ball = new Ball(X, Y, Size, randomRGB(), VelX, VelY);
  Balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of Balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}
loop();
