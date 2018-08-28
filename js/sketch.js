// this function is called when the page loads and is the canvas setup
var players = [];
var player;
var statBars = [];
var statBar;
var lasers = [];
var laser;

var timer;

// loads all images into p5
// moved to js/images.js




function setup() {
  var canvas = createCanvas(1024, 576);
  canvas.parent('gameBoard');

  player = new Player(0, players.length);
  players.push(player);
  statBar = new StatBar(player.name, player.hp, player.hpMax, player.power, player.powerMax);
  statBars.push(statBar);
  player = new Player(3, players.length);
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

//keybindings
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
  if (key === '2') {

    if (10 <= players[0].power) {
      var laser = new Laser(players[0]);
      players[0].shoot();
      lasers.push(laser);
    } else {
      console.log("not enough power to launch a laser.")
    }
  }
}
