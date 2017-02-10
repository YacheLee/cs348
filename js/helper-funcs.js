function alertSuccess(message){
  var html = `
  <div class="alert alert-success alert-dismissible" role="alert">
    ` + message + `
  </div>`;
  $('#alert-area').append(html);
  $('#alert-area').children().fadeOut(2000, function() {
    $('#alert-area').empty();
  });
}

function incQuantity(index) {
  var val = Number($("#quantity" + index).val());
  $("#quantity" + index).val(val + 1);
  $('#dec' + index).removeClass('disabled');
  console.log(val, val + 1);
}

function decQuantity(index) {
  var val = Number($("#quantity" + index).val());
  if (val - 1 == 0) {
    $('#dec' + index).addClass('disabled');
  }
  if (val > 0) {
    $("#quantity" + index).val(val - 1);

  }
}

function changeQuantity(id, elem) {
  changeProductQuantity(id, elem);
  if (elem == 0) {
    removeProductFromBasket(id);
    displayBasketView()
  } else {
    alertSuccess("Updated Basket!");
    //$('#basket-row-' + id).addClass('update-success').addClass('success');
  }
  displayPrices();
}

function removeProduct(id, elem) {
  removeProductFromBasket(id);
  displayBasketView();
  displayPrices();
  alertSuccess();
}

function resetQuantity(product) {
  $('#quantity' + product).val(0);
  $('#dec' + product).addClass('disabled');
}

function sortObject(o) {
    var sorted = {},
    key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}


$(document).ready(function() {

  $(".quantity-box").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

});
