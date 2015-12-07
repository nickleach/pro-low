function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state){

  function buildToggler(navID) {
    let debounceFn =  $mdUtil.debounce(() => {
          $mdSidenav(navID).toggle();
      },300);
    return debounceFn;
  }
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
    // nav toggles
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.navigateTo = function(state){
    $state.go(state);
  };
}
function RightCtrl($scope, $mdSidenav){

  $scope.close = function () {
    $mdSidenav('right').close();
  };

}
function LeftCtrl($scope, $mdSidenav){
  $scope.close = function () {
    $mdSidenav('left').close();
  };
}
export {
  MainController,
  RightCtrl,
  LeftCtrl
};
