var backdrop;
var captainAmericaNeutral;
var ironManSprite;
var captainAmericaSprite;

function Sprites(neutral, attack, block, special, range) {
  this.neutral = neutral;
  this.attack = attack;
  this.block = block;
  this.special = special;
  this.range = range;
}

function preload() {
  backdrop = loadImage('https://vignette.wikia.nocookie.net/avengersalliance/images/8/89/Combat_Background_048.jpg/revision/latest?cb=20130904191456&format=original');

  ironManSprite = new Sprites(loadImage('https://i.imgur.com/AqQ7brV.png'), loadImage('https://i.imgur.com/uZm54mX.png'), loadImage('https://i.imgur.com/U8EW5re.png'), loadImage('https://i.imgur.com/j7UjIdP.png'), loadImage('https://i.imgur.com/C6VfCFx.png'));

  captainAmericaSprite = new Sprites(loadImage('https://i.imgur.com/mk1C150.png'), loadImage('https://i.imgur.com/ZhNlTU1.png'), loadImage('https://i.imgur.com/0efMinz.png'), loadImage('https://i.imgur.com/SSmuGRh.png'), loadImage('https://i.imgur.com/N9misJ7.png'))
}
