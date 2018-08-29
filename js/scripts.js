// business logic
// user logic
$(document).ready(function() {

  $('#play').click(function(event) {
    event.preventDefault();
    for (i = 0; i < heroes.length; i++) {
      $("#hero" + i + " h4").text(heroes[i][0]);
      $('#hero' + i).prepend("<img src='" + heroSprites[i].image + "'>");
    };
  });

  $('#reset').click(function() {
    $('#reset').blur();
    // gameReset();
  });
});
