var xOff = -125;
var yOff = -100;
var heroes = [];
var heroStats = [
  //left side characters [0-5]
  //                                                                Punch     Range
  //name              hp   x    y    sp  at  df  bl  pMx p   pRg rAt pn AS   Attack
  ["Iron Man",        250, 90,  230, 12, 50, 70, 3, 100, 60, 10, 80, 33, 15, [0,0,0]], //0
  ["The Hulk",        300, 90,  230, 8,  90, 80, 3, 100, 50, 5,  30, 40, 25, [1,8,0]], //1
  ["Black Widow",     180, 90,  230, 16, 70, 50, 1, 100, 20, 10, 45, 20, 10, [0,6,7]], //2
  ["Spider-Man",      210, 90,  230, 16, 90, 60, 1, 100, 70, 10, 60, 25, 10, [0,9,0]], //3
  ["Doctor Strange",  220, 90,  230, 12, 80, 60, 1, 100, 90, 10, 70, 33, 15, [0,9,0]], //4
  ["Captain Marvel",  130, 90,  230, 12, 50, 50, 3,  99, 99, 10, 99, 33, 10, [0,9,0]], //5
  //right side characters [6-11]
  //name              hp   x    y    sp  at  df  bl  pMx p   pRg rAt rCo AS  RA
  ["Captain America", 270, 900, 230, 12, 60, 70, 6, 100, 25, 10, 50, 25, 15, [2,8,0]], //6
  ["Thor",            250, 900, 230, 8,  80, 80, 4, 100,  0, 10, 75, 25, 20, [4,0,0]], //7
  ["Scarlet Witch",   210, 900, 230, 16, 80, 60, 1, 100,100, 10, 20, 15, 10, [0,9,0]], //8
  ["Black Panther",   220, 900, 230, 12, 70, 60, 4, 100, 70, 20, 40, 55, 15, [2,0,0]], //9
  ["Vision",          200, 900, 230, 8,  80, 70, 1, 100, 80, 10, 65, 25, 10, [0,9,0]], //10
  ["Ant-Man",         150, 900, 230, 8,  70, 70, 3,  99, 25, 10, 75, 25, 10, [10,10,0]] // 11
];
//Hero Name, Hero Hitpoints, Hero X Pos, Hero Y Pos,

heroStats.forEach(function(hero) {
  heroes.push(hero);
});

