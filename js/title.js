function Title(name, health) {
  this.pName = name;
  this.phealth = health;


  this.update = function(name, health) {
    if (name === this.pName) {
      this.phealth = health;
    }
  };

  this.show = function(name, health) {
    fill(255);
    rect(200,0,width-400,50);
    if (name === "Human") {
      fill(255,0,0);
      rect(0,0,200,50);
      fill(0,255,0);
      let green = health*2;
      green = constrain(green, 0, 200);
      rect(0,0,green,50);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(name, 50, 40);
    }
    if (name === "Computer") {
      fill(255,0,0);
      rect(width - 200,0,width,50);
      fill(0,255,0);
      let green = health*2;
      green = constrain(green, 0, 200);
      rect(width - 200,0,green,50);
      fill(255);
      textSize(30);
      textStyle(BOLD);
      text(name, width - 200 + 10, 40);
    }
  };


};
