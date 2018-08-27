function Mob(x, isNPC, name) {
  this.health = 100;
  this.playerName = name;
  this.y = (height + titleHeight) / 2;
  this.x = x;
  this.leftRight = 0;
  this.gravity = 0.50;
  this.upDown = 0;
  this.diameter = 32;
  this.armDiameter = this.diameter/1.5;
  this.hitBoxY = ((this.diameter + 15 + 25) / 2) - 3;
  this.hitBoxX = (this.diameter / 2) - 3;
  this.maxSpeed = 10;
  this.maxSpeedAI = 10;
  this.isNPC = isNPC;
  this.damaged = 0;
  this.coords = [];
  this.gcd = 0;


  this.show = function() {
    if (this.damagedColor > 0) {
      fill(255,0,0);
      this.damagedColor--;
    } else if (this.isNPC === true) {
      fill(51,153,255);
    } else {
      fill(255,128,0);
    }
    ellipse(this.x, this.y, this.diameter, this.diameter + 15);
    ellipse(this.x, this.y+25, this.armDiameter, this.armDiameter);
    ellipse(this.x, this.y-25, this.armDiameter, this.armDiameter);
  }

  this.isHit = function(damage) {
    this.x += 30;
    this.y += random(-10, 10);
    this.damagedColor = 5;
    this.health -= damage;
    this.health = constrain(this.health, 0, 120);
  }

  this.isDead = function() {
    if (this.health <= 0) {
      this.death();
    }
    return (this.health <= 0);
  }

  this.death = function() {
    console.log(this.playerName + " is dead!");
    $('#output').text(this.playerName + " is dead!");

  }

  this.compAI = function() {
    if (this.isNPC === true) {
      this.moveAI();
    }
  }

  this.moveAI = function() {
    if (this.x > width - (.2 * width)) {
      this.leftRight += .01;
    } else {
      this.leftRight = 0;
    }
    if (this.y < .2 * height) {
      this.upDown += .01;
    } else {
      this.upDown = 0;
    }
    if (this.y > height - (.2 * height)) {
      this.upDown += -.01;
    } else {
      this.upDown = 0;
    }
    this.upDown = constrain(this.upDown, -this.maxSpeedAI, this.maxSpeedAI);
    this.leftRight = constrain(this.leftRight, -this.maxSpeedAI, this.maxSpeedAI);
    // this.upDown = random(-25, 25);
    // this.leftRight = random(-25, 25);
  }

  this.moveUpDown = function(amount) {
    this.upDown = amount;
    this.upDown = constrain(this.upDown, -this.maxSpeed, this.maxSpeed);
  }

  this.moveLeftRight = function(amount) {
    this.leftRight = amount;
    this.leftRight = constrain(this.leftRight, -this.maxSpeed, this.maxSpeed);
  }

  this.updateCoords = function() {
    this.coords = [this.x + this.hitBoxX, this.y + this.hitBoxY, this.x - this.hitBoxX, this.y - this.hitBoxY];
  }

  this.update = function() {
    for (i=0;i<mobs.length;i++) {//mob collides with another mob
      for (j=0;j<mobs.length;j++) {
        var collision = [];
        if (mobs[i].playerName !== mobs[j].playerName) {
          mobs[i].updateCoords();
          collision = mobs[i].collision(mobs[i].coords, j);
          if (collision[0] === 1 && mobs[i].upDown < 0) {
            mobs[i].upDown = 0;
          }
          if (collision[1] === 1 && mobs[i].upDown > 0) {
            mobs[i].upDown = 0;
          }
          if (collision[2] === 1 && mobs[i].leftRight > 0) {
            mobs[i].leftRight = 0;
          }
          if (collision[3] === 1 && mobs[i].leftRight < 0) {
            mobs[i].leftRight = 0;
          }
        }
      }
    }
    this.edges();
  }

  this.globalCD = function(amount) {
    this.gcd += amount;
  }

  //mob tries to go offscreen
  this.edges = function() {
    if (this.x >= width-this.diameter/2) {
      this.x = width-this.diameter/2-1;
      this.leftRight = constrain(this.leftRight, 0, this.maxSpeed)
    } else if (this.x <= this.diameter/2) {
      this.x = this.diameter/2+1;
      this.leftRight = 0;
      this.leftRight = constrain(this.leftRight, -this.maxSpeed, 0)
    }
    if (this.y > height - this.diameter/2) {
      this.y = height - this.diameter/2;
      this.upDown = 0;
    }
    if (this.y < this.diameter/2 + titleHeight) {
      this.y = this.diameter/2 + titleHeight;
      this.upDown = 0;
    }
    //add up resulting movemnts and update drawing
    this.x -= this.leftRight * this.gravity;
    this.y += this.upDown * this.gravity;
  }

  this.collision = function(coords, index) {
    // N plane intersect
    var returnArr = [0,0,0,0];
  // this.coords = [this.x + this.hitBoxX, this.y + this.hitBoxY, this.x - this.hitBoxX, this.y - this.hitBoxY];
    if (((coords[2] <= mobs[index].x + mobs[index].hitBoxX) &&
    (coords[3] <= mobs[index].y + mobs[index].hitBoxY) &&
    (coords[2] >= mobs[index].x - mobs[index].hitBoxX) &&
    (coords[3] >= mobs[index].y - mobs[index].hitBoxY)) ||
    ((coords[0] <= mobs[index].x + mobs[index].hitBoxX) &&
    (coords[3] <= mobs[index].y + mobs[index].hitBoxY) &&
    (coords[0] >= mobs[index].x - mobs[index].hitBoxX) &&
    (coords[3] >= mobs[index].y - mobs[index].hitBoxY))) {
      returnArr[0] = 1;
    }
    // S plane intersect
    if (((coords[2] <= mobs[index].x + mobs[index].hitBoxX) &&
    (coords[1] <= mobs[index].y + mobs[index].hitBoxY) &&
    (coords[2] >= mobs[index].x - mobs[index].hitBoxX) &&
    (coords[1] >= mobs[index].y - mobs[index].hitBoxY)) ||
    ((coords[0] <= mobs[index].x + mobs[index].hitBoxX) &&
    (coords[1] <= mobs[index].y + mobs[index].hitBoxY) &&
    (coords[0] >= mobs[index].x - mobs[index].hitBoxX) &&
    (coords[1] >= mobs[index].y - mobs[index].hitBoxY))) {
      returnArr[1] = 1;
    }
    // W plane intersect
    if (((coords[2] <= mobs[index].x + mobs[index].hitBoxX) &&
    (coords[3] <= mobs[index].y + mobs[index].hitBoxY) &&
    (coords[2] >= mobs[index].x - mobs[index].hitBoxX) &&
    (coords[3] >= mobs[index].y - mobs[index].hitBoxY)) ||
    ((coords[2] <= mobs[index].x + mobs[index].hitBoxX) &&
    (coords[1] <= mobs[index].y + mobs[index].hitBoxY) &&
    (coords[2] >= mobs[index].x - mobs[index].hitBoxX) &&
    (coords[1] >= mobs[index].y - mobs[index].hitBoxY))) {
      returnArr[2] = 1;
    }
    // E plane intersect
    if (((coords[0] <= mobs[index].x + mobs[index].hitBoxX) &&
    (coords[3] <= mobs[index].y + mobs[index].hitBoxY) &&
    (coords[0] >= mobs[index].x - mobs[index].hitBoxX) &&
    (coords[3] >= mobs[index].y - mobs[index].hitBoxY)) ||
    ((coords[0] <= mobs[index].x + mobs[index].hitBoxX) &&
    (coords[1] <= mobs[index].y + mobs[index].hitBoxY) &&
    (coords[0] >= mobs[index].x - mobs[index].hitBoxX) &&
    (coords[1] >= mobs[index].y - mobs[index].hitBoxY))) {
      returnArr[3] = 1;
    }
    return returnArr;
  }

}



