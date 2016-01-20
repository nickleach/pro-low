function BuyController($scope, $cookies, $state, CartService, $log){
  let
    lowTier,
    medTier,
    highTier;

  CartService.getItems().success((data) =>{
    $log.debug('items', data);
    const itemData = data.map((i) => {
      i.price = i.basePrice;
      return i;
    });
    $scope.items = itemData;
  });

  // $scope.item = {
  //   quantity: 1,
  //   title: "The Pro Low Putting System",
  //   price: 39.95
  // };

  $scope.checkQuantity = function(item) {

    if(item.quantity > item.pricingTiers[0].quantity){
      item.price = item.pricingTiers[0].price;
    }else if(item.quantity >= item.pricingTiers[1].quantity && quantity < item.pricingTiers[2].quantity){
      item.price = item.pricingTiers[1].price;
    }else if(item.quantity > item.pricingTiers[2].quantity){
      item.price = item.pricingTiers[2].price;
    }

  };


  $scope.addToCart = function(item, price){
    CartService.setCart(item, price);
  };

}
export default BuyController;
