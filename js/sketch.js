// this function is called when the page loads and is the canvas setup
var players = [];
var player;
var statBars = [];
var statBar;
var combats = [];
var combat;
var timer;
var gameOver = 0;
var gameStarted = false
var timeRem = 0;
//setup function runs when canvas loads. Functions
var backdropArr = [];
var gameBackdrop;

function setup() {
  backdropArr = [backdropOne, backdropTwo, backdropThree,backdropFour,backdropFive,backdropSix];
  var randomBackdrop = backdropArr[Math.floor(backdropArr.length * Math.random())];
  gameBackdrop = randomBackdrop;
  var canvas = createCanvas(1024, 576);
  canvas.parent('gameBoard');
  angleMode(DEGREES);
}

function startGame() {
  player = new Player(player1input, players.length);
  players.push(player);
  statBar = new StatBar(player.name, player.hp, player.hpMax, player.power, player.powerMax);
  statBars.push(statBar);
  player = new Player(player2input, players.length);
  players.push(player);
  statBar = new StatBar(player.name, player.hp, player.hpMax, player.power, player.powerMax);
  statBars.push(statBar);
  gameStarted = true;
  timeRem = 30 * 1160;
}

//this function is called every frame, 30times a sec. Put things that need to be constantly updated in the draw() function

function draw() {
  if (timeRem > 0) {
    timeRem--;
  }
  //the backdrop img changed by which Character player one choose
  background(backdropArr[player1input], 0,0);

  if (gameStarted === true) {
    translate(0,0);

    statBars[0].show(players[0]);
    statBars[1].show(players[1]);
    //loop for combats every frame
    for (var i = players.length-1; i >= 0; i--) {
      //loop for players every frame
      for (var j = combats.length-1; j >= 0; j--) {
        //check to see if every player gets hit by every combat attack if it is not their own.
        //if they get hit, a combat check will be ran.
        //if the attack has a certain aftereffect comeback/charge/pushing, that is triggered
        combats[j].edges();
        if (players[i] !== combats[j].player) {
          var hitBy = players[i].collide(combats[j].x, combats[j].y, combats[j].l, 1);
          if (hitBy) {
            combats[j].player.causeDmg(combats[j], players[i]);
            combats[j].comeBack(players[i]);
            combats[j].charge(players[i]);
            combats[j].toPush(players[i]);
            combats[j].toDelete = true;
          }
        }
      }
      isGameOver(i);
      //check to see if the game is over.
      if (gameOver === 0) {
        players[i].show();
        players[i].move();
      } else if (players[i].winner === 1 && gameOver === 1) {
        players[i].show();
        players[i].move();
      }
    }
    if (timeRem <= 0) {
      if (players[0].hp > players[1].hp) {
        players[1].hp = 0;
      } else if (players[0].hp < players[1].hp) {
        players[0].hp = 0;
      }
    }
    //separate loop to delete combat attacks that need to be deleted without
    //takeing them out of the array during multiple other checks
    for (var i = combats.length-1; i >= 0; i--) {
      if (combats[i].toDelete === true) {
        combats.splice(i,1);
      } else {
        combats[i].move();
        combats[i].show();
      }
    }
  }


  function isGameOver(deadPlayer) {
    if (players[deadPlayer].hp <= 0) {
      gameOver = 1;
      if (deadPlayer === 1) {
        deadPlayer = 0
      } else {
        deadPlayer++;
      }
      players[deadPlayer].winner = 1;
    }
    if (players[deadPlayer].winner === 1) {
      //fill screen with game over rectangle and text
      players[deadPlayer].x = width / 2;
      // fill(255);
      // rect(width / 2 - 100, height / 2 - 200, 300, 50);
      // fill(0);
      // textSize(30);
      // textStyle(BOLD);
      // text(players[deadPlayer].name + " Wins", width / 2 - 40, height / 2 + 35);
    }

  }

}

//function that helps determine which side of the other player each other is on.
var whichSide = function() {
  return players[0].x > players[1].x
}
