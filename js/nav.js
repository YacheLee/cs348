function render_nav() {
    html = `<nav class="navbar navbar-default navbar-fixed-top topbar" style="background-color:white;">

      <div class="container-fluid page">
<!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html"><strong>eVeg</strong></a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">

          </ul>


          <ul class="nav navbar-nav navbar-right">
            <li class="nav-menu-item"><a href="index.html">
                <span class="glyphicon glyphicon-home" aria-hidden="true"></span><span style="padding-left:10px;">Home</span>
              </a>
            </li>
            <li class="nav-menu-item">
              <a href="shop.html">
                <span class="glyphicon glyphicon-tags" aria-hidden="true"></span><span style="padding-left:10px;">Shop</span>
              </a>
            </li>
            <li class="nav-menu-item">
              <a href="basket.html" class="">
                <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span><span style="padding-left:10px;">Basket</span>
              </a>
            </li>

          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->

    </nav>`;
    $('#nav').append(html);
}

render_nav()
