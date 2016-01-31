function WholesaleController($scope, UserService, CartService, $log, $cookies, $state){

  const
      id = $cookies.get('userId'),
      token = $cookies.get('token'),
      userItems = $cookies.getObject('items');

  if (id && token) {
    UserService._getUser(id)
      .success((data) => {
      $scope.userData = data;
      $log.debug('User Data', data);
    });
    if (!userItems) {
      UserService.getUserInfo()
        .success((data) =>{
        $cookies.put('items', data.items);
        $log.debug(data.items);
        $scope.userItems = data.items;
      });
    } else {
      $scope.userItems = userItems;
    }
    CartService.getItems()
      .success((data) => {
        $log.debug('Retrieved Items', data);
        $scope.userItems = data.map((item) => {
          const thisItem = $scope.userItems.find((i) => i.itemId === item._id);
          thisItem.title = item.title;
          return thisItem;
        });
      });
    $log.debug("User Items", userItems);
  } else {
    $state.go('home');
  }

  $scope.editProfile = function(){
    $state.go('buyWholesale.edit');
  };

}

export default WholesaleController;
