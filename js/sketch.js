// this function is called when the page loads and is the canvas setup
var players = [];
var player;
var statBars = [];
var statBar;

// loads all images into p5
var backdrop;
var ironManNeutral;
var captainAmericaNeutral;
function preload() {
  backdrop = loadImage('https://vignette.wikia.nocookie.net/avengersalliance/images/8/89/Combat_Background_048.jpg/revision/latest?cb=20130904191456&format=original');
  ironManNeutral = loadImage('https://i.imgur.com/50aemfO.png');
  captainAmericaNeutral = loadImage('https://i.imgur.com/SIT5hGe.png');
}


function setup() {
  var canvas = createCanvas(1024, 576);
  canvas.parent('gameBoard');
  player = new Player(0);
  players.push(player);
  statBar = new StatBar(player.name, player.hp, player.hpMax, player.power, player.powerMax);
  statBars.push(statBar);
  player = new Player(1);
  players.push(player);
  statBar = new StatBar(player.name, player.hp, player.hpMax, player.power, player.powerMax);
  statBars.push(statBar);
  // gameReset();

}


//this function is called every frame, 30times a sec. Put things that need to be constantly updated in the draw() function
function draw() {

  background(backdrop, 0,0);

  statBars[0].show(players[0].name,players[0].hp,players[0].power);
  statBars[1].show(players[1].name,players[1].hp,players[0].power);
  for (var i = players.length-1; i >= 0; i--) {
    if (players[i].hp <= 0) {
      // players.splice(i, 1);
      // console.log(players[1].name + " is dead")
    } else {
      players[i].show();
      players[i].move();
    }
  }
}

function gameOver() {

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    players[0].moveLeftRight(-1);
  } else if (keyCode === RIGHT_ARROW) {
    players[0].moveLeftRight(1);
  }
  else if (keyCode === DOWN_ARROW) {
    players[0].isBlocking(true);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    players[0].moveLeftRight(0);
  } else if (keyCode === RIGHT_ARROW) {
    players[0].moveLeftRight(0);
  } else if (keyCode === DOWN_ARROW) {
    players[0].isBlocking(false);

  }
}

function keyTyped() {
  if (key === ' ') {
  }
  if (key === '1') {
    players[0].punch();
  }
}
