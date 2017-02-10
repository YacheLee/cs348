$(document).ready(function() {
  var contentHeight = $('.center-shop-title').height()
  var docHeight = $('.shop-header').height();
  var vert = docHeight / 2 - contentHeight / 2;
  $('.center-shop-title').css('padding-top', vert);
})
