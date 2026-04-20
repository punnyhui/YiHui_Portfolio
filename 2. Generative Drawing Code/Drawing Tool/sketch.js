/* I wanted to create a colourful garden filled with randomly moving snails. 
 * 
 * I started by setting the canvas to 500x500 and creating a vibrant gradient
 * background to give it a cheerful atmosphere. 
 * 
 * To create the snails, I referenced a set of codes from ChatGPT as a 
 * starting point. From there, I modified and experimented with the code
 * to better suit my idea. I adjusted the quantity, finally settling with 
 * 25 snails to avoid overcrowding while also making it look fun. 
 * 
 * I also experimented with the snails' colours, shapes and sizes. I 
 * standardised the shells to pastel tones as I wanted a pastel colour palette.
 * I liked the randomisation of colours so I kept that part of the code to 
 * maintain variety and playfullness. Then I also adjusted the proportions 
 * of the ellipses to refine the overall snail appearance. 
 * 
 * For the final touch, I made the boid strokes transparent as I prefer
 * a cleaner look without the lines that appeared when steering the snails
 * with the mouse.  
 * 
 * This assignment made me feel the most proud because the colours bring me 
 * joy and I did not expect it to turn out so cool. It also helped me gain 
 * confidence in modifying existing codes. I learnt that creative thinking 
 * and experimenting is important in working towards creating a visually 
 * interesting work. 
 */

let flock;

function setGradient(x, y, w, h, c1, c2, axis) {

  if (axis === "Y") {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === "X") {
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function setup() {
  createCanvas(500, 500);

setGradient(0, 0, width, height * 0.7, color(178,275,102), color(255,200,200), "Y");

setGradient(0, height*0.7, width, height*0.3, color(255,200,200), color(150,200,255), "Y");

  // Add an initial set of boids into the system.
  flock = new Flock();
  for (let i = 0; i < 25; i++) {
    let b = new Boid(random(width), random(height));
    flock.addBoid(b);
  }
}

function draw() {
  flock.run();
}

function Flock() {
  this.boids = [];
}

Flock.prototype.run = function () {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);
  }
};

Flock.prototype.addBoid = function (b) {
  this.boids.push(b);
};

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 1.0;
  this.maxSpeed = 1;
  this.maxForce = 20;
}

Boid.prototype.run = function (boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
};

Boid.prototype.applyForce = function (force) {
  this.acceleration.add(force);
};

Boid.prototype.flock = function (boids) {
  let sep = this.separate(boids);
  let ali = this.align(boids);
  let coh = this.cohesion(boids);
  let fol = this.mouse(boids);

  sep.mult(1.0);
  ali.mult(1.0);
  coh.mult(1.0);

  fol.mult(0.4);

  if (key == "s") this.applyForce(sep);
  else if (key == "a") this.applyForce(ali);
  else if (key == "c") this.applyForce(coh);
  else;
  this.applyForce(fol);
};

Boid.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.position.add(this.velocity);

  push();
  stroke(51, 255, 51,0); 
  line(
    this.acceleration.x * 70 + this.position.x,
    this.acceleration.y * 70 + this.position.y,
    this.position.x,
    this.position.y
  );
  pop();

  this.acceleration.mult(0);
};

Boid.prototype.seek = function (target) {
  let desired = p5.Vector.sub(target, this.position);

  desired.normalize();
  desired.mult(this.maxSpeed);

  let steer = p5.Vector.sub(desired, this.velocity);

  steer.limit(this.maxForce);
  return steer;
};

Boid.prototype.render = function () {
  let theta = this.velocity.heading();

  push();
  translate(this.position.x, this.position.y);
  rotate(theta);

  // Snail Body
  noStroke();
  fill(255, 200, 220); 
  ellipse(0, 0, 20, 10);

  // Snail Shell
  fill(random(150,255), random(150,255), random(150,255));
 // purple shell
  ellipse(-6, 0, 12, 20);

  // Shell spiral
  stroke(140, 110, 220);
  noFill();
  strokeWeight(1.5);
  circle(-6, 0, 6);

  //Eye stalks
  stroke(255, 200, 220);
  strokeWeight(2);
  line(6, -2, 10, -6);
  line(6, 2, 10, 6);

  // Eyes
  fill(0);
  noStroke();
  circle(10, -6, 3);
  circle(10, 6, 3);

  pop();
};

Boid.prototype.borders = function () {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
};

Boid.prototype.separate = function (boids) {
  let desiredSeparation = 100;

  let steer = createVector(0, 0);
  let count = 20;

  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);

    if (d > 0 && d < desiredSeparation) {
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      steer.add(diff);
      count++;
    }
  }
return steer;
};

Boid.prototype.align = function (boids) {
  let neighbordist = 50;

  let sum = createVector(0, 0);
  let count = 0;

  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if (d > 0 && d < neighbordist) {
      sum.add(boids[i].velocity);
      count++;
    }
  }

  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxSpeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Boid.prototype.cohesion = function (boids) {
  let neighbordist = 50;

  let sum = createVector(0, 0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if (d > 0 && d < neighbordist) {
      sum.add(boids[i].position);
      count++;
    }
  }

  if (count > 0) {
    sum.div(count);
    return this.seek(sum);
  } else {
    return createVector(0, 0);
  }
};

Boid.prototype.mouse = function (boids) {
  if (mouseIsPressed) return this.seek(createVector(mouseX, mouseY));
  else return createVector(0, 0);
};
