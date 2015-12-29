let CartController = function($scope, CartService){
  $scope.cart = {};
  $scope.cart.items = CartService.getCart();
  $scope.cart.shipping = 0;

  $scope.$watch('cart', function() {
    var subtotal = 0;

    $scope.cart.items.forEach(function(item) {
      subtotal += item.total();
    });

    $scope.cart.subtotal = subtotal;
  }, true);

};

CartController.$inject = ['$scope', 'CartService'];

export default CartController;
