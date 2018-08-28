function Player(heroNumber) {
  this.heroNumber = heroNumber;
  this.startingX = 90;
  this.startingY = 300;
  this.hero = [
    ["Iron Man", 100, this.startingX, this.startingY, 30, 70, 80, 90, 100, 50],
    ["Captain America", 200, width-this.startingX, this.startingY, 10, 50, 90, 90, 50, 25]
  ];
  this.heroSelect = function() {
    this.name = this.hero[this.heroNumber][0];
    this.hp = this.hero[this.heroNumber][1];
    this.hpMax = this.hp;
    this.x = this.hero[this.heroNumber][2];
    this.y = this.hero[this.heroNumber][3];
    this.speed = this.hero[this.heroNumber][4];
    this.attack = this.hero[this.heroNumber][5];
    this.defense = this.hero[this.heroNumber][6];
    this.block = this.hero[this.heroNumber][7];
    this.powerMax = this.hero[this.heroNumber][8];
    this.power = this.hero[this.heroNumber][9];
  }
  this.heroSelect();
  this.direction = 0;
  this.radius = 25;
  this.damagedColor;
  this.gcd = 0;
  this.charBlocking = false;
  this.show = function() {

    if (this.damagedColor > 0) {
      fill(255,0,0);
      this.damagedColor--;
    } else if (this.isNPC === true) {
      fill(51,153,255);
    } else {
      fill(255,128,0);
    }
    // }
    // ellipse(this.x,this.y, this.radius*2,this.radius*2);
    if (this.name === "Iron Man") {
      image(ironManNeutral, this.x-75, (this.y - 100));
      ellipse(this.x,this.y,10,10);
    } else {
      image(captainAmericaNeutral, this.x-75, (this.y-100));
      ellipse(this.x,this.y,10,10);
    }
  }

  this.punch = function() {
    for(i=0;i<players.length;i++) {
      if (this.name !== players[i].name) {
        var collided = this.collide(players[i].x, players[i].y, players[i].radius, this.radius * 5)
      }
      if (collided) {
        players[i].hp -= this.combat(50, i);
        players[i].isHit(5);
        this.power += 5;
        this.power = constrain(this.power, 0, this.powerMax);
      }
    }
  }

  this.laser = function(laserThatHit) {
    console.log(laserThatHit.owner);
    this.hp -= this.combat(laserThatHit.damage, laserThatHit.owner);
    this.isHit(10);
  }


  this.combat = function(baseDam, playerI) {
    let dmg;
    var dmgDam = this.damageRoll(baseDam)
    var dmgDef = this.defenseRoll(baseDam, playerI)
    var block = this.blockingRoll(baseDam, playerI);
    dmg = dmgDam - dmgDef - block;
    console.log("Damage: " + dmg + " Attack: " + dmgDam + " Defense: " + dmgDef + " Block: " + block);

    return dmg;
  }

  this.isBlocking = function(bool, i) {
    players[i].charBlocking = bool;
  }

  this.blockingRoll = function(baseDam, i) {
    if (players[i].charBlocking) {
      return baseDam / 300;
    } else {
      return 0;
    }
  }

  this.damageRoll = function(baseDam) {
   return baseDam * this.attack / 100;
  }

  this.defenseRoll = function(baseDam, index) {
    return baseDam * players[index].defense / 100 / 2;
  }

  this.isHit = function() {
    this.damagedColor = 5;
  }

  this.move = function() {
    for(i=0;i<players.length;i++) {
      if (this.name !== players[i].name) {
        var collided = this.collide(players[i].x, players[i].y, players[i].radius, 5)
      }
    }
    if (collided) {
      this.x += this.direction * -1 * 25;
    } else {
      this.x += this.direction * this.speed;
    }
  }
  this.direction = 0;

  this.collide = function(x, y, r, buffer) {
    if (dist(this.x,this.y,x,y) < this.radius + r + buffer) {

      return true;
      // console.log(this.name + " collide");
    }
  }

  this.moveLeftRight = function(direction) {
    if (this.direction !== direction) {

      this.direction = direction;
    } else {

    }
  }

}





  function Laser(player) {
    this.owner = player;
    this.x = player.x;
    this.y = player.y;
    this.l = 30;
    this.w = 7;
    this.speed = 3;
    this.powerCost = 75;
    this.damage = 100;
    player.power -= this.powerCost;


    this.show = function() {
      fill(255)
      rect(this.x,this.y,this.l,this.w);
    }

    this.move = function() {
      this.x += this.speed;
    }




  }
