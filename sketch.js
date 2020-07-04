var ang = 0;
var m1, m2, ship, shooter, bubbles;
var health = 200;
var score = 0;
var bullets = [];
var bubbles = [];
const WIDTH = 800;
const HEIGHT = 400;
function setup() {

  for (var i = 0; i < 5; i++) {

    bubble = createSprite(random(0, 400), random(0, 400), 10, 10);
    bubble.addImage(loadImage("bubble.png"))
    bubble.scale = 0.08;
    bubble.setSpeed(random(1, 4), random(0, 360));
    bubbles.push(bubble);

  }

  rectMode(CENTER);
  angleMode(DEGREES)
  createCanvas(WIDTH, HEIGHT);
  m1 = createSprite(WIDTH / 2, HEIGHT / 2, 10, 10);
  shooter = loadImage("fighter.png")
  m1.addImage(shooter);
  m1.scale = 0.3;
  m1.shapeColor = "red";

}

function healthCal(){

  health = health - 1;

}

function bubbleHit(bubble, bullet) {
  bubble.setSpeed(random(1,4), random(0, 360));
  bubble.x = random(0, WIDTH)
  bubble.y = random(0, HEIGHT)
  score += 1;  

}

function draw() {

  background("#191970");
  fill("white")

  text("Score = " + score, WIDTH/2-100, 10);
  text("Health = "+ health, WIDTH/2+100, 10);

  drawSprite(m1);

  for (x = 0; x < bullets.length; x++) {
    drawSprite(bullets[x]);
  }

  for (x = 0; x < bubbles.length; x++) {

    for (y = 0; y < bullets.length; y++) {
      bubbles[x].collide(bullets[y], bubbleHit);
      bubbles[x].collide(m1, healthCal);
    }

    var b1 = bubbles[x]
    if (b1.x > WIDTH) { b1.x = 0; }
    if (b1.y > HEIGHT) { b1.y = 0; }
    if (b1.x < 0) { b1.x = WIDTH; }
    if (b1.y < 0) { b1.y = HEIGHT; }
    drawSprite(bubbles[x]);
  }

  if (m1.x > WIDTH) { m1.x = 0; }
    if (m1.y > HEIGHT) { m1.y = 0; }
    if (m1.x < 0) { m1.x = WIDTH; }
    if (m1.y < 0) { m1.y = HEIGHT; }

}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    m1.setSpeed(0, ang);
  }
}
function keyPressed() {

  if (keyCode === UP_ARROW) {
    m1.setSpeed(6, ang);
  }

  if (keyCode === LEFT_ARROW) {
    ang -= 15;
    m1.rotation = ang;
  }
  if (keyCode === RIGHT_ARROW) {
    ang += 15;
    m1.rotation = ang;
  }
  if (keyCode === 32) {
    m2 = createSprite(m1.x, m1.y, 20, 3);
    m2.rotateToDirection = false;
    m2.rotation = ang;
    m2.shapeColor = "yellow";
    m2.setSpeed(10, ang);
    bullets.push(m2);

  }
}
