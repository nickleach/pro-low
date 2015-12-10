function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state){

  // nav toggles
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(navID) {
    let debounceFn =  $mdUtil.debounce(() => {
          $mdSidenav(navID).toggle();
      },300);
    return debounceFn;
  }
  $scope.cancel = function() {
    $mdDialog.cancel();
  };


  // Navigate function
  $scope.navigateTo = function(state, nav){
    $state.go(state);
    if (nav == "left"){
      $scope.toggleLeft();
    }else if(nav == "right"){
      $scope.toggleRight();
    }
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
