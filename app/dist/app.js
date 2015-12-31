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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CartController = function CartController($scope, CartService, $rootScope, $log) {

  // $scope.shippingTiers = CartService.getShippingTiers();

  // $scope.$watch('cart', CartService.cartWatch($rootScope.cart, $scope.shippingTiers) ,true);

  $scope.removeItem = function (item) {
    $log.debug("Removing Item", item);

    $scope.cart.items = _.without($scope.cart.items, item);
    CartService.updateCart($scope.cart.items);
    $rootScope.cart = CartService.getCart();
  };

  $scope.checkout = function (cart) {
    CartService.checkout(cart);
  };
};

CartController.$inject = ['$scope', 'CartService', '$rootScope', '$log'];

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
function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state, $mdDialog, CartService, $rootScope) {

  $rootScope.shippingTiers = CartService.getShippingTiers();

  $scope.$watch('cart', function () {
    var subtotal = 0;
    if (!_.isEmpty($rootScope.cart)) {
      if ($scope.cart.items.length > 0) {
        $scope.cart.items.forEach(function (item) {
          subtotal += item.total();
        });

        $scope.cart.items = CartService.updateCart($scope.cart.items);

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
'use strict';

Object.defineProperty(exports, '__esModule', {
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

    var paypalItems = addPaypal(cartItems);

    var cart = {};

    cart.items = paypalItems;
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
    $('md-list-item').removeClass('sidenav-active');
    $('#cart').addClass('sidenav-active');
    $state.go('cart');
  }

  function updateCart(items) {
    $log.debug('updating cart', items);
    var cartItems = addPaypal(items);
    $cookies.putObject('cart', cartItems);
    return cartItems;
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

  function cartWatch(cart, shipping) {
    var subtotal = 0;
    if (!_.isEmpty(cart)) {

      if (cart.items.length > 0) {
        cart.items.forEach(function (item) {
          subtotal += item.total();
        });
        cart = updateCart(cart.items);
        cart.totalItems = cart.items.reduce(function (total, item) {
          return total + item.quantity;
        }, 0);
      }

      cart.shipping = calculateShipping(cart, shipping);
      cart.subtotal = subtotal.toFixed(2);
      cart.total = (subtotal + cart.shipping).toFixed(2);

      $log.debug("Cart loaded or updated", cart);
    }
  }

  function addPaypal(cartItems) {
    for (var i = 0; i < cartItems.length; i++) {
      var itemNumber = i + 1;
      cartItems[i].paypal = {
        item: "item_name_" + itemNumber,
        amount: "amount_" + itemNumber,
        quantity: "quantity_" + itemNumber
      };
    }

    $log.debug("adding paypal info", cartItems);
    return cartItems;
  }

  return {
    getCart: getCart,
    setCart: setCart,
    updateCart: updateCart,
    getShippingTiers: getShippingTiers,
    calculateShipping: calculateShipping,
    cartWatch: cartWatch
  };
};

CartService.$inject = ['$cookies', '$state', '$rootScope', '$http', '$log'];

exports['default'] = CartService;
module.exports = exports['default'];

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxTQUFTLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFO0FBQ3BGLGNBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWhDLG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FDWCxL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QUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzs7cUJBRTdELFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJGxvZ1Byb3ZpZGVyKSB7XG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5Jywge1xuICAgICAgdXJsOiAnL2J1eScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0J1eUN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2FsbGVyeScsIHtcbiAgICAgIHVybDogJy9nYWxsZXJ5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2dhbGxlcnkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01lZGlhQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndmlkZW9zJywge1xuICAgICAgdXJsOiAnL3ZpZGVvcycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy92aWRlb3MudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01lZGlhQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgncHJpY2luZycsIHtcbiAgICAgIHVybDogJy9wcmljaW5nJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ByaWNpbmcudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdkZXNpZ24nLCB7XG4gICAgICB1cmw6ICcvZGVzaWduJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2Rlc2lnbi50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2NhcnQnLCB7XG4gICAgICB1cmw6ICcvY2FydCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9jYXJ0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDYXJ0Q29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY29udGFjdCcsIHtcbiAgICAgIHVybDogJy9jb250YWN0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NvbnRhY3QudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHJ1bihDYXJ0U2VydmljZSwgJHJvb3RTY29wZSl7XG4gICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG4gIH0pO1xufVxuXG5jb25zdCBwYXlwYWwgPSB7XG5cbiAgICAgIHVzZXJuYW1lOiAnYWluZXMua2V2aW5fYXBpMS5nbWFpbC5jb20nLFxuICAgICAgcGFzc3dvcmQ6ICdUNlg5RFIyQjc3QlE0WVdLJyxcbiAgICAgIGNyZWRlbnRpYWw6ICdBUEkgU2lnbmF0dXJlJyxcbiAgICAgIHNpZ25hdHVyZTogJ0FGY1d4VjIxQzdmZDB2M2JZWVlSQ3BTU1JsMzFBMkVFaEF6V3pseHEtRXpFUXRvWk1xU2NSNnhJJ1xuXG4gIH07XG5leHBvcnQge1xuICBwYXlwYWwsXG4gIGNvbmZpZyxcbiAgcnVuXG59O1xuIiwiZnVuY3Rpb24gQnV5Q29udHJvbGxlcigkc2NvcGUsICRjb29raWVzLCAkc3RhdGUsIENhcnRTZXJ2aWNlKXtcblxuICBsZXQgbG93VGllciA9IHtcbiAgICBxdWFudGl0eSA6IDQsXG4gICAgcHJpY2UgOiAzOS45NVxuICB9O1xuXG4gIGxldCBtZWRUaWVyID0ge1xuICAgIHF1YW50aXR5IDogOSxcbiAgICBwcmljZSA6IDM1LjAwXG4gIH07XG5cbiAgbGV0IGhpZ2hUaWVyID0ge1xuICAgIHF1YW50aXR5IDogMTUsXG4gICAgcHJpY2U6IDMwLjAwXG4gIH07XG5cbiAgJHNjb3BlLml0ZW0gPSB7XG4gICAgcXVhbnRpdHk6IDEsXG4gICAgdGl0bGU6IFwiVGhlIFBybyBMb3cgUHV0dGluZyBTeXN0ZW1cIixcbiAgICBwcmljZTogMzkuOTVcbiAgfTtcblxuICAkc2NvcGUuY2hlY2tRdWFudGl0eSA9IGZ1bmN0aW9uKHF1YW50aXR5KSB7XG5cbiAgICBpZihxdWFudGl0eSA8PSBsb3dUaWVyLnF1YW50aXR5KXtcbiAgICAgICRzY29wZS5pdGVtLnByaWNlID0gbG93VGllci5wcmljZTtcbiAgICB9ZWxzZSBpZihxdWFudGl0eSA8PSBtZWRUaWVyLnF1YW50aXR5ICYmIHF1YW50aXR5ID4gbG93VGllci5xdWFudGl0eSl7XG4gICAgICAkc2NvcGUuaXRlbS5wcmljZSA9IG1lZFRpZXIucHJpY2U7XG4gICAgfWVsc2UgaWYocXVhbnRpdHkgPiBtZWRUaWVyLnF1YW50aXR5KXtcbiAgICAgICRzY29wZS5pdGVtLnByaWNlID0gaGlnaFRpZXIucHJpY2U7XG4gICAgfVxuXG4gIH07XG5cblxuICAkc2NvcGUuYWRkVG9DYXJ0ID0gZnVuY3Rpb24oaXRlbSwgcHJpY2Upe1xuICAgIENhcnRTZXJ2aWNlLnNldENhcnQoaXRlbSwgcHJpY2UpO1xuICB9O1xuXG59XG5leHBvcnQgZGVmYXVsdCBCdXlDb250cm9sbGVyO1xuIiwibGV0IENhcnRDb250cm9sbGVyID0gZnVuY3Rpb24oJHNjb3BlLCBDYXJ0U2VydmljZSwgJHJvb3RTY29wZSwgJGxvZyl7XG5cbiAgLy8gJHNjb3BlLnNoaXBwaW5nVGllcnMgPSBDYXJ0U2VydmljZS5nZXRTaGlwcGluZ1RpZXJzKCk7XG5cblxuXG4vLyAkc2NvcGUuJHdhdGNoKCdjYXJ0JywgQ2FydFNlcnZpY2UuY2FydFdhdGNoKCRyb290U2NvcGUuY2FydCwgJHNjb3BlLnNoaXBwaW5nVGllcnMpICx0cnVlKTtcblxuXG4gICRzY29wZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24oaXRlbSl7XG4gICAkbG9nLmRlYnVnKFwiUmVtb3ZpbmcgSXRlbVwiLCBpdGVtKTtcblxuICAgJHNjb3BlLmNhcnQuaXRlbXMgPSAgXy53aXRob3V0KCRzY29wZS5jYXJ0Lml0ZW1zLCBpdGVtKTtcbiAgIENhcnRTZXJ2aWNlLnVwZGF0ZUNhcnQoJHNjb3BlLmNhcnQuaXRlbXMpO1xuICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9O1xuXG4gICRzY29wZS5jaGVja291dCA9IGZ1bmN0aW9uKGNhcnQpe1xuICAgIENhcnRTZXJ2aWNlLmNoZWNrb3V0KGNhcnQpO1xuICB9O1xuXG5cblxufTtcblxuQ2FydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ0NhcnRTZXJ2aWNlJywgJyRyb290U2NvcGUnLCAnJGxvZyddO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJ0Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIENvbnRhY3RDb250cm9sbGVyKCRzY29wZSl7XG5cbn1cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlLCAkbWREaWFsb2csIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcblxuJHJvb3RTY29wZS5zaGlwcGluZ1RpZXJzID0gQ2FydFNlcnZpY2UuZ2V0U2hpcHBpbmdUaWVycygpO1xuXG5cbiAkc2NvcGUuJHdhdGNoKCdjYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KCRyb290U2NvcGUuY2FydCkpe1xuICAgIGlmKCRzY29wZS5jYXJ0Lml0ZW1zLmxlbmd0aCA+IDApe1xuICAgICAgJHNjb3BlLmNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHN1YnRvdGFsICs9IGl0ZW0udG90YWwoKTtcbiAgICAgIH0pO1xuXG4gICAgICRzY29wZS5jYXJ0Lml0ZW1zID0gQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG5cbiAgICAgICRzY29wZS5jYXJ0LnRvdGFsSXRlbXMgPSAkc2NvcGUuY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgfSwgMCk7XG5cbiAgICB9XG5cbiAgICAkc2NvcGUuY2FydC5zaGlwcGluZyA9IENhcnRTZXJ2aWNlLmNhbGN1bGF0ZVNoaXBwaW5nKCRzY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycyk7XG4gICAgJHNjb3BlLmNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICRzY29wZS5jYXJ0LnRvdGFsID0gKHN1YnRvdGFsICsgJHNjb3BlLmNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG5cbiAgICAkbG9nLmRlYnVnKFwiQ2FydCBsb2FkZWQgb3IgdXBkYXRlZFwiLCAkc2NvcGUuY2FydCk7XG4gIH1cblxuICB9LCB0cnVlKTtcblxuXG4gIC8vIG5hdiB0b2dnbGVzXG4gICRzY29wZS50b2dnbGVMZWZ0ID0gYnVpbGRUb2dnbGVyKCdsZWZ0Jyk7XG4gICRzY29wZS50b2dnbGVSaWdodCA9IGJ1aWxkVG9nZ2xlcigncmlnaHQnKTtcbiAgbGV0ICRsZWZ0ID0gJCgnLm1kLXNpZGVuYXYtbGVmdCcpO1xuICBsZXQgJHJpZ2h0ID0gJCgnLm1kLXNpZGVuYXYtcmlnaHQnKTtcblxuICAvLyBsaXN0IGl0ZW0gY2xpY2sgZXZlbnRcbiAgLy8gJCgnbWQtbGlzdC1pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgLy8gICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gICAkKHRoaXMpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyB9KTtcblxuICBmdW5jdGlvbiBidWlsZFRvZ2dsZXIobmF2SUQpIHtcbiAgICBsZXQgZGVib3VuY2VGbiA9ICAkbWRVdGlsLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAkbWRTaWRlbmF2KG5hdklEKS50b2dnbGUoKTtcbiAgICAgIH0sMzAwKTtcbiAgICByZXR1cm4gZGVib3VuY2VGbjtcbiAgfVxuXG5cbiAgLy8gTmF2aWdhdGUgZnVuY3Rpb25cbiAgJHNjb3BlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihzdGF0ZSwgbmF2KXtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjJysgc3RhdGUpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbyhzdGF0ZSkudGhlbigoKSA9PiB7XG4gICAgaWYgKG5hdiA9PSBcImxlZnRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgICAgaWYoISRyaWdodC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgIH1lbHNlIGlmKG5hdiA9PSBcInJpZ2h0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgICBpZighJGxlZnQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgIH19KTtcblxuICB9O1xuXG4gICRzY29wZS5zaG93V2FycmFudHkgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93YXJyYW50eS50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG4gICRzY29wZS5zaG93U2hpcHBpbmcgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zaGlwcGluZy50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLmNvbnRhY3RVcyA9IGZ1bmN0aW9uKGNvbnRhY3Qpe1xuXG4gIH07XG59XG5cblxuZnVuY3Rpb24gUmlnaHRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdyaWdodCcpLmNsb3NlKCk7XG4gIH07XG5cblxufVxuZnVuY3Rpb24gTGVmdEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xuICB9O1xuXG59XG5cbmZ1bmN0aW9uIERpYWxvZ0N0cmwoJHNjb3BlLCAkbWREaWFsb2cpe1xuICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmNhbmNlbCgpO1xuICB9O1xuXG4gICRzY29wZS5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmhpZGUoKTtcbiAgfTtcbn1cblxuZXhwb3J0IHtcbiAgTWFpbkNvbnRyb2xsZXIsXG4gIFJpZ2h0Q3RybCxcbiAgTGVmdEN0cmwsXG4gIERpYWxvZ0N0cmxcbn07XG4iLCJmdW5jdGlvbiBNZWRpYUNvbnRyb2xsZXIoJHNjb3BlKXtcblxuICAgICRzY29wZS50ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgIGNvbnNvbGUubG9nKCd3b3JrZWQnKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2Nsb3NldXAxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9jbG9zZXVwMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2tldmluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9rZXZpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICAvLyB7XG4gICAgICAvLyAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAvLyAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbjMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgLy8gICBkZXNjcmlwdGlvbjogJydcbiAgICAgIC8vIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU0LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU0LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfVxuICAgIF07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFDb250cm9sbGVyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGVzdGltb25pYWxDb250cm9sbGVyKCRzY29wZSl7XG5cbn1cbiIsImltcG9ydCB7Y29uZmlnLCBydW4sIHBheXBhbH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIsIExlZnRDdHJsLCBSaWdodEN0cmwsIERpYWxvZ0N0cmwgfSBmcm9tICcuL2NvbnRyb2xsZXJzL01haW5Db250cm9sbGVyJztcbmltcG9ydCBCdXlDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQnV5Q29udHJvbGxlcic7XG5pbXBvcnQgTWVkaWFDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyJztcbmltcG9ydCBDYXJ0Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0NhcnRDb250cm9sbGVyJztcbmltcG9ydCBDb250YWN0Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0NvbnRhY3RDb250cm9sbGVyJztcbmltcG9ydCBUZXN0aW1vbmlhbENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9UZXN0aW1vbmlhbENvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvQ2FydFNlcnZpY2UnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ2prdXJpLmdhbGxlcnknICwgJ25nQ29va2llcyddKVxuLmNvbmZpZyhjb25maWcpXG4uY29uc3RhbnQoJ1BBWVBBTCcsIHBheXBhbClcbi5ydW4ocnVuKVxuLmZhY3RvcnkoJ0NhcnRTZXJ2aWNlJywgQ2FydFNlcnZpY2UpXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdMZWZ0Q3RybCcsIExlZnRDdHJsKVxuLmNvbnRyb2xsZXIoJ1JpZ2h0Q3RybCcsIFJpZ2h0Q3RybClcbi5jb250cm9sbGVyKCdEaWFsb2dDdHJsJywgRGlhbG9nQ3RybClcbi5jb250cm9sbGVyKCdCdXlDdHJsJywgQnV5Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdNZWRpYUNvbnRyb2xsZXInLCBNZWRpYUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignQ2FydENvbnRyb2xsZXInLCBDYXJ0Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDb250YWN0Q3RybCcsIENvbnRhY3RDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcicsIFRlc3RpbW9uaWFsQ29udHJvbGxlcik7XG4iLCJsZXQgQ2FydFNlcnZpY2UgPSBmdW5jdGlvbigkY29va2llcywgJHN0YXRlLCAkcm9vdFNjb3BlLCAkaHR0cCwgJGxvZyl7XG5cbiAgY29uc3QgcGF5cGFsID0gXCJodHRwczovL3d3dy5wYXlwYWwuY29tL2NnaS1iaW4vd2Vic2NyXCI7XG5cbiAgZnVuY3Rpb24gSXRlbShvcHRpb25zKXtcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZTtcbiAgICB0aGlzLnByaWNlID0gb3B0aW9ucy5wcmljZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gb3B0aW9ucy5xdWFudGl0eTtcbiAgICB0aGlzLnRvdGFsID0gZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAodGhpcy5xdWFudGl0eSAqIHRoaXMucHJpY2UpIHx8IDA7XG4gICAgfTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2FydCgpe1xuICAgIGxldCBjYXJ0TGlzdCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0TGlzdCB8fCBjYXJ0TGlzdC5sZW5ndGggPCAxKXtcbiAgICAgICRyb290U2NvcGUuaGFzQ2FydCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0SXRlbXMgPSBjYXJ0TGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGxldCBjYXJ0SXRlbSA9IG5ldyBJdGVtKGl0ZW0pO1xuICAgICAgcmV0dXJuIGNhcnRJdGVtO1xuICAgIH0pO1xuXG4gICAgdmFyIHBheXBhbEl0ZW1zID0gYWRkUGF5cGFsKGNhcnRJdGVtcyk7XG5cbiAgICB2YXIgY2FydCA9IHt9O1xuXG4gICAgY2FydC5pdGVtcyA9IHBheXBhbEl0ZW1zO1xuICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICB9LCAwKTtcblxuICAgIHJldHVybiBjYXJ0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FydChpdGVtKXtcbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0ID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdjYXJ0Jyk7XG4gICAgaWYoIWNhcnQpe1xuICAgICAgY2FydCA9IFtdO1xuICAgIH1cblxuICAgIGxldCBhbHJlYWR5RXhpc3RzID0gXy5maW5kV2hlcmUoY2FydCwgaXRlbS50aXRsZSk7XG4gICAgaWYoYWxyZWFkeUV4aXN0cyl7XG4gICAgICBjYXJ0ID0gXy53aXRob3V0KGNhcnQsIGFscmVhZHlFeGlzdHMpO1xuICAgICAgYWxyZWFkeUV4aXN0cy5xdWFudGl0eSA9IGFscmVhZHlFeGlzdHMucXVhbnRpdHkgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgY2FydC5wdXNoKGFscmVhZHlFeGlzdHMpO1xuICAgIH1lbHNle1xuICAgICAgY2FydC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICAkY29va2llcy5wdXRPYmplY3QoJ2NhcnQnLCBjYXJ0KTtcbiAgICAkbG9nLmRlYnVnKFwiSXRlbSBhZGRlZCB0byBjYXJ0XCIsIGl0ZW0sIGNhcnQpO1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyNjYXJ0JykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKCdjYXJ0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYXJ0KGl0ZW1zKXtcbiAgICAkbG9nLmRlYnVnKCd1cGRhdGluZyBjYXJ0JywgaXRlbXMpO1xuICAgIHZhciBjYXJ0SXRlbXMgPSBhZGRQYXlwYWwoaXRlbXMpO1xuICAgICRjb29raWVzLnB1dE9iamVjdCgnY2FydCcsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNoaXBwaW5nVGllcnMoKXtcbiAgICBsZXQgc2hpcHBpbmcgPSB7XG4gICAgICB0aWVyMToge1xuICAgICAgICBxdWFudGl0eTogNSxcbiAgICAgICAgcHJpY2U6IDVcbiAgICAgIH0sXG4gICAgICB0aWVyMjoge1xuICAgICAgICBxdWFudGl0eTogMTAsXG4gICAgICAgIHByaWNlOiAxMFxuICAgICAgfSxcbiAgICAgIHRpZXIzOiB7XG4gICAgICAgIHF1YW50aXR5OiAyMCxcbiAgICAgICAgcHJpY2U6IDIwXG4gICAgICB9XG4gICAgfTtcbiAgICAkbG9nLmRlYnVnKFwiU2hpcHBpbmcgVGllcnNcIiwgc2hpcHBpbmcpO1xuICAgIHJldHVybiBzaGlwcGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHRpZXJzKXtcbiAgICBpZihjYXJ0LnRvdGFsSXRlbXMgPj0gdGllcnMudGllcjEucXVhbnRpdHkgJiYgY2FydC50b3RhbEl0ZW1zIDwgdGllcnMudGllcjIucXVhbnRpdHkpe1xuICAgICAgcmV0dXJuIHRpZXJzLnRpZXIxLnByaWNlO1xuICAgIH1lbHNlIGlmKGNhcnQudG90YWxJdGVtcyA+PSB0aWVycy50aWVyMi5xdWFudGl0eSAmJiBjYXJ0LnRvdGFsSXRlbXMgPCB0aWVycy50aWVyMy5xdWFudGl0eSl7XG4gICAgICByZXR1cm4gdGllcnMudGllcjIucHJpY2U7XG4gICAgfWVsc2UgaWYoY2FydC50b3RhbEl0ZW1zID4gdGllcnMudGllcjMucXVhbnRpdHkgKXtcbiAgICAgIHJldHVybiB0aWVycy50aWVyMy5wcmljZTtcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhcnRXYXRjaChjYXJ0LCBzaGlwcGluZykge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoIV8uaXNFbXB0eShjYXJ0KSl7XG5cbiAgICAgIGlmKGNhcnQuaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgIGNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2FydCA9IHVwZGF0ZUNhcnQoY2FydC5pdGVtcyk7XG4gICAgICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgICB9LCAwKTtcbiAgICAgIH1cblxuICAgICAgY2FydC5zaGlwcGluZyA9ICBjYWxjdWxhdGVTaGlwcGluZyhjYXJ0LCBzaGlwcGluZyk7XG4gICAgICBjYXJ0LnN1YnRvdGFsID0gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgICAgIGNhcnQudG90YWwgPSAoc3VidG90YWwgKyBjYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgICAkbG9nLmRlYnVnKFwiQ2FydCBsb2FkZWQgb3IgdXBkYXRlZFwiLCBjYXJ0KTtcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBheXBhbChjYXJ0SXRlbXMpe1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYXJ0SXRlbXMubGVuZ3RoOyBpICsrKXtcbiAgICAgIHZhciBpdGVtTnVtYmVyID0gKGkgKyAxKTtcbiAgICAgIGNhcnRJdGVtc1tpXS5wYXlwYWwgPSB7XG4gICAgICAgIGl0ZW0gOiBcIml0ZW1fbmFtZV9cIiArIGl0ZW1OdW1iZXIsXG4gICAgICAgIGFtb3VudDogXCJhbW91bnRfXCIrIGl0ZW1OdW1iZXIsXG4gICAgICAgIHF1YW50aXR5OiBcInF1YW50aXR5X1wiICsgaXRlbU51bWJlclxuICAgICAgfTtcbiAgICB9XG5cbiAgICAkbG9nLmRlYnVnKFwiYWRkaW5nIHBheXBhbCBpbmZvXCIsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIHJldHVybntcbiAgICBnZXRDYXJ0IDogZ2V0Q2FydCxcbiAgICBzZXRDYXJ0IDogc2V0Q2FydCxcbiAgICB1cGRhdGVDYXJ0IDogdXBkYXRlQ2FydCxcbiAgICBnZXRTaGlwcGluZ1RpZXJzIDogZ2V0U2hpcHBpbmdUaWVycyxcbiAgICBjYWxjdWxhdGVTaGlwcGluZyA6IGNhbGN1bGF0ZVNoaXBwaW5nLFxuICAgIGNhcnRXYXRjaCA6IGNhcnRXYXRjaFxuICB9O1xuXG5cbn07XG5cbkNhcnRTZXJ2aWNlLiRpbmplY3QgPSBbJyRjb29raWVzJywgJyRzdGF0ZScsICckcm9vdFNjb3BlJywgJyRodHRwJywgJyRsb2cnXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydFNlcnZpY2U7XG4iXX0=
