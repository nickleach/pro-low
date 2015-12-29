(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/templates/home.tpl.html',
    controller: 'MainController'
  }).state('buy', {
    url: '/buy',
    templateUrl: 'js/templates/buy.tpl.html',
    controller: 'BuyCtrl'
  }).state('story', {
    url: '/story',
    templateUrl: 'js/templates/story.tpl.html',
    controller: 'MainController'
  }).state('testimonials', {
    url: '/testimonials',
    templateUrl: 'js/templates/testimonials.tpl.html',
    controller: 'TestimonialController'
  }).state('gallery', {
    url: '/gallery',
    templateUrl: 'js/templates/gallery.tpl.html',
    controller: 'MediaController'
  }).state('videos', {
    url: '/videos',
    templateUrl: 'js/templates/videos.tpl.html',
    controller: 'MediaController'
  }).state('pricing', {
    url: '/pricing',
    templateUrl: 'js/templates/pricing.tpl.html',
    controller: 'MainController'
  }).state('design', {
    url: '/design',
    templateUrl: 'js/templates/design.tpl.html',
    controller: 'MainController'
  }).state('cart', {
    url: '/cart',
    templateUrl: 'js/templates/cart.tpl.html',
    controller: 'CartController'
  }).state('contact', {
    url: '/contact',
    templateUrl: 'js/templates/contact.tpl.html',
    controller: 'ContactCtrl'
  });
}
exports['default'] = config;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function BuyController($scope, $cookies, $state, CartService) {

  var lowTier = {
    quantity: 4,
    price: 39.95
  };

  var medTier = {
    quantity: 9,
    price: 35.00
  };

  var highTier = {
    quantity: 15,
    price: 30.00
  };

  $scope.item = {
    quantity: 1,
    title: "The Pro Low Putting System",
    price: 39.95
  };

  $scope.checkQuantity = function (quantity) {

    if (quantity <= lowTier.quantity) {
      $scope.item.price = lowTier.price;
    } else if (quantity <= medTier.quantity && quantity > lowTier.quantity) {
      $scope.item.price = medTier.price;
    } else if (quantity > medTier.quantity) {
      $scope.item.price = highTier.price;
    }
  };

  $scope.addToCart = function (item, price) {
    CartService.setCart(item, price);
  };
}
exports["default"] = BuyController;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CartController = function CartController($scope, CartService) {
  $scope.cart = {};
  $scope.cart.items = CartService.getCart();
  $scope.cart.shipping = 0;

  $scope.$watch('cart', function () {
    var subtotal = 0;

    $scope.cart.items.forEach(function (item) {
      subtotal += item.total();
    });

    $scope.cart.subtotal = subtotal.toFixed(2);
    $scope.cart.total = (subtotal + $scope.cart.shipping).toFixed(2);
  }, true);
};

CartController.$inject = ['$scope', 'CartService'];

