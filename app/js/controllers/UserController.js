function UserController($scope, UserService, $log, $state){
  $scope.loginWholesaleUser = function(wholesaleUser) {
    UserService.login(wholesaleUser);
  };
  $scope.editUser = function(user) {
    UserService._updateUser(user._id, user)
      .success((data) => {
        $state.go('buyWholesale');
      });
  };
  $scope.logOut = function() {
    UserService.logOut();
  };
}
export default UserController;
