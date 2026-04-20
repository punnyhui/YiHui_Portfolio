/*
For this exercise, I wanted to create something that would make me 
happy when I look at it so I chose a pink colour palette.

I edited the wavy lines to make them thinner and longer which give 
off an exciting roller coaster vibe. 

As for the circle, I wanted it to radiate outwards like the sun, 
so the nearer to the center, the more concetrated the dots will be. 

For the square and rectangle, I overlapped them  for fun, creating 
depth and visual interest. 

However, while each shape/ element was interesting on its own, the 
overall composition lacked coherence due to random and inconsistent 
positioning.

Moving on, I aim to improve by creating a clearer focal point, reducing
visual clutter and ensure that all elements relate more intentionally to 
one another. 

Since this is my first time generating shapes using code, I will continue
to develop my coding skills. 
*/

function setup() {
    createCanvas(512, 512);
    frameRate(50);
    noFill();
}

function draw() {
    background(255, 204, 255);

    // background
    stroke(0);
    var standardDeviation = 400;
    for (var i = 0; i < 5000; i++) {
        var backDist = randomGaussian(0, standardDeviation);
        var b = createVector(backDist, random(-height, height));
        point(b.x, b.y);
    }

    // circle
    stroke(204, 0, 204);
    translate(width / 5, height / 4);
    for (var i = 0; i < 5000; i++) {
        var cirDist = (max(random(0, -10), random(0, -2)) * width) / 10;
        var angle = random(0, PI * 2);
        var c = createVector(cos(angle), sin(angle));
        c.mult(cirDist);
        point(c.x, c.y);
    }

    // top line
    stroke(204, 0, 102);
    for (var i = 0; i < 500; i++) {
        var lineX = random(80, 350);
        var lineY = random(20 - 10, 20 + 10);
        point(lineX, lineY);
    }

    // bottom line
    for (var i = 0; i < 2000; i++) {
        var lineX = random(80, 350);
        var lineY = random(320 - 10, 320 + 10);
        point(lineX, lineY);
    }

    // left & right lines
    for (var i = 0; i < 1000; i++) {
        var leftLineX = random(90 - 20, 90 + 40);
        var leftLineY = max(random(10, 330), random(10, 330));
        point(leftLineX, leftLineY);

        var rightLineX = random(340 - 10, 340 + 10);
        var rightLineY = max(random(10, 330), random(10, 330));
        point(rightLineX, rightLineY);
    }

    // square
    stroke(255, 153, 204);
    for (var i = 0; i < 5000; i++) {
        var sqX = random(100, 250);
        var sqY = random(80, 230);
        push();
        rotate(-PI / 8);
        point(sqX, sqY);
        pop();
    }

    // square shadow
    stroke(255, 153, 204);
    for (var i = 0; i < 5000; i++) {
        var sqBX = min(random(100, 250), random(100, 250));
        var sqBY = max(random(80, 230), random(80, 230));
        push();
        rotate(-PI / 30);
        point(sqBX, sqBY);
        pop();
    }

    // wave dark pink
    push();
    stroke(204, 0, 204);
    translate(10, height / -2);
    var amp = 10;
    for (var i = 0; i < 2000; i++) {
        var waveX = random(0, width);
        var waveY = cos((waveX / width) * PI * 6) * amp;
        waveY += random(-10, 10);
        point(waveX, waveY);
    }
    pop();

    // wave pink
    push();
    stroke(255, 0, 127);
    translate(0, height / -5);
    var amp = 300;
    for (var i = 0; i < 5000; i++) {
        var waveX = random(0, width);
        var waveY = cos((waveX / width) * PI * 6) * amp;
        waveY += random(-15, 15);
        point(waveX, waveY);
    }
    pop();
}
