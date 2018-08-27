// this function is called when the page loads and is the canvas setup
var players = [];
var player;

function setup() {
  var canvas = createCanvas(1024, 576);
  canvas.parent('gameBoard');

  player = new Player(0);
  players.push(player);
  player = new Player(1);
  players.push(player);
  // gameReset();
}


//this function is called every frame, 30times a sec. Put things that need to be constantly updated in the draw() function
function draw() {
  background(93);

  for(i=0;i<players.length;i++) {
    players[i].show();
    players[i].move();
  }

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    players[0].moveLeftRight(-1);
  }
  if (keyCode === RIGHT_ARROW) {
    players[0].moveLeftRight(1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    players[0].moveLeftRight(0);
  }
  if (keyCode === RIGHT_ARROW) {
    players[0].moveLeftRight(0);
  }
}
