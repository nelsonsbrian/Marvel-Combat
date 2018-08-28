function Laser(player) {
  this.playerIndex = player.indexNum;
  this.heroNumber = player.heroNumber;
  this.x = player.x;
  this.y = player.y;
  this.l = 70;
  this.w = 25;
  this.speed = 30;
  this.powerCost = 75;
  this.damage = 100;
  player.power -= this.powerCost;
  this.toDelete = false;


  this.show = function() {
    image(heroSprites[this.heroNumber].range,this.x-100,this.y-180);
    // players[0].;
    // fill(103,199,235)
    // rect(this.x,this.y,this.l,this.w);
  }

  this.move = function() {
    this.x += this.speed;
  }


}
