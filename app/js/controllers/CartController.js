let CartController = function($scope, CartService, $rootScope, $log){

  // $scope.shippingTiers = CartService.getShippingTiers();



// $scope.$watch('cart', CartService.cartWatch($rootScope.cart, $scope.shippingTiers) ,true);


  $scope.removeItem = function(item){
   $log.debug("Removing Item", item);

   $scope.cart.items =  _.without($scope.cart.items, item);
   CartService.updateCart($scope.cart.items);
   $rootScope.cart = CartService.getCart();
  };

  $scope.checkout = function(cart){
    CartService.checkout(cart);
  };



};

CartController.$inject = ['$scope', 'CartService', '$rootScope', '$log'];

export default CartController;
