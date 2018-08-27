function Laser(x, y, offset, size) {
  this.w = 15;
  this.offset = (offset / 2) ;
  this.l = 33 ;
  this.x = x + this.offset;
  this.y = y - 15 / 2;
  this.speed = 6;
  this.toDel = false;
  this.damage = 6;
  this.size = size;
  this.spread = 45;

  this.show = function() {
    if (this.size === "regular") {
      fill(0,255,255);
      rect(this.x, this.y, this.l, this.w, 5);
    }
    if (this.size === "mini0") {
      // this.y += this.spread;
      fill(255,255,0);
      rect(this.x, this.y, this.l/2, this.w, 5);
    } else if (this.size === "mini1") {
      fill(255,255,0);
      rect(this.x, this.y, this.l/2, this.w, 5);
    } else if (this.size === "mini2") {
      // this.y -= this.spread;
      fill(255,255,0);
      rect(this.x, this.y, this.l/2, this.w, 5);
    }
  }


  this.mini = function() {
    this.damage = Math.ceil(random(this.damage - this.damage / 2, this.damage + this.damage / 2));
    if (this.size === "mini0") {
      this.y += this.spread;
    } else if (this.size === "mini1") {
      this.x += this.spread / 2;
    } else if (this.size === "mini2") {
      this.y -= this.spread;
    }
  }

  this.shoot = function() {
    if (this.size === "regular") {
      this.x += this.speed;
    }
    if (this.size === "mini0" || this.size === "mini1" || this.size === "mini2") {
      this.x += this.speed - this.speed / 3;
    }
  }

  this.edges = function() {
    return (this.x > width);
    }

  this.collides = function(x, y, hitBoxX, hitBoxY) {
    if (x - hitBoxX > this.x && x - hitBoxX < this.x + this.l && y + hitBoxY > this.y && y - hitBoxY < this.y + this.w) {
      this.toDel = true;
      return true;
    }

  }
 //
}

//
// fill(255);
// stroke(120);
// var beg = 0;
// var a = 0.0;
// var inc = TWO_PI / 25.0;
// strokeWeight(19);
// // for (var i = 0; i < 125; i++) {
//   line(beg * 4, 450, beg * 4, 450 + sin(a) * 20.0);
//   beg++;
//   a = a + inc;
// // }
