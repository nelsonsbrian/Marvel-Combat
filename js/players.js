function Player(heroNumber) {
  this.heroNumber = heroNumber;
  this.startingX = 50;
  this.startingY = 400;
  this.hero = [
    ["IronMan", 100, this.startingX, this.startingY, 10],
    ["Dummie", 200, width-50, this.startingY, 10]
  ];
  this.heroSelect = function() {
    this.name = this.hero[this.heroNumber][0];
    this.hp = this.hero[this.heroNumber][1];
    this.x = this.hero[this.heroNumber][2];
    this.y = this.hero[this.heroNumber][3];
    this.speed = this.hero[this.heroNumber][4];
  }
  this.heroSelect();
  this.direction = 0;
  this.radius = 25;

  this.show = function() {

    // if(this.name === "IronMan") {
    // } else {
      fill(255,255,0);
      fill(255,0,0);
    // }
    ellipse(this.x,this.y, this.radius*2,this.radius*2);
  }


  this.move = function() {
    for(i=0;i<players.length;i++) {
      if (this.name !== players[i].name) {
        var collided = this.collide(players[i].x, players[i].y, players[i].radius)
      }
    }
    if (collided) {
      this.x += this.direction * -1 * 25;
    } else {
      this.x += this.direction * this.speed;
    }
  }
  this.direction = 0;

  this.collide = function(x, y, r) {
    if (dist(this.x,this.y,x,y) < this.radius + r + 5) {

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
