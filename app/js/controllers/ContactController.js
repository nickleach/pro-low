function ContactController($scope, UserService){

  $scope.contact = function (data){
    $scope.loading = true;

    UserService.contact(data)
      .success((data) =>{
        $scope.loading = false;
        $scope.message = data.message;
      })
      .error((data) => {
        $scope.loading = false;
        $scope.message = data.message;
      });
  };

  $scope.wholesaleRequest = function(data){
    $scope.loading = true;

    UserService.wholesaleRequest(data)
      .success((data) =>{
        $scope.loading = false;
        $scope.message = data.message;
      })
      .error((data) => {
        $scope.loading = false;
        $scope.message = data.message;
      });
  };

}

export default ContactController;
