let CartController = function($scope, CartService){

  $scope.cart = CartService.getCart();

  $scope.cart.shipping = 0;

};

CartController.$inject = ['$scope', 'CartService'];

export default CartController;
