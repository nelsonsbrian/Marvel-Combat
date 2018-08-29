//keybindings for both players
function keyPressed() { //player1
  if (key === 'a') {
    players[0].moveLeftRight(-1);
  } else if (key === 'd') {
    players[0].moveLeftRight(1);
  }
  else if (key === 's') {
    players[0].isBlocking(true);
  } // player2
  if (keyCode === LEFT_ARROW) {
    players[1].moveLeftRight(-1);
  } else if (keyCode === RIGHT_ARROW) {
    players[1].moveLeftRight(1);
  }
  else if (keyCode === DOWN_ARROW) {
    players[1].isBlocking(true,0);
  }
}

function keyReleased() {
  if (key === 'a') { //player1
    players[0].moveLeftRight(0);
  } else if (key === 'd') {
    players[0].moveLeftRight(0);
  } else if (key === 's') {
    players[0].isBlocking(false);
  } // player2
  if (keyCode === LEFT_ARROW) {
    players[1].moveLeftRight(0);
  } else if (keyCode === RIGHT_ARROW) {
    players[1].moveLeftRight(0);
  } else if (keyCode === DOWN_ARROW) {
    players[1].isBlocking(false,0);


  }
}

function keyTyped() {// player 1
  if (key === '1') {
    players[0].punch();
  }
  if (key === '2') {
    if (players[0].rangeCost <= players[0].power) {
      var special = new Special(players[0]);
      players[0].shoot();
      specials.push(special);
    }
  }
  if (key === '3') {

  }// player 2
  if (key === '7') {
    players[1].punch();
  }
  if (key === '8') {
    if (players[1].rangeCost <= players[1].power) {
      var special = new Special(players[1]);
      players[1].shoot();
      specials.push(special);
    }
  }
  if (key === '9') {

  }
}
