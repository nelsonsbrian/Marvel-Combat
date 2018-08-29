var backdrop;

//Left Side Characters
var ironManSprite;
var hulkSprite;
var blackWidowSprite;

//Right Side Characters
var captainAmericaSprite;
var thorSprite;
var scarletWitchSprite;

//Character Sprites array
var heroSprites = [];

function Sprites(neutral, attack, block, special, range) {
  this.neutral = neutral;
  this.attack = attack;
  this.block = block;
  this.special = special;
  this.range = range;
  heroSprites.push(this);
}

function preload() {
  backdrop = loadImage('https://vignette.wikia.nocookie.net/avengersalliance/images/8/89/Combat_Background_048.jpg/revision/latest?cb=20130904191456&format=original');

  ironManSprite = new Sprites(loadImage('https://i.imgur.com/AqQ7brV.png'),
  loadImage('https://i.imgur.com/uZm54mX.png'),
  loadImage('https://i.imgur.com/U8EW5re.png'),
  loadImage('https://i.imgur.com/j7UjIdP.png'),
  loadImage('https://i.imgur.com/C6VfCFx.png'));

  hulkSprite = new Sprites(loadImage('https://i.imgur.com/daAdlYF.png'),
  loadImage('https://i.imgur.com/Eg7ORuy.png'),
  loadImage('https://i.imgur.com/3o0afq3.png'),
  loadImage('https://i.imgur.com/jcarFX3.png'),
  loadImage('https://i.imgur.com/sXXs4Kv.png'));

  blackWidowSprite = new Sprites(loadImage('https://i.imgur.com/ggZosIJ.png'),
  loadImage('https://i.imgur.com/3RJZ2ms.png'),
  loadImage('https://i.imgur.com/xKu87V7.png'),
  loadImage('https://i.imgur.com/EQ0Mrvi.png'),
  loadImage('https://i.imgur.com/5UOHZWl.png'));

  captainAmericaSprite = new Sprites(loadImage('https://i.imgur.com/mk1C150.png'),
  loadImage('https://i.imgur.com/ZhNlTU1.png'),
  loadImage('https://i.imgur.com/0efMinz.png'),
  loadImage('https://i.imgur.com/SSmuGRh.png'),
  loadImage('https://i.imgur.com/N9misJ7.png'));

  thorSprite = new Sprites(loadImage('https://i.imgur.com/Dd7gsqn.png'),
  loadImage('https://i.imgur.com/VGmDlkr.png'),
  loadImage('https://i.imgur.com/x34SXto.png'),
  loadImage('https://i.imgur.com/4LBlDdv.png'),
  loadImage('https://i.imgur.com/6PLFZq2.png'));

  scarletWitchSprite = new Sprites(loadImage('https://i.imgur.com/HiTHeQu.png'),
  loadImage('https://i.imgur.com/U7md2BW.png'),
  loadImage('https://i.imgur.com/sifLeDp.png'),
  loadImage('https://i.imgur.com/zrHOnVN.png'), )
}
