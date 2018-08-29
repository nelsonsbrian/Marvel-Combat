var xOff = -125;
var yOff = -100;

function Player(heroNumber, indexNum) {
  this.heroNumber = heroNumber;
  this.startingX = 90;
  this.startingY = 230;
  this.indexNum = indexNum;
  this.hero = [
    //left side characters [0-2]
    ["Iron Man", 200, this.startingX, this.startingY, 15, 70, 80, 90, 100, 50, 5, 25, 35],
    ["Hulk", 300, this.startingX, this.startingY, 10, 50, 90, 90, 50, 25, 5, 25, 60],
    ["Black Widow", 100, this.startingX, this.startingY, 15, 70, 80, 90, 100, 50, 5, 25, 20],

    //right side characters [3-5]
    ["Captain America", 170, width-this.startingX-90, this.startingY, 10, 50, 90, 90, 70, 25, 5, 25, 40],
    ["Thor", 170, width-this.startingX-90, this.startingY, 10, 50, 90, 90, 50, 25, 5, 25, 50],
    ["Scarlet Witch", 170, width-this.startingX-90, this.startingY, 10, 50, 90, 90, 50, 25, 5, 25, 30]
  ];
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
    this.rangeCost = this.hero[this.heroNumber][11];
    this.attackSpeed = this.hero[this.heroNumber][12];
  }
  this.heroSelect();
  this.direction = 0;
  this.radius = 25;
  this.damagedColor;
  this.gcd = 0;
  this.charBlocking = false;
  this.sprite = 0;
  this.spriteTime = 0;
  this.gcd = 0;

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
    if (this.charBlocking===false && this.spriteTime > 0) {
      // console.log(this.spriteTime + ' ' + this.charBlocking);
      this.spriteTime -= 1;
    }
    this.globalCD = function() {
      this.gcd -= 1;
    }

    if (this.spriteTime === 0){
      this.sprite = 0;
    }
  //checks to see the sprite value of the player and change the displayed sprite img.
    if (this.sprite === 0) {
      image(heroSprites[heroNumber].neutral, (this.x + xOff), (this.y + yOff));
      ellipse(this.x,this.y,this.radius,this.radius);
    } else if (this.sprite === 1) {
      image(heroSprites[heroNumber].attack, (this.x + xOff), (this.y + yOff));
      ellipse(this.x,this.y,this.radius,this.radius);
    } else if (this.sprite === 2) {
      image(heroSprites[heroNumber].special, (this.x + xOff), (this.y + yOff));
      ellipse(this.x,this.y,this.radius,this.radius);
    } else if (this.sprite === 3) {
      image(heroSprites[heroNumber].block, (this.x + xOff), (this.y + yOff));
      ellipse(this.x,this.y,this.radius,this.radius);
    }
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
          players[i].hp -= this.combat(50, i);
          players[i].isHit(5);
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
      var special = new Special(players[this.indexNum], false);
      specials.push(special);
      this.spriteChange(2, 6);
    }
  }



  //function is called when a player gets hit by a special ranged attack and runs combat function
  this.special = function(missleHit) {
    this.hp -= this.combat(missleHit.damage, missleHit.playerIndex);
    this.isHit(10);
  };

  //Total combat function that runs the attackers attack, and the player who is hit defense and blocking rolls
  this.combat = function(baseDam, playerI) {
    let dmg;
    var dmgDam = this.damageRoll(baseDam, playerI);
    var dmgDef = this.defenseRoll(baseDam);
    var block = this.blockingRoll(baseDam);
    dmg = dmgDam - dmgDef - block;
    console.log("Damage: " + dmg + " Attack: " + dmgDam + " Defense: " + dmgDef + " Block: " + block + " | base dam :" + baseDam + " playerhit index:" + playerI);

    return dmg;
  }

  //updates the player value if they are blocking or not.
  this.isBlocking = function(bool, i) {
    this.charBlocking = bool;
      this.spriteChange(3, 1);
  }

  //function reduces damage taken if player is blocking
  this.blockingRoll = function(baseDam) {
    if (this.charBlocking) {
      return baseDam / 300;
    } else {
      return 0;
    }
  }

  //function computes the attack damage
  this.damageRoll = function(baseDam, index) {
   return baseDam * players[index].attack / 100;
  }

  //function computes the defense damage to save
  this.defenseRoll = function(baseDam) {
    return baseDam * this.defense / 100 / 2;
  }

  //sets frames for how long the hitbox shape is colored when hit
  this.isHit = function() {
    this.damagedColor = 5;
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
    // if (this.direction !== direction) {
      this.direction = direction;
    // }
  }

  this.edges = function() {
    var leftright = [];
    leftright[0] = this.x < 20;
    leftright[1] = this.x > width - 20;
    return leftright;
  }
}
