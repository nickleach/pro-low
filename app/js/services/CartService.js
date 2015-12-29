let CartService = function($cookies, $state){

  function getCart(){
    let cart = $cookies.getObject('cart');
    return cart;
  }

  function setCart(item, price){
    item.price = item.quantity * price;
    $cookies.putObject('cart', item);
    $state.go('cart');
  }


  return{
    getCart : getCart,
    setCart : setCart
  };


};

CartService.$inject = ['$cookies', '$state'];

export default CartService;
