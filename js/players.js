function Player(heroNumber, indexNum) {
  this.heroNumber = heroNumber;
  this.startingX = 90;
  this.startingY = 300;
  this.indexNum = indexNum;
  this.hero = [
    //left side characters [0-2]
    ["Iron Man", 200, this.startingX, this.startingY, 8, 70, 80, 90, 100, 50, 5],
    ["Hulk", 300, this.startingX, this.startingY, 10, 50, 90, 90, 50, 25, 5],
    ["Black Widow", 100, this.startingX, this.startingY, ],

    //right side characters [3-5]
    ["Captain America", 170, width-this.startingX-90, this.startingY, 10, 50, 90, 90, 50, 25, 5],
    ["Thor",],
    ["Scarlet Witch",],
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
    this.powerRegen = this.hero[this.heroNumber][10];
  }
  this.heroSelect();
  this.direction = 0;
  this.radius = 25;
  this.damagedColor;
  this.gcd = 0;
  this.charBlocking = false;
  this.sprite = 0;
  this.spriteTime = 0;
  this.show = function() {

    if (this.damagedColor > 0) {
      fill(255,0,0);
      this.damagedColor--;
    } else if (this.isNPC === true) {
      fill(51,153,255);
    } else {
      fill(255,128,0);
    }

    this.spriteTime -= 1;
    if (this.spriteTime === 0){
      this.sprite = 0;
    }

    if (this.name === "Iron Man" && this.sprite === 0) {
      image(ironManSprite.neutral, (this.x-100), (this.y - 170));
      ellipse(this.x,this.y,this.radius,this.radius);
    } else if (this.name === "Iron Man" && this.sprite === 1) {
      image(ironManSprite.attack, (this.x-100), (this.y - 170));
      ellipse(this.x,this.y,this.radius,this.radius);}
      else if (this.name === "Iron Man" && this.sprite === 2) {
        image(ironManSprite.special, (this.x-100), (this.y - 170));
        ellipse(this.x,this.y,this.radius,this.radius);
      }


     else {
      image(captainAmericaSprite.neutral, (this.x-100), (this.y - 200));
      ellipse(this.x,this.y,this.radius,this.radius);
    }
    // else{
    //   image(captainAmericaSprite.neutral, this.x, (this.y-200));
    //   ellipse(this.x,this.y,this.radius,this.radius);
    // }
  }

  this.spriteChange = function(num, time) {
    this.sprite = num;
    this.spriteTime = time;
  }

  this.punch = function() {
    this.spriteChange(1, 6);
    for(i=0;i<players.length;i++) {
      if (this.name !== players[i].name) {
        var collided = this.collide(players[i].x, players[i].y, players[i].radius, this.radius * 5)
      }
      if (collided) {
        players[i].hp -= this.combat(50, i);
        players[i].isHit(5);
        this.power += this.powerRegen;
        this.power = constrain(this.power, 0, this.powerMax);
      }
    }
  }
  //
  this.shoot=function(){
    this.spriteChange(2, 6);



  }

  this.laser = function(laserThatHit) {

    this.hp -= this.combat(laserThatHit.damage, laserThatHit.playerIndex);
    this.isHit(10);
  }


  this.combat = function(baseDam, playerI) {
    let dmg;
    var dmgDam = this.damageRoll(baseDam, playerI);
    var dmgDef = this.defenseRoll(baseDam);
    var block = this.blockingRoll(baseDam);
    dmg = dmgDam - dmgDef - block;
    console.log("Damage: " + dmg + " Attack: " + dmgDam + " Defense: " + dmgDef + " Block: " + block + " | base dam :" + baseDam + " playerhit index:" + playerI);

    return dmg;
  }

  this.isBlocking = function(bool, i) {
    players[i].charBlocking = bool;
  }

  this.blockingRoll = function(baseDam) {
    if (this.charBlocking) {
      return baseDam / 300;
    } else {
      return 0;
    }
  }

  this.damageRoll = function(baseDam, index) {
    console.log(baseDam + ' ' + players[index].attack + ' ' + index + ' ' + this.indexNum);
   return baseDam * players[index].attack / 100;
  }

  this.defenseRoll = function(baseDam) {
    return baseDam * this.defense / 100 / 2;
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
