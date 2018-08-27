function Player(heroNumber) {
  this.heroNumber = heroNumber;
  this.startingX = 50;
  this.startingY = 400;
  this.hero = [
    ["IronMan", 100, this.startingX, this.startingY, 10, 70, 80, 90, 100],
    ["Dummie", 200, width-50, this.startingY, 10, 50, 90, 90, 50]
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
    this.power = this.hero[this.heroNumber][8];
  }
  this.heroSelect();
  this.direction = 0;
  this.radius = 25;
  this.damagedColor;
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
    if (this.name === "IronMan") {
      image(ironManNeutral, this.x, (this.y - 200));
    } else {
      image(captainAmericaNeutral, this.x, (this.y-200));
    }
  }

  this.punch = function() {
    for(i=0;i<players.length;i++) {
      if (this.name !== players[i].name) {
        var collided = this.collide(players[i].x, players[i].y, players[i].radius, this.radius * 2)
      }
      if (collided) {
        console.log("punch dmg 23");
        players[i].hp -= 23;
        players[i].isHit(5);
      }
    }
  }

  this.isHit = function () {
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
