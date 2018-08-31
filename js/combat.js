var globalAttacks = [
  //if cback is true, need a next attack index#
  //  0           1     2      3       4         5 Arg       6    7 8Wind 9
  //type         spd  cback  spin  nextattack   0, 1, 2     Cst  dmg Up  Mel
  [ "Blast"    ,  40, false, false,   false,   [0, 0, 0],    25, 50, 10,  0],//0
  [ "Throw"    ,  30, false, false,   false,   [0, 0, 0],    20, 40, 10,  0],//1
  ["Boomer"    ,  30,  true, false,       3,   [0, 0, 0],    20, 40, 10,  0],//2
  ["Return"    ,  70, false, false,   false,   [0, 0, 0],     0,  0,  0,  0],//3
  ["Boomer"    ,  30,  true,  true,       5,   [0, 0, 0],    20, 40, 10,  0],//4
  ["Return"    ,  50, false,  true,   false,   [0, 0, 0],     0,  0,  0,  0],//5
  ["Multiple"  ,  30, false, false,   false,   [3,10, 0],    20, 40, 10,  0],//6
  ["nextRange" ,  30, false, false,   false,   [0, 0, 0],     0, 40,  0,  0],//7
  ["Charge"    ,  40, false, false,   false,   [0, 0, 0],    20, 40,  5,  0],//8
  ["Push"      ,  25, false, false,   false,   [0, 0, 0],    15, 30, 10,  0],//9
  ["Dive"      ,  25, false, false,   false,   [40, 40, 16], 30, 60,  5,  0],//10
  ["Heal"      ,   0, false, false,   false,   [0, 0, 0],    30, 60,  5,  0],//11
  ["Punch"     ,  12, false, false,   false,   [0, 0, 0],   -15, 60,  1,  1]//12
];
//Speed of the Attack,
//Comeback is if the attack needs to trigger another attack to comeback.
//Spin make the sprite spin.
//nextattack is the followup attack to a comeback attack.
//Arg are arguments to customize a few attack more easily.
//Cost is the power cost for the attack.
//Dmg is base damage of the attack (will be modified by the players attack/range attack)
//Windup is the duration of the precast animation
//Melee is if the attack is a melee attack. Melee attack dont need to move.x/y positions generally