exports['default'] = CartController;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ContactController($scope) {}
exports["default"] = ContactController;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state, $mdDialog) {

  // nav toggles
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');
  var $left = $('.md-sidenav-left');
  var $right = $('.md-sidenav-right');

  // list item click event
  // $('md-list-item').on('click', function(){
  //   $('md-list-item').removeClass('sidenav-active');
  //   $(this).addClass('sidenav-active');
  // });

  function buildToggler(navID) {
    var debounceFn = $mdUtil.debounce(function () {
      $mdSidenav(navID).toggle();
    }, 300);
    return debounceFn;
  }

  // Navigate function
  $scope.navigateTo = function (state, nav) {
    $('md-list-item').removeClass('sidenav-active');
    $('#' + state).addClass('sidenav-active');
    $state.go(state).then(function () {
      if (nav == "left") {
        $scope.toggleLeft();
        if (!$right.hasClass('md-closed')) $scope.toggleRight();
      } else if (nav == "right") {
        $scope.toggleRight();
        if (!$left.hasClass('md-closed')) $scope.toggleLeft();
      }
    });
  };

  $scope.showWarranty = function (ev) {
    $mdDialog.show({
      controller: DialogCtrl,
      templateUrl: 'js/templates/warranty.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };
  $scope.showShipping = function (ev) {
    $mdDialog.show({
      controller: DialogCtrl,
      templateUrl: 'js/templates/shipping.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  $scope.contactUs = function (contact) {};
}

function RightCtrl($scope, $mdSidenav) {
  $scope.close = function () {
    $mdSidenav('right').close();
  };
}
function LeftCtrl($scope, $mdSidenav) {
  $scope.close = function () {
    $mdSidenav('left').close();
  };
}

function DialogCtrl($scope, $mdDialog) {
  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.hide = function () {
    $mdDialog.hide();
  };
}

exports.MainController = MainController;
exports.RightCtrl = RightCtrl;
exports.LeftCtrl = LeftCtrl;
exports.DialogCtrl = DialogCtrl;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function MediaController($scope) {

  $scope.test = function () {
    console.log('worked');
  };

  $scope.images = [{
    thumb: 'assets/thumbs/closeup1-compressor_tn.jpg',
    img: 'assets/images/closeup1-compressor.jpg',
    description: ''
  }, {
    thumb: 'assets/thumbs/kevin-compressor_tn.jpg',
    img: 'assets/images/kevin-compressor.jpg',
    description: ''
  }, {
    thumb: 'assets/thumbs/main-compressor_tn.jpg',
    img: 'assets/images/main-compressor.jpg',
    description: ''
  },
  // {
  //   thumb: 'assets/thumbs/main3-compressor_tn.jpg',
  //   img: 'assets/images/main3-compressor.jpg',
  //   description: ''
  // },
  {
    thumb: 'assets/thumbs/landscape1-compressor_tn.jpg',
    img: 'assets/images/landscape1-compressor.jpg',
    description: ''
  }, {
    thumb: 'assets/thumbs/landscape2-compressor_tn.jpg',
    img: 'assets/images/landscape2-compressor.jpg',
    description: ''
  }, {
    thumb: 'assets/thumbs/landscape3-compressor_tn.jpg',
    img: 'assets/images/landscape3-compressor.jpg',
    description: ''
  }, {
    thumb: 'assets/thumbs/landscape4-compressor_tn.jpg',
    img: 'assets/images/landscape4-compressor.jpg',
    description: ''
  }, {
    thumb: 'assets/thumbs/landscape5-compressor_tn.jpg',
    img: 'assets/images/landscape5-compressor.jpg',
    description: ''
  }];
}

exports['default'] = MediaController;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TestimonialController;

function TestimonialController($scope) {}

module.exports = exports["default"];

},{}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _controllersMainController = require('./controllers/MainController');

var _controllersBuyController = require('./controllers/BuyController');

var _controllersBuyController2 = _interopRequireDefault(_controllersBuyController);

var _controllersMediaController = require('./controllers/MediaController');

var _controllersMediaController2 = _interopRequireDefault(_controllersMediaController);

var _controllersCartController = require('./controllers/CartController');

var _controllersCartController2 = _interopRequireDefault(_controllersCartController);

var _controllersContactController = require('./controllers/ContactController');

var _controllersContactController2 = _interopRequireDefault(_controllersContactController);

var _controllersTestimonialController = require('./controllers/TestimonialController');

var _controllersTestimonialController2 = _interopRequireDefault(_controllersTestimonialController);

var _servicesCartService = require('./services/CartService');

var _servicesCartService2 = _interopRequireDefault(_servicesCartService);

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery', 'ngCookies']).config(_config2['default']).factory('CartService', _servicesCartService2['default']).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('DialogCtrl', _controllersMainController.DialogCtrl).controller('BuyCtrl', _controllersBuyController2['default']).controller('MediaController', _controllersMediaController2['default']).controller('CartController', _controllersCartController2['default']).controller('ContactCtrl', _controllersContactController2['default']).controller('TestimonialController', _controllersTestimonialController2['default']);

},{"./config":1,"./controllers/BuyController":2,"./controllers/CartController":3,"./controllers/ContactController":4,"./controllers/MainController":5,"./controllers/MediaController":6,"./controllers/TestimonialController":7,"./services/CartService":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CartService = function CartService($cookies, $state) {

  function Item(options) {
    this.title = options.title;
    this.price = options.price;
    this.quantity = options.quantity;
    this.total = function () {
      return this.quantity * this.price || 0;
    };
  }

  function getCart() {
    var cart = $cookies.getObject('cart');
    if (!cart) {
      return cart;
    }
    var cartItems = cart.map(function (item) {
      var cartItem = new Item(item);
      return cartItem;
    });
    return cartItems;
  }

  function setCart(item) {
    var cart = $cookies.getObject('cart');
    if (!cart) {
      cart = [];
    }
    var cartItem = new Item(item);
    cart.push(cartItem);
    $cookies.putObject('cart', cart);
    $state.go('cart');
  }

  return {
    getCart: getCart,
    setCart: setCart
  };
};

CartService.$inject = ['$cookies', '$state'];

exports['default'] = CartService;
module.exports = exports['default'];

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxTQUFTLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUU7O0FBRXRFLG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FDWCxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ2IsT0FBRyxFQUFFLEdBQUc7QUFDUixlQUFXLEVB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LEVBQUUsUUFBUSxDQUFDLENBQUM7O3FCQUU5QixXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIpIHtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2hvbWUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdidXknLCB7XG4gICAgICB1cmw6ICcvYnV5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2J1eS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQnV5Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnc3RvcnknLCB7XG4gICAgICB1cmw6ICcvc3RvcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvc3RvcnkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMnLCB7XG4gICAgICB1cmw6ICcvdGVzdGltb25pYWxzJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3Rlc3RpbW9uaWFscy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwcmljaW5nJywge1xuICAgICAgdXJsOiAnL3ByaWNpbmcnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvcHJpY2luZy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2Rlc2lnbicsIHtcbiAgICAgIHVybDogJy9kZXNpZ24nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZGVzaWduLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY2FydCcsIHtcbiAgICAgIHVybDogJy9jYXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NhcnQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NhcnRDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSk7XG5cbn1cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImZ1bmN0aW9uIEJ1eUNvbnRyb2xsZXIoJHNjb3BlLCAkY29va2llcywgJHN0YXRlLCBDYXJ0U2VydmljZSl7XG5cbiAgbGV0IGxvd1RpZXIgPSB7XG4gICAgcXVhbnRpdHkgOiA0LFxuICAgIHByaWNlIDogMzkuOTVcbiAgfTtcblxuICBsZXQgbWVkVGllciA9IHtcbiAgICBxdWFudGl0eSA6IDksXG4gICAgcHJpY2UgOiAzNS4wMFxuICB9O1xuXG4gIGxldCBoaWdoVGllciA9IHtcbiAgICBxdWFudGl0eSA6IDE1LFxuICAgIHByaWNlOiAzMC4wMFxuICB9O1xuXG4gICRzY29wZS5pdGVtID0ge1xuICAgIHF1YW50aXR5OiAxLFxuICAgIHRpdGxlOiBcIlRoZSBQcm8gTG93IFB1dHRpbmcgU3lzdGVtXCIsXG4gICAgcHJpY2U6IDM5Ljk1XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrUXVhbnRpdHkgPSBmdW5jdGlvbihxdWFudGl0eSkge1xuXG4gICAgaWYocXVhbnRpdHkgPD0gbG93VGllci5xdWFudGl0eSl7XG4gICAgICAkc2NvcGUuaXRlbS5wcmljZSA9IGxvd1RpZXIucHJpY2U7XG4gICAgfWVsc2UgaWYocXVhbnRpdHkgPD0gbWVkVGllci5xdWFudGl0eSAmJiBxdWFudGl0eSA+IGxvd1RpZXIucXVhbnRpdHkpe1xuICAgICAgJHNjb3BlLml0ZW0ucHJpY2UgPSBtZWRUaWVyLnByaWNlO1xuICAgIH1lbHNlIGlmKHF1YW50aXR5ID4gbWVkVGllci5xdWFudGl0eSl7XG4gICAgICAkc2NvcGUuaXRlbS5wcmljZSA9IGhpZ2hUaWVyLnByaWNlO1xuICAgIH1cblxuICB9O1xuXG5cbiAgJHNjb3BlLmFkZFRvQ2FydCA9IGZ1bmN0aW9uKGl0ZW0sIHByaWNlKXtcbiAgICBDYXJ0U2VydmljZS5zZXRDYXJ0KGl0ZW0sIHByaWNlKTtcbiAgfTtcblxufVxuZXhwb3J0IGRlZmF1bHQgQnV5Q29udHJvbGxlcjtcbiIsImxldCBDYXJ0Q29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZSwgQ2FydFNlcnZpY2Upe1xuICAkc2NvcGUuY2FydCA9IHt9O1xuICAkc2NvcGUuY2FydC5pdGVtcyA9IENhcnRTZXJ2aWNlLmdldENhcnQoKTtcbiAgJHNjb3BlLmNhcnQuc2hpcHBpbmcgPSAwO1xuXG4gICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3VidG90YWwgPSAwO1xuXG4gICAgJHNjb3BlLmNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuY2FydC5zdWJ0b3RhbCA9IHN1YnRvdGFsLnRvRml4ZWQoMik7XG4gICAgJHNjb3BlLmNhcnQudG90YWwgPSAoc3VidG90YWwgKyAkc2NvcGUuY2FydC5zaGlwcGluZykudG9GaXhlZCgyKTtcbiAgfSwgdHJ1ZSk7XG5cbn07XG5cbkNhcnRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdDYXJ0U2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJ0Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIENvbnRhY3RDb250cm9sbGVyKCRzY29wZSl7XG5cbn1cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlLCAkbWREaWFsb2cpe1xuXG4gIC8vIG5hdiB0b2dnbGVzXG4gICRzY29wZS50b2dnbGVMZWZ0ID0gYnVpbGRUb2dnbGVyKCdsZWZ0Jyk7XG4gICRzY29wZS50b2dnbGVSaWdodCA9IGJ1aWxkVG9nZ2xlcigncmlnaHQnKTtcbiAgbGV0ICRsZWZ0ID0gJCgnLm1kLXNpZGVuYXYtbGVmdCcpO1xuICBsZXQgJHJpZ2h0ID0gJCgnLm1kLXNpZGVuYXYtcmlnaHQnKTtcblxuICAvLyBsaXN0IGl0ZW0gY2xpY2sgZXZlbnRcbiAgLy8gJCgnbWQtbGlzdC1pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgLy8gICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gICAkKHRoaXMpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyB9KTtcblxuICBmdW5jdGlvbiBidWlsZFRvZ2dsZXIobmF2SUQpIHtcbiAgICBsZXQgZGVib3VuY2VGbiA9ICAkbWRVdGlsLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAkbWRTaWRlbmF2KG5hdklEKS50b2dnbGUoKTtcbiAgICAgIH0sMzAwKTtcbiAgICByZXR1cm4gZGVib3VuY2VGbjtcbiAgfVxuXG5cbiAgLy8gTmF2aWdhdGUgZnVuY3Rpb25cbiAgJHNjb3BlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihzdGF0ZSwgbmF2KXtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjJysgc3RhdGUpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbyhzdGF0ZSkudGhlbigoKSA9PiB7XG4gICAgaWYgKG5hdiA9PSBcImxlZnRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgICAgaWYoISRyaWdodC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgIH1lbHNlIGlmKG5hdiA9PSBcInJpZ2h0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgICBpZighJGxlZnQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgIH19KTtcblxuICB9O1xuXG4gICRzY29wZS5zaG93V2FycmFudHkgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93YXJyYW50eS50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG4gICRzY29wZS5zaG93U2hpcHBpbmcgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zaGlwcGluZy50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLmNvbnRhY3RVcyA9IGZ1bmN0aW9uKGNvbnRhY3Qpe1xuXG4gIH07XG59XG5cblxuZnVuY3Rpb24gUmlnaHRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdyaWdodCcpLmNsb3NlKCk7XG4gIH07XG5cblxufVxuZnVuY3Rpb24gTGVmdEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xuICB9O1xuXG59XG5cbmZ1bmN0aW9uIERpYWxvZ0N0cmwoJHNjb3BlLCAkbWREaWFsb2cpe1xuICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmNhbmNlbCgpO1xuICB9O1xuXG4gICRzY29wZS5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmhpZGUoKTtcbiAgfTtcbn1cblxuZXhwb3J0IHtcbiAgTWFpbkNvbnRyb2xsZXIsXG4gIFJpZ2h0Q3RybCxcbiAgTGVmdEN0cmwsXG4gIERpYWxvZ0N0cmxcbn07XG4iLCJmdW5jdGlvbiBNZWRpYUNvbnRyb2xsZXIoJHNjb3BlKXtcblxuICAgICRzY29wZS50ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgIGNvbnNvbGUubG9nKCd3b3JrZWQnKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2Nsb3NldXAxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9jbG9zZXVwMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2tldmluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9rZXZpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICAvLyB7XG4gICAgICAvLyAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAvLyAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbjMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgLy8gICBkZXNjcmlwdGlvbjogJydcbiAgICAgIC8vIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU0LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU0LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfVxuICAgIF07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFDb250cm9sbGVyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGVzdGltb25pYWxDb250cm9sbGVyKCRzY29wZSl7XG5cbn1cbiIsImltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIsIExlZnRDdHJsLCBSaWdodEN0cmwsIERpYWxvZ0N0cmwgfSBmcm9tICcuL2NvbnRyb2xsZXJzL01haW5Db250cm9sbGVyJztcbmltcG9ydCBCdXlDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQnV5Q29udHJvbGxlcic7XG5pbXBvcnQgTWVkaWFDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyJztcbmltcG9ydCBDYXJ0Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0NhcnRDb250cm9sbGVyJztcbmltcG9ydCBDb250YWN0Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0NvbnRhY3RDb250cm9sbGVyJztcbmltcG9ydCBUZXN0aW1vbmlhbENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9UZXN0aW1vbmlhbENvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvQ2FydFNlcnZpY2UnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ2prdXJpLmdhbGxlcnknICwgJ25nQ29va2llcyddKVxuLmNvbmZpZyhjb25maWcpXG4uZmFjdG9yeSgnQ2FydFNlcnZpY2UnLCBDYXJ0U2VydmljZSlcbi5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0xlZnRDdHJsJywgTGVmdEN0cmwpXG4uY29udHJvbGxlcignUmlnaHRDdHJsJywgUmlnaHRDdHJsKVxuLmNvbnRyb2xsZXIoJ0RpYWxvZ0N0cmwnLCBEaWFsb2dDdHJsKVxuLmNvbnRyb2xsZXIoJ0J1eUN0cmwnLCBCdXlDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ01lZGlhQ29udHJvbGxlcicsIE1lZGlhQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDYXJ0Q29udHJvbGxlcicsIENhcnRDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0NvbnRhY3RDdHJsJywgQ29udGFjdENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignVGVzdGltb25pYWxDb250cm9sbGVyJywgVGVzdGltb25pYWxDb250cm9sbGVyKTtcbiIsImxldCBDYXJ0U2VydmljZSA9IGZ1bmN0aW9uKCRjb29raWVzLCAkc3RhdGUpe1xuXG4gIGZ1bmN0aW9uIEl0ZW0ob3B0aW9ucyl7XG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGU7XG4gICAgdGhpcy5wcmljZSA9IG9wdGlvbnMucHJpY2U7XG4gICAgdGhpcy5xdWFudGl0eSA9IG9wdGlvbnMucXVhbnRpdHk7XG4gICAgdGhpcy50b3RhbCA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gKHRoaXMucXVhbnRpdHkgKiB0aGlzLnByaWNlKSB8fCAwO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDYXJ0KCl7XG4gICAgbGV0IGNhcnQgPSAkY29va2llcy5nZXRPYmplY3QoJ2NhcnQnKTtcbiAgICBpZighY2FydCl7XG4gICAgICByZXR1cm4gY2FydDtcbiAgICB9XG4gICAgbGV0IGNhcnRJdGVtcyA9IGNhcnQubWFwKChpdGVtKSA9PiB7XG4gICAgICBsZXQgY2FydEl0ZW0gPSBuZXcgSXRlbShpdGVtKTtcbiAgICAgIHJldHVybiBjYXJ0SXRlbTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FydChpdGVtKXtcbiAgICBsZXQgY2FydCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0KXtcbiAgICAgIGNhcnQgPSBbXTtcbiAgICB9XG4gICAgbGV0IGNhcnRJdGVtID0gbmV3IEl0ZW0oaXRlbSk7XG4gICAgY2FydC5wdXNoKGNhcnRJdGVtKTtcbiAgICAkY29va2llcy5wdXRPYmplY3QoJ2NhcnQnLCBjYXJ0KTtcbiAgICAkc3RhdGUuZ28oJ2NhcnQnKTtcbiAgfVxuXG5cbiAgcmV0dXJue1xuICAgIGdldENhcnQgOiBnZXRDYXJ0LFxuICAgIHNldENhcnQgOiBzZXRDYXJ0XG4gIH07XG5cblxufTtcblxuQ2FydFNlcnZpY2UuJGluamVjdCA9IFsnJGNvb2tpZXMnLCAnJHN0YXRlJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRTZXJ2aWNlO1xuIl19
