var page = 0;

function nextPage(){
  page += 1;
  setPage();
}

function backPage() {
  page -= 1;
  setPage();
}

function finish() {
  setName();
  setAddress();
  setCardDetails();
  window.open('invoice.html');
  self.close();
}

function hideAll() {
  $('#collection-1').hide();
  $('#collection-2').hide();
  $('#collection-3').hide();
  $('#collection-4').hide();
  $('#finished').hide();
  $('#c0').removeClass('circle-filled');
  $('#c1').removeClass('circle-filled');
  $('#c2').removeClass('circle-filled');
  $('#c3').removeClass('circle-filled');
}

function setPage() {
  hideAll();
  if (page == 0) {
    $('#collection-1').show();
    $('#back').hide();
  } else if (page == 1) {
    $('#collection-2').show();
    $('#back').show();
    $('#next').show();
  } else if (page == 2) {
    $('#collection-3').show();
    $('#back').show();
    $('#next').show();
  } else {
    $('#collection-4').show();
    $('#next').hide();
    $('#finished').show();
  }
  $('#c'+page).addClass('circle-filled');
}

$(document).ready(function(){
  var contentHeight = $('.center-order-title').height()
  var docHeight = $('.order-header').height();
  var vert = docHeight / 2 - contentHeight / 2;
  $('.center-order-title').css('padding-top', vert);

  hideAll()
  $('#collection-1').show();
  $('#next').show();
  $('#back').hide();
  $('#finished').hide();
  $('#c0').addClass('circle-filled');
});
