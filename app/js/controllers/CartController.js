let CartController = function($scope, CartService, $rootScope){

  let shippingTiers = CartService.getShippingTiers();

  function calculateShipping(){
    if($scope.cart.totalItems >= shippingTiers.tier1.quantity && $scope.cart.totalItems < shippingTiers.tier2.quantity){
    $scope.cart.shipping = shippingTiers.tier1.price;
    }else if($scope.cart.totalItems >= shippingTiers.tier2.quantity && $scope.cart.totalItems < shippingTiers.tier3.quantity){
      $scope.cart.shipping = shippingTiers.tier2.price;
    }else if($scope.cart.totalItems > shippingTiers.tier3.quantity ){
      $scope.cart.shipping = shippingTiers.tier3.price;
    }
  }

  calculateShipping();

  $scope.cart.shipping = 0;


$scope.$watch('cart', function() {
    var subtotal = 0;
    if($scope.cart.items){

    $scope.cart.items.forEach(function(item) {
      subtotal += item.total();
    });
    CartService.updateCart($scope.cart.items);
    $scope.cart.totalItems = $scope.cart.items.reduce((total, item) =>{
        return total + item.quantity;
      }, 0);

    }

    calculateShipping();
    $scope.cart.subtotal = subtotal.toFixed(2);
    $scope.cart.total = (subtotal + $scope.cart.shipping).toFixed(2);


  }, true);

  $scope.removeItem = function(item){
   $scope.cart.items =  _.without($scope.cart.items, item);
   CartService.updateCart($scope.cart.items);
  };

};

CartController.$inject = ['$scope', 'CartService', '$rootScope'];

export default CartController;
