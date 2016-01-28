function WholesaleController($scope, UserService, $log, $cookies, $state){

  const
      id = $cookies.get('userId'),
      token = $cookies.get('token'),
      items = $cookies.getObject('items');

  if (id && token) {
    UserService._getUser(id)
      .success((data) => {
      $scope.userData = data;
      $log.debug('User Data', data);
    });
    if(!items){
      UserService.getUserInfo()
        .success((data) =>{
        $cookies.put('items', data.items);
        $log.debug(data.items);

      });
    } else {
      $scope.userItems = items;
      $log.debug("User Items", items);
    }
  } else {
    $state.go('home');
  }

}

export default WholesaleController;
