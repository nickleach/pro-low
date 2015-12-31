let CartController = function($scope, CartService, $rootScope){

  $scope.shippingTiers = CartService.getShippingTiers();

  $scope.cart.shipping = CartService.calculateShipping($scope.cart, $scope.shippingTiers);


$scope.$watch('cart', function() {
    var subtotal = 0;
    if($scope.cart.items){
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

  }, true);


  $scope.removeItem = function(item){
   $scope.cart.items =  _.without($scope.cart.items, item);
   CartService.updateCart($scope.cart.items);
  };

  $scope.checkout = function(cart){
    CartService.checkout(cart);
  };



};

CartController.$inject = ['$scope', 'CartService', '$rootScope'];

export default CartController;
