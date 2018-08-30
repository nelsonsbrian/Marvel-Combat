var xOff = -125;
var yOff = -100;
var heroes = [];
var heroStats = [
  //left side characters [0-5]
  //name              hp   x    y    sp  at  df  bl  pMx p   pRg rAt rCo AS  RA
  ["Iron Man",        130, 90,  230, 12, 50, 50, 3,  99, 99, 10, 99, 33, 10, [0]],
  ["The Hulk",        150, 90,  230, 8,  90, 60, 2,  99, 25, 5,  50, 10, 10, [1]],
  ["Black Widow",     100, 90,  230, 16, 70, 20, 5,  99, 99, 10, 75, 50, 10, [0]],
  ["Spider-Man",      100, 90,  230, 16, 50, 30, 5,  99, 99, 10, 50, 25, 10, [0]],
  ["Doctor Strange",  130, 90,  230, 12, 50, 50, 3,  99, 99, 10, 99, 33, 10, [0]],
  [],
  //right side characters [6-11]
  //name              hp   x    y    sp  at  df  bl  pMx p   pRg rAt rCo AS  RA
  ["Captain America", 130, 900, 230, 12, 90, 50, 5,  99, 99, 10, 50, 25, 10, [2]],
  ["Thor",            150, 900, 230, 8,  70, 70, 3,  99, 99, 10, 75, 25, 10, [4]],
  ["Scarlet Witch",   100, 900, 230, 16, 50, 20, 2,  99, 99, 10, 99, 10, 10, [0]],
  ["Black Panther",   120, 900, 230, 12, 70, 60, 3,  99, 0,  20, 30, 50, 10, [2]],
  ["Vision",          150, 900, 230, 8,  70, 70, 3,  99, 25, 10, 75, 25, 10, [0]],
  []
];
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
    this.rangeCost = this.hero[this.heroNumber][12];
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
      if (this.hurtTime > 0) {
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
    }

    if (this.charBlockTime > 0) {
      this.charBlockTime -= 1;
    } else {
      this.charBlocking = false;
    }

    //checks to see the sprite value of the player and change the displayed sprite img.
    if (this.sprite === 8) {
      image(heroSprites[heroNumber].portrait, (this.x + imgOff[0]), (this.y + imgOff[1]));
    } else if (this.sprite === 0) {
      image(heroSprites[heroNumber].neutral, (this.x + imgOff[0]), (this.y + imgOff[1]));
    } else if (this.sprite === 1) {
      image(heroSprites[heroNumber].attack, (this.x + imgOff[0]), (this.y + imgOff[1]));
    } else if (this.sprite === 2) {
      image(heroSprites[heroNumber].special, (this.x + imgOff[0]), (this.y + imgOff[1]));
    } else if (this.sprite === 3) {
      image(heroSprites[heroNumber].block, (this.x + imgOff[0]), (this.y + imgOff[1]));
    } else if (this.sprite === 4) {
      image(heroSprites[heroNumber].moveLeft, (this.x + imgOff[0]), (this.y + imgOff[1]));
    } else if (this.sprite === 5) {
      image(heroSprites[heroNumber].moveRight, (this.x + imgOff[0]), (this.y + imgOff[1]));
    } else if (this.sprite === 6) {
      image(heroSprites[heroNumber].hit, (this.x + imgOff[0]), (this.y + imgOff[1]));
    } else if (this.sprite === 7) {
      image(heroSprites[heroNumber].jump, (this.x + imgOff[0]), (this.y + imgOff[1]));
    }
    noFill();
    stroke(255);
    strokeWeight(5);
    ellipse(this.x,this.y,this.radius,this.radius);
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
      this.spriteChange(1, 15);
      for(i=0;i<players.length;i++) {
        if (this.indexNum !== players[i].indexNum) {
          var collided = this.collide(players[i].x, players[i].y, players[i].radius, this.radius * 5)
        }
        if (collided) {
          players[i].hp -= this.combat(50, players[i]); //i = defender player
          this.power += this.powerRegen;
          this.power = constrain(this.power, 0, this.powerMax);
          collided = false;
        }
      }
    }
  }

  //player shoots and updates the sprite to it's special img sprite
  this.shoot = function() {
    if (this.rangeCost <= this.power && this.gcd === 0) {
      this.gcd =+ this.attackSpeed;
      this.power -= this.rangeCost;
      special = new Special(players[this.indexNum], 0, 0);
      specials.push(special);
      this.spriteChange(2, this.gcd);
    }

  }

  //function is called when a player gets hit by a special ranged attack and runs combat function. /This/ is the player that shot the attack.
  this.special = function(specialHit, defender) {
    console.log("this " + this.name + " parameter " + defender);
    defender.hp -= this.combat(specialHit.damage, defender);
    defender.isHit(defender.hurtReflex);
    this.isHit(this.hurtReflex);
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
    console.log(defender.charBlocking + ' ' + defender.name);
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
    this.spriteChange(3, this.attackSpeed);
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
      // console.log(this.name + " collide");
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
