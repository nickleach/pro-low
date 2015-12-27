function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state, $mdDialog){

  // nav toggles
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');
  let $left = $('.md-sidenav-left');
  let $right = $('.md-sidenav-right');

  // list item click event
  // $('md-list-item').on('click', function(){
  //   $('md-list-item').removeClass('sidenav-active');
  //   $(this).addClass('sidenav-active');
  // });

  function buildToggler(navID) {
    let debounceFn =  $mdUtil.debounce(() => {
          $mdSidenav(navID).toggle();
      },300);
    return debounceFn;
  }


  // Navigate function
  $scope.navigateTo = function(state, nav){
    $('md-list-item').removeClass('sidenav-active');
    $('#'+ state).addClass('sidenav-active');
    $state.go(state).then(() => {
    if (nav == "left"){
      $scope.toggleLeft();
      if(!$right.hasClass('md-closed'))
        $scope.toggleRight();
    }else if(nav == "right"){
      $scope.toggleRight();
      if(!$left.hasClass('md-closed'))
        $scope.toggleLeft();
    }});

  };

  $scope.showWarranty = function(ev) {
    $mdDialog.show({
      controller: DialogCtrl,
      templateUrl: 'js/templates/warranty.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
    });
  };
  $scope.showShipping = function(ev) {
    $mdDialog.show({
      controller: DialogCtrl,
      templateUrl: 'js/templates/shipping.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
    });
  };

  $scope.contactUs = function(contact){
    console.log(contact);
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

function DialogCtrl($scope, $mdDialog){
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };
}

export {
  MainController,
  RightCtrl,
  LeftCtrl,
  DialogCtrl
};
