let TestimonialService = function($http, API){

  function getTestimonials(){
    return $http.get(`${API.URL}testimonials`);
  }

  function getSingleTestimonial(testimonialId){
    return $http.get(`${API.URL}testimonials/${testimonialId}`);
  }

  function addTestimonial(testimonial){
    return $http.post(`${API.URL}testimonials`, testimonial);
  }

  return {
    getTestimonials,
    getSingleTestimonial,
    addTestimonial
  };
};
export default TestimonialService;
