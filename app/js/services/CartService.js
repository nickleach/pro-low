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
    let cartList = $cookies.getObject('cart');
    if(!cartList || cartList.length < 1){
      $rootScope.hasCart = false;
      return;
    }
    $rootScope.hasCart = true;
    let cartItems = cartList.map((item) => {
      let cartItem = new Item(item);
      return cartItem;
    });


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
    $state.go('cart');
  }

  function updateCart(items){
    $cookies.putObject('cart', items);
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
    return shipping;
  }


  return{
    getCart : getCart,
    setCart : setCart,
    updateCart : updateCart,
    getShippingTiers : getShippingTiers
  };


};

CartService.$inject = ['$cookies', '$state', '$rootScope'];

export default CartService;
