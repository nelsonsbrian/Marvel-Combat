var xOff = -125;
var yOff = -100;
var heroes = [];
var heroStats = [
  //left side characters [0-5]
  //                                                                Punch      Range
  //name              hp   x    y    sp  at  df  bl  pMx  p   pRg  PP RA  AS   Attack
  ["Iron Man",        250, 90,  230, 12, 50, 70, 3, 100, 100, 10,  0, 33, 15, [12,9,0]], //0
  ["The Hulk",        300, 90,  230, 8,  90, 80, 3,  40,   0,  5,  2, 40, 15, [12,1,8]], //1
  ["Black Widow",     200, 90,  230, 16, 70, 50, 1, 100, 100, 10,  0, 20, 12, [12,8,0]], //2
  ["Spider-Man",      210, 90,  230, 16, 90, 60, 1, 100, 100, 10,  0, 25, 10, [12,0,8]], //3
  ["Doctor Strange",  220, 90,  230, 12, 80, 60, 1, 100, 100, 10,  0, 490, 15, [12,0,9]], //4
  ["Captain Marvel",  220, 90,  230, 12, 50, 50, 3, 100, 100, 10,  0, 33, 10, [12,0,8]], //5
  //right side characters [6-11]
  //                                                                Punch      Range
  //name              hp   x    y    sp  at  df  bl  pMx  p   pRg  PP RA  AS    RA
  ["Captain America", 270, 900, 230, 12, 60, 70, 6, 100, 100, 10,  0, 25, 15, [12,2,8]], //6
  ["Thor",            250, 900, 230, 8,  80, 80, 4, 100, 100, 10,  0, 25, 15, [12,4,9]], //7
  ["Scarlet Witch",   210, 900, 230, 16, 20, 60, 1, 100, 100, 10,  0, 15, 10, [12,0,9]], //8
  ["Black Panther",   220, 900, 230, 12, 70, 60, 4, 100, 100, 20,  0, 55, 15, [12,2,0]], //9
  ["Vision",          200, 900, 230, 8,  60, 70, 1, 100, 100, 10,  0, 75, 10, [12,0,10]],//10
  ["Ant-Man",         200, 900, 230, 20, 70, 70, 3, 100, 100, 10,  0, 25, 10, [12,1,0]] // 11
];
//Hero Name, Hero Hitpoints, Hero X Pos, Hero Y Pos, Hero Speed, Hero Attack, Hero Defense, Hero Block Value, Hero Max Power, Hero Current Power, Hero Power Generation, Power Passive Generatoin, Range Attack Value, Attack Speed(GCD), [Attacks]

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
  this.windUpTime = 0;
  this.toStart = -1;
  this.powerTime = 0;

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
    this.powerPassive = this.hero[this.heroNumber][11];
    this.punchDmg = this.hero[this.heroNumber][12];
    this.attackSpeed = this.hero[this.heroNumber][13];
    this.rAttack = this.hero[this.heroNumber][14];
  }
  this.heroSelect();

  //this.show gets called in the draw function in sketch and gets executed every frame.
  this.show = function() {
    //player sprite countdown each frame of the game, 0 defaults the the player nuetral position.
    if (this.winner === 1) {
      this.sprite = 8;
    } else {
      if (this.charBlocking === true) {
        this.spriteChange(3,5)
      } else {
        if (this.spriteTime > 0) {
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
    }

    //timers and counters for the hero
    this.powerTime++;
    if (this.powerTime % 30 === 0 && this.powerTime !== 0) { //passive power gaining
      this.power += this.powerPassive;
      this.power = constrain(this.power, 0, this.powerMax);
      this.powerTime = 0;
    }

    if (this.hurtTime > 0) { //timer to show the sprite of getting injured
      this.hurtTime -= 1;
    }

    if (this.gcd > 0) { //cooldown before next attack can happen
      this.gcd -= 1;
    } else if (this.gcd < 0) {
      this.gcd = 0;
    }

    if (this.charBlockTime > 0) { //timer for how long you can block for
      this.charBlockTime -= 1;
    } else {
      this.charBlocking = false;
    }

    if (this.windUpTime > 1) { //timer that counts down the windup before a combat is made
      this.windUpTime -= 1;
    } else if (this.windUpTime === 1) {
      this.windUpTime -= 1;
      this.startCombat(this.toStart);
      this.toStart = -1;
    } else if (this.windUpTime < 0) {
      this.windUpTime = 0;
    }


    //code to have players face opposite direction if they managed to get to the other side
    //of their opponent.
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
  }

  //function sets the player's sprite index for a certain number of frames
  this.spriteChange = function(num, time) {
    this.sprite = num;
    this.spriteTime = time;
  }

  //checks the power cost of a combat move. Also checks to see if the move is an array.
  //returns [cost of combat move, isMelee 0/1]
  this.powerCostCheck = function(attackNum) {
    var index = this.hero[heroNumber][14][attackNum];
    var power = globalAttacks[index][6];
    var isMelee = globalAttacks[index][9];
    var powerCheck = [power, isMelee];
    return powerCheck;
  }

  //Player hits keybinding as logic is sent here:
  //Attack cost is computed, windup animation is started, and gcd is triggered
  //If the attack is a melee attack, no cost is removed from power pool.
  this.toAttack = function(attackNumber) {
    var cost = this.powerCostCheck(attackNumber);
    if (cost[0] <= this.power && this.gcd === 0) {
      this.windUp(attackNumber);
      this.toStart = attackNumber;
      this.gcd += this.attackSpeed + this.windUpTime;
      if (cost[1] === 0) {
        this.power -= cost[0];
      }
    }
  }

  //loads the proper wind up sprite before an attack begins
  //attack number 0 1 2 corresponds to they keybinding hit
  this.windUp = function(attackNum) {
    var index = this.hero[heroNumber][14][attackNum];
    this.windUpTime = globalAttacks[index][8];
    if (attackNum === 0) {
      this.spriteChange(1, 12);
    } else if (attackNum === 1) {
      this.spriteChange(10, this.toStart);
    } else if (attackNum === 2) {
      this.spriteChange(11, this.toStart);
    }
  }

  //after windup timer runs out, a combat attack instance is made and stored in the combats array.
  //sprite is changed to show attack.
  this.startCombat = function() {
    var attackChoosen = this.rAttack[this.toStart];
    console.log(attackChoosen);
    combat = new Combat(this, attackChoosen);
    combat.imgNum = this.toStart;
    combats.push(combat);
    if (this.toStart === 0) {
      this.spriteChange(1, this.gcd);
    } else if (this.toStart === 1) {
      this.spriteChange(2, this.gcd);
    } else if (this.toStart === 2) {
      this.spriteChange(9, this.gcd);
    }
  }

  //function is called when a player gets hit by a combat ranged attack and runs combat function.
  // /This/ is the player that shot the attack.
  // The dender will gain power from getting hit, a melee punch will generate power.
  // Getting hit by an attack will delay your next attack.
  // Add time to the isHurt timer to display getting attacked.
  this.causeDmg = function(combatHit, defender) {
    defender.hp -= this.combat(combatHit.damage, defender);
    defender.power += defender.powerRegen / 3;
    if (combatHit.isMelee === 1) {
      this.power += this.powerRegen;
    }
    defender.power = Math.ceil(constrain(defender.power, 0, defender.powerMax));
    defender.gcd += this.attackSpeed / 2;
    defender.isHit(defender.hurtReflex);
  };

  //Total combat function that runs the attackers attack, and the player who is hit defense and blocking rolls.
  // /This/ is the player that attacks.
  this.combat = function(baseDam, defender) {
    let dmg;
    var dmgAtt = this.damageRoll(baseDam);
    var dmgDef = this.defenseRoll(baseDam, defender);
    var block = this.blockingRoll(baseDam, defender);
    dmg = (dmgAtt - dmgDef) * block;
    console.log("Damage: " + dmg + " Attack: " + dmgAtt + " Defense: " + dmgDef + " Block: " + block + " | base dam :" + baseDam + " playerhit:" + defender + ' ' + this.name );
    return dmg;
  }


  //function reduces damage taken if player is blocking
  //If the player is blocking it reduces 30-80% of the dmg depending on stats.
  this.blockingRoll = function(baseDam, defender) {
    if (defender.charBlocking) {
      return baseDam / (defender.block * 75 );
    } else {
      return 1;
    }
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

  //updates the player value if they are blocking or not.
  this.isBlocking = function(num) {
    if (this.gcd <= 0) {
      this.charBlocking = true;
      this.charBlockTime = 30;
      this.gcd = 30;
      this.spriteChange(3, 30);
    }
  }

  //this is in the draw function in sketch. Updates the x coord of the player.
  //Checks the see if player is near the edge of the screen or colliding with another
  //player. Then properly restricts movement based on collision.
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

  //checks to see if an x-position is off the screen
  this.edges = function() {
    var leftright = [];
    leftright[0] = this.x < 20;
    leftright[1] = this.x > width - 20;
    return leftright;
  }

  //checks to see if this player has something collided with it. Pass in args of the
  // thing to check. Checks the distance between 2 points and check to see if that is
  // less than the radius of one object plus the radius of another object.
  this.collide = function(x, y, r, buffer) {
    if (dist(this.x,this.y,x,y) < this.radius + r + buffer) {
      return true;
    }
  }

  //move left and right. direction updated from keybindings.*
  this.moveLeftRight = function(direction) {
    // if (this.charBlocking === false) {
      this.direction = direction;
    // }
  }
}
