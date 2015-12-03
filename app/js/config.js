function config($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/templates/home.tpl.html',
      controller: 'MainController'
    })
    .state('story', {
      url: '/story',
      templateUrl: 'js/templates/story.tpl.html',
      controller: 'MainController'
    })
    .state('testimonials', {
      url: '/testimonials',
      templateUrl: 'js/templates/testimonials.tpl.html',
      controller: 'MainController'
    })
    .state('media', {
      url: '/media',
      templateUrl: 'js/templates/videos.tpl.html',
      controller: 'MediaController'
    })
    .state('design', {
      url: '/design',
      templateUrl: 'js/templates/design.tpl.html',
      controller: 'MainController'
    });

}
export {
  config
};
