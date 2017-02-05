var displayGrid = true;

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
  if (displayGrid === false) {
    displayAsTable();
    console.log(displayGrid);
  }
  if (displayGrid === true) {
    console.log(displayGrid);
    displayAsGrid();
  }
}

function displayBasketView() {
  var productDetails = getProductDetails();
  var basket = readBasket();
  var html = `<table class='table table-hover' id='product-list'>
    <th>
      <td>Product</td>
      <td>units</td>
      <td>price</td>
      <td>quanity</td>
      <td>update</td>
    </th>`;
  for (var product in productDetails) {
    if (basket[product] > 0) {
      html += getBasketTableRow(productDetails[product], product, basket);
    }
  }
  html += '</table>'
  $('#basket-list').empty();
  $('#basket-list').append(html);
}

function displayAsTable() {
  var productDetails = getProductDetails();
  var html = `<table class='table table-hover' id='product-list'>
    <tr>
      <th></th>
      <th>Product</th>
      <th>Description</th>
      <th>units</th>
      <th>quantity</th>
      <th>add</th>
    </tr>`;
  for (var product in productDetails) {
    html += getProductTableRow(productDetails[product], product);
  }
  html += '</table>'
  $('#product-list').append(html);
}

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

function displayAsGrid() {
  var productDetails = getProductDetails();
  productDetails = productDetails;
  var html = "<div class='row'>";

  /*productDetails.sort(function(x, y) {
    return x['name'] < y['name'];
  });*/

  for (var product in productDetails) {
    html += getGridProduct(productDetails[product], product);
  }

  html += '</div>';
  $('#product-list').append(html);
}

function getGridProduct(product, index) {

  var html = `<div class="col-sm-6 col-md-4">
    <div class="thumbnail product-grid-item">
      <img class="img-rounded" src="img/placeholder.png" >
      <div class="caption">
        <h3>` + product['name'] + `
          <span class="small">` + product['units'] +`/£` + product['price'] + `</span>
        </h3>
        <p>` + product['description'] + `</p>
        <div class='row'>
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-btn">
                <button id="dec` + index + `" class="btn btn-default disabled" type="button" onclick="javascript:decQuantity('` + index + `')" >-</button>
              </span>
              <input class="form-control" name="` + index + `" id="quantity` + index + `" type="text" value="0" style="text-align:center;" />
              <span class="input-group-btn">
                <button class="btn btn-default" type="button" onclick="javascript:incQuantity('` + index + `')">+</button>
              </span>
            </div>
          </div>
          <div class="col-md-6">
            <button class="btn btn-default" type="button" onclick="javascript:addToBasket(\'` + index + `', document.getElementById('quantity` + index + `').value)" >Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  return html;
}

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

function displayBasketMiniView() {
  console.log("redisplaybasket");
  var productDetails = getProductDetails();
  var basket = readBasket();
  var html = `<table class="table table-striped" >
    <tr>
      <th>Product</th>
      <th>Quantity</th>
    </th>`;
  for (var product in productDetails) {
    if (basket[product] > 0) {
      html += getMiniBasketRow(productDetails[product], basket[product]);
    }
  }
  html += "</table>";
  console.log(html);
  $('#basket-product-list').empty();
  $('#basket-product-list').append(html);

  $('#basket-mini-total').empty();
  $('#basket-mini-total').append('£' + calculateTotals()['total']);
}

function getProductTableRow(product, index) {
  var html = "<tr>";
  html += '<td><img class="img-rounded image" src="img/placeholder.png"/></td>';
  html += '<td>' + product["name"] + '</td>';
  html += '<td>' + product["description"] + '</td>';
  html += '<td>' + product["units"] + '</td>';
  html += `<td style="width:130px;">
      <div class="input-group">
        <span class="input-group-btn">
          <button id="dec` + index + `" class="btn btn-default disabled" type="button" onclick="javascript:decQuantity('` + index + `')" >-</button>
        </span>
        <input class="form-control" name="` + index + `" id="quantity` + index + `" type="text" value="0" style="text-align:center;" />
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" onclick="javascript:incQuantity('` + index + `')">+</button>
        </span>
      </div>
    </td>`;
  html += '<td><button class="btn btn-default" type="button" onclick="javascript:addToBasket(\'' + index + '\', document.getElementById(\'quantity' + index + '\').value)" >Add</button></td>';
  html += '</tr>';
  return html;
}

function getBasketTableRow(product, index, basket) {
  var html = "<tr id='basket-row-" + index + "'>";
  html += '<td><img class="image img-rounded" src="img/' + product["image"] + ' "/></td>';
  html += '<td>' + product["name"] + '</td>';
  html += '<td>' + product["units"] + '</td>';
  html += '<td>£' + product["price"] + '</td>';
  html += `<td style="width:130px">
    <div class="input-group" >
      <span class="input-group-btn">
        <button id="dec` + index + `" class="btn btn-default" type="button" onclick="javascript:decQuantity('` + index + `')" >-</button>
      </span>
      <input class="form-control" name="` + index + `" id="quantity` + index + `" type="text" value="` + basket[index] + `" style="width: 50px; text-align:center" />
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" onclick="javascript:incQuantity('` + index + `')">+</button>
      </span>
    </div>
    </td>`;
  html += `<td>
    <div class="btn-group" role="group" aria-label="...">
      <button type="button" class="btn btn-default" name="change`+ index + `"  onclick="javascript:changeQuantity(\'` + index + `\', document.getElementById(\'quantity`+ index + `\').value)">Update</button>
      <button type="button" class="btn-default btn" name="remove`+ index + `" onclick="javascript:removeProduct(\'` + index + `\', document.getElementById(\'quantity`+ index + `\').value)">Remove</button>
    </td>`;
  html += '</tr>';
  return html;
}

function changeQuantity(id, elem) {
  changeProductQuantity(id, elem);
  if (elem == 0) {
    removeProductFromBasket(id);
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

function getMiniBasketRow(product, quantity) {
  var html = "<tr>";
  html += '<td>' + product["name"] + '</td>';
  html += '<td style="text-align:center;">' + quantity + '</td>';
  html += '</tr>';
  return html;
}

function resetQuantity(product) {
  $('#quantity' + product).val(0);
}

function bootstrap() {
  displayProductList('grid');
  displayBasketMiniView();
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
