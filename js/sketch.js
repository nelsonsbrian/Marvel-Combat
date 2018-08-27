// this function is called when the page loads and is the canvas setup
function setup() {
  var canvas = createCanvas(640, 530);
  canvas.parent('gameBoard');
  // gameReset();
}

var x = 50;
var y = 50;

//this function is called every frame, 30times a sec. Put things that need to be constantly updated in the draw() function
function draw() {
  background(93);
  fill(255, 255, 0);

  rect(x, y, 100 ,150);

  // x += 1;





}
