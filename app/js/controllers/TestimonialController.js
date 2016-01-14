export default function TestimonialController($scope, TestimonialService, $log){
  $scope.loadingTestimonials = true;

  TestimonialService.getTestimonials()
    .success((data) =>{
      $scope.loadingTestimonials = false;
      $scope.testimonials = data;
      $log.debug($scope.testimonials);
    })
    .error((data) =>{
      $scope.loadingTestimonials = false;
      $scope.errorMessage = "We're sorry we could not load testimonials at this time. Please try again later.";
    });

  $scope.addTestimonial = function(testimonial){
    $scope.addingTestimonial = true;

    TestimonialService.addTestimonial(testimonial)
      .success((data) =>{
      $scope.addingTestimonial = false;
      $scope.addedTestimonialMessage = data.message;
    });
  };
}
