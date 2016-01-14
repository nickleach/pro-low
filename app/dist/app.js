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

function run(CartService, UserService, $rootScope) {
  $rootScope.$on('$stateChangeStart', function () {
    UserService.checkUser();
    $rootScope.cart = CartService.getCart();
  });
}

var paypal = {
  username: 'aines.kevin_api1.gmail.com',
  password: 'T6X9DR2B77BQ4YWK',
  credential: 'API Signature',
  signature: 'AFcWxV21C7fd0v3bYYYRCpSSRl31A2EEhAzWzlxq-EzEQtoZMqScR6xI'
};

var API = {
  URL: 'http://admin.prolowputting.com/api',
  CONFIG: {
    headers: {}
  }
};
exports.paypal = paypal;
exports.config = config;
exports.run = run;
exports.API = API;

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
function ContactController($scope, UserService) {

  $scope.contact = function (data) {
    $scope.loading = true;

    UserService.contact(data).success(function (data) {
      $scope.loading = false;
      $scope.message = data.message;
    }).error(function (data) {
      $scope.loading = false;
      $scope.message = data.message;
    });
  };

  $scope.wholesaleRequest = function (data) {
    $scope.loading = true;

    UserService.wholesaleRequest(data).success(function (data) {
      $scope.loading = false;
      $scope.message = data.message;
    }).error(function (data) {
      $scope.loading = false;
      $scope.message = data.message;
    });
  };
}

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
      $scope.cart = CartService.calculateShipping($scope.cart, $scope.shippingTiers);
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

function TestimonialController($scope, TestimonialService, $log) {
  $scope.loadingTestimonials = true;

  TestimonialService.getTestimonials().success(function (data) {
    $scope.loadingTestimonials = false;
    $scope.testimonials = data;
    $log.debug($scope.testimonials);
  }).error(function (data) {
    $scope.loadingTestimonials = false;
    $scope.errorMessage = "We're sorry we could not load testimonials at this time. Please try again later.";
  });

  $scope.addTestimonial = function (testimonial) {
    $scope.addingTestimonial = true;

    TestimonialService.addTestimonial(testimonial).success(function (data) {
      $scope.addingTestimonial = false;
      $scope.addedTestimonialMessage = data.message;
    });
  };
}

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

var _servicesTestimonialService = require('./services/TestimonialService');

var _servicesTestimonialService2 = _interopRequireDefault(_servicesTestimonialService);

var _servicesUserService = require('./services/UserService');

