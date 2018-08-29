function StatBar(name, health, maxHealth, power, powerMax) {
  this.pName = name;
  this.pHealth = health;
  this.pMaxHealth = maxHealth;
  this.pPower = power;
  this.pPowerMax = powerMax;
  this.healthSize = [400,50];
  this.powerSize = [400,30];
  this.pHealthPercent = this.pHealth / this.pMaxHealth;
  this.pPowerPercent = this.pPower / this.pPowerMax;


  this.show = function(player) {
    // fill(255);
    // rect(200,0,width-400,50);
    name = player.name;
    health = player.hp;
    power = player.power;
    if (name === this.pName) {
      this.pHealth = health;
    }
    this.pHealthPercent = health / this.pMaxHealth;
    this.pPowerPercent = power / this.pPowerMax;
    if (0 === player.indexNum) {
      //player 1 health
      fill(255,0,0);
      rect(0,0,this.healthSize[0],this.healthSize[1]);
      fill(0,255,0);
      let greenHealth = this.pHealthPercent * this.healthSize[0];
      greenHealth = constrain(greenHealth, 0, this.healthSize[0]);
      rect(0,0,greenHealth,this.healthSize[1]);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(name, 50, 40);
    //player 2 power
      fill(0);
      rect(0,height-this.powerSize[1],this.powerSize[0],this.powerSize[1]);
      fill(255,255,0);
      let bluePower = this.pPowerPercent * this.powerSize[0];
      bluePower = constrain(bluePower, 0, this.powerSize[0]);
      rect(0,height-this.powerSize[1],bluePower,this.powerSize[1]);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(power + " / " + this.pPowerMax, 3, height-this.powerSize[1] - 10);
    }
  if (1 === player.indexNum) {
    //hulkSprite,Captain America
      //player2 health
      fill(255,0,0);
      rect(width - this.healthSize[0],0,width,this.healthSize[1]);
      fill(0,255,0);
      let greenHealth = this.pHealthPercent * this.healthSize[0];
      greenHealth = constrain(greenHealth, 0, this.healthSize[0]);
      rect(width - this.healthSize[0],0,greenHealth,this.healthSize[1]);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(name, width - this.healthSize[0] + 10, 40);
      //player 2 power
      fill(0);
      rect(width - this.powerSize[0],height-this.powerSize[1],this.powerSize[0],this.powerSize[1]);
      fill(255,255,0);
      let bluePower = this.pPowerPercent * this.powerSize[0];
      bluePower = constrain(bluePower, 0, this.powerSize[0]);
      rect(width - this.powerSize[0],height-this.powerSize[1],bluePower,this.powerSize[1]);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(power + " / " + this.pPowerMax, width-100, height-this.powerSize[1] - 10);

    }
  };


};