//     if (this.upDown < 0) {
//       this.upDown = 0;
//     }
//     if (this.upDown > 0) {
//       this.upDown = 0;
//     }

//     if (this.leftRight > 0) {
//       this.leftRight = 0;
//     }
//     if (this.leftRight < 0) {
//       this.leftRight = 0;
//     }



// this.collision = function(coords) {
//   // N plane intersect
  // this.coords = [this.x + this.hitBoxX, this.y + this.hitBoxY, this.x - this.hitBoxX, this.y - this.hitBoxY];
//   if (((this.x - this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
//   (this.y - this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
//   (this.x - this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
//   (this.y - this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY)) ||
//   ((this.x + this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
//   (this.y - this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
//   (this.x + this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
//   (this.y - this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY))) {
//     if (this.upDown < 0) {
//       this.upDown = 0;
//     }
//   }
//   // S plane intersect
//   if (((this.x - this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
//   (this.y + this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
//   (this.x - this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
//   (this.y + this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY)) ||
//   ((this.x + this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
//   (this.y + this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
//   (this.x + this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
//   (this.y + this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY))) {
//     if (this.upDown > 0) {
//       this.upDown = 0;
//     }
//   }
//   // W plane intersect
//   if (((this.x - this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
//   (this.y - this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
//   (this.x - this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
//   (this.y - this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY)) ||
//   ((this.x - this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
//   (this.y + this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
//   (this.x - this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
//   (this.y + this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY))) {
//     if (this.leftRight > 0) {
//       this.leftRight = 0;
//     }
//   }
//   // E plane intersect
//   if (((this.x + this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
//   (this.y - this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
//   (this.x + this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
//   (this.y - this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY)) ||
//   ((this.x + this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
//   (this.y + this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
//   (this.x + this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
//   (this.y + this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY))) {
//     if (this.leftRight < 0) {
//       this.leftRight = 0;
//     }
//   }
// }
