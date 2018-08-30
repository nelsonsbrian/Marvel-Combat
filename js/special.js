var globalAttacks = [
  //if cback is true, need a next attack index#
  //                                              Arg
  //type         spd  cback  spin  nextattack   0, 1, 2   Cst dmg
  [ "Blast"    ,  40, false, false,   false,   [0, 0, 0],  5,  30,  0,  0],//0
  [ "Throw"    ,  12, false, false,   false,   [0, 0, 0],  19,  20,  0,  0],//1
  ["Boomer"    ,  30,  true, false,       3,   [0, 0, 0],  11,  20,  0,  0],//2
  ["Return"    ,  20, false, false,   false,   [0, 0, 0],  0,  0,  0,  0],//3
  ["Boomer"    ,   9,  true,  true,       5,   [0, 0, 0],  10,  20,  0,  0],//4
  ["Return"    ,  20, false,  true,   false,   [0, 0, 0],  0,  0,  0,  0],//5
  ["Multiple"  ,  30, false, false,   false,   [7, 10, 0], 15,  30,  0,  0],//6
  ["nextRange" ,  30, false, false,   false,   [0, 0, 0],  0,  20,  0,  0],//7
  ["Charge"    ,  20, false, false,   false,   [0, 0, 0],  20,  20,  0,  0],//8
  ["Push"      ,  25, false, false,   false,   [0, 0, 0],  25,  15,  0,  0]//9
];


function Special(attacker, attackIndex, retAtt) {
  var imgOff = [140, 140];
  this.playerIndex = attacker.indexNum;
  this.heroNumber = attacker.heroNumber;
  this.x = attacker.x;
  this.y = attacker.y+40;
  this.l = 170;
  this.w = 25;
  this.damage = attacker.rangeAttack;
  this.toDelete = false;
  this.dir = 1;
  this.time = 0;


  this.rangeType = globalAttacks;
  // console.log(attackIndex);
  //if the attack is a return attack from the rangetype meaning another attack already preceded it.
  if (attackIndex === -1) {
    this.specType = this.rangeType[retAtt][0];
    this.speed = this.rangeType[retAtt][1];
    this.isComeBack = this.rangeType[retAtt][2];
    this.toSpin = this.rangeType[retAtt][3];
    this.nextAtt = this.rangeType[retAtt][4];
    this.arg = this.rangeType[retAtt][5];
  } else {//if the attack is the first original attack
    console.log("ran");
    console.log(attacker + ' ' + attackIndex + ' ' + retAtt);
    this.specType = this.rangeType[attacker.rAttack[attackIndex]][0];
    this.speed = this.rangeType[attacker.rAttack[attackIndex]][1];
    this.isComeBack = this.rangeType[attacker.rAttack[attackIndex]][2];
    this.toSpin = this.rangeType[attacker.rAttack[attackIndex]][3];
    this.nextAtt = this.rangeType[attacker.rAttack[attackIndex]][4];
    this.arg = this.rangeType[attacker.rAttack[attackIndex]][5];
  }
  console.log(this.specType + ' ' + this.speed + ' ' + this.isComeBack + ' ' + this.toSpin + ' ' + this.nextAtt);
  if (this.nextAtt !== false) {
    this.attackIndex = this.nextAtt;
  } else {
    this.attackIndex = attackIndex;
  }

  //

  //use the special attack in the correct direction
  if (attacker.indexNum === 0) {
    this.dir = 1;
  } else if (attacker.indexNum === 1) {
    this.dir = -1;
  }
  if (whichSide()) {
    this.dir *= -1;
  }

  //rotate the image if the this.spin is true
  var angle = 0;
  this.spin = function() {
    push();
    translate(this.x - imgOff[0],this.y - imgOff[1]);
    rotate(angle);
    angle-=30;
    fill(255);
    image(heroSprites[this.heroNumber].range,-imgOff[0],-imgOff[1]);
    pop();
  }

  //"multiple" attack
  this.multiple = function(ntimes, howOften) {
    if (this.time % howOften === 0 && ntimes * howOften > this.time && this.time !== 0) {
      var special = new Special(players[this.playerIndex], 2, 0);
      special.heroNumber = this.heroNumber;
      specials.push(special);
    }
  }



  this.show = function() {
    if (this.specType === "Multiple") {
      this.multiple(this.arg[0], this.arg[1])
    }
    if (this.toSpin) {
      this.y = attacker.y+200;
      this.spin();
      rotate(0);
    } else {
      image(heroSprites[this.heroNumber].range,this.x - imgOff[0],this.y - imgOff[1]);
    }
    this.time ++;
  }

  //when this specType is throw, gravity affects the attack
  this.throw = function() {
    this.y += this.time/10;
  }

  this.move = function() {
    if (this.specType === "Blast") {

    }
    if (this.specType === "Throw") {
      this.throw();
    }
    this.x += this.dir * this.speed;
    // console.log(this.dir + "direction and speed: " + this.speed);
  }


  //charge attack
  this.charge = function(hitPlayer) {
    if (this.specType === "Charge") {
      if (players[this.playerIndex].x > hitPlayer.x) {
        var side = 1 * 140
      } else {
        var side = -1 * 140;
      }
      players[this.playerIndex].x = hitPlayer.x + side;
    }
  }

  //push attack
  this.toPush = function(hitPlayer) {
    if (this.specType === "Push") {
      console.log("push");
      if (hitPlayer.x > players[this.playerIndex].x) {
        var side = width - 40;
      } else {
        var side = 40;
      }
      hitPlayer.x = side;
    }
  }

  this.comeBack = function(hitPlayer) {
    if (this.isComeBack === true) {
      var special = new Special(hitPlayer, -1, this.attackIndex);
      special.damage = 0;
      special.speed *= 1.5;
      special.heroNumber = this.heroNumber;
      specials.push(special);
    }
  }

  this.edges = function() {
    if (this.x > width + 50 || this.x < -50 || this.y > height + 50 || this.y < -50) {
      this.toDelete = true;
    }
  }



}
