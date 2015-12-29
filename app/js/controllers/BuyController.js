function BuyController($scope, $cookies, $state, CartService){

  let lowTier = {
    quantity : 4,
    price : 39.95
  };

  let medTier = {
    quantity : 9,
    price : 35.00
  };

  let highTier = {
    quantity : 15,
    price: 30.00
  };

  $scope.item = {
    quantity: 1,
    title: "The Pro Low Putting System",
    price: 39.95
  };

  $scope.checkQuantity = function(quantity) {

    if(quantity <= lowTier.quantity){
      $scope.item.price = lowTier.price;
    }else if(quantity <= medTier.quantity && quantity > lowTier.quantity){
      $scope.item.price = medTier.price;
    }else if(quantity > medTier.quantity){
      $scope.item.price = highTier.price;
    }

  };


  $scope.addToCart = function(item, price){
    CartService.setCart(item, price);
  };

}
export default BuyController;
