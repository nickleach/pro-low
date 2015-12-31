let CartService = function($cookies, $state, $rootScope, $http, $log){

  const paypal = "https://www.paypal.com/cgi-bin/webscr";

  function Item(options){
    this.title = options.title;
    this.price = options.price;
    this.quantity = options.quantity;
    this.total = function(){
      return (this.quantity * this.price) || 0;
    };

  }

  function getCart(){
    let cartList = $cookies.getObject('cart');
    if(!cartList || cartList.length < 1){
      $rootScope.hasCart = false;
      return {};
    }
    $rootScope.hasCart = true;
    let cartItems = cartList.map((item) => {
      let cartItem = new Item(item);
      return cartItem;
    });

    for(var i = 0; i < cartItems.length; i ++){
      var itemNumber = (i + 1);
      cartItems[i].paypal = {
        item : "item_name_" + itemNumber,
        amount: "amount_"+ itemNumber,
        quantity: "quantity_" + itemNumber
      };
    }

    var cart = {};

    cart.items = cartItems;
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
    $state.go('cart');
  }

  function updateCart(items){
    $log.debug('updating cart', items);
    $cookies.putObject('cart', items);
    return getCart();
  }

  function getShippingTiers(){
    let shipping = {
      tier1: {
        quantity: 5,
        price: 5
      },
      tier2: {
        quantity: 10,
        price: 10
      },
      tier3: {
        quantity: 20,
        price: 20
      }
    };
    $log.debug("Shipping Tiers", shipping);
    return shipping;
  }

  function calculateShipping(cart, tiers){
    if(cart.totalItems >= tiers.tier1.quantity && cart.totalItems < tiers.tier2.quantity){
      return tiers.tier1.price;
    }else if(cart.totalItems >= tiers.tier2.quantity && cart.totalItems < tiers.tier3.quantity){
      return tiers.tier2.price;
    }else if(cart.totalItems > tiers.tier3.quantity ){
      return tiers.tier3.price;
    }else{
      return 0;
    }
  }

  return{
    getCart : getCart,
    setCart : setCart,
    updateCart : updateCart,
    getShippingTiers : getShippingTiers,
    calculateShipping : calculateShipping
  };


};

CartService.$inject = ['$cookies', '$state', '$rootScope', '$http', '$log'];

export default CartService;