var _servicesUserService2 = _interopRequireDefault(_servicesUserService);

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery', 'ngCookies']).config(_config.config).constant('PAYPAL', _config.paypal).constant('API', _config.API).run(_config.run).factory('CartService', _servicesCartService2['default']).factory('TestimonialService', _servicesTestimonialService2['default']).factory('UserService', _servicesUserService2['default']).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('DialogCtrl', _controllersMainController.DialogCtrl).controller('BuyCtrl', _controllersBuyController2['default']).controller('MediaController', _controllersMediaController2['default']).controller('CartController', _controllersCartController2['default']).controller('ContactCtrl', _controllersContactController2['default']).controller('TestimonialController', _controllersTestimonialController2['default']);

},{"./config":1,"./controllers/BuyController":2,"./controllers/CartController":3,"./controllers/ContactController":4,"./controllers/MainController":5,"./controllers/MediaController":6,"./controllers/TestimonialController":7,"./services/CartService":9,"./services/TestimonialService":10,"./services/UserService":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CartService = function CartService($cookies, $state, $rootScope, $http, $log, API) {

  var paypal = "https://www.paypal.com/cgi-bin/webscr";

  // item constructor

  function Item(options) {
    this.title = options.title;
    this.price = options.price;
    this.quantity = options.quantity;
    this.total = function () {
      return this.quantity * this.price || 0;
    };
  }

  function getItems() {
    return $http.get(API.URL + '/items');
  }

  function getSingleItem(item) {
    return $http.get(API.URL + '/items/' + item);
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
    cart.items.forEach(function (item) {
      if (item.quantity >= tiers.tier1.quantity && item.quantity < tiers.tier2.quantity) {
        item.shipping = tiers.tier1.price;
      } else if (item.quantity >= tiers.tier2.quantity && item.quantity < tiers.tier3.quantity) {
        item.shipping = tiers.tier2.price;
      } else if (item.quantity > tiers.tier3.quantity) {
        item.shipping = tiers.tier3.price;
      } else {
        item.shipping = 0;
      }
    });

    cart.shipping = cart.items.reduce(function (total, item) {
      return total + item.shipping;
    }, 0);

    return cart;
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
        quantity: "quantity_" + itemNumber,
        shipping: "shipping_" + itemNumber
      };
    }

    $log.debug("adding paypal info", cartItems);
    return cartItems;
  }

  return {
    getItems: getItems,
    getSingleItem: getSingleItem,
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

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TestimonialService = function TestimonialService($http, API) {

  function getTestimonials() {
    return $http.get(API.URL + "/testimonials");
  }

  function getSingleTestimonial(testimonialId) {
    return $http.get(API.URL + "/testimonials/" + testimonialId);
  }

  function addTestimonial(testimonial) {
    return $http.post(API.URL + "/testimonials", testimonial);
  }

  return {
    getTestimonials: getTestimonials,
    getSingleTestimonial: getSingleTestimonial,
    addTestimonial: addTestimonial
  };
};
exports["default"] = TestimonialService;
module.exports = exports["default"];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var UserService = function UserService($http, API, $cookies, $state, $rootScope) {

  function getUserInfo() {
    $http.get(API.URL + '/me').success(function (data) {
      $rootScope.userName = data.name;
      $rootScope.userItems = data.items;
    });
  }

  function checkUser() {
    var token = $cookies.get('token');
    if (token) {
      getUserInfo();
      _setToken(token);
    }
  }

  function _setToken(token) {
    if (token) {
      API.CONFIG.headers['x-access-token'] = token;
      $rootScope.isUserLoggedIn = true;
    } else {
      $rootScope.isUserLoggedIn = false;
    }
  }

  function wholesaleRequest(email) {
    return $http.post(API.URL + '/wholesale', email);
  }

  function contact(email) {
    return $http.post(API.URL + '/contact', email);
  }

  function login(user) {
    $http.post(API.URL + '/authenticate', user).success(function (data) {
      _successLog(data);
    });
  }

  function _successLog(data) {
    $cookies.put('token', data.token);
  }

  function _updateUser(userId, user) {
    return $http.put(API.URL + '/users/' + userId, user, API.CONFIG);
  }

  function logOut() {
    $cookies.remove('token');
    _setToken();
    $state.go('home');
  }

  function _getUser(userId) {
    return $http.get(API.URL + '/users/' + userId, API.CONFIG);
  }

  function forgotPassword(email) {
    return $http.post(API.URL + '/forgotPassword', email);
  }

  function _deleteUser(userId) {
    return $http['delete'](API.URL + '/users/' + userId);
  }

  return {
    checkUser: checkUser,
    wholesaleRequest: wholesaleRequest,
    contact: contact,
    login: login,
    logOut: logOut,
    _updateUser: _updateUser,
    _getUser: _getUser,
    _deleteUser: _deleteUser,
    forgotPassword: forgotPassword

  };
};

exports['default'] = UserService;
module.exports = exports['default'];

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZS5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsU0FBUyxNQUFNLENBQUMsY0FBYyxFQUFF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QUM7QUFDNUIsV0FBTyxLQUFLLENBQUMsSUFBSSxDQUFJLEdBQUcsQ0FBQyxHQUFHLHNCQUFtQixLQUFLLENBQUMsQ0FBQztHQUN2RDs7QUFFRCxXQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUM7QUFDMUIsV0FBTyxLQUFLLFVBQU8sQ0FBSSxHQUFHLENBQUMsR0FBRyxlQUFVLE1BQU0sQ0FBRyxDQUFDO0dBQ25EOztBQUVELFNBQU07QUFDSixhQUFTLEVBQVQsU0FBUztBQUNULG9CQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsV0FBTyxFQUFQLE9BQU87QUFDUCxTQUFLLEVBQUwsS0FBSztBQUNMLFVBQU0sRUFBTixNQUFNO0FBQ04sZUFBVyxFQUFYLFdBQVc7QUFDWCxZQUFRLEVBQVIsUUFBUTtBQUNSLGVBQVcsRUFBWCxXQUFXO0FBQ1gsa0JBQWMsRUFBZCxjQUFjOztHQUVmLENBQUM7Q0FDSCxDQUFDOztxQkFFYSxXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIsICRsb2dQcm92aWRlcikge1xuICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvaG9tZS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2J1eScsIHtcbiAgICAgIHVybDogJy9idXknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvYnV5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdCdXlDdHJsJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzdG9yeScsIHtcbiAgICAgIHVybDogJy9zdG9yeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zdG9yeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3Rlc3RpbW9uaWFscycsIHtcbiAgICAgIHVybDogJy90ZXN0aW1vbmlhbHMnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbGxlcnknLCB7XG4gICAgICB1cmw6ICcvZ2FsbGVyeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9nYWxsZXJ5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ZpZGVvcycsIHtcbiAgICAgIHVybDogJy92aWRlb3MnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdmlkZW9zLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ByaWNpbmcnLCB7XG4gICAgICB1cmw6ICcvcHJpY2luZycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9wcmljaW5nLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnZGVzaWduJywge1xuICAgICAgdXJsOiAnL2Rlc2lnbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9kZXNpZ24udHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgdXJsOiAnL2NhcnQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY2FydC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ2FydENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2NvbnRhY3QnLCB7XG4gICAgICB1cmw6ICcvY29udGFjdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9jb250YWN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBydW4oQ2FydFNlcnZpY2UsIFVzZXJTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcbiAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgIFVzZXJTZXJ2aWNlLmNoZWNrVXNlcigpO1xuICAgICRyb290U2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLmdldENhcnQoKTtcbiAgfSk7XG59XG5cbmNvbnN0IHBheXBhbCA9IHtcbiAgICAgIHVzZXJuYW1lOiAnYWluZXMua2V2aW5fYXBpMS5nbWFpbC5jb20nLFxuICAgICAgcGFzc3dvcmQ6ICdUNlg5RFIyQjc3QlE0WVdLJyxcbiAgICAgIGNyZWRlbnRpYWw6ICdBUEkgU2lnbmF0dXJlJyxcbiAgICAgIHNpZ25hdHVyZTogJ0FGY1d4VjIxQzdmZDB2M2JZWVlSQ3BTU1JsMzFBMkVFaEF6V3pseHEtRXpFUXRvWk1xU2NSNnhJJ1xufTtcblxuY29uc3QgQVBJID0ge1xuICBVUkw6ICdodHRwOi8vYWRtaW4ucHJvbG93cHV0dGluZy5jb20vYXBpJyxcbiAgQ09ORklHOiB7XG4gICAgaGVhZGVyczp7XG5cbiAgICB9XG4gIH1cbn07XG5leHBvcnQge1xuICBwYXlwYWwsXG4gIGNvbmZpZyxcbiAgcnVuLFxuICBBUElcbn07XG4iLCJmdW5jdGlvbiBCdXlDb250cm9sbGVyKCRzY29wZSwgJGNvb2tpZXMsICRzdGF0ZSwgQ2FydFNlcnZpY2Upe1xuXG4gIGxldCBsb3dUaWVyID0ge1xuICAgIHF1YW50aXR5IDogNCxcbiAgICBwcmljZSA6IDM5Ljk1XG4gIH07XG5cbiAgbGV0IG1lZFRpZXIgPSB7XG4gICAgcXVhbnRpdHkgOiA5LFxuICAgIHByaWNlIDogMzUuMDBcbiAgfTtcblxuICBsZXQgaGlnaFRpZXIgPSB7XG4gICAgcXVhbnRpdHkgOiAxNSxcbiAgICBwcmljZTogMzAuMDBcbiAgfTtcblxuICAkc2NvcGUuaXRlbSA9IHtcbiAgICBxdWFudGl0eTogMSxcbiAgICB0aXRsZTogXCJUaGUgUHJvIExvdyBQdXR0aW5nIFN5c3RlbVwiLFxuICAgIHByaWNlOiAzOS45NVxuICB9O1xuXG4gICRzY29wZS5jaGVja1F1YW50aXR5ID0gZnVuY3Rpb24ocXVhbnRpdHkpIHtcblxuICAgIGlmKHF1YW50aXR5IDw9IGxvd1RpZXIucXVhbnRpdHkpe1xuICAgICAgJHNjb3BlLml0ZW0ucHJpY2UgPSBsb3dUaWVyLnByaWNlO1xuICAgIH1lbHNlIGlmKHF1YW50aXR5IDw9IG1lZFRpZXIucXVhbnRpdHkgJiYgcXVhbnRpdHkgPiBsb3dUaWVyLnF1YW50aXR5KXtcbiAgICAgICRzY29wZS5pdGVtLnByaWNlID0gbWVkVGllci5wcmljZTtcbiAgICB9ZWxzZSBpZihxdWFudGl0eSA+IG1lZFRpZXIucXVhbnRpdHkpe1xuICAgICAgJHNjb3BlLml0ZW0ucHJpY2UgPSBoaWdoVGllci5wcmljZTtcbiAgICB9XG5cbiAgfTtcblxuXG4gICRzY29wZS5hZGRUb0NhcnQgPSBmdW5jdGlvbihpdGVtLCBwcmljZSl7XG4gICAgQ2FydFNlcnZpY2Uuc2V0Q2FydChpdGVtLCBwcmljZSk7XG4gIH07XG5cbn1cbmV4cG9ydCBkZWZhdWx0IEJ1eUNvbnRyb2xsZXI7XG4iLCJsZXQgQ2FydENvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUsIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlLCAkbG9nKXtcblxuICAvLyAkc2NvcGUuc2hpcHBpbmdUaWVycyA9IENhcnRTZXJ2aWNlLmdldFNoaXBwaW5nVGllcnMoKTtcblxuXG5cbi8vICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBDYXJ0U2VydmljZS5jYXJ0V2F0Y2goJHJvb3RTY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycykgLHRydWUpO1xuXG5cbiAgJHNjb3BlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbihpdGVtKXtcbiAgICRsb2cuZGVidWcoXCJSZW1vdmluZyBJdGVtXCIsIGl0ZW0pO1xuXG4gICAkc2NvcGUuY2FydC5pdGVtcyA9ICBfLndpdGhvdXQoJHNjb3BlLmNhcnQuaXRlbXMsIGl0ZW0pO1xuICAgQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG4gICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrb3V0ID0gZnVuY3Rpb24oY2FydCl7XG4gICAgQ2FydFNlcnZpY2UuY2hlY2tvdXQoY2FydCk7XG4gIH07XG5cblxuXG59O1xuXG5DYXJ0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQ2FydFNlcnZpY2UnLCAnJHJvb3RTY29wZScsICckbG9nJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gQ29udGFjdENvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSl7XG5cbiAgJHNjb3BlLmNvbnRhY3QgPSBmdW5jdGlvbiAoZGF0YSl7XG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgVXNlclNlcnZpY2UuY29udGFjdChkYXRhKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIH0pXG4gICAgICAuZXJyb3IoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUud2hvbGVzYWxlUmVxdWVzdCA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgIFVzZXJTZXJ2aWNlLndob2xlc2FsZVJlcXVlc3QoZGF0YSlcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICB9KVxuICAgICAgLmVycm9yKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSk7XG4gIH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdENvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkbWRVdGlsLCAkc3RhdGUsICRtZERpYWxvZywgQ2FydFNlcnZpY2UsICRyb290U2NvcGUpe1xuXG4kcm9vdFNjb3BlLnNoaXBwaW5nVGllcnMgPSBDYXJ0U2VydmljZS5nZXRTaGlwcGluZ1RpZXJzKCk7XG5cblxuICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3VidG90YWwgPSAwO1xuICAgIGlmKCFfLmlzRW1wdHkoJHJvb3RTY29wZS5jYXJ0KSl7XG5cbiAgICAgIGlmKCRzY29wZS5jYXJ0Lml0ZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICAkc2NvcGUuY2FydC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jYXJ0Lml0ZW1zID0gQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG5cbiAgICAgICAgJHNjb3BlLmNhcnQudG90YWxJdGVtcyA9ICRzY29wZS5jYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgaXRlbS5xdWFudGl0eTtcbiAgICAgICAgfSwgMCk7XG5cbiAgICAgIH1cbiAgICAgICAgJHNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5jYWxjdWxhdGVTaGlwcGluZygkc2NvcGUuY2FydCwgJHNjb3BlLnNoaXBwaW5nVGllcnMpO1xuICAgICAgICAkc2NvcGUuY2FydC5zdWJ0b3RhbCA9IHN1YnRvdGFsLnRvRml4ZWQoMik7XG4gICAgICAgICRzY29wZS5jYXJ0LnRvdGFsID0gKHN1YnRvdGFsICsgJHNjb3BlLmNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG5cbiAgICAgICAgJGxvZy5kZWJ1ZyhcIkNhcnQgbG9hZGVkIG9yIHVwZGF0ZWRcIiwgJHNjb3BlLmNhcnQpO1xuICAgIH1cblxuICB9LCB0cnVlKTtcblxuXG4gIC8vIG5hdiB0b2dnbGVzXG4gICRzY29wZS50b2dnbGVMZWZ0ID0gYnVpbGRUb2dnbGVyKCdsZWZ0Jyk7XG4gICRzY29wZS50b2dnbGVSaWdodCA9IGJ1aWxkVG9nZ2xlcigncmlnaHQnKTtcbiAgbGV0ICRsZWZ0ID0gJCgnLm1kLXNpZGVuYXYtbGVmdCcpO1xuICBsZXQgJHJpZ2h0ID0gJCgnLm1kLXNpZGVuYXYtcmlnaHQnKTtcblxuICAvLyBsaXN0IGl0ZW0gY2xpY2sgZXZlbnRcbiAgLy8gJCgnbWQtbGlzdC1pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgLy8gICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gICAkKHRoaXMpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyB9KTtcblxuICBmdW5jdGlvbiBidWlsZFRvZ2dsZXIobmF2SUQpIHtcbiAgICBsZXQgZGVib3VuY2VGbiA9ICAkbWRVdGlsLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAkbWRTaWRlbmF2KG5hdklEKS50b2dnbGUoKTtcbiAgICAgIH0sMzAwKTtcbiAgICByZXR1cm4gZGVib3VuY2VGbjtcbiAgfVxuXG5cbiAgLy8gTmF2aWdhdGUgZnVuY3Rpb25cbiAgJHNjb3BlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihzdGF0ZSwgbmF2KXtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjJysgc3RhdGUpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbyhzdGF0ZSkudGhlbigoKSA9PiB7XG4gICAgaWYgKG5hdiA9PSBcImxlZnRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgICAgaWYoISRyaWdodC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgIH1lbHNlIGlmKG5hdiA9PSBcInJpZ2h0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgICBpZighJGxlZnQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgIH19KTtcblxuICB9O1xuXG4gICRzY29wZS5zaG93V2FycmFudHkgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93YXJyYW50eS50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG4gICRzY29wZS5zaG93U2hpcHBpbmcgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zaGlwcGluZy50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLmNvbnRhY3RVcyA9IGZ1bmN0aW9uKGNvbnRhY3Qpe1xuXG4gIH07XG59XG5cblxuZnVuY3Rpb24gUmlnaHRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdyaWdodCcpLmNsb3NlKCk7XG4gIH07XG5cblxufVxuZnVuY3Rpb24gTGVmdEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xuICB9O1xuXG59XG5cbmZ1bmN0aW9uIERpYWxvZ0N0cmwoJHNjb3BlLCAkbWREaWFsb2cpe1xuICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmNhbmNlbCgpO1xuICB9O1xuXG4gICRzY29wZS5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmhpZGUoKTtcbiAgfTtcbn1cblxuZXhwb3J0IHtcbiAgTWFpbkNvbnRyb2xsZXIsXG4gIFJpZ2h0Q3RybCxcbiAgTGVmdEN0cmwsXG4gIERpYWxvZ0N0cmxcbn07XG4iLCJmdW5jdGlvbiBNZWRpYUNvbnRyb2xsZXIoJHNjb3BlKXtcblxuICAgICRzY29wZS50ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgIGNvbnNvbGUubG9nKCd3b3JrZWQnKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2Nsb3NldXAxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9jbG9zZXVwMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2tldmluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9rZXZpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICAvLyB7XG4gICAgICAvLyAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAvLyAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbjMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgLy8gICBkZXNjcmlwdGlvbjogJydcbiAgICAgIC8vIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU0LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU0LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfVxuICAgIF07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFDb250cm9sbGVyO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGVzdGltb25pYWxDb250cm9sbGVyKCRzY29wZSwgVGVzdGltb25pYWxTZXJ2aWNlLCAkbG9nKXtcbiAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSB0cnVlO1xuXG4gIFRlc3RpbW9uaWFsU2VydmljZS5nZXRUZXN0aW1vbmlhbHMoKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gZmFsc2U7XG4gICAgICAkc2NvcGUudGVzdGltb25pYWxzID0gZGF0YTtcbiAgICAgICRsb2cuZGVidWcoJHNjb3BlLnRlc3RpbW9uaWFscyk7XG4gICAgfSlcbiAgICAuZXJyb3IoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSBmYWxzZTtcbiAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHdlIGNvdWxkIG5vdCBsb2FkIHRlc3RpbW9uaWFscyBhdCB0aGlzIHRpbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG4gICAgfSk7XG5cbiAgJHNjb3BlLmFkZFRlc3RpbW9uaWFsID0gZnVuY3Rpb24odGVzdGltb25pYWwpe1xuICAgICRzY29wZS5hZGRpbmdUZXN0aW1vbmlhbCA9IHRydWU7XG5cbiAgICBUZXN0aW1vbmlhbFNlcnZpY2UuYWRkVGVzdGltb25pYWwodGVzdGltb25pYWwpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAkc2NvcGUuYWRkaW5nVGVzdGltb25pYWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS5hZGRlZFRlc3RpbW9uaWFsTWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsImltcG9ydCB7Y29uZmlnLCBydW4sIHBheXBhbCwgQVBJfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciwgTGVmdEN0cmwsIFJpZ2h0Q3RybCwgRGlhbG9nQ3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXInO1xuaW1wb3J0IEJ1eUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9CdXlDb250cm9sbGVyJztcbmltcG9ydCBNZWRpYUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9NZWRpYUNvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXInO1xuaW1wb3J0IENvbnRhY3RDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXInO1xuaW1wb3J0IFRlc3RpbW9uaWFsQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9DYXJ0U2VydmljZSc7XG5pbXBvcnQgVGVzdGltb25pYWxTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvVGVzdGltb25pYWxTZXJ2aWNlJztcbmltcG9ydCBVc2VyU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICdqa3VyaS5nYWxsZXJ5JyAsICduZ0Nvb2tpZXMnXSlcbi5jb25maWcoY29uZmlnKVxuLmNvbnN0YW50KCdQQVlQQUwnLCBwYXlwYWwpXG4uY29uc3RhbnQoJ0FQSScsIEFQSSlcbi5ydW4ocnVuKVxuLmZhY3RvcnkoJ0NhcnRTZXJ2aWNlJywgQ2FydFNlcnZpY2UpXG4uZmFjdG9yeSgnVGVzdGltb25pYWxTZXJ2aWNlJywgVGVzdGltb25pYWxTZXJ2aWNlKVxuLmZhY3RvcnkoJ1VzZXJTZXJ2aWNlJywgVXNlclNlcnZpY2UpXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdMZWZ0Q3RybCcsIExlZnRDdHJsKVxuLmNvbnRyb2xsZXIoJ1JpZ2h0Q3RybCcsIFJpZ2h0Q3RybClcbi5jb250cm9sbGVyKCdEaWFsb2dDdHJsJywgRGlhbG9nQ3RybClcbi5jb250cm9sbGVyKCdCdXlDdHJsJywgQnV5Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdNZWRpYUNvbnRyb2xsZXInLCBNZWRpYUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignQ2FydENvbnRyb2xsZXInLCBDYXJ0Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDb250YWN0Q3RybCcsIENvbnRhY3RDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcicsIFRlc3RpbW9uaWFsQ29udHJvbGxlcik7XG4iLCJsZXQgQ2FydFNlcnZpY2UgPSBmdW5jdGlvbigkY29va2llcywgJHN0YXRlLCAkcm9vdFNjb3BlLCAkaHR0cCwgJGxvZywgQVBJKXtcblxuICBjb25zdCBwYXlwYWwgPSBcImh0dHBzOi8vd3d3LnBheXBhbC5jb20vY2dpLWJpbi93ZWJzY3JcIjtcblxuICAvLyBpdGVtIGNvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gSXRlbShvcHRpb25zKXtcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZTtcbiAgICB0aGlzLnByaWNlID0gb3B0aW9ucy5wcmljZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gb3B0aW9ucy5xdWFudGl0eTtcbiAgICB0aGlzLnRvdGFsID0gZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAodGhpcy5xdWFudGl0eSAqIHRoaXMucHJpY2UpIHx8IDA7XG4gICAgfTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SXRlbXMoKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L2l0ZW1zYCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaW5nbGVJdGVtKGl0ZW0pe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vaXRlbXMvJHtpdGVtfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2FydCgpe1xuICAgIGxldCBjYXJ0TGlzdCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0TGlzdCB8fCBjYXJ0TGlzdC5sZW5ndGggPCAxKXtcbiAgICAgICRyb290U2NvcGUuaGFzQ2FydCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0SXRlbXMgPSBjYXJ0TGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGxldCBjYXJ0SXRlbSA9IG5ldyBJdGVtKGl0ZW0pO1xuICAgICAgcmV0dXJuIGNhcnRJdGVtO1xuICAgIH0pO1xuXG4gICAgdmFyIHBheXBhbEl0ZW1zID0gYWRkUGF5cGFsKGNhcnRJdGVtcyk7XG5cbiAgICB2YXIgY2FydCA9IHt9O1xuXG4gICAgY2FydC5pdGVtcyA9IHBheXBhbEl0ZW1zO1xuICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICB9LCAwKTtcblxuICAgIHJldHVybiBjYXJ0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FydChpdGVtKXtcbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0ID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdjYXJ0Jyk7XG4gICAgaWYoIWNhcnQpe1xuICAgICAgY2FydCA9IFtdO1xuICAgIH1cblxuICAgIGxldCBhbHJlYWR5RXhpc3RzID0gXy5maW5kV2hlcmUoY2FydCwgaXRlbS50aXRsZSk7XG4gICAgaWYoYWxyZWFkeUV4aXN0cyl7XG4gICAgICBjYXJ0ID0gXy53aXRob3V0KGNhcnQsIGFscmVhZHlFeGlzdHMpO1xuICAgICAgYWxyZWFkeUV4aXN0cy5xdWFudGl0eSA9IGFscmVhZHlFeGlzdHMucXVhbnRpdHkgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgY2FydC5wdXNoKGFscmVhZHlFeGlzdHMpO1xuICAgIH1lbHNle1xuICAgICAgY2FydC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICAkY29va2llcy5wdXRPYmplY3QoJ2NhcnQnLCBjYXJ0KTtcbiAgICAkbG9nLmRlYnVnKFwiSXRlbSBhZGRlZCB0byBjYXJ0XCIsIGl0ZW0sIGNhcnQpO1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyNjYXJ0JykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKCdjYXJ0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYXJ0KGl0ZW1zKXtcbiAgICAkbG9nLmRlYnVnKCd1cGRhdGluZyBjYXJ0JywgaXRlbXMpO1xuXG4gICAgdmFyIGNhcnRJdGVtcyA9IGFkZFBheXBhbChpdGVtcyk7XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2hpcHBpbmdUaWVycygpe1xuICAgIGxldCBzaGlwcGluZyA9IHtcbiAgICAgIHRpZXIxOiB7XG4gICAgICAgIHF1YW50aXR5OiA1LFxuICAgICAgICBwcmljZTogNVxuICAgICAgfSxcbiAgICAgIHRpZXIyOiB7XG4gICAgICAgIHF1YW50aXR5OiAxMCxcbiAgICAgICAgcHJpY2U6IDEwXG4gICAgICB9LFxuICAgICAgdGllcjM6IHtcbiAgICAgICAgcXVhbnRpdHk6IDIwLFxuICAgICAgICBwcmljZTogMjBcbiAgICAgIH1cbiAgICB9O1xuICAgICRsb2cuZGVidWcoXCJTaGlwcGluZyBUaWVyc1wiLCBzaGlwcGluZyk7XG4gICAgcmV0dXJuIHNoaXBwaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlU2hpcHBpbmcoY2FydCwgdGllcnMpe1xuICAgIGNhcnQuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgaWYoaXRlbS5xdWFudGl0eSA+PSB0aWVycy50aWVyMS5xdWFudGl0eSAmJiBpdGVtLnF1YW50aXR5IDwgdGllcnMudGllcjIucXVhbnRpdHkpe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjEucHJpY2U7XG4gICAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID49IHRpZXJzLnRpZXIyLnF1YW50aXR5ICYmIGl0ZW0ucXVhbnRpdHkgPCB0aWVycy50aWVyMy5xdWFudGl0eSl7XG4gICAgICAgIGl0ZW0uc2hpcHBpbmcgPSB0aWVycy50aWVyMi5wcmljZTtcbiAgICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPiB0aWVycy50aWVyMy5xdWFudGl0eSApe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjMucHJpY2U7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjYXJ0LnNoaXBwaW5nID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0uc2hpcHBpbmc7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcblxuICB9XG5cbiAgZnVuY3Rpb24gY2FydFdhdGNoKGNhcnQsIHNoaXBwaW5nKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KGNhcnQpKXtcblxuICAgICAgaWYoY2FydC5pdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgY2FydC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYXJ0ID0gdXBkYXRlQ2FydChjYXJ0Lml0ZW1zKTtcbiAgICAgICAgY2FydC50b3RhbEl0ZW1zID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuXG4gICAgICBjYXJ0LnNoaXBwaW5nID0gIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHNoaXBwaW5nKTtcbiAgICAgIGNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgY2FydC50b3RhbCA9IChzdWJ0b3RhbCArIGNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG5cbiAgICAgICRsb2cuZGVidWcoXCJDYXJ0IGxvYWRlZCBvciB1cGRhdGVkXCIsIGNhcnQpO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUGF5cGFsKGNhcnRJdGVtcyl7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhcnRJdGVtcy5sZW5ndGg7IGkgKyspe1xuICAgICAgdmFyIGl0ZW1OdW1iZXIgPSAoaSArIDEpO1xuICAgICAgY2FydEl0ZW1zW2ldLnBheXBhbCA9IHtcbiAgICAgICAgaXRlbSA6IFwiaXRlbV9uYW1lX1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgYW1vdW50OiBcImFtb3VudF9cIisgaXRlbU51bWJlcixcbiAgICAgICAgcXVhbnRpdHk6IFwicXVhbnRpdHlfXCIgKyBpdGVtTnVtYmVyLFxuICAgICAgICBzaGlwcGluZyA6IFwic2hpcHBpbmdfXCIgKyBpdGVtTnVtYmVyXG4gICAgICB9O1xuICAgIH1cblxuICAgICRsb2cuZGVidWcoXCJhZGRpbmcgcGF5cGFsIGluZm9cIiwgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRJdGVtcyxcbiAgICBnZXRTaW5nbGVJdGVtLFxuICAgIGdldENhcnQsXG4gICAgc2V0Q2FydCxcbiAgICB1cGRhdGVDYXJ0LFxuICAgIGdldFNoaXBwaW5nVGllcnMsXG4gICAgY2FsY3VsYXRlU2hpcHBpbmcsXG4gICAgY2FydFdhdGNoXG4gIH07XG5cblxufTtcblxuQ2FydFNlcnZpY2UuJGluamVjdCA9IFsnJGNvb2tpZXMnLCAnJHN0YXRlJywgJyRyb290U2NvcGUnLCAnJGh0dHAnLCAnJGxvZyddO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJ0U2VydmljZTtcbiIsImxldCBUZXN0aW1vbmlhbFNlcnZpY2UgPSBmdW5jdGlvbigkaHR0cCwgQVBJKXtcblxuICBmdW5jdGlvbiBnZXRUZXN0aW1vbmlhbHMoKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L3Rlc3RpbW9uaWFsc2ApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2luZ2xlVGVzdGltb25pYWwodGVzdGltb25pYWxJZCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHMvJHt0ZXN0aW1vbmlhbElkfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGVzdGltb25pYWwodGVzdGltb25pYWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L3Rlc3RpbW9uaWFsc2AsIHRlc3RpbW9uaWFsKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0VGVzdGltb25pYWxzLFxuICAgIGdldFNpbmdsZVRlc3RpbW9uaWFsLFxuICAgIGFkZFRlc3RpbW9uaWFsXG4gIH07XG59O1xuZXhwb3J0IGRlZmF1bHQgVGVzdGltb25pYWxTZXJ2aWNlO1xuIiwibGV0IFVzZXJTZXJ2aWNlID0gZnVuY3Rpb24oJGh0dHAsIEFQSSwgJGNvb2tpZXMsICRzdGF0ZSwgJHJvb3RTY29wZSl7XG5cbiAgZnVuY3Rpb24gZ2V0VXNlckluZm8oKXtcbiAgICAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vbWVgKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHJvb3RTY29wZS51c2VyTmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgJHJvb3RTY29wZS51c2VySXRlbXMgPSBkYXRhLml0ZW1zO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1VzZXIoKXtcbiAgICBjb25zdCB0b2tlbiA9ICRjb29raWVzLmdldCgndG9rZW4nKTtcbiAgICBpZih0b2tlbil7XG4gICAgICBnZXRVc2VySW5mbygpO1xuICAgICAgX3NldFRva2VuKHRva2VuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0VG9rZW4odG9rZW4pe1xuICAgIGlmKHRva2VuKXtcbiAgICAgIEFQSS5DT05GSUcuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXSA9IHRva2VuO1xuICAgICAgJHJvb3RTY29wZS5pc1VzZXJMb2dnZWRJbiA9IHRydWU7XG4gICAgfWVsc2V7XG4gICAgICAkcm9vdFNjb3BlLmlzVXNlckxvZ2dlZEluID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2hvbGVzYWxlUmVxdWVzdChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vd2hvbGVzYWxlYCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udGFjdChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vY29udGFjdGAsIGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ2luKHVzZXIpe1xuICAgICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vYXV0aGVudGljYXRlYCwgdXNlcilcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgIF9zdWNjZXNzTG9nKGRhdGEpO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfc3VjY2Vzc0xvZyhkYXRhKXtcbiAgICAkY29va2llcy5wdXQoJ3Rva2VuJywgZGF0YS50b2tlbik7XG4gIH1cblxuICBmdW5jdGlvbiBfdXBkYXRlVXNlcih1c2VySWQsIHVzZXIpe1xuICAgIHJldHVybiAkaHR0cC5wdXQoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCwgdXNlciwgQVBJLkNPTkZJRyk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dPdXQoKXtcbiAgICAkY29va2llcy5yZW1vdmUoJ3Rva2VuJyk7XG4gICAgX3NldFRva2VuKCk7XG4gICAgJHN0YXRlLmdvKCdob21lJyk7XG4gIH1cblxuICBmdW5jdGlvbiBfZ2V0VXNlcih1c2VySWQpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCwgQVBJLkNPTkZJRyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3Jnb3RQYXNzd29yZChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vZm9yZ290UGFzc3dvcmRgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBfZGVsZXRlVXNlcih1c2VySWQpe1xuICAgIHJldHVybiAkaHR0cC5kZWxldGUoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCk7XG4gIH1cblxuICByZXR1cm57XG4gICAgY2hlY2tVc2VyLFxuICAgIHdob2xlc2FsZVJlcXVlc3QsXG4gICAgY29udGFjdCxcbiAgICBsb2dpbixcbiAgICBsb2dPdXQsXG4gICAgX3VwZGF0ZVVzZXIsXG4gICAgX2dldFVzZXIsXG4gICAgX2RlbGV0ZVVzZXIsXG4gICAgZm9yZ290UGFzc3dvcmRcblxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlclNlcnZpY2U7XG4iXX0=
