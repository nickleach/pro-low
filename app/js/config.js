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


   //  var customPrimary = {
   //      '50': '#85d971',
   //      '100': '#73d35d',
   //      '200': '#62ce49',
   //      '300': '#51c736',
   //      '400': '#49b330',
   //      '500': '#419F2B',
   //      '600': '#398b26',
   //      '700': '#317720',
   //      '800': '#28631b',
   //      '900': '#204f15',
   //      'A100': '#96de85',
   //      'A200': '#a7e399',
   //      'A400': '#b8e9ad',
   //      'A700': '#183b10'
   //  };
   //  $mdThemingProvider
   //      .definePalette('customPrimary',
   //                      customPrimary);

   //  var customAccent = {
   //      '50': '#e1c392',
   //      '100': '#dbb87e',
   //      '200': '#d5ad6a',
   //      '300': '#d0a356',
   //      '400': '#ca9842',
   //      '500': '#BE8B35',
   //      '600': '#aa7c2f',
   //      '700': '#966e2a',
   //      '800': '#825f24',
   //      '900': '#6e511f',
   //      'A100': '#e6cea6',
   //      'A200': '#ecd9ba',
   //      'A400': '#f1e4ce',
   //      'A700': '#5a4219'
   //  };
   //  $mdThemingProvider
   //      .definePalette('customAccent',
   //                      customAccent);

   //  var customWarn = {
   //      '50': '#de949b',
   //      '100': '#d88088',
   //      '200': '#d26d76',
   //      '300': '#cc5964',
   //      '400': '#c64652',
   //      '500': '#B93945',
   //      '600': '#a5333e',
   //      '700': '#922d36',
   //      '800': '#7f272f',
   //      '900': '#6b2128',
   //      'A100': '#e4a7ad',
   //      'A200': '#eabbbf',
   //      'A400': '#f0ced1',
   //      'A700': '#581b21'
   //  };
   //  $mdThemingProvider
   //      .definePalette('customWarn',
   //                      customWarn);

   //  var customBackground = {
   //      '50': '#6191c7',
   //      '100': '#4e84c1',
   //      '200': '#4077b6',
   //      '300': '#396ba3',
   //      '400': '#335e90',
   //      '500': '#2C527D',
   //      '600': '#25466a',
   //      '700': '#1f3957',
   //      '800': '#182d44',
   //      '900': '#112032',
   //      'A100': '#749ece',
   //      'A200': '#87abd5',
   //      'A400': '#9ab8db',
   //      'A700': '#0b141f'
   //  };
   //  $mdThemingProvider
   //      .definePalette('customBackground',
   //                      customBackground);

   // $mdThemingProvider.theme('default')
   //     .primaryPalette('customPrimary')
   //     .accentPalette('customAccent')
   //     .warnPalette('customWarn')
   //     .backgroundPalette('customBackground')
   //     .dark();

}
export {
  config
};
