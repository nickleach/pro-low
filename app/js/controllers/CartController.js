let CartController = function($scope, CartService, $rootScope, $log){

  $scope.shippingTiers = CartService.getShippingTiers();


$scope.$watch('cart', function() {
    var subtotal = 0;
    if(!_.isEmpty($rootScope.cart)){
    if($scope.cart.items.length > 0){
      $scope.cart.items.forEach(function(item) {
        subtotal += item.total();
      });

      $rootScope.cart = CartService.updateCart($scope.cart.items);

      $scope.cart.totalItems = $scope.cart.items.reduce((total, item) =>{
          return total + item.quantity;
      }, 0);

    }

    $scope.cart.shipping = CartService.calculateShipping($scope.cart, $scope.shippingTiers);
    $scope.cart.subtotal = subtotal.toFixed(2);
    $scope.cart.total = (subtotal + $scope.cart.shipping).toFixed(2);

    $log.debug("Cart loaded or updated", $scope.cart);
  }

  }, true);


  $scope.removeItem = function(item){
   $log.debug("Removing Item", item);
   $scope.cart.items =  _.without($scope.cart.items, item);
   CartService.updateCart($scope.cart.items);
  };

  $scope.checkout = function(cart){
    CartService.checkout(cart);
  };



};

CartController.$inject = ['$scope', 'CartService', '$rootScope', '$log'];

export default CartController;
