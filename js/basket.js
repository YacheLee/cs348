$(document).ready(function() {
    var contentHeight = $('.center-basket-title').height()
    var docHeight = $('.basket-header').height();
    var vert = docHeight / 2 - contentHeight / 2;
    $('.center-basket-title').css('padding-top', vert);
});


function displayPrices() {
  var totals = calculateTotals();
  var html = `<table class='table'>
      <tr>
        <td>Subtotal</td>
        <td style="text-align:center;">£` + totals['totalnovat']+ `</td>
      </tr>
      <tr>
        <td>VAT</td>
        <td style="text-align:center;">£` + totals['vat'] + `</td>
      </tr>
      <tr class="success">
        <td>Total</td>
        <td style="text-align:center;">£` + totals['total'] + `</td>
      </tr>
    </table>`;
  $("#prices").empty();
  $('#prices').append(html);
}

function displayBasketView() {
  var productDetails = getProductDetails();
  var basket = readBasket();
  var html = `<table class='table table-hover' id='product-list'>
    <tr>
      <th>Product</th>
      <th>Units</th>
      <th>Price</th>
      <th>Quantity</th>
      <th></th>
    </tr>`;
  var count = 0;
  for (var product in productDetails) {
    if (basket[product] > 0) {
      html += getBasketTableRow(productDetails[product], product, basket);
      count += 1;
    }
  }
  html += '</table>';
  if (count == 0) {
    html = `<div class="jumbotron">
      <h1>Your basket is empty!</h1>
    </div>`;
  }
  $('#basket-list').empty();
  $('#basket-list').append(html);
}

function getBasketTableRow(product, index, basket) {
  var html = "<tr id='basket-row-" + index + "'>";
  html += '<td><img class="image img-rounded" src="img/' + product["image"] + ' "> ' + product["name"] + '</td>';
  html += '<td>' + product["units"] + '</td>';
  html += '<td>£' + product["price"] + '</td>';
  html += `<td style="width:130px">
    <div class="input-group" >
      <span class="input-group-btn">
        <button id="dec` + index + `" class="btn btn-default" type="button" onclick="javascript:decQuantity('` + index + `')" >-</button>
      </span>
      <input class="form-control quantity-box" name="` + index + `" id="quantity` + index + `" type="text" value="` + basket[index] + `" style="width: 50px; text-align:center" />
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" onclick="javascript:incQuantity('` + index + `')">+</button>
      </span>
    </div>
    </td>`;
  html += `<td>
    <div class="btn-group" role="group" aria-label="...">
      <button type="button" class="btn btn-default" name="change`+ index + `" onclick="javascript:changeQuantity(\'` + index + `\', document.getElementById(\'quantity`+ index + `\').value)">Update</button>
      <button type="button" class="btn-default btn" name="remove`+ index + `" onclick="javascript:removeProduct(\'` + index + `\', document.getElementById(\'quantity`+ index + `\').value)">Remove</button>
    </td>`;
  html += '</tr>';
  return html;
}
