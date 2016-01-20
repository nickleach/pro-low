function ContactController($scope, UserService){

  $scope.contact = function (data){
    $scope.loading = true;

    UserService.contact(data)
      .success((data) => {
        $scope.loading = false;
        $scope.message = data.message;
      })
      .error((data) => {
        $scope.loading = false;
        $scope.message = data.message;
      });
  };

  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) { return { abbrev: state }; });

  $scope.wholesaleRequest = function(data){
    $scope.loading = true;

    UserService.wholesaleRequest(data)
      .success((data) => {
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
