function ContactController($scope, UserService){

  $scope.contactUs = function (form){
    $scope.loading = true;

    const message = `<p>${form.message}</p>\
    <p>${form.firstName} ${form.lastName}</p>\
    <p>${form.phone}</p>\
    <p>${form.email}</p>`;
    const email = {
      message,
      body: message,
      from: 'noreply@ProLowPutting.com',
      fromName: 'ProLow Putting',
      subject: "A customer is trying to contact you"
    };

    UserService.contact(email)
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

  $scope.wholesaleRequest = function(request){
    $scope.loading = true;

   const message= `<p>You have a new Wholesale Customer request from ProLowPutting.com! \
    See below for details</p> \
    <p>Store: ${request.store}</p>\
    <p>${request.city}, ${request.state} ${request.zip}</p>\
    <p><strong>Contact Info:</strong></p>\
    <p><strong>Name:</strong> ${request.firstName} ${request.lastName}</p>\
    <p><strong>Phone:</strong> ${request.phone}</p>\
    <p><strong>Email:</strong> ${request.email}</p>\
    <p><strong>Additional Info:</strong> ${request.message}</p>\
    <p>To approve this use you must log in to admin.prolowputting.com and create a wholesale user profile for this user\
    once the account is created they will be notified via email with their credentials.`;

    const email = {
      message,
      body: message
    };

    UserService.wholesaleRequest(email)
      .success((data) => {
        $scope.loading = false;
        $scope.message = "You're request has been sent! Once approved you will be notified via email!";
      })
      .error((data) => {
        $scope.loading = false;
        $scope.message = "We're sorry there was a problem executing your request! Please try again later!";
      });
  };

}

export default ContactController;
