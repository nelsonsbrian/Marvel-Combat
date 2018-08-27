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



  this.show = function() {

    if(this.name === "IronMan") {
      fill(255,0,0);
    } else {
      fill(255,255,0);
    }
    ellipse(this.x,this.y, 50,50);
  }

  this.move = function() {
    this.x += this.direction * this.speed;
  }

  this.moveLeftRight = function(direction) {
    this.direction = direction;
  }
}
