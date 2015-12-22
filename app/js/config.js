function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/templates/home.tpl.html',
      controller: 'MainController'
    })
    .state('buy', {
      url: '/buy',
      templateUrl: 'js/templates/buy.tpl.html',
      controller: 'BuyCtrl'
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
    .state('gallery', {
      url: '/gallery',
      templateUrl: 'js/templates/gallery.tpl.html',
      controller: 'MediaController'
    })
    .state('videos', {
      url: '/videos',
      templateUrl: 'js/templates/videos.tpl.html',
      controller: 'MediaController'
    })
    .state('design', {
      url: '/design',
      templateUrl: 'js/templates/design.tpl.html',
      controller: 'MainController'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'js/templates/contact.tpl.html',
      controller: 'ContactCtrl'
    });

}
export {
  config
};
