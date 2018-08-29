// business logic
var player1input = getRandomInt(0,4);
var player2input = getRandomInt(6,10);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// user logic
$(document).ready(function() {

  $('#play').click(function(event) {
    event.preventDefault();
    $('#selection').fadeIn();
    for (i = 0; i < heroes.length; i++) {
      $("#hero" + i + " h4").text(heroes[i][0]);
      $('#hero' + i).prepend("<img src='" + heroSprites[i].image + "'>");
    };
    $('#play').hide();
  });

  $('.left').click(function() {
    $(this).parents().find('.left').removeClass('selected');
    $(this).addClass('selected');
    player1input = $(this).attr('value');
  });

  $('.right').click(function() {
    $(this).parents().find('.right').removeClass('selected');
    $(this).addClass('selected');
    player2input = $(this).attr('value');
  });

  $('#start').click(function(event) {
    event.preventDefault();
    $('#selection').hide();
    $('#gamePlay').fadeIn();
    console.log("works");
    startGame();
  });


  $('#reset').click(function() {
    $('#reset').blur();
    document.location.reload();
    // gameReset();
  });
});
