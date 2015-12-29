let CartService = function($cookies, $state, $rootScope){

  function Item(options){
    this.title = options.title;
    this.price = options.price;
    this.quantity = options.quantity;
    this.total = function(){
      return (this.quantity * this.price) || 0;
    };
  }

  function getCart(){
    let cart = $cookies.getObject('cart');
    if(!cart || cart.length < 1){
      $rootScope.hasCart = false;
      return;
    }
    $rootScope.hasCart = true;
    let cartItems = cart.map((item) => {
      let cartItem = new Item(item);
      return cartItem;
    });
    return cartItems;
  }

  function setCart(item){
    $rootScope.hasCart = true;
    let cart = $cookies.getObject('cart');
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
    $state.go('cart');
  }

  function updateCart(items){
    $cookies.putObject('cart', items);
  }


  return{
    getCart : getCart,
    setCart : setCart,
    updateCart : updateCart
  };


};

CartService.$inject = ['$cookies', '$state', '$rootScope'];

export default CartService;
