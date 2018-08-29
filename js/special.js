

function Special(player, isComeback) {
  this.playerIndex = player.indexNum;
  this.heroNumber = player.heroNumber;
  this.x = player.x;
  this.y = player.y;
  this.l = 70;
  this.w = 25;
  this.speed = 13;
  this.damage = 100;
  this.toDelete = false;
  this.isComeBack = isComeback;
  this.dir = 1;
  this.time = 0;
  console.log(player + ' ' + isComeback);
  this.isComebackCheck = function() {
    if (isComeback) {
    } else {
      player.power -= player.rangeCost;
    }
  }
  this.isComebackCheck();
  // this.spinning = player.spinning;
  this.spinning = true;

  //use the special attack in the correct direction
  if (player.indexNum === 0) {
    this.dir = 1;
  } else {
    this.dir = -1;
  }

var angle = 0;
  this.spin = function(toSpin) {
    if (toSpin){
      translate(this.x,this.y);
      rotate(angle);
      angle+=25;
    }
  }

  this.show = function(this.spinning) {
    this.spin();
    image(heroSprites[this.heroNumber].range,0-100,0-180);
    this.time ++;
  }


  this.move = function() {
    if (this.heroNumber===1) {
      this.throw();
    }
    this.x += this.dir * this.speed;
    translate(0,0);
  }

  this.throw = function() {
    this.y += this.time/8;
  }

  this.comeBack = function(hitPlayer) {
    if ((this.heroNumber===3||this.heroNumber===4) && this.isComeBack === false) {
      var special = new Special(hitPlayer, true);
      special.damage = 0;
      special.speed *= 1.5;
      special.heroNumber = this.heroNumber;
      specials.push(special);
    }
  }

}
