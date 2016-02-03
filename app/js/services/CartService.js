let CartService = function($cookies, $state, $rootScope, $http, $log, API){

  const paypal = "https://www.paypal.com/cgi-bin/webscr";

  // item constructor

  function Item(options){
    this.title = options.title;
    this.price = options.price;
    this.quantity = options.quantity;
    this.total = function(){
      return (this.quantity * this.price) || 0;
    };

  }

  function getItems(){
    return $http.get(`${API.URL}/items`);
  }

  function getSingleItem(item){
    return $http.get(`${API.URL}/items/${item}`);
  }

  function getCart(){
    let cartList = $cookies.getObject('cart');
    if(!cartList || cartList.length < 1){
      $rootScope.hasCart = false;
      return {};
    }
    $rootScope.hasCart = true;
    var cartItems = cartList.map((item) => {
      let cartItem = new Item(item);
      return cartItem;
    });

    var paypalItems = addPaypal(cartItems);

    var cart = {};

    cart.items = paypalItems;
    cart.totalItems = cart.items.reduce((total, item) =>{
        return total + item.quantity;
      }, 0);

    return cart;
  }

  function setCart(item){
    $rootScope.hasCart = true;
    var cart = $cookies.getObject('cart');
    if(!cart){
      cart = [];
    }

    let alreadyExists = _.findWhere(cart, item.title);
    if(alreadyExists){
      cart = _.without(cart, alreadyExists);
      alreadyExists.quantity = alreadyExists.quantity + item.quantity;
      cart.push(alreadyExists);
    }else{
      cart.push(item);
    }
    $cookies.putObject('cart', cart);
    $log.debug("Item added to cart", item, cart);
    $('md-list-item').removeClass('sidenav-active');
    $('#cart').addClass('sidenav-active');
    $state.go('cart');
  }

  function updateCart(items){
    $log.debug('updating cart', items);

    var cartItems = addPaypal(items);
    $cookies.putObject('cart', cartItems);
    return cartItems;
  }

  // function getShippingTiers(){
  //   let shipping = {
  //     tier1: {
  //       quantity: 5,
  //       price: 5
  //     },
  //     tier2: {
  //       quantity: 10,
  //       price: 10
  //     },
  //     tier3: {
  //       quantity: 20,
  //       price: 20
  //     }
  //   };
  //   $log.debug("Shipping Tiers", shipping);
  //   return shipping;
  // }

  // function calculateShipping(cart, tiers){
  //   cart.items.forEach((item) =>{
  //   if(item.quantity >= tiers.tier1.quantity && item.quantity < tiers.tier2.quantity){
  //       item.shipping = tiers.tier1.price;
  //     }else if(item.quantity >= tiers.tier2.quantity && item.quantity < tiers.tier3.quantity){
  //       item.shipping = tiers.tier2.price;
  //     }else if(item.quantity > tiers.tier3.quantity ){
  //       item.shipping = tiers.tier3.price;
  //     }else{
  //       item.shipping = 0;
  //     }
  //   });

  //   cart.shipping = cart.items.reduce((total, item) =>{
  //     return total + item.shipping;
  //   }, 0);

  //   return cart;

  // }

  function cartWatch(cart, shipping) {
    var subtotal = 0;
    if(!_.isEmpty(cart)){

      if(cart.items.length > 0){
        cart.items.forEach(function(item) {
          subtotal += item.total();
        });
        cart = updateCart(cart.items);
        cart.totalItems = cart.items.reduce((total, item) =>{
            return total + item.quantity;
        }, 0);
      }

      cart.shipping =  calculateShipping(cart, shipping);
      cart.subtotal = subtotal.toFixed(2);
      cart.total = (subtotal + cart.shipping).toFixed(2);

      $log.debug("Cart loaded or updated", cart);
    }

  }

  function addPaypal(cartItems){
    for(var i = 0; i < cartItems.length; i ++){
      var itemNumber = (i + 1);
      cartItems[i].paypal = {
        item : "item_name_" + itemNumber,
        amount: "amount_"+ itemNumber,
        quantity: "quantity_" + itemNumber,
        shipping : "shipping_" + itemNumber
      };
    }

    $log.debug("adding paypal info", cartItems);
    return cartItems;
  }

  return {
    getItems,
    getSingleItem,
    getCart,
    setCart,
    updateCart,
    // getShippingTiers,
    // calculateShipping,
    cartWatch
  };


};

CartService.$inject = ['$cookies', '$state', '$rootScope', '$http', '$log', 'API'];

export default CartService;
