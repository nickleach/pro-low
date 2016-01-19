function TestimonialController($scope, TestimonialService, $state, $log){
  $scope.loadingTestimonials = true;

  TestimonialService.getTestimonials()
    .success((data) =>{
      $scope.loadingTestimonials = false;
      $scope.testimonials = data;
      $log.debug("Testimonials", $scope.testimonials);
    })
    .error((data) =>{
      $scope.loadingTestimonials = false;
      $scope.errorMessage = "We're sorry we could not load testimonials at this time. Please try again later.";
    });
  $scope.goToSingle = function(id){
   $state.go('testimonials.single', {id: id});
  };
  $scope.addTestimonial = function(testimonial){
    $scope.addingTestimonial = true;
    testimonial.date = new Date();
    TestimonialService.addTestimonial(testimonial)
      .success((data) =>{
      $scope.testimonialAdded = true;
      $scope.addedTestimonialMessage = data.message;
    });
  };
}

function TestimonialSingleCtrl($scope, $stateParams, TestimonialService, $log){
  const id = $stateParams.id;
  $scope.loadingTestimonial = true;
  TestimonialService.getSingleTestimonial(id)
    .success((data) => {
      $scope.loadingTestimonial = false;
      $scope.testimonial = data;
      $log.debug("Testimonial", data);
    })
    .error((data) =>{
      $scope.loadingTestimonial = false;
      $scope.errorMessage = "We're sorry we could not load this testimonial at this time. Please try again later.";
    });
}

export {
  TestimonialController,
  TestimonialSingleCtrl
};
