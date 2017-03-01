

$(document).ready(function(){
  var contentHeight = $('.center-invoice-title').height()
  var docHeight = $('.invoice-header').height();
  var vert = docHeight / 2 - contentHeight / 2;
  $('.center-invoice-title').css('padding-top', vert);

});


function displayDetails() {
  clientName = getName();
  address = getAddress();
  var html = `<div class='row'>
    <div class='col-md-8 col-md-offset-2'>
    `
  html += '<h5><strong>Name</strong></h5>' + clientName['title'] + ' ' + clientName['firstname'] + ' ' + clientName['surname'];
  html += '<h5><strong>Address</strong></h5>';
  html += address['number'] + ' ' + address['street'] + '<br>';
  html += address['city'] + ' ' + address['postcode'] + '<br>';
  html += address['country'] + '<br>';
  html += '</div></div>';
  $('.details-area').append(html);

}

function displayProducts() {
  var productDetails = getProductDetails();
  var basket = readBasket();
  var html = `<div class='row'><div class='col-md-8 col-md-offset-2' >
    <table class='table'>`;
  var count = 0;

  totals = calculateTotals();
  for (var product in productDetails) {
    if (basket[product] > 0) {
      html += displayProduct(productDetails[product], product, basket);
      count += 1;
    }
  }
  html += '</table>';

  html += `
      <div class='col-md-8'>
      </div>
      <div class='col-md-4'>
        <hr>
        <div style='text-align:right'>
          <span ><strong>£` +
            totals['total'] +
          `</strong></span>
        </div>
      </div>
    </div>
  </div>
  `;
  $('.product-area').append(html);
}

function displayProduct(product, index, basket) {
  var html = "<tr id='basket-row-" + index + "'>";
  html += `<td><strong>` + product['name'] + '</strong></td>';
  html += '<td>£' + product["price"] + '</td>';
  html += '<td>' + basket[index] + '</td>';
  html += '<td style="text-align:right;">£' + basket[index] * product['price'] + '</td>';
  html += `</tr>`;

  return html;
}

function render() {
  displayProducts();
  displayDetails();
}

function newShop(){
  window.open('index.html');
  window.close();
}
