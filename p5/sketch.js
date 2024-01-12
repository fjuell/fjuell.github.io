// Code from https://p5js.org/examples/interaction-wavemaker.html

function setup() {
  createCanvas(600, 50);
  noStroke();
  fill(40, 300, 40);
}

function draw() {
 background(10, 10); // translucent background (creates trails)
  i = 0
  j = 0
  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 50) {
    for (let y = 0; y <= height; y = y + 30) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      let t = frameCount * 0.008;
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(5 * PI * t + angle);
      
      fill(j, 200, i);
      circle(myX, myY, 2); // draw particle
    }
    i = i + 50
    j = j + 30
  }
}
