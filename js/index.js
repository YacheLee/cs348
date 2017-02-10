$(document).ready(function() {
  var contentHeight = $('.content').height()
  var docHeight = $(window).height();
  var vert = docHeight / 2 - contentHeight / 2;
  $('.content').css('margin-top', vert);
})
