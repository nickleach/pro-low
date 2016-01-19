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
  }).state('testimonials.add', {
    url: '/add',
    templateUrl: 'js/templates/testimonials.add.tpl.html',
    controller: 'TestimonialController'
  }).state('testimonials.single', {
    url: '/:id',
    templateUrl: 'js/templates/testimonials.single.tpl.html',
    controller: 'TestimonialSingleCtrl'
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
function TestimonialController($scope, TestimonialService, $state, $log) {
  $scope.loadingTestimonials = true;

  TestimonialService.getTestimonials().success(function (data) {
    $scope.loadingTestimonials = false;
    $scope.testimonials = data;
    $log.debug("Testimonials", $scope.testimonials);
  }).error(function (data) {
    $scope.loadingTestimonials = false;
    $scope.errorMessage = "We're sorry we could not load testimonials at this time. Please try again later.";
  });
  $scope.goToSingle = function (id) {
    $state.go('testimonials.single', { id: id });
  };
  $scope.addTestimonial = function (testimonial) {
    $scope.addingTestimonial = true;
    testimonial.date = new Date();
    TestimonialService.addTestimonial(testimonial).success(function (data) {
      $scope.testimonialAdded = true;
      $scope.addedTestimonialMessage = data.message;
    });
  };
}

function TestimonialSingleCtrl($scope, $stateParams, TestimonialService, $log) {
  var id = $stateParams.id;
  $scope.loadingTestimonial = true;
  TestimonialService.getSingleTestimonial(id).success(function (data) {
    $scope.loadingTestimonial = false;
    $scope.testimonial = data;
    $log.debug("Testimonial", data);
  }).error(function (data) {
    $scope.loadingTestimonial = false;
    $scope.errorMessage = "We're sorry we could not load this testimonial at this time. Please try again later.";
  });
}

exports.TestimonialController = TestimonialController;
exports.TestimonialSingleCtrl = TestimonialSingleCtrl;

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

var _servicesCartService = require('./services/CartService');

var _servicesCartService2 = _interopRequireDefault(_servicesCartService);

var _servicesTestimonialService = require('./services/TestimonialService');

var _servicesTestimonialService2 = _interopRequireDefault(_servicesTestimonialService);

var _servicesUserService = require('./services/UserService');

var _servicesUserService2 = _interopRequireDefault(_servicesUserService);

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery', 'ngCookies']).config(_config.config).constant('PAYPAL', _config.paypal).constant('API', _config.API).run(_config.run).factory('CartService', _servicesCartService2['default']).factory('TestimonialService', _servicesTestimonialService2['default']).factory('UserService', _servicesUserService2['default']).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('DialogCtrl', _controllersMainController.DialogCtrl).controller('BuyCtrl', _controllersBuyController2['default']).controller('MediaController', _controllersMediaController2['default']).controller('CartController', _controllersCartController2['default']).controller('ContactCtrl', _controllersContactController2['default']).controller('TestimonialController', _controllersTestimonialController.TestimonialController).controller('TestimonialSingleCtrl', _controllersTestimonialController.TestimonialSingleCtrl);

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZS5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsU0FBUyxNQUFNLENBQUMsY0FBYyxFQUFF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QztHQUM1RDs7QUFFRCxXQUFTLGNBQWMsQ0FBQyxLQUFLLEVBQUM7QUFDNUIsV0FBTyxLQUFLLENBQUMsSUFBSSxDQUFJLEdBQUcsQ0FBQyxHQUFHLHNCQUFtQixLQUFLLENBQUMsQ0FBQztHQUN2RDs7QUFFRCxXQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUM7QUFDMUIsV0FBTyxLQUFLLFVBQU8sQ0FBSSxHQUFHLENBQUMsR0FBRyxlQUFVLE1BQU0sQ0FBRyxDQUFDO0dBQ25EOztBQUVELFNBQU07QUFDSixhQUFTLEVBQVQsU0FBUztBQUNULG9CQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsV0FBTyxFQUFQLE9BQU87QUFDUCxTQUFLLEVBQUwsS0FBSztBQUNMLFVBQU0sRUFBTixNQUFNO0FBQ04sZUFBVyxFQUFYLFdBQVc7QUFDWCxZQUFRLEVBQVIsUUFBUTtBQUNSLGVBQVcsRUFBWCxXQUFXO0FBQ1gsa0JBQWMsRUFBZCxjQUFjOztHQUVmLENBQUM7Q0FDSCxDQUFDOztxQkFFYSxXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIsICRsb2dQcm92aWRlcikge1xuICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvaG9tZS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2J1eScsIHtcbiAgICAgIHVybDogJy9idXknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvYnV5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdCdXlDdHJsJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzdG9yeScsIHtcbiAgICAgIHVybDogJy9zdG9yeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zdG9yeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3Rlc3RpbW9uaWFscycsIHtcbiAgICAgIHVybDogJy90ZXN0aW1vbmlhbHMnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3Rlc3RpbW9uaWFscy5hZGQnLCB7XG4gICAgICB1cmw6ICcvYWRkJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3Rlc3RpbW9uaWFscy5hZGQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzLnNpbmdsZScsIHtcbiAgICAgIHVybDogJy86aWQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLnNpbmdsZS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxTaW5nbGVDdHJsJyxcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2FsbGVyeScsIHtcbiAgICAgIHVybDogJy9nYWxsZXJ5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2dhbGxlcnkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01lZGlhQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndmlkZW9zJywge1xuICAgICAgdXJsOiAnL3ZpZGVvcycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy92aWRlb3MudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01lZGlhQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgncHJpY2luZycsIHtcbiAgICAgIHVybDogJy9wcmljaW5nJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ByaWNpbmcudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdkZXNpZ24nLCB7XG4gICAgICB1cmw6ICcvZGVzaWduJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2Rlc2lnbi50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2NhcnQnLCB7XG4gICAgICB1cmw6ICcvY2FydCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9jYXJ0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDYXJ0Q29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY29udGFjdCcsIHtcbiAgICAgIHVybDogJy9jb250YWN0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NvbnRhY3QudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHJ1bihDYXJ0U2VydmljZSwgVXNlclNlcnZpY2UsICRyb290U2NvcGUpe1xuICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgVXNlclNlcnZpY2UuY2hlY2tVc2VyKCk7XG4gICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9KTtcbn1cblxuY29uc3QgcGF5cGFsID0ge1xuICAgICAgdXNlcm5hbWU6ICdhaW5lcy5rZXZpbl9hcGkxLmdtYWlsLmNvbScsXG4gICAgICBwYXNzd29yZDogJ1Q2WDlEUjJCNzdCUTRZV0snLFxuICAgICAgY3JlZGVudGlhbDogJ0FQSSBTaWduYXR1cmUnLFxuICAgICAgc2lnbmF0dXJlOiAnQUZjV3hWMjFDN2ZkMHYzYllZWVJDcFNTUmwzMUEyRUVoQXpXemx4cS1FekVRdG9aTXFTY1I2eEknXG59O1xuXG5jb25zdCBBUEkgPSB7XG4gIFVSTDogJ2h0dHA6Ly9hZG1pbi5wcm9sb3dwdXR0aW5nLmNvbS9hcGknLFxuICBDT05GSUc6IHtcbiAgICBoZWFkZXJzOntcblxuICAgIH1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIHBheXBhbCxcbiAgY29uZmlnLFxuICBydW4sXG4gIEFQSVxufTtcbiIsImZ1bmN0aW9uIEJ1eUNvbnRyb2xsZXIoJHNjb3BlLCAkY29va2llcywgJHN0YXRlLCBDYXJ0U2VydmljZSl7XG5cbiAgbGV0IGxvd1RpZXIgPSB7XG4gICAgcXVhbnRpdHkgOiA0LFxuICAgIHByaWNlIDogMzkuOTVcbiAgfTtcblxuICBsZXQgbWVkVGllciA9IHtcbiAgICBxdWFudGl0eSA6IDksXG4gICAgcHJpY2UgOiAzNS4wMFxuICB9O1xuXG4gIGxldCBoaWdoVGllciA9IHtcbiAgICBxdWFudGl0eSA6IDE1LFxuICAgIHByaWNlOiAzMC4wMFxuICB9O1xuXG4gICRzY29wZS5pdGVtID0ge1xuICAgIHF1YW50aXR5OiAxLFxuICAgIHRpdGxlOiBcIlRoZSBQcm8gTG93IFB1dHRpbmcgU3lzdGVtXCIsXG4gICAgcHJpY2U6IDM5Ljk1XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrUXVhbnRpdHkgPSBmdW5jdGlvbihxdWFudGl0eSkge1xuXG4gICAgaWYocXVhbnRpdHkgPD0gbG93VGllci5xdWFudGl0eSl7XG4gICAgICAkc2NvcGUuaXRlbS5wcmljZSA9IGxvd1RpZXIucHJpY2U7XG4gICAgfWVsc2UgaWYocXVhbnRpdHkgPD0gbWVkVGllci5xdWFudGl0eSAmJiBxdWFudGl0eSA+IGxvd1RpZXIucXVhbnRpdHkpe1xuICAgICAgJHNjb3BlLml0ZW0ucHJpY2UgPSBtZWRUaWVyLnByaWNlO1xuICAgIH1lbHNlIGlmKHF1YW50aXR5ID4gbWVkVGllci5xdWFudGl0eSl7XG4gICAgICAkc2NvcGUuaXRlbS5wcmljZSA9IGhpZ2hUaWVyLnByaWNlO1xuICAgIH1cblxuICB9O1xuXG5cbiAgJHNjb3BlLmFkZFRvQ2FydCA9IGZ1bmN0aW9uKGl0ZW0sIHByaWNlKXtcbiAgICBDYXJ0U2VydmljZS5zZXRDYXJ0KGl0ZW0sIHByaWNlKTtcbiAgfTtcblxufVxuZXhwb3J0IGRlZmF1bHQgQnV5Q29udHJvbGxlcjtcbiIsImxldCBDYXJ0Q29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZSwgQ2FydFNlcnZpY2UsICRyb290U2NvcGUsICRsb2cpe1xuXG4gIC8vICRzY29wZS5zaGlwcGluZ1RpZXJzID0gQ2FydFNlcnZpY2UuZ2V0U2hpcHBpbmdUaWVycygpO1xuXG5cblxuLy8gJHNjb3BlLiR3YXRjaCgnY2FydCcsIENhcnRTZXJ2aWNlLmNhcnRXYXRjaCgkcm9vdFNjb3BlLmNhcnQsICRzY29wZS5zaGlwcGluZ1RpZXJzKSAsdHJ1ZSk7XG5cblxuICAkc2NvcGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pe1xuICAgJGxvZy5kZWJ1ZyhcIlJlbW92aW5nIEl0ZW1cIiwgaXRlbSk7XG5cbiAgICRzY29wZS5jYXJ0Lml0ZW1zID0gIF8ud2l0aG91dCgkc2NvcGUuY2FydC5pdGVtcywgaXRlbSk7XG4gICBDYXJ0U2VydmljZS51cGRhdGVDYXJ0KCRzY29wZS5jYXJ0Lml0ZW1zKTtcbiAgICRyb290U2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLmdldENhcnQoKTtcbiAgfTtcblxuICAkc2NvcGUuY2hlY2tvdXQgPSBmdW5jdGlvbihjYXJ0KXtcbiAgICBDYXJ0U2VydmljZS5jaGVja291dChjYXJ0KTtcbiAgfTtcblxuXG5cbn07XG5cbkNhcnRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdDYXJ0U2VydmljZScsICckcm9vdFNjb3BlJywgJyRsb2cnXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydENvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBDb250YWN0Q29udHJvbGxlcigkc2NvcGUsIFVzZXJTZXJ2aWNlKXtcblxuICAkc2NvcGUuY29udGFjdCA9IGZ1bmN0aW9uIChkYXRhKXtcbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICBVc2VyU2VydmljZS5jb250YWN0KGRhdGEpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSlcbiAgICAgIC5lcnJvcigoZGF0YSkgPT4ge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS53aG9sZXNhbGVSZXF1ZXN0ID0gZnVuY3Rpb24oZGF0YSl7XG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgVXNlclNlcnZpY2Uud2hvbGVzYWxlUmVxdWVzdChkYXRhKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIH0pXG4gICAgICAuZXJyb3IoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICB9KTtcbiAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWN0Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRtZFV0aWwsICRzdGF0ZSwgJG1kRGlhbG9nLCBDYXJ0U2VydmljZSwgJHJvb3RTY29wZSl7XG5cbiRyb290U2NvcGUuc2hpcHBpbmdUaWVycyA9IENhcnRTZXJ2aWNlLmdldFNoaXBwaW5nVGllcnMoKTtcblxuXG4gJHNjb3BlLiR3YXRjaCgnY2FydCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoIV8uaXNFbXB0eSgkcm9vdFNjb3BlLmNhcnQpKXtcblxuICAgICAgaWYoJHNjb3BlLmNhcnQuaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICRzY29wZS5jYXJ0Lml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHN1YnRvdGFsICs9IGl0ZW0udG90YWwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNhcnQuaXRlbXMgPSBDYXJ0U2VydmljZS51cGRhdGVDYXJ0KCRzY29wZS5jYXJ0Lml0ZW1zKTtcblxuICAgICAgICAkc2NvcGUuY2FydC50b3RhbEl0ZW1zID0gJHNjb3BlLmNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgICB9LCAwKTtcblxuICAgICAgfVxuICAgICAgICAkc2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLmNhbGN1bGF0ZVNoaXBwaW5nKCRzY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycyk7XG4gICAgICAgICRzY29wZS5jYXJ0LnN1YnRvdGFsID0gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgICAgICAgJHNjb3BlLmNhcnQudG90YWwgPSAoc3VidG90YWwgKyAkc2NvcGUuY2FydC5zaGlwcGluZykudG9GaXhlZCgyKTtcblxuICAgICAgICAkbG9nLmRlYnVnKFwiQ2FydCBsb2FkZWQgb3IgdXBkYXRlZFwiLCAkc2NvcGUuY2FydCk7XG4gICAgfVxuXG4gIH0sIHRydWUpO1xuXG5cbiAgLy8gbmF2IHRvZ2dsZXNcbiAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBidWlsZFRvZ2dsZXIoJ2xlZnQnKTtcbiAgJHNjb3BlLnRvZ2dsZVJpZ2h0ID0gYnVpbGRUb2dnbGVyKCdyaWdodCcpO1xuICBsZXQgJGxlZnQgPSAkKCcubWQtc2lkZW5hdi1sZWZ0Jyk7XG4gIGxldCAkcmlnaHQgPSAkKCcubWQtc2lkZW5hdi1yaWdodCcpO1xuXG4gIC8vIGxpc3QgaXRlbSBjbGljayBldmVudFxuICAvLyAkKCdtZC1saXN0LWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAvLyAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyAgICQodGhpcykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkVG9nZ2xlcihuYXZJRCkge1xuICAgIGxldCBkZWJvdW5jZUZuID0gICRtZFV0aWwuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICRtZFNpZGVuYXYobmF2SUQpLnRvZ2dsZSgpO1xuICAgICAgfSwzMDApO1xuICAgIHJldHVybiBkZWJvdW5jZUZuO1xuICB9XG5cblxuICAvLyBOYXZpZ2F0ZSBmdW5jdGlvblxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHN0YXRlLCBuYXYpe1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyMnKyBzdGF0ZSkuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKHN0YXRlKS50aGVuKCgpID0+IHtcbiAgICBpZiAobmF2ID09IFwibGVmdFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgICBpZighJHJpZ2h0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgfWVsc2UgaWYobmF2ID09IFwicmlnaHRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICAgIGlmKCEkbGVmdC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgfX0pO1xuXG4gIH07XG5cbiAgJHNjb3BlLnNob3dXYXJyYW50eSA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgJG1kRGlhbG9nLnNob3coe1xuICAgICAgY29udHJvbGxlcjogRGlhbG9nQ3RybCxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3dhcnJhbnR5LnRwbC5odG1sJyxcbiAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcbiAgJHNjb3BlLnNob3dTaGlwcGluZyA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgJG1kRGlhbG9nLnNob3coe1xuICAgICAgY29udHJvbGxlcjogRGlhbG9nQ3RybCxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3NoaXBwaW5nLnRwbC5odG1sJyxcbiAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUuY29udGFjdFVzID0gZnVuY3Rpb24oY29udGFjdCl7XG5cbiAgfTtcbn1cblxuXG5mdW5jdGlvbiBSaWdodEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ3JpZ2h0JykuY2xvc2UoKTtcbiAgfTtcblxuXG59XG5mdW5jdGlvbiBMZWZ0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XG4gIH07XG5cbn1cblxuZnVuY3Rpb24gRGlhbG9nQ3RybCgkc2NvcGUsICRtZERpYWxvZyl7XG4gICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAkbWREaWFsb2cuY2FuY2VsKCk7XG4gIH07XG5cbiAgJHNjb3BlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAkbWREaWFsb2cuaGlkZSgpO1xuICB9O1xufVxuXG5leHBvcnQge1xuICBNYWluQ29udHJvbGxlcixcbiAgUmlnaHRDdHJsLFxuICBMZWZ0Q3RybCxcbiAgRGlhbG9nQ3RybFxufTtcbiIsImZ1bmN0aW9uIE1lZGlhQ29udHJvbGxlcigkc2NvcGUpe1xuXG4gICAgJHNjb3BlLnRlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgY29uc29sZS5sb2coJ3dvcmtlZCcpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvY2xvc2V1cDEtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2Nsb3NldXAxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMva2V2aW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2tldmluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4zLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgIC8vICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluMy1jb21wcmVzc29yLmpwZycsXG4gICAgICAvLyAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgLy8gfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTEtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUyLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUyLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMy1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTQtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTQtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU1LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU1LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9XG4gICAgXTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBNZWRpYUNvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBUZXN0aW1vbmlhbENvbnRyb2xsZXIoJHNjb3BlLCBUZXN0aW1vbmlhbFNlcnZpY2UsICRzdGF0ZSwgJGxvZyl7XG4gICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gdHJ1ZTtcblxuICBUZXN0aW1vbmlhbFNlcnZpY2UuZ2V0VGVzdGltb25pYWxzKClcbiAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFscyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLnRlc3RpbW9uaWFscyA9IGRhdGE7XG4gICAgICAkbG9nLmRlYnVnKFwiVGVzdGltb25pYWxzXCIsICRzY29wZS50ZXN0aW1vbmlhbHMpO1xuICAgIH0pXG4gICAgLmVycm9yKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gXCJXZSdyZSBzb3JyeSB3ZSBjb3VsZCBub3QgbG9hZCB0ZXN0aW1vbmlhbHMgYXQgdGhpcyB0aW1lLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiO1xuICAgIH0pO1xuICAkc2NvcGUuZ29Ub1NpbmdsZSA9IGZ1bmN0aW9uKGlkKXtcbiAgICRzdGF0ZS5nbygndGVzdGltb25pYWxzLnNpbmdsZScsIHtpZDogaWR9KTtcbiAgfTtcbiAgJHNjb3BlLmFkZFRlc3RpbW9uaWFsID0gZnVuY3Rpb24odGVzdGltb25pYWwpe1xuICAgICRzY29wZS5hZGRpbmdUZXN0aW1vbmlhbCA9IHRydWU7XG4gICAgdGVzdGltb25pYWwuZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgVGVzdGltb25pYWxTZXJ2aWNlLmFkZFRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLnRlc3RpbW9uaWFsQWRkZWQgPSB0cnVlO1xuICAgICAgJHNjb3BlLmFkZGVkVGVzdGltb25pYWxNZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBUZXN0aW1vbmlhbFNpbmdsZUN0cmwoJHNjb3BlLCAkc3RhdGVQYXJhbXMsIFRlc3RpbW9uaWFsU2VydmljZSwgJGxvZyl7XG4gIGNvbnN0IGlkID0gJHN0YXRlUGFyYW1zLmlkO1xuICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFsID0gdHJ1ZTtcbiAgVGVzdGltb25pYWxTZXJ2aWNlLmdldFNpbmdsZVRlc3RpbW9uaWFsKGlkKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFsID0gZmFsc2U7XG4gICAgICAkc2NvcGUudGVzdGltb25pYWwgPSBkYXRhO1xuICAgICAgJGxvZy5kZWJ1ZyhcIlRlc3RpbW9uaWFsXCIsIGRhdGEpO1xuICAgIH0pXG4gICAgLmVycm9yKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHdlIGNvdWxkIG5vdCBsb2FkIHRoaXMgdGVzdGltb25pYWwgYXQgdGhpcyB0aW1lLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiO1xuICAgIH0pO1xufVxuXG5leHBvcnQge1xuICBUZXN0aW1vbmlhbENvbnRyb2xsZXIsXG4gIFRlc3RpbW9uaWFsU2luZ2xlQ3RybFxufTtcbiIsImltcG9ydCB7Y29uZmlnLCBydW4sIHBheXBhbCwgQVBJfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciwgTGVmdEN0cmwsIFJpZ2h0Q3RybCwgRGlhbG9nQ3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXInO1xuaW1wb3J0IEJ1eUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9CdXlDb250cm9sbGVyJztcbmltcG9ydCBNZWRpYUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9NZWRpYUNvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXInO1xuaW1wb3J0IENvbnRhY3RDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXInO1xuaW1wb3J0IHsgVGVzdGltb25pYWxDb250cm9sbGVyLCBUZXN0aW1vbmlhbFNpbmdsZUN0cmwgfSBmcm9tICcuL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9DYXJ0U2VydmljZSc7XG5pbXBvcnQgVGVzdGltb25pYWxTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvVGVzdGltb25pYWxTZXJ2aWNlJztcbmltcG9ydCBVc2VyU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICdqa3VyaS5nYWxsZXJ5JyAsICduZ0Nvb2tpZXMnXSlcbi5jb25maWcoY29uZmlnKVxuLmNvbnN0YW50KCdQQVlQQUwnLCBwYXlwYWwpXG4uY29uc3RhbnQoJ0FQSScsIEFQSSlcbi5ydW4ocnVuKVxuLmZhY3RvcnkoJ0NhcnRTZXJ2aWNlJywgQ2FydFNlcnZpY2UpXG4uZmFjdG9yeSgnVGVzdGltb25pYWxTZXJ2aWNlJywgVGVzdGltb25pYWxTZXJ2aWNlKVxuLmZhY3RvcnkoJ1VzZXJTZXJ2aWNlJywgVXNlclNlcnZpY2UpXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdMZWZ0Q3RybCcsIExlZnRDdHJsKVxuLmNvbnRyb2xsZXIoJ1JpZ2h0Q3RybCcsIFJpZ2h0Q3RybClcbi5jb250cm9sbGVyKCdEaWFsb2dDdHJsJywgRGlhbG9nQ3RybClcbi5jb250cm9sbGVyKCdCdXlDdHJsJywgQnV5Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdNZWRpYUNvbnRyb2xsZXInLCBNZWRpYUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignQ2FydENvbnRyb2xsZXInLCBDYXJ0Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDb250YWN0Q3RybCcsIENvbnRhY3RDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcicsIFRlc3RpbW9uaWFsQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLCBUZXN0aW1vbmlhbFNpbmdsZUN0cmwpO1xuIiwibGV0IENhcnRTZXJ2aWNlID0gZnVuY3Rpb24oJGNvb2tpZXMsICRzdGF0ZSwgJHJvb3RTY29wZSwgJGh0dHAsICRsb2csIEFQSSl7XG5cbiAgY29uc3QgcGF5cGFsID0gXCJodHRwczovL3d3dy5wYXlwYWwuY29tL2NnaS1iaW4vd2Vic2NyXCI7XG5cbiAgLy8gaXRlbSBjb25zdHJ1Y3RvclxuXG4gIGZ1bmN0aW9uIEl0ZW0ob3B0aW9ucyl7XG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGU7XG4gICAgdGhpcy5wcmljZSA9IG9wdGlvbnMucHJpY2U7XG4gICAgdGhpcy5xdWFudGl0eSA9IG9wdGlvbnMucXVhbnRpdHk7XG4gICAgdGhpcy50b3RhbCA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gKHRoaXMucXVhbnRpdHkgKiB0aGlzLnByaWNlKSB8fCAwO1xuICAgIH07XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEl0ZW1zKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS9pdGVtc2ApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2luZ2xlSXRlbShpdGVtKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L2l0ZW1zLyR7aXRlbX1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENhcnQoKXtcbiAgICBsZXQgY2FydExpc3QgPSAkY29va2llcy5nZXRPYmplY3QoJ2NhcnQnKTtcbiAgICBpZighY2FydExpc3QgfHwgY2FydExpc3QubGVuZ3RoIDwgMSl7XG4gICAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICB2YXIgY2FydEl0ZW1zID0gY2FydExpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICBsZXQgY2FydEl0ZW0gPSBuZXcgSXRlbShpdGVtKTtcbiAgICAgIHJldHVybiBjYXJ0SXRlbTtcbiAgICB9KTtcblxuICAgIHZhciBwYXlwYWxJdGVtcyA9IGFkZFBheXBhbChjYXJ0SXRlbXMpO1xuXG4gICAgdmFyIGNhcnQgPSB7fTtcblxuICAgIGNhcnQuaXRlbXMgPSBwYXlwYWxJdGVtcztcbiAgICBjYXJ0LnRvdGFsSXRlbXMgPSBjYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENhcnQoaXRlbSl7XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICB2YXIgY2FydCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0KXtcbiAgICAgIGNhcnQgPSBbXTtcbiAgICB9XG5cbiAgICBsZXQgYWxyZWFkeUV4aXN0cyA9IF8uZmluZFdoZXJlKGNhcnQsIGl0ZW0udGl0bGUpO1xuICAgIGlmKGFscmVhZHlFeGlzdHMpe1xuICAgICAgY2FydCA9IF8ud2l0aG91dChjYXJ0LCBhbHJlYWR5RXhpc3RzKTtcbiAgICAgIGFscmVhZHlFeGlzdHMucXVhbnRpdHkgPSBhbHJlYWR5RXhpc3RzLnF1YW50aXR5ICsgaXRlbS5xdWFudGl0eTtcbiAgICAgIGNhcnQucHVzaChhbHJlYWR5RXhpc3RzKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNhcnQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydCk7XG4gICAgJGxvZy5kZWJ1ZyhcIkl0ZW0gYWRkZWQgdG8gY2FydFwiLCBpdGVtLCBjYXJ0KTtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjY2FydCcpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbygnY2FydCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2FydChpdGVtcyl7XG4gICAgJGxvZy5kZWJ1ZygndXBkYXRpbmcgY2FydCcsIGl0ZW1zKTtcblxuICAgIHZhciBjYXJ0SXRlbXMgPSBhZGRQYXlwYWwoaXRlbXMpO1xuICAgICRjb29raWVzLnB1dE9iamVjdCgnY2FydCcsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNoaXBwaW5nVGllcnMoKXtcbiAgICBsZXQgc2hpcHBpbmcgPSB7XG4gICAgICB0aWVyMToge1xuICAgICAgICBxdWFudGl0eTogNSxcbiAgICAgICAgcHJpY2U6IDVcbiAgICAgIH0sXG4gICAgICB0aWVyMjoge1xuICAgICAgICBxdWFudGl0eTogMTAsXG4gICAgICAgIHByaWNlOiAxMFxuICAgICAgfSxcbiAgICAgIHRpZXIzOiB7XG4gICAgICAgIHF1YW50aXR5OiAyMCxcbiAgICAgICAgcHJpY2U6IDIwXG4gICAgICB9XG4gICAgfTtcbiAgICAkbG9nLmRlYnVnKFwiU2hpcHBpbmcgVGllcnNcIiwgc2hpcHBpbmcpO1xuICAgIHJldHVybiBzaGlwcGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHRpZXJzKXtcbiAgICBjYXJ0Lml0ZW1zLmZvckVhY2goKGl0ZW0pID0+e1xuICAgIGlmKGl0ZW0ucXVhbnRpdHkgPj0gdGllcnMudGllcjEucXVhbnRpdHkgJiYgaXRlbS5xdWFudGl0eSA8IHRpZXJzLnRpZXIyLnF1YW50aXR5KXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IHRpZXJzLnRpZXIxLnByaWNlO1xuICAgICAgfWVsc2UgaWYoaXRlbS5xdWFudGl0eSA+PSB0aWVycy50aWVyMi5xdWFudGl0eSAmJiBpdGVtLnF1YW50aXR5IDwgdGllcnMudGllcjMucXVhbnRpdHkpe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjIucHJpY2U7XG4gICAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID4gdGllcnMudGllcjMucXVhbnRpdHkgKXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IHRpZXJzLnRpZXIzLnByaWNlO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGl0ZW0uc2hpcHBpbmcgPSAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2FydC5zaGlwcGluZyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnNoaXBwaW5nO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIGNhcnQ7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhcnRXYXRjaChjYXJ0LCBzaGlwcGluZykge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoIV8uaXNFbXB0eShjYXJ0KSl7XG5cbiAgICAgIGlmKGNhcnQuaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgIGNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2FydCA9IHVwZGF0ZUNhcnQoY2FydC5pdGVtcyk7XG4gICAgICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgICB9LCAwKTtcbiAgICAgIH1cblxuICAgICAgY2FydC5zaGlwcGluZyA9ICBjYWxjdWxhdGVTaGlwcGluZyhjYXJ0LCBzaGlwcGluZyk7XG4gICAgICBjYXJ0LnN1YnRvdGFsID0gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgICAgIGNhcnQudG90YWwgPSAoc3VidG90YWwgKyBjYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgICAkbG9nLmRlYnVnKFwiQ2FydCBsb2FkZWQgb3IgdXBkYXRlZFwiLCBjYXJ0KTtcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBheXBhbChjYXJ0SXRlbXMpe1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYXJ0SXRlbXMubGVuZ3RoOyBpICsrKXtcbiAgICAgIHZhciBpdGVtTnVtYmVyID0gKGkgKyAxKTtcbiAgICAgIGNhcnRJdGVtc1tpXS5wYXlwYWwgPSB7XG4gICAgICAgIGl0ZW0gOiBcIml0ZW1fbmFtZV9cIiArIGl0ZW1OdW1iZXIsXG4gICAgICAgIGFtb3VudDogXCJhbW91bnRfXCIrIGl0ZW1OdW1iZXIsXG4gICAgICAgIHF1YW50aXR5OiBcInF1YW50aXR5X1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgc2hpcHBpbmcgOiBcInNoaXBwaW5nX1wiICsgaXRlbU51bWJlclxuICAgICAgfTtcbiAgICB9XG5cbiAgICAkbG9nLmRlYnVnKFwiYWRkaW5nIHBheXBhbCBpbmZvXCIsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0SXRlbXMsXG4gICAgZ2V0U2luZ2xlSXRlbSxcbiAgICBnZXRDYXJ0LFxuICAgIHNldENhcnQsXG4gICAgdXBkYXRlQ2FydCxcbiAgICBnZXRTaGlwcGluZ1RpZXJzLFxuICAgIGNhbGN1bGF0ZVNoaXBwaW5nLFxuICAgIGNhcnRXYXRjaFxuICB9O1xuXG5cbn07XG5cbkNhcnRTZXJ2aWNlLiRpbmplY3QgPSBbJyRjb29raWVzJywgJyRzdGF0ZScsICckcm9vdFNjb3BlJywgJyRodHRwJywgJyRsb2cnXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydFNlcnZpY2U7XG4iLCJsZXQgVGVzdGltb25pYWxTZXJ2aWNlID0gZnVuY3Rpb24oJGh0dHAsIEFQSSl7XG5cbiAgZnVuY3Rpb24gZ2V0VGVzdGltb25pYWxzKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNpbmdsZVRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsSWQpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzLyR7dGVzdGltb25pYWxJZH1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgLCB0ZXN0aW1vbmlhbCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFRlc3RpbW9uaWFscyxcbiAgICBnZXRTaW5nbGVUZXN0aW1vbmlhbCxcbiAgICBhZGRUZXN0aW1vbmlhbFxuICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IFRlc3RpbW9uaWFsU2VydmljZTtcbiIsImxldCBVc2VyU2VydmljZSA9IGZ1bmN0aW9uKCRodHRwLCBBUEksICRjb29raWVzLCAkc3RhdGUsICRyb290U2NvcGUpe1xuXG4gIGZ1bmN0aW9uIGdldFVzZXJJbmZvKCl7XG4gICAgJGh0dHAuZ2V0KGAke0FQSS5VUkx9L21lYClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRyb290U2NvcGUudXNlck5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgICRyb290U2NvcGUudXNlckl0ZW1zID0gZGF0YS5pdGVtcztcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVc2VyKCl7XG4gICAgY29uc3QgdG9rZW4gPSAkY29va2llcy5nZXQoJ3Rva2VuJyk7XG4gICAgaWYodG9rZW4pe1xuICAgICAgZ2V0VXNlckluZm8oKTtcbiAgICAgIF9zZXRUb2tlbih0b2tlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX3NldFRva2VuKHRva2VuKXtcbiAgICBpZih0b2tlbil7XG4gICAgICBBUEkuQ09ORklHLmhlYWRlcnNbJ3gtYWNjZXNzLXRva2VuJ10gPSB0b2tlbjtcbiAgICAgICRyb290U2NvcGUuaXNVc2VyTG9nZ2VkSW4gPSB0cnVlO1xuICAgIH1lbHNle1xuICAgICAgJHJvb3RTY29wZS5pc1VzZXJMb2dnZWRJbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdob2xlc2FsZVJlcXVlc3QoZW1haWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L3dob2xlc2FsZWAsIGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRhY3QoZW1haWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L2NvbnRhY3RgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dpbih1c2VyKXtcbiAgICAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L2F1dGhlbnRpY2F0ZWAsIHVzZXIpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT4ge1xuICAgICAgICBfc3VjY2Vzc0xvZyhkYXRhKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gX3N1Y2Nlc3NMb2coZGF0YSl7XG4gICAgJGNvb2tpZXMucHV0KCd0b2tlbicsIGRhdGEudG9rZW4pO1xuICB9XG5cbiAgZnVuY3Rpb24gX3VwZGF0ZVVzZXIodXNlcklkLCB1c2VyKXtcbiAgICByZXR1cm4gJGh0dHAucHV0KGAke0FQSS5VUkx9L3VzZXJzLyR7dXNlcklkfWAsIHVzZXIsIEFQSS5DT05GSUcpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9nT3V0KCl7XG4gICAgJGNvb2tpZXMucmVtb3ZlKCd0b2tlbicpO1xuICAgIF9zZXRUb2tlbigpO1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gX2dldFVzZXIodXNlcklkKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L3VzZXJzLyR7dXNlcklkfWAsIEFQSS5DT05GSUcpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yZ290UGFzc3dvcmQoZW1haWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L2ZvcmdvdFBhc3N3b3JkYCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZVVzZXIodXNlcklkKXtcbiAgICByZXR1cm4gJGh0dHAuZGVsZXRlKGAke0FQSS5VUkx9L3VzZXJzLyR7dXNlcklkfWApO1xuICB9XG5cbiAgcmV0dXJue1xuICAgIGNoZWNrVXNlcixcbiAgICB3aG9sZXNhbGVSZXF1ZXN0LFxuICAgIGNvbnRhY3QsXG4gICAgbG9naW4sXG4gICAgbG9nT3V0LFxuICAgIF91cGRhdGVVc2VyLFxuICAgIF9nZXRVc2VyLFxuICAgIF9kZWxldGVVc2VyLFxuICAgIGZvcmdvdFBhc3N3b3JkXG5cbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJTZXJ2aWNlO1xuIl19
