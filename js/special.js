var imgOff = [-100, -180];

function Special(player, attackIndex) {
  this.playerIndex = player.indexNum;
  this.heroNumber = player.heroNumber;
  this.x = player.x;
  this.y = player.y;
  this.l = 70;
  this.w = 25;
  this.damage = player.rangeAttack;
  this.toDelete = false;
  this.dir = 1;
  this.time = 0;
  // console.log(player + ' ' + isComeback);
  // this.isComebackCheck = function() {
  //   if (isComeback) {
  //   } else {
  //     player.power -= player.rangeCost;
  //   }
  // }
  // this.isComebackCheck();

  this.rangeType = [
    //name     spd  cback  spin
    ["Blast",   15, false, false],
    ["Throw",    8, false, false],
    ["Boomer1",   9, true, false],
    ["Return",  20, false, false],
    ["Boomer2",   9, true, true ]
  ];

  this.type = this.rangeType[player.rAttack[attackIndex]][0];
  this.speed = this.rangeType[player.rAttack[attackIndex]][1];
  this.isComeBack = this.rangeType[player.rAttack[attackIndex]][2];
  console.log(this.type + ' ' + this.speed + ' ' + this.isComeBack);


  //use the special attack in the correct direction
  if (player.indexNum === 0) {
    this.dir = 1;
  } else {
    this.dir = -1;
  }

  var angle = 0;
  this.spin = function() {
    translate(this.x,this.y);
    rotate(angle);
    angle-=25;
    image(heroSprites[this.heroNumber].range,imgOff[0],imgOff[1]);
    this.time ++;
  }

  this.show = function() {
    if (this.heroNumber===5) {
      this.spin();
    } else {
      image(heroSprites[this.heroNumber].range,this.x + imgOff[0],this.y + imgOff[1]);
    }
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
    if ((this.heroNumber===4||this.heroNumber===5||this.heroNumber===7) && this.isComeBack === false) {
      var special = new Special(hitPlayer, true);
      special.damage = 0;
      special.speed *= 1.5;
      special.heroNumber = this.heroNumber;
      specials.push(special);
    }
  }



}
