// this function is called when the page loads and is the canvas setup
var players = [];
var player;
var statBars = [];
var statBar;
var lasers = [];
var laser;
var timer;
var gameOver = 0;

//setup function runs when canvas loads. Functions
function setup() {
  var canvas = createCanvas(1024, 576);
  canvas.parent('gameBoard');

  player = new Player(0, players.length);
  players.push(player);
  statBar = new StatBar(player.name, player.hp, player.hpMax, player.power, player.powerMax);
  statBars.push(statBar);
  player = new Player(1, players.length);
  players.push(player);
  statBar = new StatBar(player.name, player.hp, player.hpMax, player.power, player.powerMax);
  statBars.push(statBar);

  // gameReset();

}


//this function is called every frame, 30times a sec. Put things that need to be constantly updated in the draw() function
function draw() {
  background(backdrop, 0,0);

  statBars[0].show(players[0].name,players[0].hp,players[0].power);
  statBars[1].show(players[1].name,players[1].hp,players[1].power);
  //loop for lasers every frame
  for (var i = lasers.length-1; i >= 0; i--) {
    if (lasers[i].toDelete === true) {
      lasers.splice(i,1);
    } else {
      lasers[i].move();
      lasers[i].show();
    }
  }

  //loop for players every frame
  for (var i = players.length-1; i >= 0; i--) {
    for (var j = lasers.length-1; j >= 0; j--) {
      if (players[i].indexNum !== lasers[j].playerIndex) {
        var laserHit = players[i].collide(lasers[j].x, lasers[j].y, lasers[j].l, 1);
        if (laserHit) {
          console.log(lasers[j].x + ',' + lasers[j].y + '|' + players[i].x + ',' + players[i].y)
          players[i].laser(lasers[j]);
          lasers[j].toDelete = true;
        }
      }
    }
    isGameOver(i);
    if (gameOver === 0) {
      players[i].show();
      players[i].move();
    }
  }
}


function isGameOver(deadPlayer) {
  // console.log(deadPlayer + ' ' + deadPlayer.indexNum)
  var winner;
  for (var i = players.length-1; i >= 0; i--) {
    if (players[i].hp <= 0) {
      gameOver = 1;
      if (players[i].indexNum === 1) {
        winner = 0;
      } else {
        winner = 1;
      }
    }
  }
  if (winner >= 0) {
    fill(255);
    rect(width / 2 - 100, height / 2, 300, 50);
    fill(0);
    textSize(30);
    textStyle(BOLD);
    text(players[winner].name + " Wins", width / 2 - 40, height / 2 + 35);
  }
}


//keybindings for both players
function keyPressed() { //player1
  if (key === 'a') {
    players[0].moveLeftRight(-1);
  } else if (key === 'd') {
    players[0].moveLeftRight(1);
  }
  else if (key === 's') {
    players[0].charBlocking(true);
  } // player2
  if (keyCode === LEFT_ARROW) {
    players[1].moveLeftRight(-1);
  } else if (keyCode === RIGHT_ARROW) {
    players[1].moveLeftRight(1);
  }
  else if (keyCode === DOWN_ARROW) {
    players[1].charBlocking(true);
  }
}

function keyReleased() {
  if (key === 'a') { //player1
    players[0].moveLeftRight(0);
  } else if (key === 'd') {
    players[0].moveLeftRight(0);
  } else if (key === 's') {
    players[0].charBlocking(false);
  } // player2
  if (keyCode === LEFT_ARROW) {
    players[1].moveLeftRight(0);
  } else if (keyCode === RIGHT_ARROW) {
    players[1].moveLeftRight(0);
  } else if (keyCode === DOWN_ARROW) {
    players[1].charBlocking(false);

  }
}

function keyTyped() {// player 1
  if (key === '1') {
    players[0].punch();
  }
  if (key === '2') {
    if (players[0].rangeCost <= players[0].power) {
      var laser = new Laser(players[0]);
      players[0].shoot();
      lasers.push(laser);
    } else {
      console.log("not enough power to launch a laser.")
    }
  }
  if (key === '3') {

  }// player 2
  if (key === '7') {
    players[1].punch();
  }
  if (key === '8') {
    if (players[1].rangeCost <= players[1].power) {
      var laser = new Laser(players[1]);
      players[1].shoot();
      lasers.push(laser);
    } else {
      console.log("not enough power to launch a laser.")
    }
  }
  if (key === '9') {

  }
}
