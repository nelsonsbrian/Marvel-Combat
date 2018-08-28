function Laser(player) {
  this.playerIndex = player.indexNum;
  this.x = player.x;
  this.y = player.y;
  this.l = 70;
  this.w = 25;
  this.speed = 9;
  this.powerCost = 75;
  this.damage = 100;
  player.power -= this.powerCost;
  this.toDelete = false;


  this.show = function() {
    fill(103,199,235)
    rect(this.x,this.y,this.l,this.w);
  }

  this.move = function() {
    this.x += this.speed;
  }


}
