(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $logProvider) {
  $logProvider.debugEnabled(true);

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

function run(CartService, $rootScope) {
  $rootScope.$on('$stateChangeStart', function () {
    $rootScope.cart = CartService.getCart();
  });
}

var paypal = {

  username: 'aines.kevin_api1.gmail.com',
  password: 'T6X9DR2B77BQ4YWK',
  credential: 'API Signature',
  signature: 'AFcWxV21C7fd0v3bYYYRCpSSRl31A2EEhAzWzlxq-EzEQtoZMqScR6xI'

};
exports.paypal = paypal;
exports.config = config;
exports.run = run;

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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CartController = function CartController($scope, CartService, $rootScope, $log) {

  $scope.shippingTiers = CartService.getShippingTiers();

  $scope.$watch('cart', function () {
    var subtotal = 0;
    if (!_.isEmpty($rootScope.cart)) {
      if ($scope.cart.items.length > 0) {
        $scope.cart.items.forEach(function (item) {
          subtotal += item.total();
        });

        $rootScope.cart = CartService.updateCart($scope.cart.items);

        $scope.cart.totalItems = $scope.cart.items.reduce(function (total, item) {
          return total + item.quantity;
        }, 0);
      }

      $scope.cart.shipping = CartService.calculateShipping($scope.cart, $scope.shippingTiers);
      $scope.cart.subtotal = subtotal.toFixed(2);
      $scope.cart.total = (subtotal + $scope.cart.shipping).toFixed(2);

      $log.debug("Cart loaded or updated", $scope.cart);
    }
  }, true);

  $scope.removeItem = function (item) {
    $log.debug("Removing Item", item);
    $scope.cart.items = _.without($scope.cart.items, item);
    CartService.updateCart($scope.cart.items);
  };

  $scope.checkout = function (cart) {
    CartService.checkout(cart);
  };
};

CartController.$inject = ['$scope', 'CartService', '$rootScope', '$log'];

exports["default"] = CartController;
module.exports = exports["default"];

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
function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state, $mdDialog, CartService, $rootScope) {

  $rootScope.cart = CartService.getCart();

  $scope.$watch('cart', function () {
    var subtotal = 0;
    if (!_.isEmpty($rootScope.cart)) {

      if ($scope.cart.items.length > 0) {

        $scope.cart.items.forEach(function (item) {
          subtotal += item.total();
        });

        $scope.cart.subtotal = subtotal.toFixed(2);
        $scope.cart.total = (subtotal + $scope.cart.shipping).toFixed(2);
        $scope.cart.totalItems = $scope.cart.items.reduce(function (total, item) {
          return total + item.quantity;
        }, 0);
      }
    }
  }, true);

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

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery', 'ngCookies']).config(_config.config).constant('PAYPAL', _config.paypal).run(_config.run).factory('CartService', _servicesCartService2['default']).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('DialogCtrl', _controllersMainController.DialogCtrl).controller('BuyCtrl', _controllersBuyController2['default']).controller('MediaController', _controllersMediaController2['default']).controller('CartController', _controllersCartController2['default']).controller('ContactCtrl', _controllersContactController2['default']).controller('TestimonialController', _controllersTestimonialController2['default']);

},{"./config":1,"./controllers/BuyController":2,"./controllers/CartController":3,"./controllers/ContactController":4,"./controllers/MainController":5,"./controllers/MediaController":6,"./controllers/TestimonialController":7,"./services/CartService":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CartService = function CartService($cookies, $state, $rootScope, $http, $log) {

  var paypal = "https://www.paypal.com/cgi-bin/webscr";

  function Item(options) {
    this.title = options.title;
    this.price = options.price;
    this.quantity = options.quantity;
    this.total = function () {
      return this.quantity * this.price || 0;
    };
  }

  function getCart() {
    var cartList = $cookies.getObject('cart');
    if (!cartList || cartList.length < 1) {
      $rootScope.hasCart = false;
      return {};
    }
    $rootScope.hasCart = true;
    var cartItems = cartList.map(function (item) {
      var cartItem = new Item(item);
      return cartItem;
    });

    for (var i = 0; i < cartItems.length; i++) {
      var itemNumber = i + 1;
      cartItems[i].paypal = {
        item: "item_name_" + itemNumber,
        amount: "amount_" + itemNumber,
        quantity: "quantity_" + itemNumber
      };
    }

    var cart = {};

    cart.items = cartItems;
    cart.totalItems = cart.items.reduce(function (total, item) {
      return total + item.quantity;
    }, 0);

    return cart;
  }

  function setCart(item) {
    $rootScope.hasCart = true;
    var cart = $cookies.getObject('cart');
    if (!cart) {
      cart = [];
    }

    var alreadyExists = _.findWhere(cart, item.title);
    if (alreadyExists) {
      cart = _.without(cart, alreadyExists);
      alreadyExists.quantity = alreadyExists.quantity + item.quantity;
      cart.push(alreadyExists);
    } else {
      cart.push(item);
    }
    $cookies.putObject('cart', cart);
    $log.debug("Item added to cart", item, cart);
    $state.go('cart');
  }

  function updateCart(items) {
    $log.debug('updating cart', items);
    $cookies.putObject('cart', items);
    return getCart();
  }

  function getShippingTiers() {
    var shipping = {
      tier1: {
        quantity: 5,
        price: 5
      },
      tier2: {
        quantity: 10,
        price: 10
      },
      tier3: {
        quantity: 20,
        price: 20
      }
    };
    $log.debug("Shipping Tiers", shipping);
    return shipping;
  }

  function calculateShipping(cart, tiers) {
    if (cart.totalItems >= tiers.tier1.quantity && cart.totalItems < tiers.tier2.quantity) {
      return tiers.tier1.price;
    } else if (cart.totalItems >= tiers.tier2.quantity && cart.totalItems < tiers.tier3.quantity) {
      return tiers.tier2.price;
    } else if (cart.totalItems > tiers.tier3.quantity) {
      return tiers.tier3.price;
    } else {
      return 0;
    }
  }

  return {
    getCart: getCart,
    setCart: setCart,
    updateCart: updateCart,
    getShippingTiers: getShippingTiers,
    calculateShipping: calculateShipping
  };
};

CartService.$inject = ['$cookies', '$state', '$rootScope', '$http', '$log'];

exports["default"] = CartService;
module.exports = exports["default"];

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxTQUFTLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFO0FBQ3BGLGNBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWhDLG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FDWCxL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QUssQ0FBQztLQUMxQixNQUFLLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDO0FBQ3pGLGFBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7S0FDMUIsTUFBSyxJQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDL0MsYUFBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztLQUMxQixNQUFJO0FBQ0gsYUFBTyxDQUFDLENBQUM7S0FDVjtHQUNGOztBQUVELFNBQU07QUFDSixXQUFPLEVBQUcsT0FBTztBQUNqQixXQUFPLEVBQUcsT0FBTztBQUNqQixjQUFVLEVBQUcsVUFBVTtBQUN2QixvQkFBZ0IsRUFBRyxnQkFBZ0I7QUFDbkMscUJBQWlCLEVBQUcsaUJBQWlCO0dBQ3RDLENBQUM7Q0FHSCxDQUFDOztBQUVGLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7O3FCQUU3RCxXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIsICRsb2dQcm92aWRlcikge1xuICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvaG9tZS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2J1eScsIHtcbiAgICAgIHVybDogJy9idXknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvYnV5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdCdXlDdHJsJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzdG9yeScsIHtcbiAgICAgIHVybDogJy9zdG9yeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zdG9yeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3Rlc3RpbW9uaWFscycsIHtcbiAgICAgIHVybDogJy90ZXN0aW1vbmlhbHMnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbGxlcnknLCB7XG4gICAgICB1cmw6ICcvZ2FsbGVyeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9nYWxsZXJ5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ZpZGVvcycsIHtcbiAgICAgIHVybDogJy92aWRlb3MnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdmlkZW9zLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ByaWNpbmcnLCB7XG4gICAgICB1cmw6ICcvcHJpY2luZycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9wcmljaW5nLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnZGVzaWduJywge1xuICAgICAgdXJsOiAnL2Rlc2lnbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9kZXNpZ24udHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgdXJsOiAnL2NhcnQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY2FydC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ2FydENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2NvbnRhY3QnLCB7XG4gICAgICB1cmw6ICcvY29udGFjdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9jb250YWN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBydW4oQ2FydFNlcnZpY2UsICRyb290U2NvcGUpe1xuICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9KTtcbn1cblxuY29uc3QgcGF5cGFsID0ge1xuXG4gICAgICB1c2VybmFtZTogJ2FpbmVzLmtldmluX2FwaTEuZ21haWwuY29tJyxcbiAgICAgIHBhc3N3b3JkOiAnVDZYOURSMkI3N0JRNFlXSycsXG4gICAgICBjcmVkZW50aWFsOiAnQVBJIFNpZ25hdHVyZScsXG4gICAgICBzaWduYXR1cmU6ICdBRmNXeFYyMUM3ZmQwdjNiWVlZUkNwU1NSbDMxQTJFRWhBeld6bHhxLUV6RVF0b1pNcVNjUjZ4SSdcblxuICB9O1xuZXhwb3J0IHtcbiAgcGF5cGFsLFxuICBjb25maWcsXG4gIHJ1blxufTtcbiIsImZ1bmN0aW9uIEJ1eUNvbnRyb2xsZXIoJHNjb3BlLCAkY29va2llcywgJHN0YXRlLCBDYXJ0U2VydmljZSl7XG5cbiAgbGV0IGxvd1RpZXIgPSB7XG4gICAgcXVhbnRpdHkgOiA0LFxuICAgIHByaWNlIDogMzkuOTVcbiAgfTtcblxuICBsZXQgbWVkVGllciA9IHtcbiAgICBxdWFudGl0eSA6IDksXG4gICAgcHJpY2UgOiAzNS4wMFxuICB9O1xuXG4gIGxldCBoaWdoVGllciA9IHtcbiAgICBxdWFudGl0eSA6IDE1LFxuICAgIHByaWNlOiAzMC4wMFxuICB9O1xuXG4gICRzY29wZS5pdGVtID0ge1xuICAgIHF1YW50aXR5OiAxLFxuICAgIHRpdGxlOiBcIlRoZSBQcm8gTG93IFB1dHRpbmcgU3lzdGVtXCIsXG4gICAgcHJpY2U6IDM5Ljk1XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrUXVhbnRpdHkgPSBmdW5jdGlvbihxdWFudGl0eSkge1xuXG4gICAgaWYocXVhbnRpdHkgPD0gbG93VGllci5xdWFudGl0eSl7XG4gICAgICAkc2NvcGUuaXRlbS5wcmljZSA9IGxvd1RpZXIucHJpY2U7XG4gICAgfWVsc2UgaWYocXVhbnRpdHkgPD0gbWVkVGllci5xdWFudGl0eSAmJiBxdWFudGl0eSA+IGxvd1RpZXIucXVhbnRpdHkpe1xuICAgICAgJHNjb3BlLml0ZW0ucHJpY2UgPSBtZWRUaWVyLnByaWNlO1xuICAgIH1lbHNlIGlmKHF1YW50aXR5ID4gbWVkVGllci5xdWFudGl0eSl7XG4gICAgICAkc2NvcGUuaXRlbS5wcmljZSA9IGhpZ2hUaWVyLnByaWNlO1xuICAgIH1cblxuICB9O1xuXG5cbiAgJHNjb3BlLmFkZFRvQ2FydCA9IGZ1bmN0aW9uKGl0ZW0sIHByaWNlKXtcbiAgICBDYXJ0U2VydmljZS5zZXRDYXJ0KGl0ZW0sIHByaWNlKTtcbiAgfTtcblxufVxuZXhwb3J0IGRlZmF1bHQgQnV5Q29udHJvbGxlcjtcbiIsImxldCBDYXJ0Q29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZSwgQ2FydFNlcnZpY2UsICRyb290U2NvcGUsICRsb2cpe1xuXG4gICRzY29wZS5zaGlwcGluZ1RpZXJzID0gQ2FydFNlcnZpY2UuZ2V0U2hpcHBpbmdUaWVycygpO1xuXG5cbiRzY29wZS4kd2F0Y2goJ2NhcnQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3VidG90YWwgPSAwO1xuICAgIGlmKCFfLmlzRW1wdHkoJHJvb3RTY29wZS5jYXJ0KSl7XG4gICAgaWYoJHNjb3BlLmNhcnQuaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAkc2NvcGUuY2FydC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgfSk7XG5cbiAgICAgICRyb290U2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLnVwZGF0ZUNhcnQoJHNjb3BlLmNhcnQuaXRlbXMpO1xuXG4gICAgICAkc2NvcGUuY2FydC50b3RhbEl0ZW1zID0gJHNjb3BlLmNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgICAgcmV0dXJuIHRvdGFsICsgaXRlbS5xdWFudGl0eTtcbiAgICAgIH0sIDApO1xuXG4gICAgfVxuXG4gICAgJHNjb3BlLmNhcnQuc2hpcHBpbmcgPSBDYXJ0U2VydmljZS5jYWxjdWxhdGVTaGlwcGluZygkc2NvcGUuY2FydCwgJHNjb3BlLnNoaXBwaW5nVGllcnMpO1xuICAgICRzY29wZS5jYXJ0LnN1YnRvdGFsID0gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgICAkc2NvcGUuY2FydC50b3RhbCA9IChzdWJ0b3RhbCArICRzY29wZS5jYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgJGxvZy5kZWJ1ZyhcIkNhcnQgbG9hZGVkIG9yIHVwZGF0ZWRcIiwgJHNjb3BlLmNhcnQpO1xuICB9XG5cbiAgfSwgdHJ1ZSk7XG5cblxuICAkc2NvcGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pe1xuICAgJGxvZy5kZWJ1ZyhcIlJlbW92aW5nIEl0ZW1cIiwgaXRlbSk7XG4gICAkc2NvcGUuY2FydC5pdGVtcyA9ICBfLndpdGhvdXQoJHNjb3BlLmNhcnQuaXRlbXMsIGl0ZW0pO1xuICAgQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrb3V0ID0gZnVuY3Rpb24oY2FydCl7XG4gICAgQ2FydFNlcnZpY2UuY2hlY2tvdXQoY2FydCk7XG4gIH07XG5cblxuXG59O1xuXG5DYXJ0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQ2FydFNlcnZpY2UnLCAnJHJvb3RTY29wZScsICckbG9nJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gQ29udGFjdENvbnRyb2xsZXIoJHNjb3BlKXtcblxufVxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdENvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkbWRVdGlsLCAkc3RhdGUsICRtZERpYWxvZywgQ2FydFNlcnZpY2UsICRyb290U2NvcGUpe1xuXG4gICRyb290U2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLmdldENhcnQoKTtcblxuXG4gICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3VidG90YWwgPSAwO1xuICAgIGlmKCFfLmlzRW1wdHkoJHJvb3RTY29wZS5jYXJ0KSl7XG5cblxuICAgIGlmKCRzY29wZS5jYXJ0Lml0ZW1zLmxlbmd0aCA+IDApe1xuXG4gICAgJHNjb3BlLmNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgfSk7XG5cblxuXG4gICAgJHNjb3BlLmNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICRzY29wZS5jYXJ0LnRvdGFsID0gKHN1YnRvdGFsICsgJHNjb3BlLmNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG4gICAgJHNjb3BlLmNhcnQudG90YWxJdGVtcyA9ICRzY29wZS5jYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgfSwgMCk7XG5cbiAgICB9XG4gIH1cblxuICB9LCB0cnVlKTtcblxuICAvLyBuYXYgdG9nZ2xlc1xuICAkc2NvcGUudG9nZ2xlTGVmdCA9IGJ1aWxkVG9nZ2xlcignbGVmdCcpO1xuICAkc2NvcGUudG9nZ2xlUmlnaHQgPSBidWlsZFRvZ2dsZXIoJ3JpZ2h0Jyk7XG4gIGxldCAkbGVmdCA9ICQoJy5tZC1zaWRlbmF2LWxlZnQnKTtcbiAgbGV0ICRyaWdodCA9ICQoJy5tZC1zaWRlbmF2LXJpZ2h0Jyk7XG5cbiAgLy8gbGlzdCBpdGVtIGNsaWNrIGV2ZW50XG4gIC8vICQoJ21kLWxpc3QtaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gIC8vICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vICAgJCh0aGlzKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGRUb2dnbGVyKG5hdklEKSB7XG4gICAgbGV0IGRlYm91bmNlRm4gPSAgJG1kVXRpbC5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgJG1kU2lkZW5hdihuYXZJRCkudG9nZ2xlKCk7XG4gICAgICB9LDMwMCk7XG4gICAgcmV0dXJuIGRlYm91bmNlRm47XG4gIH1cblxuXG4gIC8vIE5hdmlnYXRlIGZ1bmN0aW9uXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24oc3RhdGUsIG5hdil7XG4gICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJCgnIycrIHN0YXRlKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkc3RhdGUuZ28oc3RhdGUpLnRoZW4oKCkgPT4ge1xuICAgIGlmIChuYXYgPT0gXCJsZWZ0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICAgIGlmKCEkcmlnaHQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICB9ZWxzZSBpZihuYXYgPT0gXCJyaWdodFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgICAgaWYoISRsZWZ0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICB9fSk7XG5cbiAgfTtcblxuICAkc2NvcGUuc2hvd1dhcnJhbnR5ID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvd2FycmFudHkudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuICAkc2NvcGUuc2hvd1NoaXBwaW5nID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvc2hpcHBpbmcudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5jb250YWN0VXMgPSBmdW5jdGlvbihjb250YWN0KXtcblxuICB9O1xufVxuXG5cbmZ1bmN0aW9uIFJpZ2h0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdigncmlnaHQnKS5jbG9zZSgpO1xuICB9O1xuXG5cbn1cbmZ1bmN0aW9uIExlZnRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcbiAgfTtcblxufVxuXG5mdW5jdGlvbiBEaWFsb2dDdHJsKCRzY29wZSwgJG1kRGlhbG9nKXtcbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5jYW5jZWwoKTtcbiAgfTtcblxuICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5oaWRlKCk7XG4gIH07XG59XG5cbmV4cG9ydCB7XG4gIE1haW5Db250cm9sbGVyLFxuICBSaWdodEN0cmwsXG4gIExlZnRDdHJsLFxuICBEaWFsb2dDdHJsXG59O1xuIiwiZnVuY3Rpb24gTWVkaWFDb250cm9sbGVyKCRzY29wZSl7XG5cbiAgICAkc2NvcGUudGVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZygnd29ya2VkJyk7XG4gICAgfTtcblxuICAgICRzY29wZS5pbWFnZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9jbG9zZXVwMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvY2xvc2V1cDEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9rZXZpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMva2V2aW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAgLy8ge1xuICAgICAgLy8gICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbjMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgLy8gICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4zLWNvbXByZXNzb3IuanBnJyxcbiAgICAgIC8vICAgZGVzY3JpcHRpb246ICcnXG4gICAgICAvLyB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTItY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTItY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUzLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUzLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNC1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNC1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTUtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTUtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH1cbiAgICBdO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhQ29udHJvbGxlcjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRlc3RpbW9uaWFsQ29udHJvbGxlcigkc2NvcGUpe1xuXG59XG4iLCJpbXBvcnQge2NvbmZpZywgcnVuLCBwYXlwYWx9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1haW5Db250cm9sbGVyLCBMZWZ0Q3RybCwgUmlnaHRDdHJsLCBEaWFsb2dDdHJsIH0gZnJvbSAnLi9jb250cm9sbGVycy9NYWluQ29udHJvbGxlcic7XG5pbXBvcnQgQnV5Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXInO1xuaW1wb3J0IE1lZGlhQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL01lZGlhQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9DYXJ0Q29udHJvbGxlcic7XG5pbXBvcnQgQ29udGFjdENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Db250YWN0Q29udHJvbGxlcic7XG5pbXBvcnQgVGVzdGltb25pYWxDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvVGVzdGltb25pYWxDb250cm9sbGVyJztcbmltcG9ydCBDYXJ0U2VydmljZSBmcm9tICcuL3NlcnZpY2VzL0NhcnRTZXJ2aWNlJztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICdqa3VyaS5nYWxsZXJ5JyAsICduZ0Nvb2tpZXMnXSlcbi5jb25maWcoY29uZmlnKVxuLmNvbnN0YW50KCdQQVlQQUwnLCBwYXlwYWwpXG4ucnVuKHJ1bilcbi5mYWN0b3J5KCdDYXJ0U2VydmljZScsIENhcnRTZXJ2aWNlKVxuLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTGVmdEN0cmwnLCBMZWZ0Q3RybClcbi5jb250cm9sbGVyKCdSaWdodEN0cmwnLCBSaWdodEN0cmwpXG4uY29udHJvbGxlcignRGlhbG9nQ3RybCcsIERpYWxvZ0N0cmwpXG4uY29udHJvbGxlcignQnV5Q3RybCcsIEJ1eUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTWVkaWFDb250cm9sbGVyJywgTWVkaWFDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0NhcnRDb250cm9sbGVyJywgQ2FydENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignQ29udGFjdEN0cmwnLCBDb250YWN0Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdUZXN0aW1vbmlhbENvbnRyb2xsZXInLCBUZXN0aW1vbmlhbENvbnRyb2xsZXIpO1xuIiwibGV0IENhcnRTZXJ2aWNlID0gZnVuY3Rpb24oJGNvb2tpZXMsICRzdGF0ZSwgJHJvb3RTY29wZSwgJGh0dHAsICRsb2cpe1xuXG4gIGNvbnN0IHBheXBhbCA9IFwiaHR0cHM6Ly93d3cucGF5cGFsLmNvbS9jZ2ktYmluL3dlYnNjclwiO1xuXG4gIGZ1bmN0aW9uIEl0ZW0ob3B0aW9ucyl7XG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGU7XG4gICAgdGhpcy5wcmljZSA9IG9wdGlvbnMucHJpY2U7XG4gICAgdGhpcy5xdWFudGl0eSA9IG9wdGlvbnMucXVhbnRpdHk7XG4gICAgdGhpcy50b3RhbCA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gKHRoaXMucXVhbnRpdHkgKiB0aGlzLnByaWNlKSB8fCAwO1xuICAgIH07XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENhcnQoKXtcbiAgICBsZXQgY2FydExpc3QgPSAkY29va2llcy5nZXRPYmplY3QoJ2NhcnQnKTtcbiAgICBpZighY2FydExpc3QgfHwgY2FydExpc3QubGVuZ3RoIDwgMSl7XG4gICAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICBsZXQgY2FydEl0ZW1zID0gY2FydExpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICBsZXQgY2FydEl0ZW0gPSBuZXcgSXRlbShpdGVtKTtcbiAgICAgIHJldHVybiBjYXJ0SXRlbTtcbiAgICB9KTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYXJ0SXRlbXMubGVuZ3RoOyBpICsrKXtcbiAgICAgIHZhciBpdGVtTnVtYmVyID0gKGkgKyAxKTtcbiAgICAgIGNhcnRJdGVtc1tpXS5wYXlwYWwgPSB7XG4gICAgICAgIGl0ZW0gOiBcIml0ZW1fbmFtZV9cIiArIGl0ZW1OdW1iZXIsXG4gICAgICAgIGFtb3VudDogXCJhbW91bnRfXCIrIGl0ZW1OdW1iZXIsXG4gICAgICAgIHF1YW50aXR5OiBcInF1YW50aXR5X1wiICsgaXRlbU51bWJlclxuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgY2FydCA9IHt9O1xuXG4gICAgY2FydC5pdGVtcyA9IGNhcnRJdGVtcztcbiAgICBjYXJ0LnRvdGFsSXRlbXMgPSBjYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENhcnQoaXRlbSl7XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICB2YXIgY2FydCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0KXtcbiAgICAgIGNhcnQgPSBbXTtcbiAgICB9XG5cbiAgICBsZXQgYWxyZWFkeUV4aXN0cyA9IF8uZmluZFdoZXJlKGNhcnQsIGl0ZW0udGl0bGUpO1xuICAgIGlmKGFscmVhZHlFeGlzdHMpe1xuICAgICAgY2FydCA9IF8ud2l0aG91dChjYXJ0LCBhbHJlYWR5RXhpc3RzKTtcbiAgICAgIGFscmVhZHlFeGlzdHMucXVhbnRpdHkgPSBhbHJlYWR5RXhpc3RzLnF1YW50aXR5ICsgaXRlbS5xdWFudGl0eTtcbiAgICAgIGNhcnQucHVzaChhbHJlYWR5RXhpc3RzKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNhcnQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydCk7XG4gICAgJGxvZy5kZWJ1ZyhcIkl0ZW0gYWRkZWQgdG8gY2FydFwiLCBpdGVtLCBjYXJ0KTtcbiAgICAkc3RhdGUuZ28oJ2NhcnQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNhcnQoaXRlbXMpe1xuICAgICRsb2cuZGVidWcoJ3VwZGF0aW5nIGNhcnQnLCBpdGVtcyk7XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgaXRlbXMpO1xuICAgIHJldHVybiBnZXRDYXJ0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaGlwcGluZ1RpZXJzKCl7XG4gICAgbGV0IHNoaXBwaW5nID0ge1xuICAgICAgdGllcjE6IHtcbiAgICAgICAgcXVhbnRpdHk6IDUsXG4gICAgICAgIHByaWNlOiA1XG4gICAgICB9LFxuICAgICAgdGllcjI6IHtcbiAgICAgICAgcXVhbnRpdHk6IDEwLFxuICAgICAgICBwcmljZTogMTBcbiAgICAgIH0sXG4gICAgICB0aWVyMzoge1xuICAgICAgICBxdWFudGl0eTogMjAsXG4gICAgICAgIHByaWNlOiAyMFxuICAgICAgfVxuICAgIH07XG4gICAgJGxvZy5kZWJ1ZyhcIlNoaXBwaW5nIFRpZXJzXCIsIHNoaXBwaW5nKTtcbiAgICByZXR1cm4gc2hpcHBpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBjYWxjdWxhdGVTaGlwcGluZyhjYXJ0LCB0aWVycyl7XG4gICAgaWYoY2FydC50b3RhbEl0ZW1zID49IHRpZXJzLnRpZXIxLnF1YW50aXR5ICYmIGNhcnQudG90YWxJdGVtcyA8IHRpZXJzLnRpZXIyLnF1YW50aXR5KXtcbiAgICAgIHJldHVybiB0aWVycy50aWVyMS5wcmljZTtcbiAgICB9ZWxzZSBpZihjYXJ0LnRvdGFsSXRlbXMgPj0gdGllcnMudGllcjIucXVhbnRpdHkgJiYgY2FydC50b3RhbEl0ZW1zIDwgdGllcnMudGllcjMucXVhbnRpdHkpe1xuICAgICAgcmV0dXJuIHRpZXJzLnRpZXIyLnByaWNlO1xuICAgIH1lbHNlIGlmKGNhcnQudG90YWxJdGVtcyA+IHRpZXJzLnRpZXIzLnF1YW50aXR5ICl7XG4gICAgICByZXR1cm4gdGllcnMudGllcjMucHJpY2U7XG4gICAgfWVsc2V7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm57XG4gICAgZ2V0Q2FydCA6IGdldENhcnQsXG4gICAgc2V0Q2FydCA6IHNldENhcnQsXG4gICAgdXBkYXRlQ2FydCA6IHVwZGF0ZUNhcnQsXG4gICAgZ2V0U2hpcHBpbmdUaWVycyA6IGdldFNoaXBwaW5nVGllcnMsXG4gICAgY2FsY3VsYXRlU2hpcHBpbmcgOiBjYWxjdWxhdGVTaGlwcGluZ1xuICB9O1xuXG5cbn07XG5cbkNhcnRTZXJ2aWNlLiRpbmplY3QgPSBbJyRjb29raWVzJywgJyRzdGF0ZScsICckcm9vdFNjb3BlJywgJyRodHRwJywgJyRsb2cnXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydFNlcnZpY2U7XG4iXX0=
