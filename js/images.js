//Character Sprites array
var heroSprites = [];

function Sprite(neutral, moveLeft, moveRight, attack, block, special, range, jump, hit, portrait, image, windup, windup2, special2, range2,) {
  this.neutral = neutral;
  this.moveLeft = moveLeft;
  this.moveRight = moveRight;
  this.attack = attack;
  this.block = block;
  this.windup = windup;
  this.special = special;
  this.range = range;
  this.windup2 = windup2;
  this.special2 = special2;
  this.range2 = range2;
  this.jump = jump;
  this.hit = hit;
  this.portrait = portrait;
  this.image = image;
  heroSprites.push(this);
}

function preload() {
  backdrop = loadImage('https://vignette.wikia.nocookie.net/avengersalliance/images/8/89/Combat_Background_048.jpg/revision/latest?cb=20130904191456&format=original');
  //backdrop = loadImage('https://vignette.wikia.nocookie.net/avengersalliance/images/8/89/Combat_Background_048.jpg/revision/latest?cb=20130904191456&format=original');

  //LEFT SIDE CHARACTERS
  //Iron Man [0]
  new Sprite(loadImage('https://i.imgur.com/AqQ7brV.png'),
  loadImage('https://i.imgur.com/CDOysU0.png'),
  loadImage('https://i.imgur.com/qBIkAz2.png'),
  //attack, block
  loadImage('https://i.imgur.com/uZm54mX.png'),
  loadImage('https://i.imgur.com/U8EW5re.png'),
  //special 1
  loadImage('https://i.imgur.com/j7UjIdP.png'),
  loadImage('https://i.imgur.com/C6VfCFx.png'),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/HuRSzhv.png'),
  loadImage('https://i.imgur.com/HEPQIFh.png'),
  loadImage('https://i.imgur.com/HWV6qsZ.png?2'),
  'https://i.imgur.com/HWV6qsZ.png?2',
  //windup & special 2
  loadImage('https://i.imgur.com/x7nKxOn.png'),
  loadImage('https://i.imgur.com/mJ3639G.png'),
  loadImage('https://i.imgur.com/ZjK7ToZ.png'),
  loadImage('https://i.imgur.com/Ecb5wQJ.png'));

  //Hulk [1]
  new Sprite(loadImage('https://i.imgur.com/daAdlYF.png'),
  loadImage('https://i.imgur.com/SqsSfVR.png'),
  loadImage('https://i.imgur.com/9Tm3SZb.png'),
  //attack, block
  loadImage('https://i.imgur.com/nc61aYu.png'),
  loadImage('https://i.imgur.com/3o0afq3.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/jcarFX3.png'),
  loadImage('https://i.imgur.com/sXXs4Kv.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/VeYEz0V.png'),
  loadImage('https://i.imgur.com/SNqc7Xs.png'),
  loadImage('https://i.imgur.com/qWonHLw.png'),
  'https://i.imgur.com/qWonHLw.png');

  //Black Widow [2]
  new Sprite(loadImage('https://i.imgur.com/ggZosIJ.png'),
  loadImage('https://i.imgur.com/5hGjnRK.png'),
  loadImage('https://i.imgur.com/gup2pJh.png'),
  //attack, block
  loadImage('https://i.imgur.com/3RJZ2ms.png'),
  loadImage('https://i.imgur.com/xKu87V7.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/EQ0Mrvi.png'),
  loadImage('https://i.imgur.com/5UOHZWl.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/elJT77X.png'),
  loadImage('https://i.imgur.com/Va4iWk7.png'),
  loadImage('https://i.imgur.com/kXy83AW.png'),
  'https://i.imgur.com/kXy83AW.png');

  //Spider-Man [3]
  new Sprite(loadImage('https://i.imgur.com/xPeTmA2.png'),
  loadImage('https://i.imgur.com/2d9sfhc.png'),
  loadImage('https://i.imgur.com/BPBpd1m.png'),
  //attack, block
  loadImage('https://i.imgur.com/qrbtVQu.png'),
  loadImage('https://i.imgur.com/dpU4Yck.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/py0s9O9.png'),
  loadImage('https://i.imgur.com/VyjH2Nx.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/083hU7i.png'),
  loadImage('https://i.imgur.com/X7kk4SI.png'),
  loadImage('https://i.imgur.com/o7Ilh6J.png'),
  'https://i.imgur.com/o7Ilh6J.png');

  //Doctor Strange [4]
  new Sprite(loadImage('https://i.imgur.com/XVsyj5k.png'),
  loadImage('https://i.imgur.com/qO8tHLR.png'),
  loadImage('https://i.imgur.com/9P2hlWN.png'),
  //attack, block
  loadImage('https://i.imgur.com/OY3aT8A.png'),
  loadImage('https://i.imgur.com/ZgHa8aY.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/GcVZq15.png'),
  loadImage('https://i.imgur.com/d8O3Lhn.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/jBwDFaA.png'),
  loadImage('https://i.imgur.com/DaNLPPb.png'),
  loadImage('https://i.imgur.com/nJkB9Sf.png'),
  'https://i.imgur.com/nJkB9Sf.png');

  //Captain Marvel [5]
  new Sprite(loadImage('https://i.imgur.com/nWwDBWj.png'),
  loadImage('https://i.imgur.com/Fvbtufx.png'),
  loadImage('https://i.imgur.com/Ii4frpq.png'),
  //attack, block
  loadImage('https://i.imgur.com/uVUmekK.png'),
  loadImage('https://i.imgur.com/CmHdxDX.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/H7ZrudW.png'),
  loadImage('https://i.imgur.com/ZzjfJ5Z.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/0NKJFXv.png'),
  loadImage('https://i.imgur.com/29PEptG.png'),
  loadImage('https://i.imgur.com/CYIOaM2.png?2'),
  'https://i.imgur.com/CYIOaM2.png?2');

  //RIGHT SIDE CHARACTERS
  //Captain America [6]
  new Sprite(loadImage('https://i.imgur.com/mk1C150.png'),
  loadImage('https://i.imgur.com/Vn9P79a.png'),
  loadImage('https://i.imgur.com/4bPxzDl.png'),
  //attack, block
  loadImage('https://i.imgur.com/ZhNlTU1.png'),
  loadImage('https://i.imgur.com/0efMinz.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/SSmuGRh.png'),
  loadImage('https://i.imgur.com/N9misJ7.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/GcDh8x1.png'),
  loadImage('https://i.imgur.com/dBEpsGu.png'),
  loadImage('https://i.imgur.com/zkS7aCv.png'),
  'https://i.imgur.com/zkS7aCv.png');

  //Thor [7]
  new Sprite(loadImage('https://i.imgur.com/xGSZDhF.png'),
  loadImage('https://i.imgur.com/Fc1gG3O.png'),
  loadImage('https://i.imgur.com/XKC5Xan.png'),
  //attack, block
  loadImage('https://i.imgur.com/VGmDlkr.png'),
  loadImage('https://i.imgur.com/x34SXto.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/4LBlDdv.png'),
  loadImage('https://i.imgur.com/exa7stF.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/carE2jd.png'),
  loadImage('https://i.imgur.com/2bpJBvZ.png'),
  loadImage('https://i.imgur.com/YAPM8qm.png'),
  'https://i.imgur.com/YAPM8qm.png');

  //Scarlet Witch [8]
  new Sprite(loadImage('https://i.imgur.com/HiTHeQu.png'),
  loadImage('https://i.imgur.com/AawiMDG.png'),
  loadImage('https://i.imgur.com/0SX5vmO.png'),
  //attack, block
  loadImage('https://i.imgur.com/C5zhftO.png'),
  loadImage('https://i.imgur.com/1Qp0jSR.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/0MKU90M.png'),
  loadImage('https://i.imgur.com/9KgajYU.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/ncmjw0Q.png'),
  loadImage('https://i.imgur.com/xOVgnBL.png'),
  loadImage('https://i.imgur.com/dNzHdyi.png'),
  'https://i.imgur.com/dNzHdyi.png');

  //Black Panther [9]
  new Sprite(loadImage('https://i.imgur.com/o767PH1.png'),
  loadImage('https://i.imgur.com/i9mrsaK.png'),
  loadImage('https://i.imgur.com/auwbkzp.png'),
  //attack, block
  loadImage('https://i.imgur.com/PJXOzM3.png'),
  loadImage('https://i.imgur.com/QaFniCx.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/tSjlPDw.png'),
  loadImage('https://i.imgur.com/Urkk0KX.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/uucBc9b.png'),
  loadImage('https://i.imgur.com/2KJ0J4w.png'),
  loadImage('https://i.imgur.com/6NPDBHk.png'),
  'https://i.imgur.com/6NPDBHk.png');

  //Vision [10]
  new Sprite(loadImage('https://i.imgur.com/IvkzMlh.png'),
  loadImage('https://i.imgur.com/VwYBwcg.png'),
  loadImage('https://i.imgur.com/jyKPAxP.png'),
  //attack, block
  loadImage('https://i.imgur.com/1IyzvS0.png'),
  loadImage('https://i.imgur.com/wjrvusO.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/tNkLgUx.png'),
  loadImage('https://i.imgur.com/Nnmjti3.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/XqwuWct.png'),
  loadImage('https://i.imgur.com/N64m8MF.png'),
  loadImage('https://i.imgur.com/uhG59VO.png'),
  'https://i.imgur.com/uhG59VO.png');

  //Ant-Man [11]
  new Sprite(loadImage('https://i.imgur.com/MuXSuX0.png'),
  loadImage('https://i.imgur.com/mZGpdgd.png'),
  loadImage('https://i.imgur.com/3YNxv8G.png'),
  //attack, block
  loadImage('https://i.imgur.com/fZm2Ech.png'),
  loadImage('https://i.imgur.com/gDIasyt.png'),
  //special 1
  // loadImage(''),
  loadImage('https://i.imgur.com/dYH3B2C.png'),
  loadImage('https://i.imgur.com/Lm4n0sn.png'),
  //special 2
  // loadImage(''),
  // loadImage(''),
  // loadImage(''),
  //jump, hit, portrait
  loadImage('https://i.imgur.com/oyARtha.png'),
  loadImage('https://i.imgur.com/k2ZXIsQ.png'),
  loadImage('https://i.imgur.com/uCk3Tne.png'),
  'https://i.imgur.com/uCk3Tne.png');
}
