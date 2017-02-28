var displayGrid = true;
var productDetails

function setDisplayGrid(bool) {
  displayGrid = bool;
  if (displayGrid) {
    $('#toggle-grid-button').addClass('active');
    $('#toggle-list-button').removeClass('active');
  } else {
    $('#toggle-list-button').addClass('active');
    $('#toggle-grid-button').removeClass('active');
  }
  displayProductList();
}

function displayProductList() {
  $('#product-list').empty();
  console.log(productDetails);
  if (displayGrid === false) {
    displayAsTable();
    console.log(displayGrid);
  }
  if (displayGrid === true) {
    console.log(displayGrid);
    displayAsGrid();
  }
}

function displayAsTable() {
  var html = `<table class='table table-hover' id='product-list'>
    <tr>
      <th></th>
      <th>Product</th>
      <th>Description</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Amount</th>
      <th></th>
    </tr>`;
  for (var product in productDetails) {
    html += getProductTableRow(productDetails[product], product);
  }
  html += '</table>'
  $('#product-list').append(html);
}


function displayAsGrid() {
  var html = "<div class='row'>";

  console.log(productDetails);
  for (var product in productDetails) {
    html += getGridProduct(productDetails[product], product);
  }

  html += '</div>';
  $('#product-list').append(html);
}

function displayBasketMiniView() {
  console.log("redisplaybasket");
  var productDetailsMini = getProductDetails();
  var basket = readBasket();
  var html = `<table class="table " >
    <tr>
      <th>Product</th>
      <th style="text-align:center;">Total Price</th>
    </th>`;
  for (var product in productDetailsMini) {
    if (basket[product] > 0) {
      html += getMiniBasketRow(productDetailsMini[product], basket[product]);
    }
  }
  html += "</table>";
  console.log(html);
  $('#basket-product-list').empty();
  $('#basket-product-list').append(html);

  $('#basket-mini-total').empty();
  $('#basket-mini-total').append('£' + calculateTotals()['total']);
}

function getGridProduct(product, index) {

  var html = `<div class="col-sm-6 col-md-4">
    <div class="thumbnail product-grid-item">
      <div class="img img-rounded" style="background-image: url('img/` + product['image'] + `')">
        <div class="content">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            <p>Quick Add</p>
        </div>
      </div>
      <div class="caption">
        <h2>` + product['name'] + `</h2>
        <h4><span class="small">Quantity</span> ` + product['units'] + `</h4>
        <h4><span class="small">Price</span> £` + product['price'] + `</h4>
        <div class='row'>
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-btn">
                <button id="dec` + index + `" class="btn btn-success disabled" type="button" onclick="javascript:decQuantity('` + index + `')" >-</button>
              </span>
              <input class="form-control quantity-box" name="` + index + `" id="quantity` + index + `" type="number" value="0" style="text-align:center;" />
              <span class="input-group-btn">
                <button class="btn btn-success" type="button" onclick="javascript:incQuantity('` + index + `')">+</button>
              </span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="pull-right">
              <button class="btn btn-success" type="button" onclick="javascript:addToBasket(\'` + index + `', document.getElementById('quantity` + index + `').value)" >Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  return html;
}


function getProductTableRow(product, index) {
  var html = "<tr>";
  html += '<td><img class="img-rounded image" src="img/' + product['image'] + '"/></td>';
  html += '<td>' + product["name"] + '</td>';
  html += '<td>' + product["description"] + '</td>';
  html += '<td>' + product['units'] + '</td>';
  html += '<td>£' + product['price'] + '</td>';
  html += `<td style="width:130px;">
      <div class="input-group">
        <span class="input-group-btn">
          <button id="dec` + index + `" class="btn btn-success disabled" type="button" onclick="javascript:decQuantity('` + index + `')" >-</button>
        </span>
        <input class="form-control quantity-box" name="` + index + `" id="quantity` + index + `" type="number" value="0" style="text-align:center;" />
        <span class="input-group-btn">
          <button class="btn btn-success" type="button" onclick="javascript:incQuantity('` + index + `')">+</button>
        </span>
      </div>
    </td>`;
  html += '<td><button class="btn btn-success" type="button" onclick="javascript:addToBasket(\'' + index + '\', document.getElementById(\'quantity' + index + '\').value)" >Add</button></td>';
  html += '</tr>';
  return html;
}

function getMiniBasketRow(product, quantity) {
  var html = "<tr>";
  var price = quantity * product['price'];
  html += '<td>' + product["name"] + '</td>';
  html += '<td style="text-align:center;">£' + price + '</td>';
  html += '</tr>';
  return html;
}

function bootstrap() {
  displayProductList();
  displayBasketMiniView();
}

original = 0;

$(document).ready(function(){
  original = $('.basket-view-mini-container ').offset().top;
  productDetails = sortObject(getProductDetails());
  bootstrap()
  $(window).scroll(function(){
    if (original - $(window).scrollTop() < 200) {
      height = $('.basket-view-mini-container').height() / 2;
      console.log(height);
      toMove = $(window).scrollTop() - height ;
      $('.basket-view-mini-container ').css("margin-top", toMove);
    } else {
      $('.basket-view-mini-container ').css("margin-top", 0);
    }

  });

  $('#search-bar-input').keyup(function() {
    var allProductDetails = sortObject(getProductDetails());
    var query = $('#search-bar-input').val();
    var productList = {};
    for (product in allProductDetails) {
      if (allProductDetails[product]['name'].toLowerCase().indexOf(query.toLowerCase()) == 0) {
        productList[product] = allProductDetails[product];
      }
    }
    productDetails = productList;
    displayProductList();

  });

  var contentHeight = $('.center-shop-title').height()
  var docHeight = $('.shop-header').height();
  var vert = docHeight / 2 - contentHeight / 2;
  $('.center-shop-title').css('padding-top', vert);

  $('#search-bar-input').keypress(function(event) {
     if (event.which == 13) {
         event.preventDefault();
     }
  });
})
