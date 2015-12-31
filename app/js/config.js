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
      controller: 'TestimonialController'
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
    .state('pricing', {
      url: '/pricing',
      templateUrl: 'js/templates/pricing.tpl.html',
      controller: 'MainController'
    })
    .state('design', {
      url: '/design',
      templateUrl: 'js/templates/design.tpl.html',
      controller: 'MainController'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: 'js/templates/cart.tpl.html',
      controller: 'CartController'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'js/templates/contact.tpl.html',
      controller: 'ContactCtrl'
    });

}

function run(CartService, $rootScope){
  $rootScope.$on('$stateChangeStart', function () {
    $rootScope.cart = CartService.getCart();
  });
}

const paypal = {

      username: 'aines.kevin_api1.gmail.com',
      password: 'T6X9DR2B77BQ4YWK',
      credential: 'API Signature',
      signature: 'AFcWxV21C7fd0v3bYYYRCpSSRl31A2EEhAzWzlxq-EzEQtoZMqScR6xI'

  };
export {
  paypal,
  config,
  run
};