function Player(heroNumber, indexNum) {
  var imgOff = [-125, -100];
  this.heroNumber = heroNumber;
  this.startingX = 90;
  this.startingY = 230;
  this.indexNum = indexNum;
  this.hero = heroStats;

  this.heroSelect = function() {// pull hero stats from this.hero array into a hero object
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
    this.rangeAttack = this.hero[this.heroNumber][11];
    this.punchDmg = this.hero[this.heroNumber][12];
    this.attackSpeed = this.hero[this.heroNumber][13];
    this.rAttack = this.hero[this.heroNumber][14];
  }

  this.heroSelect();
  this.direction = 0;
  this.radius = 70;
  this.damagedColor;
  this.charBlocking = false;
  this.charBlockTime = 0;
  this.sprite = 0;
  this.spriteTime = 0;
  this.gcd = 0;
  this.hurtTime = 0;
  this.hurtReflex = 8;
  this.winner = 0;

  //this.show is called from the draw function and is executed every frame
  this.show = function() {
    //change color of player hitbox shape to see if player is getting hit.
    if (this.damagedColor > 0) {
      fill(255,0,0);
      this.damagedColor--;
    } else if (this.isNPC === true) {
      fill(51,153,255);
    } else {
      fill(255,128,0);
    }

    //player sprite countdown each frame of the game, 0 defaults the the player nuetral position.
    if (this.winner === 1) {
      this.sprite = 8;
    } else {
      if (this.spriteTime > 0) {
        // console.log(this.spriteTime + ' ' + this.charBlocking);
        this.spriteTime -= 1;
      }
      if (this.direction > 0) {
        this.spriteChange(5,3)
      }
      if (this.direction < 0) {
        this.spriteChange(4,3)
      }
      if (this.hurtTime > 0 && this.charBlocking === false) {
        this.spriteChange(6, 10)
      }
      if (this.spriteTime === 0){
        this.sprite = 0;
      }
    }

    if (this.hurtTime > 0) {
      this.hurtTime -= 1;
    }

    if (this.gcd > 0) {
      this.gcd -= 1;
    } else if (this.gcd < 0) {
      this.gcd = 0;
    }

    if (this.charBlockTime > 0) {
      this.charBlockTime -= 1;
    } else {
      this.charBlocking = false;
    }



    push();
    if (whichSide()) {
      translate(this.x + imgOff[0],this.y + imgOff[1]);
      scale(-1,1);
      var xOff = 0;
      var yOff = 0;
    } else {
      var xOff = -125 + this.x;
      var yOff = -100 + this.y;
    }

    //checks to see the sprite value of the player and change the displayed sprite img.
    if (this.sprite === 8) {
      image(heroSprites[heroNumber].portrait, xOff, yOff);
    } else if (this.sprite === 0) {
      image(heroSprites[heroNumber].neutral, xOff, yOff);
    } else if (this.sprite === 1) {
      image(heroSprites[heroNumber].attack, xOff, yOff);
    } else if (this.sprite === 2) {
      image(heroSprites[heroNumber].special, xOff, yOff);
    } else if (this.sprite === 9) {
      image(heroSprites[heroNumber].special2, xOff, yOff);
    } else if (this.sprite === 3) {
      image(heroSprites[heroNumber].block, xOff, yOff);
    } else if (this.sprite === 4) {
      image(heroSprites[heroNumber].moveLeft, xOff, yOff);
    } else if (this.sprite === 5) {
      image(heroSprites[heroNumber].moveRight, xOff, yOff);
    } else if (this.sprite === 6) {
      image(heroSprites[heroNumber].hit, xOff, yOff);
    } else if (this.sprite === 7) {
      image(heroSprites[heroNumber].jump, xOff, yOff);
    } else if (this.sprite === 10) {
      image(heroSprites[heroNumber].windup, xOff, yOff);
    } else if (this.sprite === 11) {
      image(heroSprites[heroNumber].windup2, xOff, yOff);
    } else if (this.sprite === 12) {
      image(heroSprites[heroNumber].range2, xOff, yOff);
    }
    noFill();
    stroke(255);
    strokeWeight(5);
    ellipse(this.x,this.y,this.radius,this.radius);
    pop();
  }




  //function sets the player's sprite index for a certain number of frames
  this.spriteChange = function(num, time) {
    this.sprite = num;
    this.spriteTime = time;
  }

  //basic punching attack
  this.punch = function() {
    if (this.gcd === 0) {
      this.gcd =+ this.attackSpeed;
      var collided = false;
      this.spriteChange(1, 12);
      for(i=0;i<players.length;i++) {
        if (this.indexNum !== players[i].indexNum) {
          var collided = this.collide(players[i].x, players[i].y, players[i].radius, 5)
        }
        if (collided) {
          players[i].hp -= this.combat(this.punchDmg, players[i]); //i = defender player
          players[i].isHit(players[i].hurtReflex);
          this.power += this.powerRegen;
          players[i].power += this.powerRegen / 2;
          this.power = Math.ceil(constrain(this.power, 0, this.powerMax));
          players[i].power = Math.ceil(constrain(players[i].power, 0, players[i].powerMax));
          players[i].gcd = this.attackSpeed / 2;
          collided = false;
        }
      }
    }
  }

  //checks the power cost of a check before it creates it
  this.powerCostCheck = function(attackNum) {
    var index = this.hero[heroNumber][14][attackNum];
    var power = globalAttacks[index][6];
    return power;
  }
  //player shoots and updates the sprite to it's special img sprite
  this.shoot = function() {
    var cost = this.powerCostCheck(0);
    if (cost <= this.power && this.gcd === 0) {
      this.gcd += this.attackSpeed;
      this.power -= cost;
      special = new Special(this, 0, 0);
      special.img = 1
      specials.push(special);
      this.spriteChange(2, this.gcd);
    }
  }

  //Player third attack
  this.fancy = function() {
    var cost = this.powerCostCheck(1);
    if (cost <= this.power && this.gcd === 0) {

      this.gcd += this.attackSpeed;
      this.power -= cost;
      special = new Special(this, 1, 0);
      special.imgNum = 2;
      specials.push(special);
      this.spriteChange(9, this.gcd);
    }
  }


  //function is called when a player gets hit by a special ranged attack and runs combat function. /This/ is the player that shot the attack.
  this.special = function(specialHit, defender) {
    defender.hp -= this.combat(specialHit.damage, defender);
    defender.power += this.powerRegen / 5;
    defender.power = Math.ceil(constrain(defender.power, 0, defender.powerMax));
    defender.gcd = this.attackSpeed / 2;
    defender.isHit(defender.hurtReflex);
  };

  //Total combat function that runs the attackers attack, and the player who is hit defense and blocking rolls. /This/ is the player that attacks.
  this.combat = function(baseDam, defender) {
    let dmg;
    var dmgDam = this.damageRoll(baseDam);
    var dmgDef = this.defenseRoll(baseDam, defender);
    var block = this.blockingRoll(baseDam, defender);
    dmg = (dmgDam - dmgDef) * block;
    console.log("Damage: " + dmg + " Attack: " + dmgDam + " Defense: " + dmgDef + " Block: " + block + " | base dam :" + baseDam + " playerhit:" + defender + ' ' + this.name );
    return dmg;
  }


  //function reduces damage taken if player is blocking
  this.blockingRoll = function(baseDam, defender) {
    if (defender.charBlocking) {
      return baseDam / (defender.block * 75 );
    } else {
      return 1;
    }
  }

  //updates the player value if they are blocking or not.
  this.isBlocking = function() {
    this.charBlocking = true;
    this.charBlockTime = this.attackSpeed;
    this.gcd = this.attackSpeed;
    this.spriteChange(3, 20);
  }

  //function computes the attack damage
  this.damageRoll = function(baseDam) {
   return baseDam * this.attack / 100;
  }

  //function computes the defense damage to save
  this.defenseRoll = function(baseDam, defender) {
    return baseDam * defender.defense / 100 / 2;
  }

  //sets frames for how long the hitbox shape is colored when hit
  this.isHit = function(time) {
    this.damagedColor = time;
    this.hurtTime = time;
  }

  //this is in the draw function. Updates the x coord of the player
  this.move = function() {
    var borders = [];
    borders = this.edges();
    if ((borders[0] === false && borders[1] === false) || ((borders[0] === true && this.direction > 0) || (borders[1] === true && this.direction < 0))) {
      if (this.indexNum === 0) {
        var collided = this.collide(players[1].x, players[1].y, players[1].radius, 5)
      } else {
        var collided = this.collide(players[0].x, players[0].y, players[0].radius, 5)
      }
      if (collided) {
        if (this.indexNum === 0 && this.direction === -1 || this.indexNum === 1 && this.direction === 1) {

          this.x += this.direction * this.speed;
        }
      } else {
        this.x += this.direction * this.speed;
      }
    }
  }

  //checks to see if this player has something collided with it. Pass in args of the thing to check.
  this.collide = function(x, y, r, buffer) {
    if (dist(this.x,this.y,x,y) < this.radius + r + buffer) {
      return true;
    }
  }

  //move left and right
  this.moveLeftRight = function(direction) {
    if (this.charBlocking === false) {
      this.direction = direction;
    }
  }

  this.edges = function() {
    var leftright = [];
    leftright[0] = this.x < 20;
    leftright[1] = this.x > width - 20;
    return leftright;
  }
}
