function BuyController($scope, $cookies, $state, CartService, $log){

  $scope.loading = true;

  CartService.getItems()
    .success((data) =>{
    $log.debug('items', data);
      const itemData = data.map((i) => {
        i.price = i.basePrice;
        return i;
      });

      $scope.items = itemData;
      $scope.loading = false;
    })
    .error(() => {
      $scope.items = [
        {
          title: "The Pro Low Putting System",
          basePrice: 39.95,
          price: 39.95,
          pricingTiers: [
            {
              price: 39.95,
              quantity: 5
            },
            {
              price: 39.95,
              quantity: 10
            },
            {
              price: 39.95,
              quantity: 15
            }
          ]
        }
      ];
      $log.error('Error loading items, defaulting to item defaults', $scope.items);
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
