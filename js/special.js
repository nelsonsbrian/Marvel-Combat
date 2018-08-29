function Special(player) {
  this.playerIndex = player.indexNum;
  this.heroNumber = player.heroNumber;
  this.x = player.x;
  this.y = player.y;
  this.l = 70;
  this.w = 25;
  this.speed = player.speed * 2;
  this.damage = player.rangeAttack;
  player.power -= player.rangeCost;
  this.toDelete = false;
  this.dir = 1;


    if (player.indexNum === 0) {
      this.dir = 1;
    } else {
      this.dir = -1;
    }
    console.log(this.dir);




  this.show = function() {
    image(heroSprites[this.heroNumber].range,this.x-100,this.y-180);
    // players[0].;
    // fill(103,199,235)
    // rect(this.x,this.y,this.l,this.w);
  }

  this.move = function() {
    this.x += this.dir * this.speed;
  }


}
