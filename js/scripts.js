// business logic
var player1input = getRandomInt(0,6);
var player2input = getRandomInt(6,12);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// user logic
$(document).ready(function() {
  $("body").append('<audio id="myAudio" controls>    <source src="../sound/background.mp3" type="audio/mpeg">    Your browser does not support the audio element.  </audio>');
  $("#myAudio").hide();
  //What happens when "play" button is clicked
  $('#play').click(function(event) {
    event.preventDefault();
    $('#selection').fadeIn();
    for (i = 0; i < heroes.length; i++) {
      $("#hero" + i + " h4").text(heroes[i][0]);
      $('#hero' + i).prepend("<img src='" + heroSprites[i].image + "'>");
    };
    $('#play').hide();
  });
  //Turns player 1 character divs into radio buttons
  $('.left').click(function() {
    $(this).parents().find('.left').removeClass('selected');
    $(this).addClass('selected');
    player1input = $(this).attr('value');
  });
  //Turns player 2 character divs into radio buttons
  $('.right').click(function() {
    $(this).parents().find('.right').removeClass('selected');
    $(this).addClass('selected');
    player2input = $(this).attr('value');
  });
  //Starts the game with selected characters
  $('#start').click(function(event) {
    event.preventDefault();
    $("#myAudio").trigger('play');
    $('#selection').hide();
    $('#gamePlay').fadeIn();
    startGame();
  });
  //Refreshes the page
  $('#reset').click(function() {
    $('#reset').blur();
    document.location.reload();
    // gameReset();
  });
  //Send back to first page from bio page
  // $('#return').click(function() {
  //   window.location.href='index.html';
  // });
});
