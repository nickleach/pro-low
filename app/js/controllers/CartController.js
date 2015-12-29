let CartController = function($scope, CartService){
  $scope.cart = {};
  $scope.cart.items = CartService.getCart();
  $scope.cart.shipping = 0;

  $scope.$watch('cart', function() {
    var subtotal = 0;

    $scope.cart.items.forEach(function(item) {
      subtotal += item.total();
    });
    CartService.updateCart($scope.cart.items);
    $scope.cart.subtotal = subtotal.toFixed(2);
    $scope.cart.total = (subtotal + $scope.cart.shipping).toFixed(2);
  }, true);

  $scope.removeItem = function(item){
   $scope.cart.items =  _.without($scope.cart.items, item);
   CartService.updateCart($scope.cart.items);
  };

};

CartController.$inject = ['$scope', 'CartService'];

export default CartController;
