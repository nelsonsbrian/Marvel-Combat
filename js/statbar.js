function StatBar(name, health, maxHealth, power, powerMax) {
  this.pName = name;
  this.pHealth = health;
  this.pMaxHealth = maxHealth;
  this.pPower = power;
  this.pPowerMax = powerMax;
  this.healthSize = [350,40];
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
      fill(188, 26, 39);
      rect(10,10,this.healthSize[0],this.healthSize[1], 20, 15, 10, 5);
      fill(110, 196, 76);
      let greenHealth = this.pHealthPercent * this.healthSize[0];
      greenHealth = constrain(greenHealth, 0, this.healthSize[0]);
      rect(10,10,greenHealth,this.healthSize[1], 20, 15, 10, 5);
      fill(0, 0, 0);
      textSize(30);
      textStyle(NORMAL);
      text(name, 50, 40);
    //player 2 power
      fill(0);
      rect(0,height-this.powerSize[1],this.powerSize[0],this.powerSize[1], 0, 15, 0, 5);
      fill(255,255,0);
      let bluePower = this.pPowerPercent * this.powerSize[0];
      bluePower = constrain(bluePower, 0, this.powerSize[0]);
      rect(0,height-this.powerSize[1],bluePower,this.powerSize[1], 0, 15, 0, 5);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(power + " / " + this.pPowerMax, 3, height-this.powerSize[1] - 10);
    }
  if (1 === player.indexNum) {
    //hulkSprite,Captain America
      //player2 health
      fill(188, 26, 39);
      rect(width - 10 - this.healthSize[0],10,this.healthSize[0],this.healthSize[1], 15, 20, 5, 10);
      fill(110, 196, 76);
      let greenHealth = this.pHealthPercent * this.healthSize[0];
      greenHealth = constrain(greenHealth, 0, this.healthSize[0]);
      rect(width - 10 - (greenHealth),10,width - 10 -(width - 10 - (greenHealth)),this.healthSize[1], 15, 20, 5, 10);
      fill(0, 0, 0);
      textSize(30);
      textStyle(NORMAL);
      text(name, width - this.healthSize[0] + 10, 40);
      //player 2 power
      fill(0);
      rect(width - this.powerSize[0],height-this.powerSize[1],this.powerSize[0],this.powerSize[1], 15, 00, 0, 0);
      fill(255,255,0);
      let bluePower = this.pPowerPercent * this.powerSize[0];
      bluePower = constrain(bluePower, 0, this.powerSize[0]);
      rect(width - bluePower, height - this.powerSize[1],height-this.powerSize[1] ,this.powerSize[1], 15, 20, 10, 5);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(power + " / " + this.pPowerMax, width-100, height-this.powerSize[1] - 10);

    }

  // timer text:
    fill(255);
    textSize(50);
    textStyle(BOLD);
    text(Math.ceil(timeRem/30), width/2 - 25, 50);
  };


};
