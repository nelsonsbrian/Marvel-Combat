function Player(name, hitpoint,x ,y, speed) {
  this.name = name;
  this.hp = hitpoint;
  this.y = y;
  this.x = x;
  this.speed = speed;
  this.direction = 0;



  this.show = function() {

    if(this.name === "ironMan") {
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
