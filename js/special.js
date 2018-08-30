
function Special(player, attackIndex, retAtt) {
  var imgOff = [140, 140];
  this.playerIndex = player.indexNum;
  this.heroNumber = player.heroNumber;
  this.x = player.x;
  this.y = player.y+40;
  this.l = 170;
  this.w = 25;
  this.damage = player.rangeAttack;
  this.toDelete = false;
  this.dir = 1;
  this.time = 0;


  this.rangeType = [
    //if cback is true, need a next attack index#
    //name     spd  cback  spin  nextattack
    [ "Blast",  40, false, false,   false ],//0
    [ "Throw",  12, false, false,   false ],//1
    ["Boomer",  30,  true, false,       3 ],//2
    ["Return",  20, false, false,   false ],//3
    ["Boomer",   9,  true,  true,       5 ],//4
    ["Return",  20, false,  true,   false ] //5
  ];
  // console.log(attackIndex);
  //if the attack is a return attack from the rangetype meaning another attack already preceded it.
  if (attackIndex === -1) {
    this.type = this.rangeType[retAtt][0];
    this.speed = this.rangeType[retAtt][1];
    this.isComeBack = this.rangeType[retAtt][2];
    this.toSpin = this.rangeType[retAtt][3];
    this.nextAtt = this.rangeType[retAtt][4];
  } else {//if the attack is the first original attack
    this.type = this.rangeType[player.rAttack[attackIndex]][0];
    this.speed = this.rangeType[player.rAttack[attackIndex]][1];
    this.isComeBack = this.rangeType[player.rAttack[attackIndex]][2];
    this.toSpin = this.rangeType[player.rAttack[attackIndex]][3];
    this.nextAtt = this.rangeType[player.rAttack[attackIndex]][4];

  }
  console.log(this.type + ' ' + this.speed + ' ' + this.isComeBack + ' ' + this.toSpin + ' ' + this.nextAtt);
  if (this.nextAtt !== false) {
    this.attackIndex = this.nextAtt;
  } else {
    this.attackIndex = attackIndex;
  }

  //

  //use the special attack in the correct direction
  if (player.indexNum === 0) {
    this.dir = 1;
  } else {
    this.dir = -1;
  }

  //rotate the image if the this.spin is true
  var angle = 0;
  this.spin = function() {
    push();
    translate(this.x - imgOff[0],this.y - imgOff[1]);
    rotate(angle);
    angle-=30;
    fill(255);
    console.log('x: ' + this.x + ' ' + " y: " + this.y + ' ')
    image(heroSprites[this.heroNumber].range,-imgOff[0],-imgOff[1]);
    pop();
  }


  this.show = function() {
    if (this.toSpin) {
      this.y = player.y+200;
      this.spin();
      rotate(0);
    } else {
      image(heroSprites[this.heroNumber].range,this.x - imgOff[0],this.y - imgOff[1]);
    }
    this.time ++;
  }

  //when this type is throw, gravity affects the attack
  this.throw = function() {
    this.y += this.time/10;
  }

  this.move = function() {
    if (this.type === "Blast") {

    }
    if (this.type === "Throw") {
      this.throw();
    }
    this.x += this.dir * this.speed;
    translate(0,0);
  }


  this.comeBack = function(hitPlayer) {
    if (this.isComeBack === true) {
      var special = new Special(hitPlayer, -1,this.attackIndex);
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
