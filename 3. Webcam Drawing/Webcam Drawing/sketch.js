/* Webcam Drawing
 * For this assignment, I changed the original shapes from ellipses to stars 
 * with a black outline, and adjusted the spacing between them to 18. 
 * I wanted a more fairylike and soft look, so I used pastel pink and green colours.
 * I also experimented with the sensitivity by setting the threshold to 0.25, 
 * which made the stars appear more easily when there is movement. 
 * To make the stars stay on the screen for just awhile, I then adjusted the decay 
 * rate to 0.08 so they fade out slowly instead of disappearing immediately.
 * 
 * Overall, I like how it turned out, especially the colours and star shapes. 
 * However, the sketch was quite laggy, which made it less smooth. I tried to 
 * improve the performance using ChatGPT, but I didn’t fully understand the changes, 
 * and some made it even laggier, so I decided not to use them.
 * 
 * Moving forward, I will study what each part of the code does, so I can better 
 * understand and fix problems on my own, creating smoother and less laggy results.
 */


var camera;
var prevImg;
var currImg;
var diffImg;
var spotImg;
var threshold = 0.25;
var grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  camera = createCapture(VIDEO, { flipped: true });
  camera.hide();

  grid = new Grid(1280, 720);
}

function draw() {
  background(120);
  image(camera, 0, 0, 1280, 720);
  camera.loadPixels();


  var smallW = camera.width / 4;
  var smallH = camera.height / 4;

  currImg = createImage(smallW, smallH);
  currImg.copy(camera, 0, 0, camera.width, camera.height, 0, 0, smallW, smallH);
  currImg.filter("gray");

  diffImg = createImage(smallW, smallH);

  spotImg = createImage(smallW / 2, smallH / 2);
  spotImg.copy(
    camera,
    0,
    0,
    camera.width,
    camera.height,
    0,
    0,
    smallW / 2,
    smallH / 2
  );
  spotImg.filter("gray");

  if (typeof prevImg !== "undefined") {
    currImg.loadPixels();
    prevImg.loadPixels();
    diffImg.loadPixels();
    spotImg.loadPixels();

    for (var x = 0; x < currImg.width; x += 1) {
      for (var y = 0; y < currImg.height; y += 1) {
        var index = (x + y * currImg.width) * 4;
        var redCurr = currImg.pixels[index];
        var redPrev = prevImg.pixels[index];
        var d = abs(redCurr - redPrev)*3;
        d = constrain (d,0,255);

        diffImg.pixels[index + 0] = d;
        diffImg.pixels[index + 1] = d;
        diffImg.pixels[index + 2] = d;
        diffImg.pixels[index + 3] = 255;
      }
    }

    diffImg.updatePixels();
  }

  prevImg = createImage(smallW, smallH);
  prevImg.copy(
    currImg,
    0,
    0,
    currImg.width,
    currImg.height,
    0,
    0,
    smallW,
    smallH
  );

  diffImg.filter("threshold", 0.25);

  image(currImg, 1280, 0);
  image(diffImg, 1280, currImg.height);

  grid.update(diffImg);
}

function mousePressed() {
  threshold = map(mouseX, 0, 1280, 0, 1);
  console.log(threshold);
}

var Grid = function (_w, _h) {
  this.diffImg = 0;
  this.noteWidth = 18;
  this.worldWidth = _w;
  this.worldHeight = _h;
  this.numOfNotesX = int(this.worldWidth / this.noteWidth);
  this.numOfNotesY = int(this.worldHeight / this.noteWidth);
  this.arrayLength = this.numOfNotesX * this.numOfNotesY;
  this.noteStates = [];
  this.noteStates = new Array(this.arrayLength).fill(0);
  this.colorArray = [];
  console.log(this);
  console.log(_w, _h);


  for (var i = 0; i < this.arrayLength; i++) {
    this.colorArray.push(
      lerpColor(color(153, 255, 51, 100), color(255, 204, 299, 160), 0.0009 * i)
      );
      }

  this.update = function (_img) {
    this.diffImg = _img;
    this.diffImg.loadPixels();

    for (var x = 0; x < this.diffImg.width; x += 1) {
      for (var y = 0; y < this.diffImg.height; y += 1) {
        var index = (x + y * this.diffImg.width) * 4;
        var state = diffImg.pixels[index + 0];

        if (state == 255) {
          var screenX = map(x, 0, this.diffImg.width, 0, this.worldWidth);
          var screenY = map(y, 0, this.diffImg.height, 0, this.worldHeight);
          var noteIndexX = int(screenX / this.noteWidth);
          var noteIndexY = int(screenY / this.noteWidth);
          var noteIndex = noteIndexX + noteIndexY * this.numOfNotesX;
          this.noteStates[noteIndex] = 1;
        }
      }
    }

    for (var i = 0; i < this.arrayLength; i++) {
      this.noteStates[i] -= 0.08; 
      this.noteStates[i] = constrain(this.noteStates[i], 0, 1);
    }

    this.draw();
  };

  function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
  
  this.draw = function () {
   stroke(50);
strokeWeight(1);
drawingContext.shadowBlur = 10;
drawingContext.shadowColor = color(255, 255, 255);

    

    for (var x = 0; x < this.numOfNotesX / 2; x++) {
      for (var y = 0; y < this.numOfNotesY / 2; y++) {
        var posX = this.noteWidth / 2 + 2 * x * this.noteWidth;
        var posY = this.noteWidth / 2 + 2 * y * this.noteWidth;
        var noteIndex = x + y * this.numOfNotesX;

        if (this.noteStates[noteIndex] > 0) {
          fill(this.colorArray[noteIndex]);
          let outer = camera.width / 30;
let inner = outer * 0.45;
star(posX, posY, inner, outer, 5);

        }
      }
    }
    pop();
  };
};
