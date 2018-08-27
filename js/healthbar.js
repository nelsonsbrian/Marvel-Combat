function Health(name, health, maxHealth) {
  this.pName = name;
  this.pHealth = health;
  this.pMaxHealth = maxHealth;
  this.size = 400;
  this.pHealthPercent = this.pHealth / this.pMaxHealth;


  this.update = function(name, health) {
    if (name === this.pName) {
      this.pHealth = health;
    }
  };

  this.show = function(name, health) {
    // fill(255);
    // rect(200,0,width-400,50);
    if (name === "IronMan") {
      fill(255,0,0);
      rect(0,0,this.size,50);
      fill(0,255,0);
      let green = this.pHealthPercent * this.size;
      green = constrain(green, 0, this.size);
      rect(0,0,green,50);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(name, 50, 40);
    }
    if (name === "Dummie") {
      fill(255,0,0);
      rect(width - this.size,0,width,50);
      fill(0,255,0);
      let green = this.pHealthPercent * this.size;
      green = constrain(green, 0, this.size);
      rect(width - this.size,0,green,50);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(name, width - this.size + 10, 40);
    }
  };


};
