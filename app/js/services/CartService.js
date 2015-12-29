let CartService = function($cookies, $state){

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
    if(!cart){
      return cart;
    }
    let cartItems = cart.map((item) => {
      let cartItem = new Item(item);
      return cartItem;
    });
    return cartItems;
  }

  function setCart(item){
    let cart = $cookies.getObject('cart');
    if(!cart){
      cart = [];
    }
    let cartItem = new Item(item);
    cart.push(cartItem);
    $cookies.putObject('cart', cart);
    $state.go('cart');
  }


  return{
    getCart : getCart,
    setCart : setCart
  };


};

CartService.$inject = ['$cookies', '$state'];

export default CartService;
