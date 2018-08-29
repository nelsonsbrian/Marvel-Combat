var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);


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
    players[0].shoot();
  }
  if (key === '3') {

  }// player 2
  if (key === ',') {
    players[1].punch();
  }
  if (key === '.') {
    players[1].shoot();
  }
  if (key === '/') {
    players[1].punch();
  }
}
