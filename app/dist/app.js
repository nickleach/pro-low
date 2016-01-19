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
function BuyController($scope, $cookies, $state, CartService, $log) {

  CartService.getItems().success(function (data) {
    $log.debug('items', data);
    $scope.items = data;
  });

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

CartService.$inject = ['$cookies', '$state', '$rootScope', '$http', '$log', 'API'];

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZS5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsU0FBUyxNQUFNLENBQUMsY0FBYyxFQUFF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ekIsYUFBUyxFQUFFLENBQUM7QUFDWixVQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ25COztBQUVELFdBQVMsUUFBUSxDQUFDLE1BQU0sRUFBQztBQUN2QixXQUFPLEtBQUssQ0FBQyxHQUFHLENBQUksR0FBRyxDQUFDLEdBQUcsZUFBVSxNQUFNLEVBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQzVEOztBQUVELFdBQVMsY0FBYyxDQUFDLEtBQUssRUFBQztBQUM1QixXQUFPLEtBQUssQ0FBQyxJQUFJLENBQUksR0FBRyxDQUFDLEdBQUcsc0JBQW1CLEtBQUssQ0FBQyxDQUFDO0dBQ3ZEOztBQUVELFdBQVMsV0FBVyxDQUFDLE1BQU0sRUFBQztBQUMxQixXQUFPLEtBQUssVUFBTyxDQUFJLEdBQUcsQ0FBQyxHQUFHLGVBQVUsTUFBTSxDQUFHLENBQUM7R0FDbkQ7O0FBRUQsU0FBTTtBQUNKLGFBQVMsRUFBVCxTQUFTO0FBQ1Qsb0JBQWdCLEVBQWhCLGdCQUFnQjtBQUNoQixXQUFPLEVBQVAsT0FBTztBQUNQLFNBQUssRUFBTCxLQUFLO0FBQ0wsVUFBTSxFQUFOLE1BQU07QUFDTixlQUFXLEVBQVgsV0FBVztBQUNYLFlBQVEsRUFBUixRQUFRO0FBQ1IsZUFBVyxFQUFYLFdBQVc7QUFDWCxrQkFBYyxFQUFkLGNBQWM7O0dBRWYsQ0FBQztDQUNILENBQUM7O3FCQUVhLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJGxvZ1Byb3ZpZGVyKSB7XG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5Jywge1xuICAgICAgdXJsOiAnL2J1eScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0J1eUN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzLmFkZCcsIHtcbiAgICAgIHVybDogJy9hZGQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLmFkZC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge1xuICAgICAgdXJsOiAnLzppZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMuc2luZ2xlLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwcmljaW5nJywge1xuICAgICAgdXJsOiAnL3ByaWNpbmcnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvcHJpY2luZy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2Rlc2lnbicsIHtcbiAgICAgIHVybDogJy9kZXNpZ24nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZGVzaWduLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY2FydCcsIHtcbiAgICAgIHVybDogJy9jYXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NhcnQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NhcnRDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gcnVuKENhcnRTZXJ2aWNlLCBVc2VyU2VydmljZSwgJHJvb3RTY29wZSl7XG4gICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICBVc2VyU2VydmljZS5jaGVja1VzZXIoKTtcbiAgICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG4gIH0pO1xufVxuXG5jb25zdCBwYXlwYWwgPSB7XG4gICAgICB1c2VybmFtZTogJ2FpbmVzLmtldmluX2FwaTEuZ21haWwuY29tJyxcbiAgICAgIHBhc3N3b3JkOiAnVDZYOURSMkI3N0JRNFlXSycsXG4gICAgICBjcmVkZW50aWFsOiAnQVBJIFNpZ25hdHVyZScsXG4gICAgICBzaWduYXR1cmU6ICdBRmNXeFYyMUM3ZmQwdjNiWVlZUkNwU1NSbDMxQTJFRWhBeld6bHhxLUV6RVF0b1pNcVNjUjZ4SSdcbn07XG5cbmNvbnN0IEFQSSA9IHtcbiAgVVJMOiAnaHR0cDovL2FkbWluLnByb2xvd3B1dHRpbmcuY29tL2FwaScsXG4gIENPTkZJRzoge1xuICAgIGhlYWRlcnM6e1xuXG4gICAgfVxuICB9XG59O1xuZXhwb3J0IHtcbiAgcGF5cGFsLFxuICBjb25maWcsXG4gIHJ1bixcbiAgQVBJXG59O1xuIiwiZnVuY3Rpb24gQnV5Q29udHJvbGxlcigkc2NvcGUsICRjb29raWVzLCAkc3RhdGUsIENhcnRTZXJ2aWNlLCAkbG9nKXtcblxuICBDYXJ0U2VydmljZS5nZXRJdGVtcygpLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICRsb2cuZGVidWcoJ2l0ZW1zJywgZGF0YSk7XG4gICAgJHNjb3BlLml0ZW1zID0gZGF0YTtcbiAgfSk7XG5cbiAgbGV0IGxvd1RpZXIgPSB7XG4gICAgcXVhbnRpdHkgOiA0LFxuICAgIHByaWNlIDogMzkuOTVcbiAgfTtcblxuICBsZXQgbWVkVGllciA9IHtcbiAgICBxdWFudGl0eSA6IDksXG4gICAgcHJpY2UgOiAzNS4wMFxuICB9O1xuXG4gIGxldCBoaWdoVGllciA9IHtcbiAgICBxdWFudGl0eSA6IDE1LFxuICAgIHByaWNlOiAzMC4wMFxuICB9O1xuXG4gICRzY29wZS5pdGVtID0ge1xuICAgIHF1YW50aXR5OiAxLFxuICAgIHRpdGxlOiBcIlRoZSBQcm8gTG93IFB1dHRpbmcgU3lzdGVtXCIsXG4gICAgcHJpY2U6IDM5Ljk1XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrUXVhbnRpdHkgPSBmdW5jdGlvbihxdWFudGl0eSkge1xuXG4gICAgaWYocXVhbnRpdHkgPD0gbG93VGllci5xdWFudGl0eSl7XG4gICAgICAkc2NvcGUuaXRlbS5wcmljZSA9IGxvd1RpZXIucHJpY2U7XG4gICAgfWVsc2UgaWYocXVhbnRpdHkgPD0gbWVkVGllci5xdWFudGl0eSAmJiBxdWFudGl0eSA+IGxvd1RpZXIucXVhbnRpdHkpe1xuICAgICAgJHNjb3BlLml0ZW0ucHJpY2UgPSBtZWRUaWVyLnByaWNlO1xuICAgIH1lbHNlIGlmKHF1YW50aXR5ID4gbWVkVGllci5xdWFudGl0eSl7XG4gICAgICAkc2NvcGUuaXRlbS5wcmljZSA9IGhpZ2hUaWVyLnByaWNlO1xuICAgIH1cblxuICB9O1xuXG5cbiAgJHNjb3BlLmFkZFRvQ2FydCA9IGZ1bmN0aW9uKGl0ZW0sIHByaWNlKXtcbiAgICBDYXJ0U2VydmljZS5zZXRDYXJ0KGl0ZW0sIHByaWNlKTtcbiAgfTtcblxufVxuZXhwb3J0IGRlZmF1bHQgQnV5Q29udHJvbGxlcjtcbiIsImxldCBDYXJ0Q29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZSwgQ2FydFNlcnZpY2UsICRyb290U2NvcGUsICRsb2cpe1xuXG4gIC8vICRzY29wZS5zaGlwcGluZ1RpZXJzID0gQ2FydFNlcnZpY2UuZ2V0U2hpcHBpbmdUaWVycygpO1xuXG5cblxuLy8gJHNjb3BlLiR3YXRjaCgnY2FydCcsIENhcnRTZXJ2aWNlLmNhcnRXYXRjaCgkcm9vdFNjb3BlLmNhcnQsICRzY29wZS5zaGlwcGluZ1RpZXJzKSAsdHJ1ZSk7XG5cblxuICAkc2NvcGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pe1xuICAgJGxvZy5kZWJ1ZyhcIlJlbW92aW5nIEl0ZW1cIiwgaXRlbSk7XG5cbiAgICRzY29wZS5jYXJ0Lml0ZW1zID0gIF8ud2l0aG91dCgkc2NvcGUuY2FydC5pdGVtcywgaXRlbSk7XG4gICBDYXJ0U2VydmljZS51cGRhdGVDYXJ0KCRzY29wZS5jYXJ0Lml0ZW1zKTtcbiAgICRyb290U2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLmdldENhcnQoKTtcbiAgfTtcblxuICAkc2NvcGUuY2hlY2tvdXQgPSBmdW5jdGlvbihjYXJ0KXtcbiAgICBDYXJ0U2VydmljZS5jaGVja291dChjYXJ0KTtcbiAgfTtcblxuXG5cbn07XG5cbkNhcnRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdDYXJ0U2VydmljZScsICckcm9vdFNjb3BlJywgJyRsb2cnXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydENvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBDb250YWN0Q29udHJvbGxlcigkc2NvcGUsIFVzZXJTZXJ2aWNlKXtcblxuICAkc2NvcGUuY29udGFjdCA9IGZ1bmN0aW9uIChkYXRhKXtcbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICBVc2VyU2VydmljZS5jb250YWN0KGRhdGEpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSlcbiAgICAgIC5lcnJvcigoZGF0YSkgPT4ge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS53aG9sZXNhbGVSZXF1ZXN0ID0gZnVuY3Rpb24oZGF0YSl7XG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgVXNlclNlcnZpY2Uud2hvbGVzYWxlUmVxdWVzdChkYXRhKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIH0pXG4gICAgICAuZXJyb3IoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICB9KTtcbiAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWN0Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRtZFV0aWwsICRzdGF0ZSwgJG1kRGlhbG9nLCBDYXJ0U2VydmljZSwgJHJvb3RTY29wZSl7XG5cbiRyb290U2NvcGUuc2hpcHBpbmdUaWVycyA9IENhcnRTZXJ2aWNlLmdldFNoaXBwaW5nVGllcnMoKTtcblxuXG4gJHNjb3BlLiR3YXRjaCgnY2FydCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoIV8uaXNFbXB0eSgkcm9vdFNjb3BlLmNhcnQpKXtcblxuICAgICAgaWYoJHNjb3BlLmNhcnQuaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICRzY29wZS5jYXJ0Lml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHN1YnRvdGFsICs9IGl0ZW0udG90YWwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNhcnQuaXRlbXMgPSBDYXJ0U2VydmljZS51cGRhdGVDYXJ0KCRzY29wZS5jYXJ0Lml0ZW1zKTtcblxuICAgICAgICAkc2NvcGUuY2FydC50b3RhbEl0ZW1zID0gJHNjb3BlLmNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgICB9LCAwKTtcblxuICAgICAgfVxuICAgICAgICAkc2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLmNhbGN1bGF0ZVNoaXBwaW5nKCRzY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycyk7XG4gICAgICAgICRzY29wZS5jYXJ0LnN1YnRvdGFsID0gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgICAgICAgJHNjb3BlLmNhcnQudG90YWwgPSAoc3VidG90YWwgKyAkc2NvcGUuY2FydC5zaGlwcGluZykudG9GaXhlZCgyKTtcblxuICAgICAgICAkbG9nLmRlYnVnKFwiQ2FydCBsb2FkZWQgb3IgdXBkYXRlZFwiLCAkc2NvcGUuY2FydCk7XG4gICAgfVxuXG4gIH0sIHRydWUpO1xuXG5cbiAgLy8gbmF2IHRvZ2dsZXNcbiAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBidWlsZFRvZ2dsZXIoJ2xlZnQnKTtcbiAgJHNjb3BlLnRvZ2dsZVJpZ2h0ID0gYnVpbGRUb2dnbGVyKCdyaWdodCcpO1xuICBsZXQgJGxlZnQgPSAkKCcubWQtc2lkZW5hdi1sZWZ0Jyk7XG4gIGxldCAkcmlnaHQgPSAkKCcubWQtc2lkZW5hdi1yaWdodCcpO1xuXG4gIC8vIGxpc3QgaXRlbSBjbGljayBldmVudFxuICAvLyAkKCdtZC1saXN0LWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAvLyAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyAgICQodGhpcykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkVG9nZ2xlcihuYXZJRCkge1xuICAgIGxldCBkZWJvdW5jZUZuID0gICRtZFV0aWwuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICRtZFNpZGVuYXYobmF2SUQpLnRvZ2dsZSgpO1xuICAgICAgfSwzMDApO1xuICAgIHJldHVybiBkZWJvdW5jZUZuO1xuICB9XG5cblxuICAvLyBOYXZpZ2F0ZSBmdW5jdGlvblxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHN0YXRlLCBuYXYpe1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyMnKyBzdGF0ZSkuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKHN0YXRlKS50aGVuKCgpID0+IHtcbiAgICBpZiAobmF2ID09IFwibGVmdFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgICBpZighJHJpZ2h0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgfWVsc2UgaWYobmF2ID09IFwicmlnaHRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICAgIGlmKCEkbGVmdC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgfX0pO1xuXG4gIH07XG5cbiAgJHNjb3BlLnNob3dXYXJyYW50eSA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgJG1kRGlhbG9nLnNob3coe1xuICAgICAgY29udHJvbGxlcjogRGlhbG9nQ3RybCxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3dhcnJhbnR5LnRwbC5odG1sJyxcbiAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcbiAgJHNjb3BlLnNob3dTaGlwcGluZyA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgJG1kRGlhbG9nLnNob3coe1xuICAgICAgY29udHJvbGxlcjogRGlhbG9nQ3RybCxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3NoaXBwaW5nLnRwbC5odG1sJyxcbiAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUuY29udGFjdFVzID0gZnVuY3Rpb24oY29udGFjdCl7XG5cbiAgfTtcbn1cblxuXG5mdW5jdGlvbiBSaWdodEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ3JpZ2h0JykuY2xvc2UoKTtcbiAgfTtcblxuXG59XG5mdW5jdGlvbiBMZWZ0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XG4gIH07XG5cbn1cblxuZnVuY3Rpb24gRGlhbG9nQ3RybCgkc2NvcGUsICRtZERpYWxvZyl7XG4gICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAkbWREaWFsb2cuY2FuY2VsKCk7XG4gIH07XG5cbiAgJHNjb3BlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAkbWREaWFsb2cuaGlkZSgpO1xuICB9O1xufVxuXG5leHBvcnQge1xuICBNYWluQ29udHJvbGxlcixcbiAgUmlnaHRDdHJsLFxuICBMZWZ0Q3RybCxcbiAgRGlhbG9nQ3RybFxufTtcbiIsImZ1bmN0aW9uIE1lZGlhQ29udHJvbGxlcigkc2NvcGUpe1xuXG4gICAgJHNjb3BlLnRlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgY29uc29sZS5sb2coJ3dvcmtlZCcpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvY2xvc2V1cDEtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2Nsb3NldXAxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMva2V2aW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2tldmluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4zLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgIC8vICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluMy1jb21wcmVzc29yLmpwZycsXG4gICAgICAvLyAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgLy8gfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTEtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUyLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUyLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMy1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTQtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTQtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU1LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU1LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9XG4gICAgXTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBNZWRpYUNvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBUZXN0aW1vbmlhbENvbnRyb2xsZXIoJHNjb3BlLCBUZXN0aW1vbmlhbFNlcnZpY2UsICRzdGF0ZSwgJGxvZyl7XG4gICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gdHJ1ZTtcblxuICBUZXN0aW1vbmlhbFNlcnZpY2UuZ2V0VGVzdGltb25pYWxzKClcbiAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFscyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLnRlc3RpbW9uaWFscyA9IGRhdGE7XG4gICAgICAkbG9nLmRlYnVnKFwiVGVzdGltb25pYWxzXCIsICRzY29wZS50ZXN0aW1vbmlhbHMpO1xuICAgIH0pXG4gICAgLmVycm9yKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gXCJXZSdyZSBzb3JyeSB3ZSBjb3VsZCBub3QgbG9hZCB0ZXN0aW1vbmlhbHMgYXQgdGhpcyB0aW1lLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiO1xuICAgIH0pO1xuICAkc2NvcGUuZ29Ub1NpbmdsZSA9IGZ1bmN0aW9uKGlkKXtcbiAgICRzdGF0ZS5nbygndGVzdGltb25pYWxzLnNpbmdsZScsIHtpZDogaWR9KTtcbiAgfTtcbiAgJHNjb3BlLmFkZFRlc3RpbW9uaWFsID0gZnVuY3Rpb24odGVzdGltb25pYWwpe1xuICAgICRzY29wZS5hZGRpbmdUZXN0aW1vbmlhbCA9IHRydWU7XG4gICAgdGVzdGltb25pYWwuZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgVGVzdGltb25pYWxTZXJ2aWNlLmFkZFRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLnRlc3RpbW9uaWFsQWRkZWQgPSB0cnVlO1xuICAgICAgJHNjb3BlLmFkZGVkVGVzdGltb25pYWxNZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBUZXN0aW1vbmlhbFNpbmdsZUN0cmwoJHNjb3BlLCAkc3RhdGVQYXJhbXMsIFRlc3RpbW9uaWFsU2VydmljZSwgJGxvZyl7XG4gIGNvbnN0IGlkID0gJHN0YXRlUGFyYW1zLmlkO1xuICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFsID0gdHJ1ZTtcbiAgVGVzdGltb25pYWxTZXJ2aWNlLmdldFNpbmdsZVRlc3RpbW9uaWFsKGlkKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFsID0gZmFsc2U7XG4gICAgICAkc2NvcGUudGVzdGltb25pYWwgPSBkYXRhO1xuICAgICAgJGxvZy5kZWJ1ZyhcIlRlc3RpbW9uaWFsXCIsIGRhdGEpO1xuICAgIH0pXG4gICAgLmVycm9yKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHdlIGNvdWxkIG5vdCBsb2FkIHRoaXMgdGVzdGltb25pYWwgYXQgdGhpcyB0aW1lLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiO1xuICAgIH0pO1xufVxuXG5leHBvcnQge1xuICBUZXN0aW1vbmlhbENvbnRyb2xsZXIsXG4gIFRlc3RpbW9uaWFsU2luZ2xlQ3RybFxufTtcbiIsImltcG9ydCB7Y29uZmlnLCBydW4sIHBheXBhbCwgQVBJfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciwgTGVmdEN0cmwsIFJpZ2h0Q3RybCwgRGlhbG9nQ3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXInO1xuaW1wb3J0IEJ1eUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9CdXlDb250cm9sbGVyJztcbmltcG9ydCBNZWRpYUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9NZWRpYUNvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXInO1xuaW1wb3J0IENvbnRhY3RDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXInO1xuaW1wb3J0IHsgVGVzdGltb25pYWxDb250cm9sbGVyLCBUZXN0aW1vbmlhbFNpbmdsZUN0cmwgfSBmcm9tICcuL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9DYXJ0U2VydmljZSc7XG5pbXBvcnQgVGVzdGltb25pYWxTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvVGVzdGltb25pYWxTZXJ2aWNlJztcbmltcG9ydCBVc2VyU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICdqa3VyaS5nYWxsZXJ5JyAsICduZ0Nvb2tpZXMnXSlcbi5jb25maWcoY29uZmlnKVxuLmNvbnN0YW50KCdQQVlQQUwnLCBwYXlwYWwpXG4uY29uc3RhbnQoJ0FQSScsIEFQSSlcbi5ydW4ocnVuKVxuLmZhY3RvcnkoJ0NhcnRTZXJ2aWNlJywgQ2FydFNlcnZpY2UpXG4uZmFjdG9yeSgnVGVzdGltb25pYWxTZXJ2aWNlJywgVGVzdGltb25pYWxTZXJ2aWNlKVxuLmZhY3RvcnkoJ1VzZXJTZXJ2aWNlJywgVXNlclNlcnZpY2UpXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdMZWZ0Q3RybCcsIExlZnRDdHJsKVxuLmNvbnRyb2xsZXIoJ1JpZ2h0Q3RybCcsIFJpZ2h0Q3RybClcbi5jb250cm9sbGVyKCdEaWFsb2dDdHJsJywgRGlhbG9nQ3RybClcbi5jb250cm9sbGVyKCdCdXlDdHJsJywgQnV5Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdNZWRpYUNvbnRyb2xsZXInLCBNZWRpYUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignQ2FydENvbnRyb2xsZXInLCBDYXJ0Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDb250YWN0Q3RybCcsIENvbnRhY3RDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcicsIFRlc3RpbW9uaWFsQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLCBUZXN0aW1vbmlhbFNpbmdsZUN0cmwpO1xuIiwibGV0IENhcnRTZXJ2aWNlID0gZnVuY3Rpb24oJGNvb2tpZXMsICRzdGF0ZSwgJHJvb3RTY29wZSwgJGh0dHAsICRsb2csIEFQSSl7XG5cbiAgY29uc3QgcGF5cGFsID0gXCJodHRwczovL3d3dy5wYXlwYWwuY29tL2NnaS1iaW4vd2Vic2NyXCI7XG5cbiAgLy8gaXRlbSBjb25zdHJ1Y3RvclxuXG4gIGZ1bmN0aW9uIEl0ZW0ob3B0aW9ucyl7XG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGU7XG4gICAgdGhpcy5wcmljZSA9IG9wdGlvbnMucHJpY2U7XG4gICAgdGhpcy5xdWFudGl0eSA9IG9wdGlvbnMucXVhbnRpdHk7XG4gICAgdGhpcy50b3RhbCA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gKHRoaXMucXVhbnRpdHkgKiB0aGlzLnByaWNlKSB8fCAwO1xuICAgIH07XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEl0ZW1zKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS9pdGVtc2ApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2luZ2xlSXRlbShpdGVtKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L2l0ZW1zLyR7aXRlbX1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENhcnQoKXtcbiAgICBsZXQgY2FydExpc3QgPSAkY29va2llcy5nZXRPYmplY3QoJ2NhcnQnKTtcbiAgICBpZighY2FydExpc3QgfHwgY2FydExpc3QubGVuZ3RoIDwgMSl7XG4gICAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICB2YXIgY2FydEl0ZW1zID0gY2FydExpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICBsZXQgY2FydEl0ZW0gPSBuZXcgSXRlbShpdGVtKTtcbiAgICAgIHJldHVybiBjYXJ0SXRlbTtcbiAgICB9KTtcblxuICAgIHZhciBwYXlwYWxJdGVtcyA9IGFkZFBheXBhbChjYXJ0SXRlbXMpO1xuXG4gICAgdmFyIGNhcnQgPSB7fTtcblxuICAgIGNhcnQuaXRlbXMgPSBwYXlwYWxJdGVtcztcbiAgICBjYXJ0LnRvdGFsSXRlbXMgPSBjYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENhcnQoaXRlbSl7XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICB2YXIgY2FydCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0KXtcbiAgICAgIGNhcnQgPSBbXTtcbiAgICB9XG5cbiAgICBsZXQgYWxyZWFkeUV4aXN0cyA9IF8uZmluZFdoZXJlKGNhcnQsIGl0ZW0udGl0bGUpO1xuICAgIGlmKGFscmVhZHlFeGlzdHMpe1xuICAgICAgY2FydCA9IF8ud2l0aG91dChjYXJ0LCBhbHJlYWR5RXhpc3RzKTtcbiAgICAgIGFscmVhZHlFeGlzdHMucXVhbnRpdHkgPSBhbHJlYWR5RXhpc3RzLnF1YW50aXR5ICsgaXRlbS5xdWFudGl0eTtcbiAgICAgIGNhcnQucHVzaChhbHJlYWR5RXhpc3RzKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNhcnQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydCk7XG4gICAgJGxvZy5kZWJ1ZyhcIkl0ZW0gYWRkZWQgdG8gY2FydFwiLCBpdGVtLCBjYXJ0KTtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjY2FydCcpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbygnY2FydCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2FydChpdGVtcyl7XG4gICAgJGxvZy5kZWJ1ZygndXBkYXRpbmcgY2FydCcsIGl0ZW1zKTtcblxuICAgIHZhciBjYXJ0SXRlbXMgPSBhZGRQYXlwYWwoaXRlbXMpO1xuICAgICRjb29raWVzLnB1dE9iamVjdCgnY2FydCcsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNoaXBwaW5nVGllcnMoKXtcbiAgICBsZXQgc2hpcHBpbmcgPSB7XG4gICAgICB0aWVyMToge1xuICAgICAgICBxdWFudGl0eTogNSxcbiAgICAgICAgcHJpY2U6IDVcbiAgICAgIH0sXG4gICAgICB0aWVyMjoge1xuICAgICAgICBxdWFudGl0eTogMTAsXG4gICAgICAgIHByaWNlOiAxMFxuICAgICAgfSxcbiAgICAgIHRpZXIzOiB7XG4gICAgICAgIHF1YW50aXR5OiAyMCxcbiAgICAgICAgcHJpY2U6IDIwXG4gICAgICB9XG4gICAgfTtcbiAgICAkbG9nLmRlYnVnKFwiU2hpcHBpbmcgVGllcnNcIiwgc2hpcHBpbmcpO1xuICAgIHJldHVybiBzaGlwcGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHRpZXJzKXtcbiAgICBjYXJ0Lml0ZW1zLmZvckVhY2goKGl0ZW0pID0+e1xuICAgIGlmKGl0ZW0ucXVhbnRpdHkgPj0gdGllcnMudGllcjEucXVhbnRpdHkgJiYgaXRlbS5xdWFudGl0eSA8IHRpZXJzLnRpZXIyLnF1YW50aXR5KXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IHRpZXJzLnRpZXIxLnByaWNlO1xuICAgICAgfWVsc2UgaWYoaXRlbS5xdWFudGl0eSA+PSB0aWVycy50aWVyMi5xdWFudGl0eSAmJiBpdGVtLnF1YW50aXR5IDwgdGllcnMudGllcjMucXVhbnRpdHkpe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjIucHJpY2U7XG4gICAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID4gdGllcnMudGllcjMucXVhbnRpdHkgKXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IHRpZXJzLnRpZXIzLnByaWNlO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGl0ZW0uc2hpcHBpbmcgPSAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2FydC5zaGlwcGluZyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnNoaXBwaW5nO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIGNhcnQ7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhcnRXYXRjaChjYXJ0LCBzaGlwcGluZykge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoIV8uaXNFbXB0eShjYXJ0KSl7XG5cbiAgICAgIGlmKGNhcnQuaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgIGNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2FydCA9IHVwZGF0ZUNhcnQoY2FydC5pdGVtcyk7XG4gICAgICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgICB9LCAwKTtcbiAgICAgIH1cblxuICAgICAgY2FydC5zaGlwcGluZyA9ICBjYWxjdWxhdGVTaGlwcGluZyhjYXJ0LCBzaGlwcGluZyk7XG4gICAgICBjYXJ0LnN1YnRvdGFsID0gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgICAgIGNhcnQudG90YWwgPSAoc3VidG90YWwgKyBjYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgICAkbG9nLmRlYnVnKFwiQ2FydCBsb2FkZWQgb3IgdXBkYXRlZFwiLCBjYXJ0KTtcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBheXBhbChjYXJ0SXRlbXMpe1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYXJ0SXRlbXMubGVuZ3RoOyBpICsrKXtcbiAgICAgIHZhciBpdGVtTnVtYmVyID0gKGkgKyAxKTtcbiAgICAgIGNhcnRJdGVtc1tpXS5wYXlwYWwgPSB7XG4gICAgICAgIGl0ZW0gOiBcIml0ZW1fbmFtZV9cIiArIGl0ZW1OdW1iZXIsXG4gICAgICAgIGFtb3VudDogXCJhbW91bnRfXCIrIGl0ZW1OdW1iZXIsXG4gICAgICAgIHF1YW50aXR5OiBcInF1YW50aXR5X1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgc2hpcHBpbmcgOiBcInNoaXBwaW5nX1wiICsgaXRlbU51bWJlclxuICAgICAgfTtcbiAgICB9XG5cbiAgICAkbG9nLmRlYnVnKFwiYWRkaW5nIHBheXBhbCBpbmZvXCIsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0SXRlbXMsXG4gICAgZ2V0U2luZ2xlSXRlbSxcbiAgICBnZXRDYXJ0LFxuICAgIHNldENhcnQsXG4gICAgdXBkYXRlQ2FydCxcbiAgICBnZXRTaGlwcGluZ1RpZXJzLFxuICAgIGNhbGN1bGF0ZVNoaXBwaW5nLFxuICAgIGNhcnRXYXRjaFxuICB9O1xuXG5cbn07XG5cbkNhcnRTZXJ2aWNlLiRpbmplY3QgPSBbJyRjb29raWVzJywgJyRzdGF0ZScsICckcm9vdFNjb3BlJywgJyRodHRwJywgJyRsb2cnLCAnQVBJJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRTZXJ2aWNlO1xuIiwibGV0IFRlc3RpbW9uaWFsU2VydmljZSA9IGZ1bmN0aW9uKCRodHRwLCBBUEkpe1xuXG4gIGZ1bmN0aW9uIGdldFRlc3RpbW9uaWFscygpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzYCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaW5nbGVUZXN0aW1vbmlhbCh0ZXN0aW1vbmlhbElkKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L3Rlc3RpbW9uaWFscy8ke3Rlc3RpbW9uaWFsSWR9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUZXN0aW1vbmlhbCh0ZXN0aW1vbmlhbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzYCwgdGVzdGltb25pYWwpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRUZXN0aW1vbmlhbHMsXG4gICAgZ2V0U2luZ2xlVGVzdGltb25pYWwsXG4gICAgYWRkVGVzdGltb25pYWxcbiAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBUZXN0aW1vbmlhbFNlcnZpY2U7XG4iLCJsZXQgVXNlclNlcnZpY2UgPSBmdW5jdGlvbigkaHR0cCwgQVBJLCAkY29va2llcywgJHN0YXRlLCAkcm9vdFNjb3BlKXtcblxuICBmdW5jdGlvbiBnZXRVc2VySW5mbygpe1xuICAgICRodHRwLmdldChgJHtBUEkuVVJMfS9tZWApXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT4ge1xuICAgICAgICAkcm9vdFNjb3BlLnVzZXJOYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICAkcm9vdFNjb3BlLnVzZXJJdGVtcyA9IGRhdGEuaXRlbXM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVXNlcigpe1xuICAgIGNvbnN0IHRva2VuID0gJGNvb2tpZXMuZ2V0KCd0b2tlbicpO1xuICAgIGlmKHRva2VuKXtcbiAgICAgIGdldFVzZXJJbmZvKCk7XG4gICAgICBfc2V0VG9rZW4odG9rZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRUb2tlbih0b2tlbil7XG4gICAgaWYodG9rZW4pe1xuICAgICAgQVBJLkNPTkZJRy5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddID0gdG9rZW47XG4gICAgICAkcm9vdFNjb3BlLmlzVXNlckxvZ2dlZEluID0gdHJ1ZTtcbiAgICB9ZWxzZXtcbiAgICAgICRyb290U2NvcGUuaXNVc2VyTG9nZ2VkSW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3aG9sZXNhbGVSZXF1ZXN0KGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS93aG9sZXNhbGVgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWN0KGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS9jb250YWN0YCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9naW4odXNlcil7XG4gICAgJGh0dHAucG9zdChgJHtBUEkuVVJMfS9hdXRoZW50aWNhdGVgLCB1c2VyKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgX3N1Y2Nlc3NMb2coZGF0YSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWNjZXNzTG9nKGRhdGEpe1xuICAgICRjb29raWVzLnB1dCgndG9rZW4nLCBkYXRhLnRva2VuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF91cGRhdGVVc2VyKHVzZXJJZCwgdXNlcil7XG4gICAgcmV0dXJuICRodHRwLnB1dChgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gLCB1c2VyLCBBUEkuQ09ORklHKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ091dCgpe1xuICAgICRjb29raWVzLnJlbW92ZSgndG9rZW4nKTtcbiAgICBfc2V0VG9rZW4oKTtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9nZXRVc2VyKHVzZXJJZCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gLCBBUEkuQ09ORklHKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcmdvdFBhc3N3b3JkKGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS9mb3Jnb3RQYXNzd29yZGAsIGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVVc2VyKHVzZXJJZCl7XG4gICAgcmV0dXJuICRodHRwLmRlbGV0ZShgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gKTtcbiAgfVxuXG4gIHJldHVybntcbiAgICBjaGVja1VzZXIsXG4gICAgd2hvbGVzYWxlUmVxdWVzdCxcbiAgICBjb250YWN0LFxuICAgIGxvZ2luLFxuICAgIGxvZ091dCxcbiAgICBfdXBkYXRlVXNlcixcbiAgICBfZ2V0VXNlcixcbiAgICBfZGVsZXRlVXNlcixcbiAgICBmb3Jnb3RQYXNzd29yZFxuXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyU2VydmljZTtcbiJdfQ==
