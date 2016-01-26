function UserController($scope, UserService, $log){
  $scope.loginWholesaleUser = function(wholesaleUser){
    UserService.login(wholesaleUser);
  };
}
export default UserController;
