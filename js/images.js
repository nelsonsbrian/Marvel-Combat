var backdrop;


//Character Sprites array
var heroSprites = [];

function Sprites(neutral, attack, block, special, range, jump, hit, portrait) {
  this.neutral = neutral;
  this.attack = attack;
  this.block = block;
  this.special = special;
  this.range = range;
  this.jump = jump;
  this.hit = hit;
  this.portrait = portrait;
  heroSprites.push(this);
}

function preload() {
  backdrop = loadImage('https://vignette.wikia.nocookie.net/avengersalliance/images/8/89/Combat_Background_048.jpg/revision/latest?cb=20130904191456&format=original');

  //LEFT SIDE CHARACTERS
  //Iron Man [0]
  new Sprites(loadImage('https://i.imgur.com/AqQ7brV.png'),
  loadImage('https://i.imgur.com/uZm54mX.png'),
  loadImage('https://i.imgur.com/U8EW5re.png'),
  loadImage('https://i.imgur.com/j7UjIdP.png'),
  loadImage('https://i.imgur.com/C6VfCFx.png'),
  loadImage('https://i.imgur.com/HuRSzhv.png'),
  loadImage('https://i.imgur.com/HEPQIFh.png'),
  loadImage('https://i.imgur.com/HWV6qsZ.png'));

  //Hulk [1]
  new Sprites(loadImage('https://i.imgur.com/daAdlYF.png'),
  loadImage('https://i.imgur.com/nc61aYu.png'),
  loadImage('https://i.imgur.com/3o0afq3.png'),
  loadImage('https://i.imgur.com/jcarFX3.png'),
  loadImage('https://i.imgur.com/sXXs4Kv.png'),
  loadImage('https://i.imgur.com/VeYEz0V.png'),
  loadImage('https://i.imgur.com/SNqc7Xs.png'),
  loadImage('https://i.imgur.com/qWonHLw.png'));

  //Black Widow [2]
  new Sprites(loadImage('https://i.imgur.com/ggZosIJ.png'),
  loadImage('https://i.imgur.com/3RJZ2ms.png'),
  loadImage('https://i.imgur.com/xKu87V7.png'),
  loadImage('https://i.imgur.com/EQ0Mrvi.png'),
  loadImage('https://i.imgur.com/5UOHZWl.png'),
  loadImage('https://i.imgur.com/elJT77X.png'),
  loadImage('https://i.imgur.com/Va4iWk7.png'),
  loadImage('https://i.imgur.com/kXy83AW.png'));

  //RIGHT SIDE CHARACTERS
  //Captain America [3]
  new Sprites(loadImage('https://i.imgur.com/mk1C150.png'),
  loadImage('https://i.imgur.com/ZhNlTU1.png'),
  loadImage('https://i.imgur.com/0efMinz.png'),
  loadImage('https://i.imgur.com/SSmuGRh.png'),
  loadImage('https://i.imgur.com/N9misJ7.png'),
  loadImage('https://i.imgur.com/GcDh8x1.png'),
  loadImage('https://i.imgur.com/dBEpsGu.png'),
  loadImage('https://i.imgur.com/zkS7aCv.png'));

  //Thor [4]
  new Sprites(loadImage('https://i.imgur.com/xGSZDhF.png'),
  loadImage('https://i.imgur.com/VGmDlkr.png'),
  loadImage('https://i.imgur.com/x34SXto.png'),
  loadImage('https://i.imgur.com/4LBlDdv.png'),
  loadImage('https://i.imgur.com/6PLFZq2.png'),
  loadImage('https://i.imgur.com/carE2jd.png'),
  loadImage('https://i.imgur.com/2bpJBvZ.png'),
  loadImage('https://i.imgur.com/YAPM8qm.png'));

  //Scarlet Witch [5]
  new Sprites(loadImage('https://i.imgur.com/HiTHeQu.png'),
  loadImage('https://i.imgur.com/C5zhftO.png'),
  loadImage('https://i.imgur.com/1Qp0jSR.png'),
  loadImage('https://i.imgur.com/0MKU90M.png'),
  loadImage('https://i.imgur.com/9KgajYU.png'),
  loadImage('https://i.imgur.com/ncmjw0Q.png'),
  loadImage('https://i.imgur.com/qMAyPU0.png'),
  loadImage('https://i.imgur.com/dNzHdyi.png'));
}