//Combat Constructor
function Combat(attacker, combatListIndex) {
  var imgOff = [140, 140];
  this.player = attacker;
  this.combatListIndex = combatListIndex;
  this.x = attacker.x;
  this.y = attacker.y + 40;
  this.l = 170;
  this.w = 25;
  this.toDelete = false;
  this.dir = 1;
  this.time = 0;
  this.imgNum = 1;
  this.extra = 0;

  this.combatList = globalAttacks;
  //Pull the proper attack out of the array.

    console.log(attacker.name + ' ' + combatListIndex);
    this.specType = this.combatList[this.combatListIndex][0];
    this.speed = this.combatList[this.combatListIndex][1];
    this.isComeBack = this.combatList[this.combatListIndex][2];
    this.toSpin = this.combatList[this.combatListIndex][3];
    this.nextAtt = this.combatList[this.combatListIndex][4];
    this.arg = this.combatList[this.combatListIndex][5];
    this.damage = this.combatList[this.combatListIndex][7];
    this.isMelee = this.combatList[this.combatListIndex][9];



  console.log(this.specType + ' ' + this.speed + ' ' + this.isComeBack + ' ' + this.toSpin + ' ' + this.nextAtt);

  //modifies combat if the attack is a comeback attack
  // if (this.nextAtt !== false) {
  //   this.keyBindAttack = this.nextAtt;
  // } else {
  //   this.keyBindAttack = keyBindAttack;
  // }

  //used to check which direction to show the animation of the the attack
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
    if (this.imgNum === 1) {
      image(heroSprites[this.player.heroNumber].range,-imgOff[0],-imgOff[1]);
    } else if (this.imgNum === 2) {
      image(heroSprites[this.player.heroNumber].range2,-imgOff[0],-imgOff[1]);
    }
    pop();
  }

  //"multiple" attack
  this.multiple = function(ntimes, howOften) {
    if (this.time % howOften === 0 && ntimes * howOften > this.time && this.time !== 0) {
      var combat = new Combat(this.player, 1, 0);
      // this.imgNum = 2;
      this.extra++;
      combat.extra = ntimes;
      combat.heroNumber = this.player.heroNumber;
      combats.push(combat);
    }
  }

  //this is called in the draw function in sketch. Checks to see which attack it was and
  //loads the correct sprit. Also increments the attack timer.
  this.show = function() {
    if (this.specType === "Multiple") {
      this.multiple(this.arg[0], this.arg[1])
    }
    if (this.toSpin) {
      this.y = attacker.y+200;
      this.spin();
      rotate(0);
    } else {
      if (this.imgNum === 1) {
        image(heroSprites[this.player.heroNumber].range,this.x - imgOff[0],this.y - imgOff[1]);
      } else if (this.imgNum === 2) {
        image(heroSprites[this.player.heroNumber].range2,this.x - imgOff[0],this.y - imgOff[1]);
      }
    }
    this.time ++;
  }

  //when this specType is throw, gravity affects the attack.
  this.throw = function() {
    this.y += this.time/5;
  }

  //this.move gets called in the draw function in sketch and gets executed every frame.
  //Affect the individual types of attack differently.
  this.move = function() {
    if (this.specType === "Blast") {
      //add combat fucntions to blast is needed
    }
    if (this.specType === "Throw") {
      this.throw();
    }
    if (this.specType === "Dive") {
      this.dive();
    }
    if (this.isMelee === 0) {
      this.x += this.dir * this.speed;
    } else if (this.isMelee === 1) {
      //for melee attacks, have the attack move with the play instead of a missile-like attacks
      this.x = this.player.x;
      if (this.speed < this.time) {
        this.toDelete = true;
      }
    }
  }

  //attack the makes the projectile sprite go up in the air and come back down over time.
  //combat [args] in the attack array for modifying.
  this.dive = function() {
    if (this.time === 1) {
      this.y -= 200;
    }
    if (this.time < this.arg[2]) {
      this.y -= this.arg[0];
    } else if (this.time > this.arg[2]) {
      this.y += this.arg[1];
    }
  }

  //charge attack. Player fires a sprite at the target. Upon hit, sets player.x to target.x
  this.charge = function(hitPlayer) {
    if (this.specType === "Charge" || this.specType === "Dive") {
      if (this.player.x > hitPlayer.x) {
        var side = 1 * 140
      } else {
        var side = -1 * 140;
      }
      this.player.x = hitPlayer.x + side;
    }
  }

  //push attack. Player fires a sprite at the target. Upon hit, sets target.x to edge of arena.
  this.toPush = function(hitPlayer) {
    if (this.specType === "Push") {
      if (hitPlayer.x > this.player.x) {
        var side = width - 40;
      } else {
        var side = 40;
      }
      hitPlayer.x = side;
    }
  }

  //the boomerang effect for a attack being shot at a person. Creates new attack with no damage
  //coming back at the original caster. Increases speed coming back.
  this.comeBack = function(hitPlayer) {
    if (this.isComeBack === true) {
      var combat = new Combat(hitPlayer, this.nextAtt);
      combat.damage = 0;
      combat.speed *= 1.5;
      combat.heroNumber = this.player.heroNumber;
      combats.push(combat);
    }
  }

  //check to see if the attack is off the screen. The y direction is a high value to allow for attacks that go up and come down.
  this.edges = function() {
    if (this.x > width + 50 || this.x < -50 || this.y > height + 50 || this.y < -50000) {
      this.toDelete = true;
    }
  }
}
