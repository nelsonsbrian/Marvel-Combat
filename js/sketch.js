// this function is called when the page loads and is the canvas setup
var players = [];
var player;
var statBars = [];
var statBar;
var specials = [];
var special;
var timer;
var gameOver = 0;
var gameStarted = false

//setup function runs when canvas loads. Functions

function setup() {
  var canvas = createCanvas(1024, 576);
  canvas.parent('gameBoard');
  angleMode(DEGREES);


  // gameReset();

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
}

//this function is called every frame, 30times a sec. Put things that need to be constantly updated in the draw() function

  function draw() {
    background(backdrop, 0,0);
    if (gameStarted === true) {
      translate(0,0);

      statBars[0].show(players[0]);
      statBars[1].show(players[1]);
      //loop for specials every frame
      for (var i = players.length-1; i >= 0; i--) {
        //loop for players every frame
        for (var j = specials.length-1; j >= 0; j--) {
          specials[j].edges();
          if (players[i].indexNum !== specials[j].playerIndex) {
            var specialHit = players[i].collide(specials[j].x, specials[j].y, specials[j].l, 1);
            if (specialHit) {
              console.log(specials[j].x + ',' + specials[j].y + '|' + players[i].x + ',' + players[i].y)
              players[specials[j].playerIndex].special(specialHit, players[i]);
              specials[j].comeBack(players[i]);
              specials[j].toDelete = true;
            }
          }
        }
        isGameOver(i);

        if (gameOver === 0) {
          players[i].show();
          players[i].move();
        } else if (players[i].winner === 1 && gameOver === 1) {
          players[i].show();
          players[i].move();
        }
      }
      for (var i = specials.length-1; i >= 0; i--) {
        if (specials[i].toDelete === true) {
          specials.splice(i,1);
        } else {
          translate(0,0);
          specials[i].move();
          specials[i].show();
        }
      }
      }


      function isGameOver(deadPlayer) {
      // console.log(deadPlayer + ' ' + deadPlayer.indexNum)
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
