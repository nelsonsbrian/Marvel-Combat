// this function is called when the page loads and is the canvas setup
var players = [];
var player;
var healthBars = [];
var healthBar;

function setup() {
  var canvas = createCanvas(1024, 576);
  canvas.parent('gameBoard');

  player = new Player(0);
  players.push(player);
  healthBar = new Health(player.name, player.hp, player.hpMax);
  healthBars.push(healthBar);
  player = new Player(1);
  players.push(player);
  healthBar = new Health(player.name, player.hp, player.hpMax);
  healthBars.push(healthBar);
  // gameReset();
}


//this function is called every frame, 30times a sec. Put things that need to be constantly updated in the draw() function
function draw() {
  background(93);
  healthBars[0].show(players[0].name,players[0].hp);
  healthBars[1].show(players[1].name,players[1].hp);
  healthBars[0].update(players[0].name,players[0].hp);
  healthBars[1].update(players[1].name,players[1].hp);
  for(i=0; i<players.length; i++) {
    players[1].show();
    players[1].move();
    players[0].show();
    players[0].move();

  }

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    players[0].moveLeftRight(-1);
  } else if (keyCode === RIGHT_ARROW) {
    players[0].moveLeftRight(1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    players[0].moveLeftRight(0);
  } else if (keyCode === RIGHT_ARROW) {
    players[0].moveLeftRight(0);
  }
}
