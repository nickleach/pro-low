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
var CartController = function CartController($scope, CartService, $rootScope) {

  $scope.shippingTiers = CartService.getShippingTiers();

  $scope.cart.shipping = CartService.calculateShipping($scope.cart, $scope.shippingTiers);

  $scope.$watch('cart', function () {
    var subtotal = 0;
    if ($scope.cart.items) {
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
  }, true);

  $scope.removeItem = function (item) {
    $scope.cart.items = _.without($scope.cart.items, item);
    CartService.updateCart($scope.cart.items);
  };

  $scope.checkout = function (cart) {
    CartService.checkout(cart);
  };
};

CartController.$inject = ['$scope', 'CartService', '$rootScope'];

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

  $rootScope.cart = CartService.getCart();

  $scope.$watch('cart', function () {
    var subtotal = 0;
    if ($scope.cart.items) {

      $scope.cart.items.forEach(function (item) {
        subtotal += item.total();
      });

      $scope.cart.subtotal = subtotal.toFixed(2);
      $scope.cart.total = (subtotal + $scope.cart.shipping).toFixed(2);
      $scope.cart.totalItems = $scope.cart.items.reduce(function (total, item) {
        return total + item.quantity;
      }, 0);
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
var CartService = function CartService($cookies, $state, $rootScope, $http) {

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
        item: "item_" + itemNumber,
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
    $state.go('cart');
  }

  function updateCart(items) {
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

CartService.$inject = ['$cookies', '$state', '$rootScope', '$http'];

exports["default"] = CartService;
module.exports = exports["default"];

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxTQUFTLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUU7O0FBRXRFLG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FDWCxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ2IsT0FBRyxFQUFFLEdBQUc7QUFDUixlQUFXLEVBQUUsNEJBQTRCO0FBQ3pDLGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDWixPQUFHLEVBQUUsTUFBTTtBQUNYLGVBQVcsRUFBRSwyQkFBMkI7QUFDeEMsY0FBVSxFQUFFLFNBQVM7R0FDdEIsQ0FBQyxDQUNELEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDZCxPQUFHLEVBQUUsUUFBUTtBQUNiLGVBQVcsRUFBRSw2QkFBNkI7QUFDMUMsY0FBVSxFQUFFLGdCQUFnQjtHQUM3QixDQUFDLENBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRTtBQUNyQixPQUFHLEVBQUUsZUFBZTtBQUNwQixlQUFXLEVBQUUsb0NBQW9DO0FBQ2pELGNBQVUsRUFBRSx1QkFBdUI7R0FDcEMsQ0FBQyxDQUNELEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDaEIsT0FBRyxFQUFFLFVBQVU7QUFDZixlQUFXLEVBQUUsK0JBQStCO0FBQzVDLGNBQVUsRUFBRSxpQkFBaUI7R0FDOUIsQ0FBQyxDQUNELEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDZixPQUFHLEVBQUUsU0FBUztBQUNkLGVBQVcsRUFBRSw4QkFBOEI7QUFDM0MsY0FBVSxFQUFFLGlCQUFpQjtHQUM5QixDQUFDLENBQ0QsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUNoQixPQUFHLEVBQUUsVUFBVTtBQUNmLGVBQVcsRUFBRSwrQkFBK0I7QUFDNUMsY0FBVSxFQUFFLGdCQUFnQjtHQUM3QixDQUFDLENBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUNmLE9BQUcsRUFBRSxTQUFTO0FBQ2QsZUFBVyxFQUFFLDhCQUE4QjtBQUMzQyxjQUFVLEVBQUUsZ0JBQWdCO0dBQzdCLENBQUMsQ0FDRCxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ2IsT0FBRyxFQUFFLE9BQU87QUFDWixlQUFXLEVBQUUsNEJBQTRCO0FBQ3pDLGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDaEIsT0FBRyxFQUFFLFVBQVU7QUFDZixlQUFXLEVBQUUsK0JBQStCO0FBQzVDLGNBQVUsRUFBRSxhQUFhO0dBQzFCLENBQUMsQ0FBQztDQUVOOztBQUVELFNBQVMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUM7QUFDbkMsWUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZO0FBQzlDLGNBQVUsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ3pDLENBQUMsQ0FBQztDQUNKOztBQUVELElBQU0sTUFBTSxHQUFHOztBQUVULFVBQVEsRUFBRSw0QkFBNEI7QUFDdEMsVUFBUSxFQUFFLGtCQUFrQjtBQUM1QixZQUFVLEVBQUUsZUFBZTtBQUMzQixXQUFTLEVBQUUsMERBQTBEOztDQUV4RSxDQUFDO1FBRUYsTUFBTSxHQUFOLE1BQU07UUFDTixNQUFNLEdBQU4sTUFBTTtRQUNOLEdBQUcsR0FBSCxHQUFHOzs7Ozs7OztBQzNFTCxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUM7O0FBRTNELE1BQUksT0FBTyxHQUFHO0FBQ1osWUFBUSxFQUFHLENBQUM7QUFDWixTQUFLLEVBQUcsS0FBSztHQUNkLENBQUM7O0FBRUYsTUFBSSxPQUFPLEdBQUc7QUFDWixZQUFRLEVBQUcsQ0FBQztBQUNaLFNBQUssRUFBRyxLQUFLO0dBQ2QsQ0FBQzs7QUFFRixNQUFJLFFBQVEsR0FBRztBQUNiLFlBQVEsRUFBRyxFQUFFO0FBQ2IsU0FBSyxFQUFFLEtBQUs7R0FDYixDQUFDOztBQUVGLFFBQU0sQ0FBQyxJQUFJLEdBQUc7QUFDWixZQUFRLEVBQUUsQ0FBQztBQUNYLFNBQUssRUFBRSw0QkFBNEI7QUFDbkMsU0FBSyxFQUFFLEtBQUs7R0FDYixDQUFDOztBQUVGLFFBQU0sQ0FBQyxhQUFhLEdBQUcsVUFBUyxRQUFRLEVBQUU7O0FBRXhDLFFBQUcsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUM7QUFDOUIsWUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUNuQyxNQUFLLElBQUcsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUM7QUFDbkUsWUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUNuQyxNQUFLLElBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUM7QUFDbkMsWUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztLQUNwQztHQUVGLENBQUM7O0FBR0YsUUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFTLElBQUksRUFBRSxLQUFLLEVBQUM7QUFDdEMsZUFBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDbEMsQ0FBQztDQUVIO3FCQUNjLGFBQWE7Ozs7Ozs7OztBQ3pDNUIsSUFBSSxjQUFjLEdBQUcsU0FBakIsY0FBYyxDQUFZLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDOztBQUU1RCxRQUFNLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOztBQUV0RCxRQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7O0FBRzFGLFFBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVc7QUFDN0IsUUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLFFBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUM7QUFDbkIsWUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQ3ZDLGdCQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO09BQzFCLENBQUMsQ0FBQzs7QUFFSCxnQkFBVSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTVELFlBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJLEVBQUk7QUFDOUQsZUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztPQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBRVA7O0FBRUQsVUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3hGLFVBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0MsVUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUEsQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FFbEUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFHVCxRQUFNLENBQUMsVUFBVSxHQUFHLFVBQVMsSUFBSSxFQUFDO0FBQ2pDLFVBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEQsZUFBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzFDLENBQUM7O0FBRUYsUUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFTLElBQUksRUFBQztBQUM5QixlQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQzVCLENBQUM7Q0FJSCxDQUFDOztBQUVGLGNBQWMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDOztxQkFFbEQsY0FBYzs7Ozs7Ozs7O0FDNUM3QixTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxFQUVqQztxQkFDYyxpQkFBaUI7Ozs7Ozs7OztBQ0hoQyxTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQzs7QUFFOUcsWUFBVSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7O0FBRXhDLFFBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVc7QUFDL0IsUUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLFFBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUM7O0FBRXJCLFlBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFTLElBQUksRUFBRTtBQUN2QyxnQkFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztPQUMxQixDQUFDLENBQUM7O0FBSUgsWUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQyxZQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQSxDQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxZQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFJO0FBQzlELGVBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7T0FDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUVQO0dBRUYsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR1QsUUFBTSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsUUFBTSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MsTUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDbEMsTUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Ozs7Ozs7O0FBUXBDLFdBQVMsWUFBWSxDQUFDLEtBQUssRUFBRTtBQUMzQixRQUFJLFVBQVUsR0FBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQU07QUFDbkMsZ0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUM5QixFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1QsV0FBTyxVQUFVLENBQUM7R0FDbkI7OztBQUlELFFBQU0sQ0FBQyxVQUFVLEdBQUcsVUFBUyxLQUFLLEVBQUUsR0FBRyxFQUFDO0FBQ3RDLEtBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNoRCxLQUFDLENBQUMsR0FBRyxHQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3pDLFVBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDNUIsVUFBSSxHQUFHLElBQUksTUFBTSxFQUFDO0FBQ2hCLGNBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNwQixZQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFDOUIsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO09BQ3hCLE1BQUssSUFBRyxHQUFHLElBQUksT0FBTyxFQUFDO0FBQ3RCLGNBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNyQixZQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFDN0IsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO09BQ3ZCO0tBQUMsQ0FBQyxDQUFDO0dBRUwsQ0FBQzs7QUFFRixRQUFNLENBQUMsWUFBWSxHQUFHLFVBQVMsRUFBRSxFQUFFO0FBQ2pDLGFBQVMsQ0FBQyxJQUFJLENBQUM7QUFDYixnQkFBVSxFQUFFLFVBQVU7QUFDdEIsaUJBQVcsRUFBRSxnQ0FBZ0M7QUFDN0MsWUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUN0QyxpQkFBVyxFQUFFLEVBQUU7QUFDZix5QkFBbUIsRUFBRSxJQUFJO0tBQzFCLENBQUMsQ0FBQztHQUNKLENBQUM7QUFDRixRQUFNLENBQUMsWUFBWSxHQUFHLFVBQVMsRUFBRSxFQUFFO0FBQ2pDLGFBQVMsQ0FBQyxJQUFJLENBQUM7QUFDYixnQkFBVSxFQUFFLFVBQVU7QUFDdEIsaUJBQVcsRUFBRSxnQ0FBZ0M7QUFDN0MsWUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUN0QyxpQkFBVyxFQUFFLEVBQUU7QUFDZix5QkFBbUIsRUFBRSxJQUFJO0tBQzFCLENBQUMsQ0FBQztHQUNKLENBQUM7O0FBRUYsUUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFTLE9BQU8sRUFBQyxFQUVuQyxDQUFDO0NBQ0g7O0FBR0QsU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQztBQUNwQyxRQUFNLENBQUMsS0FBSyxHQUFHLFlBQVk7QUFDekIsY0FBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0dBQzdCLENBQUM7Q0FHSDtBQUNELFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUM7QUFDbkMsUUFBTSxDQUFDLEtBQUssR0FBRyxZQUFZO0FBQ3pCLGNBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUM1QixDQUFDO0NBRUg7O0FBRUQsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQztBQUNwQyxRQUFNLENBQUMsTUFBTSxHQUFHLFlBQVc7QUFDekIsYUFBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0dBQ3BCLENBQUM7O0FBRUYsUUFBTSxDQUFDLElBQUksR0FBRyxZQUFXO0FBQ3ZCLGFBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNsQixDQUFDO0NBQ0g7O1FBR0MsY0FBYyxHQUFkLGNBQWM7UUFDZCxTQUFTLEdBQVQsU0FBUztRQUNULFFBQVEsR0FBUixRQUFRO1FBQ1IsVUFBVSxHQUFWLFVBQVU7Ozs7Ozs7O0FDbEhaLFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBQzs7QUFFNUIsUUFBTSxDQUFDLElBQUksR0FBRyxZQUFVO0FBQ3RCLFdBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDdkIsQ0FBQzs7QUFFRixRQUFNLENBQUMsTUFBTSxHQUFHLENBQ2Q7QUFDRSxTQUFLLEVBQUUsMENBQTBDO0FBQ2pELE9BQUcsRUFBRSx1Q0FBdUM7QUFDNUMsZUFBVyxFQUFFLEVBQUU7R0FDaEIsRUFDRDtBQUNFLFNBQUssRUFBRSx1Q0FBdUM7QUFDOUMsT0FBRyxFQUFFLG9DQUFvQztBQUN6QyxlQUFXLEVBQUUsRUFBRTtHQUNoQixFQUNEO0FBQ0UsU0FBSyxFQUFFLHNDQUFzQztBQUM3QyxPQUFHLEVBQUUsbUNBQW1DO0FBQ3hDLGVBQVcsRUFBRSxFQUFFO0dBQ2hCOzs7Ozs7QUFNRDtBQUNFLFNBQUssRUFBRSw0Q0FBNEM7QUFDbkQsT0FBRyxFQUFFLHlDQUF5QztBQUM5QyxlQUFXLEVBQUUsRUFBRTtHQUNoQixFQUNEO0FBQ0UsU0FBSyxFQUFFLDRDQUE0QztBQUNuRCxPQUFHLEVBQUUseUNBQXlDO0FBQzlDLGVBQVcsRUFBRSxFQUFFO0dBQ2hCLEVBQ0Q7QUFDRSxTQUFLLEVBQUUsNENBQTRDO0FBQ25ELE9BQUcsRUFBRSx5Q0FBeUM7QUFDOUMsZUFBVyxFQUFFLEVBQUU7R0FDaEIsRUFDRDtBQUNFLFNBQUssRUFBRSw0Q0FBNEM7QUFDbkQsT0FBRyxFQUFFLHlDQUF5QztBQUM5QyxlQUFXLEVBQUUsRUFBRTtHQUNoQixFQUNEO0FBQ0UsU0FBSyxFQUFFLDRDQUE0QztBQUNuRCxPQUFHLEVBQUUseUNBQXlDO0FBQzlDLGVBQVcsRUFBRSxFQUFFO0dBQ2hCLENBQ0YsQ0FBQztDQUVMOztxQkFFYyxlQUFlOzs7Ozs7Ozs7cUJDeEROLHFCQUFxQjs7QUFBOUIsU0FBUyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUMsRUFFcEQ7Ozs7Ozs7OztzQkNGaUMsVUFBVTs7eUNBQ29CLDhCQUE4Qjs7d0NBQ3BFLDZCQUE2Qjs7OzswQ0FDM0IsK0JBQStCOzs7O3lDQUNoQyw4QkFBOEI7Ozs7NENBQzNCLGlDQUFpQzs7OztnREFDN0IscUNBQXFDOzs7O21DQUMvQyx3QkFBd0I7Ozs7QUFFaEQsT0FBTyxDQUNOLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRyxXQUFXLENBQUMsQ0FBQyxDQUN6RSxNQUFNLGdCQUFRLENBQ2QsUUFBUSxDQUFDLFFBQVEsaUJBQVMsQ0FDMUIsR0FBRyxhQUFLLENBQ1IsT0FBTyxDQUFDLGFBQWEsbUNBQWMsQ0FDbkMsVUFBVSxDQUFDLGdCQUFnQiw0Q0FBaUIsQ0FDNUMsVUFBVSxDQUFDLFVBQVUsc0NBQVcsQ0FDaEMsVUFBVSxDQUFDLFdBQVcsdUNBQVksQ0FDbEMsVUFBVSxDQUFDLFlBQVksd0NBQWEsQ0FDcEMsVUFBVSxDQUFDLFNBQVMsd0NBQWdCLENBQ3BDLFVBQVUsQ0FBQyxpQkFBaUIsMENBQWtCLENBQzlDLFVBQVUsQ0FBQyxnQkFBZ0IseUNBQWlCLENBQzVDLFVBQVUsQ0FBQyxhQUFhLDRDQUFvQixDQUM1QyxVQUFVLENBQUMsdUJBQXVCLGdEQUF3QixDQUFDOzs7Ozs7OztBQ3ZCNUQsSUFBSSxXQUFXLEdBQUcsU0FBZCxXQUFXLENBQVksUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDOztBQUU3RCxNQUFNLE1BQU0sR0FBRyx1Q0FBdUMsQ0FBQzs7QUFFdkQsV0FBUyxJQUFJLENBQUMsT0FBTyxFQUFDO0FBQ3BCLFFBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUMzQixRQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDM0IsUUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ2pDLFFBQUksQ0FBQyxLQUFLLEdBQUcsWUFBVTtBQUNyQixhQUFPLEFBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFLLENBQUMsQ0FBQztLQUMxQyxDQUFDO0dBRUg7O0FBRUQsV0FBUyxPQUFPLEdBQUU7QUFDaEIsUUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxRQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO0FBQ2xDLGdCQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUMzQixhQUFPLEVBQUUsQ0FBQztLQUNYO0FBQ0QsY0FBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDMUIsUUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBSztBQUNyQyxVQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixhQUFPLFFBQVEsQ0FBQztLQUNqQixDQUFDLENBQUM7O0FBRUgsU0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUM7QUFDeEMsVUFBSSxVQUFVLEdBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxDQUFDO0FBQ3pCLGVBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUc7QUFDcEIsWUFBSSxFQUFHLE9BQU8sR0FBRyxVQUFVO0FBQzNCLGNBQU0sRUFBRSxTQUFTLEdBQUUsVUFBVTtBQUM3QixnQkFBUSxFQUFFLFdBQVcsR0FBRyxVQUFVO09BQ25DLENBQUM7S0FDSDs7QUFFRCxRQUFJLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWQsUUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDdkIsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJLEVBQUk7QUFDaEQsYUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVSLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBRUQsV0FBUyxPQUFPLENBQUMsSUFBSSxFQUFDO0FBQ3BCLGNBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFFBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsUUFBRyxDQUFDLElBQUksRUFBQztBQUNQLFVBQUksR0FBRyxFQUFFLENBQUM7S0FDWDs7QUFFRCxRQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEQsUUFBRyxhQUFhLEVBQUM7QUFDZixVQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDdEMsbUJBQWEsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2hFLFVBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDMUIsTUFBSTtBQUNILFVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakI7QUFDRCxZQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqQyxVQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ25COztBQUVELFdBQVMsVUFBVSxDQUFDLEtBQUssRUFBQztBQUN4QixZQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNsQyxXQUFPLE9BQU8sRUFBRSxDQUFDO0dBQ2xCOztBQUVELFdBQVMsZ0JBQWdCLEdBQUU7QUFDekIsUUFBSSxRQUFRLEdBQUc7QUFDYixXQUFLLEVBQUU7QUFDTCxnQkFBUSxFQUFFLENBQUM7QUFDWCxhQUFLLEVBQUUsQ0FBQztPQUNUO0FBQ0QsV0FBSyxFQUFFO0FBQ0wsZ0JBQVEsRUFBRSxFQUFFO0FBQ1osYUFBSyxFQUFFLEVBQUU7T0FDVjtBQUNELFdBQUssRUFBRTtBQUNMLGdCQUFRLEVBQUUsRUFBRTtBQUNaLGFBQUssRUFBRSxFQUFFO09BQ1Y7S0FDRixDQUFDO0FBQ0YsV0FBTyxRQUFRLENBQUM7R0FDakI7O0FBRUQsV0FBUyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFDO0FBQ3JDLFFBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDO0FBQ3JGLGFBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7S0FDeEIsTUFBSyxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQztBQUN6RixhQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQzFCLE1BQUssSUFBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ2hELGFBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7S0FDekIsTUFBSTtBQUNILGFBQU8sQ0FBQyxDQUFDO0tBQ1Y7R0FDRjs7QUFFRCxTQUFNO0FBQ0osV0FBTyxFQUFHLE9BQU87QUFDakIsV0FBTyxFQUFHLE9BQU87QUFDakIsY0FBVSxFQUFHLFVBQVU7QUFDdkIsb0JBQWdCLEVBQUcsZ0JBQWdCO0FBQ25DLHFCQUFpQixFQUFHLGlCQUFpQjtHQUN0QyxDQUFDO0NBR0gsQ0FBQzs7QUFFRixXQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7O3FCQUVyRCxXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIpIHtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2hvbWUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdidXknLCB7XG4gICAgICB1cmw6ICcvYnV5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2J1eS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQnV5Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnc3RvcnknLCB7XG4gICAgICB1cmw6ICcvc3RvcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvc3RvcnkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMnLCB7XG4gICAgICB1cmw6ICcvdGVzdGltb25pYWxzJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3Rlc3RpbW9uaWFscy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwcmljaW5nJywge1xuICAgICAgdXJsOiAnL3ByaWNpbmcnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvcHJpY2luZy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2Rlc2lnbicsIHtcbiAgICAgIHVybDogJy9kZXNpZ24nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZGVzaWduLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY2FydCcsIHtcbiAgICAgIHVybDogJy9jYXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NhcnQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NhcnRDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gcnVuKENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcbiAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICRyb290U2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLmdldENhcnQoKTtcbiAgfSk7XG59XG5cbmNvbnN0IHBheXBhbCA9IHtcblxuICAgICAgdXNlcm5hbWU6ICdhaW5lcy5rZXZpbl9hcGkxLmdtYWlsLmNvbScsXG4gICAgICBwYXNzd29yZDogJ1Q2WDlEUjJCNzdCUTRZV0snLFxuICAgICAgY3JlZGVudGlhbDogJ0FQSSBTaWduYXR1cmUnLFxuICAgICAgc2lnbmF0dXJlOiAnQUZjV3hWMjFDN2ZkMHYzYllZWVJDcFNTUmwzMUEyRUVoQXpXemx4cS1FekVRdG9aTXFTY1I2eEknXG5cbiAgfTtcbmV4cG9ydCB7XG4gIHBheXBhbCxcbiAgY29uZmlnLFxuICBydW5cbn07XG4iLCJmdW5jdGlvbiBCdXlDb250cm9sbGVyKCRzY29wZSwgJGNvb2tpZXMsICRzdGF0ZSwgQ2FydFNlcnZpY2Upe1xuXG4gIGxldCBsb3dUaWVyID0ge1xuICAgIHF1YW50aXR5IDogNCxcbiAgICBwcmljZSA6IDM5Ljk1XG4gIH07XG5cbiAgbGV0IG1lZFRpZXIgPSB7XG4gICAgcXVhbnRpdHkgOiA5LFxuICAgIHByaWNlIDogMzUuMDBcbiAgfTtcblxuICBsZXQgaGlnaFRpZXIgPSB7XG4gICAgcXVhbnRpdHkgOiAxNSxcbiAgICBwcmljZTogMzAuMDBcbiAgfTtcblxuICAkc2NvcGUuaXRlbSA9IHtcbiAgICBxdWFudGl0eTogMSxcbiAgICB0aXRsZTogXCJUaGUgUHJvIExvdyBQdXR0aW5nIFN5c3RlbVwiLFxuICAgIHByaWNlOiAzOS45NVxuICB9O1xuXG4gICRzY29wZS5jaGVja1F1YW50aXR5ID0gZnVuY3Rpb24ocXVhbnRpdHkpIHtcblxuICAgIGlmKHF1YW50aXR5IDw9IGxvd1RpZXIucXVhbnRpdHkpe1xuICAgICAgJHNjb3BlLml0ZW0ucHJpY2UgPSBsb3dUaWVyLnByaWNlO1xuICAgIH1lbHNlIGlmKHF1YW50aXR5IDw9IG1lZFRpZXIucXVhbnRpdHkgJiYgcXVhbnRpdHkgPiBsb3dUaWVyLnF1YW50aXR5KXtcbiAgICAgICRzY29wZS5pdGVtLnByaWNlID0gbWVkVGllci5wcmljZTtcbiAgICB9ZWxzZSBpZihxdWFudGl0eSA+IG1lZFRpZXIucXVhbnRpdHkpe1xuICAgICAgJHNjb3BlLml0ZW0ucHJpY2UgPSBoaWdoVGllci5wcmljZTtcbiAgICB9XG5cbiAgfTtcblxuXG4gICRzY29wZS5hZGRUb0NhcnQgPSBmdW5jdGlvbihpdGVtLCBwcmljZSl7XG4gICAgQ2FydFNlcnZpY2Uuc2V0Q2FydChpdGVtLCBwcmljZSk7XG4gIH07XG5cbn1cbmV4cG9ydCBkZWZhdWx0IEJ1eUNvbnRyb2xsZXI7XG4iLCJsZXQgQ2FydENvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUsIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcblxuICAkc2NvcGUuc2hpcHBpbmdUaWVycyA9IENhcnRTZXJ2aWNlLmdldFNoaXBwaW5nVGllcnMoKTtcblxuICAkc2NvcGUuY2FydC5zaGlwcGluZyA9IENhcnRTZXJ2aWNlLmNhbGN1bGF0ZVNoaXBwaW5nKCRzY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycyk7XG5cblxuJHNjb3BlLiR3YXRjaCgnY2FydCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoJHNjb3BlLmNhcnQuaXRlbXMpe1xuICAgICAgJHNjb3BlLmNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHN1YnRvdGFsICs9IGl0ZW0udG90YWwoKTtcbiAgICAgIH0pO1xuXG4gICAgICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS51cGRhdGVDYXJ0KCRzY29wZS5jYXJ0Lml0ZW1zKTtcblxuICAgICAgJHNjb3BlLmNhcnQudG90YWxJdGVtcyA9ICRzY29wZS5jYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICB9LCAwKTtcblxuICAgIH1cblxuICAgICRzY29wZS5jYXJ0LnNoaXBwaW5nID0gQ2FydFNlcnZpY2UuY2FsY3VsYXRlU2hpcHBpbmcoJHNjb3BlLmNhcnQsICRzY29wZS5zaGlwcGluZ1RpZXJzKTtcbiAgICAkc2NvcGUuY2FydC5zdWJ0b3RhbCA9IHN1YnRvdGFsLnRvRml4ZWQoMik7XG4gICAgJHNjb3BlLmNhcnQudG90YWwgPSAoc3VidG90YWwgKyAkc2NvcGUuY2FydC5zaGlwcGluZykudG9GaXhlZCgyKTtcblxuICB9LCB0cnVlKTtcblxuXG4gICRzY29wZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24oaXRlbSl7XG4gICAkc2NvcGUuY2FydC5pdGVtcyA9ICBfLndpdGhvdXQoJHNjb3BlLmNhcnQuaXRlbXMsIGl0ZW0pO1xuICAgQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrb3V0ID0gZnVuY3Rpb24oY2FydCl7XG4gICAgQ2FydFNlcnZpY2UuY2hlY2tvdXQoY2FydCk7XG4gIH07XG5cblxuXG59O1xuXG5DYXJ0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQ2FydFNlcnZpY2UnLCAnJHJvb3RTY29wZSddO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJ0Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIENvbnRhY3RDb250cm9sbGVyKCRzY29wZSl7XG5cbn1cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlLCAkbWREaWFsb2csIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcblxuICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG5cbiAgJHNjb3BlLiR3YXRjaCgnY2FydCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoJHNjb3BlLmNhcnQuaXRlbXMpe1xuXG4gICAgJHNjb3BlLmNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgfSk7XG5cblxuXG4gICAgJHNjb3BlLmNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICRzY29wZS5jYXJ0LnRvdGFsID0gKHN1YnRvdGFsICsgJHNjb3BlLmNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG4gICAgJHNjb3BlLmNhcnQudG90YWxJdGVtcyA9ICRzY29wZS5jYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgfSwgMCk7XG5cbiAgICB9XG5cbiAgfSwgdHJ1ZSk7XG5cbiAgLy8gbmF2IHRvZ2dsZXNcbiAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBidWlsZFRvZ2dsZXIoJ2xlZnQnKTtcbiAgJHNjb3BlLnRvZ2dsZVJpZ2h0ID0gYnVpbGRUb2dnbGVyKCdyaWdodCcpO1xuICBsZXQgJGxlZnQgPSAkKCcubWQtc2lkZW5hdi1sZWZ0Jyk7XG4gIGxldCAkcmlnaHQgPSAkKCcubWQtc2lkZW5hdi1yaWdodCcpO1xuXG4gIC8vIGxpc3QgaXRlbSBjbGljayBldmVudFxuICAvLyAkKCdtZC1saXN0LWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAvLyAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyAgICQodGhpcykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkVG9nZ2xlcihuYXZJRCkge1xuICAgIGxldCBkZWJvdW5jZUZuID0gICRtZFV0aWwuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICRtZFNpZGVuYXYobmF2SUQpLnRvZ2dsZSgpO1xuICAgICAgfSwzMDApO1xuICAgIHJldHVybiBkZWJvdW5jZUZuO1xuICB9XG5cblxuICAvLyBOYXZpZ2F0ZSBmdW5jdGlvblxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHN0YXRlLCBuYXYpe1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyMnKyBzdGF0ZSkuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKHN0YXRlKS50aGVuKCgpID0+IHtcbiAgICBpZiAobmF2ID09IFwibGVmdFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgICBpZighJHJpZ2h0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgfWVsc2UgaWYobmF2ID09IFwicmlnaHRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICAgIGlmKCEkbGVmdC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgfX0pO1xuXG4gIH07XG5cbiAgJHNjb3BlLnNob3dXYXJyYW50eSA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgJG1kRGlhbG9nLnNob3coe1xuICAgICAgY29udHJvbGxlcjogRGlhbG9nQ3RybCxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3dhcnJhbnR5LnRwbC5odG1sJyxcbiAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcbiAgJHNjb3BlLnNob3dTaGlwcGluZyA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgJG1kRGlhbG9nLnNob3coe1xuICAgICAgY29udHJvbGxlcjogRGlhbG9nQ3RybCxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3NoaXBwaW5nLnRwbC5odG1sJyxcbiAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUuY29udGFjdFVzID0gZnVuY3Rpb24oY29udGFjdCl7XG5cbiAgfTtcbn1cblxuXG5mdW5jdGlvbiBSaWdodEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ3JpZ2h0JykuY2xvc2UoKTtcbiAgfTtcblxuXG59XG5mdW5jdGlvbiBMZWZ0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XG4gIH07XG5cbn1cblxuZnVuY3Rpb24gRGlhbG9nQ3RybCgkc2NvcGUsICRtZERpYWxvZyl7XG4gICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAkbWREaWFsb2cuY2FuY2VsKCk7XG4gIH07XG5cbiAgJHNjb3BlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAkbWREaWFsb2cuaGlkZSgpO1xuICB9O1xufVxuXG5leHBvcnQge1xuICBNYWluQ29udHJvbGxlcixcbiAgUmlnaHRDdHJsLFxuICBMZWZ0Q3RybCxcbiAgRGlhbG9nQ3RybFxufTtcbiIsImZ1bmN0aW9uIE1lZGlhQ29udHJvbGxlcigkc2NvcGUpe1xuXG4gICAgJHNjb3BlLnRlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgY29uc29sZS5sb2coJ3dvcmtlZCcpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvY2xvc2V1cDEtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2Nsb3NldXAxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMva2V2aW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2tldmluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4zLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgIC8vICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluMy1jb21wcmVzc29yLmpwZycsXG4gICAgICAvLyAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgLy8gfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTEtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUyLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUyLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMy1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTQtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTQtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU1LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU1LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9XG4gICAgXTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBNZWRpYUNvbnRyb2xsZXI7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUZXN0aW1vbmlhbENvbnRyb2xsZXIoJHNjb3BlKXtcblxufVxuIiwiaW1wb3J0IHtjb25maWcsIHJ1biwgcGF5cGFsfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciwgTGVmdEN0cmwsIFJpZ2h0Q3RybCwgRGlhbG9nQ3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXInO1xuaW1wb3J0IEJ1eUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9CdXlDb250cm9sbGVyJztcbmltcG9ydCBNZWRpYUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9NZWRpYUNvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXInO1xuaW1wb3J0IENvbnRhY3RDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXInO1xuaW1wb3J0IFRlc3RpbW9uaWFsQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9DYXJ0U2VydmljZSc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2FwcCcsIFsndWkucm91dGVyJywgJ25nTWF0ZXJpYWwnLCAnamt1cmkuZ2FsbGVyeScgLCAnbmdDb29raWVzJ10pXG4uY29uZmlnKGNvbmZpZylcbi5jb25zdGFudCgnUEFZUEFMJywgcGF5cGFsKVxuLnJ1bihydW4pXG4uZmFjdG9yeSgnQ2FydFNlcnZpY2UnLCBDYXJ0U2VydmljZSlcbi5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0xlZnRDdHJsJywgTGVmdEN0cmwpXG4uY29udHJvbGxlcignUmlnaHRDdHJsJywgUmlnaHRDdHJsKVxuLmNvbnRyb2xsZXIoJ0RpYWxvZ0N0cmwnLCBEaWFsb2dDdHJsKVxuLmNvbnRyb2xsZXIoJ0J1eUN0cmwnLCBCdXlDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ01lZGlhQ29udHJvbGxlcicsIE1lZGlhQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDYXJ0Q29udHJvbGxlcicsIENhcnRDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0NvbnRhY3RDdHJsJywgQ29udGFjdENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignVGVzdGltb25pYWxDb250cm9sbGVyJywgVGVzdGltb25pYWxDb250cm9sbGVyKTtcbiIsImxldCBDYXJ0U2VydmljZSA9IGZ1bmN0aW9uKCRjb29raWVzLCAkc3RhdGUsICRyb290U2NvcGUsICRodHRwKXtcblxuICBjb25zdCBwYXlwYWwgPSBcImh0dHBzOi8vd3d3LnBheXBhbC5jb20vY2dpLWJpbi93ZWJzY3JcIjtcblxuICBmdW5jdGlvbiBJdGVtKG9wdGlvbnMpe1xuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlO1xuICAgIHRoaXMucHJpY2UgPSBvcHRpb25zLnByaWNlO1xuICAgIHRoaXMucXVhbnRpdHkgPSBvcHRpb25zLnF1YW50aXR5O1xuICAgIHRoaXMudG90YWwgPSBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuICh0aGlzLnF1YW50aXR5ICogdGhpcy5wcmljZSkgfHwgMDtcbiAgICB9O1xuXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDYXJ0KCl7XG4gICAgbGV0IGNhcnRMaXN0ID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdjYXJ0Jyk7XG4gICAgaWYoIWNhcnRMaXN0IHx8IGNhcnRMaXN0Lmxlbmd0aCA8IDEpe1xuICAgICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gZmFsc2U7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgICRyb290U2NvcGUuaGFzQ2FydCA9IHRydWU7XG4gICAgbGV0IGNhcnRJdGVtcyA9IGNhcnRMaXN0Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgbGV0IGNhcnRJdGVtID0gbmV3IEl0ZW0oaXRlbSk7XG4gICAgICByZXR1cm4gY2FydEl0ZW07XG4gICAgfSk7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2FydEl0ZW1zLmxlbmd0aDsgaSArKyl7XG4gICAgICB2YXIgaXRlbU51bWJlciA9IChpICsgMSk7XG4gICAgICBjYXJ0SXRlbXNbaV0ucGF5cGFsID0ge1xuICAgICAgICBpdGVtIDogXCJpdGVtX1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgYW1vdW50OiBcImFtb3VudF9cIisgaXRlbU51bWJlcixcbiAgICAgICAgcXVhbnRpdHk6IFwicXVhbnRpdHlfXCIgKyBpdGVtTnVtYmVyXG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBjYXJ0ID0ge307XG5cbiAgICBjYXJ0Lml0ZW1zID0gY2FydEl0ZW1zO1xuICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICB9LCAwKTtcblxuICAgIHJldHVybiBjYXJ0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FydChpdGVtKXtcbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0ID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdjYXJ0Jyk7XG4gICAgaWYoIWNhcnQpe1xuICAgICAgY2FydCA9IFtdO1xuICAgIH1cblxuICAgIGxldCBhbHJlYWR5RXhpc3RzID0gXy5maW5kV2hlcmUoY2FydCwgaXRlbS50aXRsZSk7XG4gICAgaWYoYWxyZWFkeUV4aXN0cyl7XG4gICAgICBjYXJ0ID0gXy53aXRob3V0KGNhcnQsIGFscmVhZHlFeGlzdHMpO1xuICAgICAgYWxyZWFkeUV4aXN0cy5xdWFudGl0eSA9IGFscmVhZHlFeGlzdHMucXVhbnRpdHkgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgY2FydC5wdXNoKGFscmVhZHlFeGlzdHMpO1xuICAgIH1lbHNle1xuICAgICAgY2FydC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICAkY29va2llcy5wdXRPYmplY3QoJ2NhcnQnLCBjYXJ0KTtcbiAgICAkc3RhdGUuZ28oJ2NhcnQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNhcnQoaXRlbXMpe1xuICAgICRjb29raWVzLnB1dE9iamVjdCgnY2FydCcsIGl0ZW1zKTtcbiAgICByZXR1cm4gZ2V0Q2FydCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2hpcHBpbmdUaWVycygpe1xuICAgIGxldCBzaGlwcGluZyA9IHtcbiAgICAgIHRpZXIxOiB7XG4gICAgICAgIHF1YW50aXR5OiA1LFxuICAgICAgICBwcmljZTogNVxuICAgICAgfSxcbiAgICAgIHRpZXIyOiB7XG4gICAgICAgIHF1YW50aXR5OiAxMCxcbiAgICAgICAgcHJpY2U6IDEwXG4gICAgICB9LFxuICAgICAgdGllcjM6IHtcbiAgICAgICAgcXVhbnRpdHk6IDIwLFxuICAgICAgICBwcmljZTogMjBcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBzaGlwcGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHRpZXJzKXtcbiAgICBpZihjYXJ0LnRvdGFsSXRlbXMgPj0gdGllcnMudGllcjEucXVhbnRpdHkgJiYgY2FydC50b3RhbEl0ZW1zIDwgdGllcnMudGllcjIucXVhbnRpdHkpe1xuICAgIHJldHVybiB0aWVycy50aWVyMS5wcmljZTtcbiAgICB9ZWxzZSBpZihjYXJ0LnRvdGFsSXRlbXMgPj0gdGllcnMudGllcjIucXVhbnRpdHkgJiYgY2FydC50b3RhbEl0ZW1zIDwgdGllcnMudGllcjMucXVhbnRpdHkpe1xuICAgICAgcmV0dXJuIHRpZXJzLnRpZXIyLnByaWNlO1xuICAgIH1lbHNlIGlmKGNhcnQudG90YWxJdGVtcyA+IHRpZXJzLnRpZXIzLnF1YW50aXR5ICl7XG4gICAgIHJldHVybiB0aWVycy50aWVyMy5wcmljZTtcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybntcbiAgICBnZXRDYXJ0IDogZ2V0Q2FydCxcbiAgICBzZXRDYXJ0IDogc2V0Q2FydCxcbiAgICB1cGRhdGVDYXJ0IDogdXBkYXRlQ2FydCxcbiAgICBnZXRTaGlwcGluZ1RpZXJzIDogZ2V0U2hpcHBpbmdUaWVycyxcbiAgICBjYWxjdWxhdGVTaGlwcGluZyA6IGNhbGN1bGF0ZVNoaXBwaW5nXG4gIH07XG5cblxufTtcblxuQ2FydFNlcnZpY2UuJGluamVjdCA9IFsnJGNvb2tpZXMnLCAnJHN0YXRlJywgJyRyb290U2NvcGUnLCAnJGh0dHAnXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydFNlcnZpY2U7XG4iXX0=
