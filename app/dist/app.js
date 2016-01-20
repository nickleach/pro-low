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
  }).state('wholesaleRequest', {
    url: '/wholesaleRequest',
    templateUrl: 'js/templates/wholesaleRequest.tpl.html',
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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function BuyController($scope, $cookies, $state, CartService, $log) {
  var lowTier = undefined,
      medTier = undefined,
      highTier = undefined;

  CartService.getItems().success(function (data) {
    $log.debug('items', data);
    var itemData = data.map(function (i) {
      i.price = i.basePrice;
      return i;
    });
    $scope.items = itemData;
  });

  // $scope.item = {
  //   quantity: 1,
  //   title: "The Pro Low Putting System",
  //   price: 39.95
  // };

  $scope.checkQuantity = function (item) {

    if (item.quantity > item.pricingTiers[0].quantity) {
      item.price = item.pricingTiers[0].price;
    } else if (item.quantity >= item.pricingTiers[1].quantity && quantity < item.pricingTiers[2].quantity) {
      item.price = item.pricingTiers[1].price;
    } else if (item.quantity > item.pricingTiers[2].quantity) {
      item.price = item.pricingTiers[2].price;
    }
  };

  $scope.addToCart = function (item, price) {
    CartService.setCart(item, price);
  };
}
exports['default'] = BuyController;
module.exports = exports['default'];

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
'use strict';

Object.defineProperty(exports, '__esModule', {
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

  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' + 'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' + 'WY').split(' ').map(function (state) {
    return { abbrev: state };
  });

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

exports['default'] = ContactController;
module.exports = exports['default'];

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZS5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsU0FBUyxNQUFNLENBQUMsY0FBYyxFQUFF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LEVBQVgsV0FBVztBQUNYLGtCQUFjLEVBQWQsY0FBYzs7R0FFZixDQUFDO0NBQ0gsQ0FBQzs7cUJBRWEsV0FBVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyLCAkbG9nUHJvdmlkZXIpIHtcbiAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2hvbWUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdidXknLCB7XG4gICAgICB1cmw6ICcvYnV5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2J1eS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQnV5Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnc3RvcnknLCB7XG4gICAgICB1cmw6ICcvc3RvcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvc3RvcnkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMnLCB7XG4gICAgICB1cmw6ICcvdGVzdGltb25pYWxzJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3Rlc3RpbW9uaWFscy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMuYWRkJywge1xuICAgICAgdXJsOiAnL2FkZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMuYWRkLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3Rlc3RpbW9uaWFscy5zaW5nbGUnLCB7XG4gICAgICB1cmw6ICcvOmlkJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3Rlc3RpbW9uaWFscy5zaW5nbGUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsU2luZ2xlQ3RybCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbGxlcnknLCB7XG4gICAgICB1cmw6ICcvZ2FsbGVyeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9nYWxsZXJ5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ZpZGVvcycsIHtcbiAgICAgIHVybDogJy92aWRlb3MnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdmlkZW9zLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ByaWNpbmcnLCB7XG4gICAgICB1cmw6ICcvcHJpY2luZycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9wcmljaW5nLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnZGVzaWduJywge1xuICAgICAgdXJsOiAnL2Rlc2lnbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9kZXNpZ24udHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgdXJsOiAnL2NhcnQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY2FydC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ2FydENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2NvbnRhY3QnLCB7XG4gICAgICB1cmw6ICcvY29udGFjdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9jb250YWN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnd2hvbGVzYWxlUmVxdWVzdCcsIHtcbiAgICAgIHVybDogJy93aG9sZXNhbGVSZXF1ZXN0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3dob2xlc2FsZVJlcXVlc3QudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHJ1bihDYXJ0U2VydmljZSwgVXNlclNlcnZpY2UsICRyb290U2NvcGUpe1xuICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgVXNlclNlcnZpY2UuY2hlY2tVc2VyKCk7XG4gICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9KTtcbn1cblxuY29uc3QgcGF5cGFsID0ge1xuICAgICAgdXNlcm5hbWU6ICdhaW5lcy5rZXZpbl9hcGkxLmdtYWlsLmNvbScsXG4gICAgICBwYXNzd29yZDogJ1Q2WDlEUjJCNzdCUTRZV0snLFxuICAgICAgY3JlZGVudGlhbDogJ0FQSSBTaWduYXR1cmUnLFxuICAgICAgc2lnbmF0dXJlOiAnQUZjV3hWMjFDN2ZkMHYzYllZWVJDcFNTUmwzMUEyRUVoQXpXemx4cS1FekVRdG9aTXFTY1I2eEknXG59O1xuXG5jb25zdCBBUEkgPSB7XG4gIFVSTDogJ2h0dHA6Ly9hZG1pbi5wcm9sb3dwdXR0aW5nLmNvbS9hcGknLFxuICBDT05GSUc6IHtcbiAgICBoZWFkZXJzOntcblxuICAgIH1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIHBheXBhbCxcbiAgY29uZmlnLFxuICBydW4sXG4gIEFQSVxufTtcbiIsImZ1bmN0aW9uIEJ1eUNvbnRyb2xsZXIoJHNjb3BlLCAkY29va2llcywgJHN0YXRlLCBDYXJ0U2VydmljZSwgJGxvZyl7XG4gIGxldFxuICAgIGxvd1RpZXIsXG4gICAgbWVkVGllcixcbiAgICBoaWdoVGllcjtcblxuICBDYXJ0U2VydmljZS5nZXRJdGVtcygpLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICRsb2cuZGVidWcoJ2l0ZW1zJywgZGF0YSk7XG4gICAgY29uc3QgaXRlbURhdGEgPSBkYXRhLm1hcCgoaSkgPT4ge1xuICAgICAgaS5wcmljZSA9IGkuYmFzZVByaWNlO1xuICAgICAgcmV0dXJuIGk7XG4gICAgfSk7XG4gICAgJHNjb3BlLml0ZW1zID0gaXRlbURhdGE7XG4gIH0pO1xuXG4gIC8vICRzY29wZS5pdGVtID0ge1xuICAvLyAgIHF1YW50aXR5OiAxLFxuICAvLyAgIHRpdGxlOiBcIlRoZSBQcm8gTG93IFB1dHRpbmcgU3lzdGVtXCIsXG4gIC8vICAgcHJpY2U6IDM5Ljk1XG4gIC8vIH07XG5cbiAgJHNjb3BlLmNoZWNrUXVhbnRpdHkgPSBmdW5jdGlvbihpdGVtKSB7XG5cbiAgICBpZihpdGVtLnF1YW50aXR5ID4gaXRlbS5wcmljaW5nVGllcnNbMF0ucXVhbnRpdHkpe1xuICAgICAgaXRlbS5wcmljZSA9IGl0ZW0ucHJpY2luZ1RpZXJzWzBdLnByaWNlO1xuICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPj0gaXRlbS5wcmljaW5nVGllcnNbMV0ucXVhbnRpdHkgJiYgcXVhbnRpdHkgPCBpdGVtLnByaWNpbmdUaWVyc1syXS5xdWFudGl0eSl7XG4gICAgICBpdGVtLnByaWNlID0gaXRlbS5wcmljaW5nVGllcnNbMV0ucHJpY2U7XG4gICAgfWVsc2UgaWYoaXRlbS5xdWFudGl0eSA+IGl0ZW0ucHJpY2luZ1RpZXJzWzJdLnF1YW50aXR5KXtcbiAgICAgIGl0ZW0ucHJpY2UgPSBpdGVtLnByaWNpbmdUaWVyc1syXS5wcmljZTtcbiAgICB9XG5cbiAgfTtcblxuXG4gICRzY29wZS5hZGRUb0NhcnQgPSBmdW5jdGlvbihpdGVtLCBwcmljZSl7XG4gICAgQ2FydFNlcnZpY2Uuc2V0Q2FydChpdGVtLCBwcmljZSk7XG4gIH07XG5cbn1cbmV4cG9ydCBkZWZhdWx0IEJ1eUNvbnRyb2xsZXI7XG4iLCJsZXQgQ2FydENvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUsIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlLCAkbG9nKXtcblxuICAvLyAkc2NvcGUuc2hpcHBpbmdUaWVycyA9IENhcnRTZXJ2aWNlLmdldFNoaXBwaW5nVGllcnMoKTtcblxuXG5cbi8vICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBDYXJ0U2VydmljZS5jYXJ0V2F0Y2goJHJvb3RTY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycykgLHRydWUpO1xuXG5cbiAgJHNjb3BlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbihpdGVtKXtcbiAgICRsb2cuZGVidWcoXCJSZW1vdmluZyBJdGVtXCIsIGl0ZW0pO1xuXG4gICAkc2NvcGUuY2FydC5pdGVtcyA9ICBfLndpdGhvdXQoJHNjb3BlLmNhcnQuaXRlbXMsIGl0ZW0pO1xuICAgQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG4gICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrb3V0ID0gZnVuY3Rpb24oY2FydCl7XG4gICAgQ2FydFNlcnZpY2UuY2hlY2tvdXQoY2FydCk7XG4gIH07XG5cblxuXG59O1xuXG5DYXJ0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQ2FydFNlcnZpY2UnLCAnJHJvb3RTY29wZScsICckbG9nJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gQ29udGFjdENvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSl7XG5cbiAgJHNjb3BlLmNvbnRhY3QgPSBmdW5jdGlvbiAoZGF0YSl7XG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgVXNlclNlcnZpY2UuY29udGFjdChkYXRhKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICB9KVxuICAgICAgLmVycm9yKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLnN0YXRlcyA9ICgnQUwgQUsgQVogQVIgQ0EgQ08gQ1QgREUgRkwgR0EgSEkgSUQgSUwgSU4gSUEgS1MgS1kgTEEgTUUgTUQgTUEgTUkgTU4gTVMgJyArXG4gICAgICAgICAgICAnTU8gTVQgTkUgTlYgTkggTkogTk0gTlkgTkMgTkQgT0ggT0sgT1IgUEEgUkkgU0MgU0QgVE4gVFggVVQgVlQgVkEgV0EgV1YgV0kgJyArXG4gICAgICAgICAgICAnV1knKS5zcGxpdCgnICcpLm1hcChmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIHsgYWJicmV2OiBzdGF0ZSB9OyB9KTtcblxuICAkc2NvcGUud2hvbGVzYWxlUmVxdWVzdCA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgIFVzZXJTZXJ2aWNlLndob2xlc2FsZVJlcXVlc3QoZGF0YSlcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSlcbiAgICAgIC5lcnJvcigoZGF0YSkgPT4ge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIH0pO1xuICB9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlLCAkbWREaWFsb2csIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcblxuJHJvb3RTY29wZS5zaGlwcGluZ1RpZXJzID0gQ2FydFNlcnZpY2UuZ2V0U2hpcHBpbmdUaWVycygpO1xuXG5cbiAkc2NvcGUuJHdhdGNoKCdjYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KCRyb290U2NvcGUuY2FydCkpe1xuXG4gICAgICBpZigkc2NvcGUuY2FydC5pdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgJHNjb3BlLmNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2FydC5pdGVtcyA9IENhcnRTZXJ2aWNlLnVwZGF0ZUNhcnQoJHNjb3BlLmNhcnQuaXRlbXMpO1xuXG4gICAgICAgICRzY29wZS5jYXJ0LnRvdGFsSXRlbXMgPSAkc2NvcGUuY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIH0sIDApO1xuXG4gICAgICB9XG4gICAgICAgICRzY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuY2FsY3VsYXRlU2hpcHBpbmcoJHNjb3BlLmNhcnQsICRzY29wZS5zaGlwcGluZ1RpZXJzKTtcbiAgICAgICAgJHNjb3BlLmNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgICAkc2NvcGUuY2FydC50b3RhbCA9IChzdWJ0b3RhbCArICRzY29wZS5jYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgICAgICRsb2cuZGVidWcoXCJDYXJ0IGxvYWRlZCBvciB1cGRhdGVkXCIsICRzY29wZS5jYXJ0KTtcbiAgICB9XG5cbiAgfSwgdHJ1ZSk7XG5cblxuICAvLyBuYXYgdG9nZ2xlc1xuICAkc2NvcGUudG9nZ2xlTGVmdCA9IGJ1aWxkVG9nZ2xlcignbGVmdCcpO1xuICAkc2NvcGUudG9nZ2xlUmlnaHQgPSBidWlsZFRvZ2dsZXIoJ3JpZ2h0Jyk7XG4gIGxldCAkbGVmdCA9ICQoJy5tZC1zaWRlbmF2LWxlZnQnKTtcbiAgbGV0ICRyaWdodCA9ICQoJy5tZC1zaWRlbmF2LXJpZ2h0Jyk7XG5cbiAgLy8gbGlzdCBpdGVtIGNsaWNrIGV2ZW50XG4gIC8vICQoJ21kLWxpc3QtaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gIC8vICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vICAgJCh0aGlzKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGRUb2dnbGVyKG5hdklEKSB7XG4gICAgbGV0IGRlYm91bmNlRm4gPSAgJG1kVXRpbC5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgJG1kU2lkZW5hdihuYXZJRCkudG9nZ2xlKCk7XG4gICAgICB9LDMwMCk7XG4gICAgcmV0dXJuIGRlYm91bmNlRm47XG4gIH1cblxuXG4gIC8vIE5hdmlnYXRlIGZ1bmN0aW9uXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24oc3RhdGUsIG5hdil7XG4gICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJCgnIycrIHN0YXRlKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkc3RhdGUuZ28oc3RhdGUpLnRoZW4oKCkgPT4ge1xuICAgIGlmIChuYXYgPT0gXCJsZWZ0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICAgIGlmKCEkcmlnaHQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICB9ZWxzZSBpZihuYXYgPT0gXCJyaWdodFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgICAgaWYoISRsZWZ0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICB9fSk7XG5cbiAgfTtcblxuICAkc2NvcGUuc2hvd1dhcnJhbnR5ID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvd2FycmFudHkudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuICAkc2NvcGUuc2hvd1NoaXBwaW5nID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvc2hpcHBpbmcudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5jb250YWN0VXMgPSBmdW5jdGlvbihjb250YWN0KXtcblxuICB9O1xufVxuXG5cbmZ1bmN0aW9uIFJpZ2h0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdigncmlnaHQnKS5jbG9zZSgpO1xuICB9O1xuXG5cbn1cbmZ1bmN0aW9uIExlZnRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcbiAgfTtcblxufVxuXG5mdW5jdGlvbiBEaWFsb2dDdHJsKCRzY29wZSwgJG1kRGlhbG9nKXtcbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5jYW5jZWwoKTtcbiAgfTtcblxuICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5oaWRlKCk7XG4gIH07XG59XG5cbmV4cG9ydCB7XG4gIE1haW5Db250cm9sbGVyLFxuICBSaWdodEN0cmwsXG4gIExlZnRDdHJsLFxuICBEaWFsb2dDdHJsXG59O1xuIiwiZnVuY3Rpb24gTWVkaWFDb250cm9sbGVyKCRzY29wZSl7XG5cbiAgICAkc2NvcGUudGVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZygnd29ya2VkJyk7XG4gICAgfTtcblxuICAgICRzY29wZS5pbWFnZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9jbG9zZXVwMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvY2xvc2V1cDEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9rZXZpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMva2V2aW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAgLy8ge1xuICAgICAgLy8gICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbjMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgLy8gICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4zLWNvbXByZXNzb3IuanBnJyxcbiAgICAgIC8vICAgZGVzY3JpcHRpb246ICcnXG4gICAgICAvLyB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTItY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTItY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUzLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUzLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNC1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNC1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTUtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTUtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH1cbiAgICBdO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhQ29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIFRlc3RpbW9uaWFsQ29udHJvbGxlcigkc2NvcGUsIFRlc3RpbW9uaWFsU2VydmljZSwgJHN0YXRlLCAkbG9nKXtcbiAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSB0cnVlO1xuXG4gIFRlc3RpbW9uaWFsU2VydmljZS5nZXRUZXN0aW1vbmlhbHMoKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gZmFsc2U7XG4gICAgICAkc2NvcGUudGVzdGltb25pYWxzID0gZGF0YTtcbiAgICAgICRsb2cuZGVidWcoXCJUZXN0aW1vbmlhbHNcIiwgJHNjb3BlLnRlc3RpbW9uaWFscyk7XG4gICAgfSlcbiAgICAuZXJyb3IoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSBmYWxzZTtcbiAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHdlIGNvdWxkIG5vdCBsb2FkIHRlc3RpbW9uaWFscyBhdCB0aGlzIHRpbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG4gICAgfSk7XG4gICRzY29wZS5nb1RvU2luZ2xlID0gZnVuY3Rpb24oaWQpe1xuICAgJHN0YXRlLmdvKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge2lkOiBpZH0pO1xuICB9O1xuICAkc2NvcGUuYWRkVGVzdGltb25pYWwgPSBmdW5jdGlvbih0ZXN0aW1vbmlhbCl7XG4gICAgJHNjb3BlLmFkZGluZ1Rlc3RpbW9uaWFsID0gdHJ1ZTtcbiAgICB0ZXN0aW1vbmlhbC5kYXRlID0gbmV3IERhdGUoKTtcbiAgICBUZXN0aW1vbmlhbFNlcnZpY2UuYWRkVGVzdGltb25pYWwodGVzdGltb25pYWwpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAkc2NvcGUudGVzdGltb25pYWxBZGRlZCA9IHRydWU7XG4gICAgICAkc2NvcGUuYWRkZWRUZXN0aW1vbmlhbE1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCgkc2NvcGUsICRzdGF0ZVBhcmFtcywgVGVzdGltb25pYWxTZXJ2aWNlLCAkbG9nKXtcbiAgY29uc3QgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XG4gICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSB0cnVlO1xuICBUZXN0aW1vbmlhbFNlcnZpY2UuZ2V0U2luZ2xlVGVzdGltb25pYWwoaWQpXG4gICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS50ZXN0aW1vbmlhbCA9IGRhdGE7XG4gICAgICAkbG9nLmRlYnVnKFwiVGVzdGltb25pYWxcIiwgZGF0YSk7XG4gICAgfSlcbiAgICAuZXJyb3IoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IFwiV2UncmUgc29ycnkgd2UgY291bGQgbm90IGxvYWQgdGhpcyB0ZXN0aW1vbmlhbCBhdCB0aGlzIHRpbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIFRlc3RpbW9uaWFsQ29udHJvbGxlcixcbiAgVGVzdGltb25pYWxTaW5nbGVDdHJsXG59O1xuIiwiaW1wb3J0IHtjb25maWcsIHJ1biwgcGF5cGFsLCBBUEl9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1haW5Db250cm9sbGVyLCBMZWZ0Q3RybCwgUmlnaHRDdHJsLCBEaWFsb2dDdHJsIH0gZnJvbSAnLi9jb250cm9sbGVycy9NYWluQ29udHJvbGxlcic7XG5pbXBvcnQgQnV5Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXInO1xuaW1wb3J0IE1lZGlhQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL01lZGlhQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9DYXJ0Q29udHJvbGxlcic7XG5pbXBvcnQgQ29udGFjdENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Db250YWN0Q29udHJvbGxlcic7XG5pbXBvcnQgeyBUZXN0aW1vbmlhbENvbnRyb2xsZXIsIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvVGVzdGltb25pYWxDb250cm9sbGVyJztcbmltcG9ydCBDYXJ0U2VydmljZSBmcm9tICcuL3NlcnZpY2VzL0NhcnRTZXJ2aWNlJztcbmltcG9ydCBUZXN0aW1vbmlhbFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9UZXN0aW1vbmlhbFNlcnZpY2UnO1xuaW1wb3J0IFVzZXJTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvVXNlclNlcnZpY2UnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ2prdXJpLmdhbGxlcnknICwgJ25nQ29va2llcyddKVxuLmNvbmZpZyhjb25maWcpXG4uY29uc3RhbnQoJ1BBWVBBTCcsIHBheXBhbClcbi5jb25zdGFudCgnQVBJJywgQVBJKVxuLnJ1bihydW4pXG4uZmFjdG9yeSgnQ2FydFNlcnZpY2UnLCBDYXJ0U2VydmljZSlcbi5mYWN0b3J5KCdUZXN0aW1vbmlhbFNlcnZpY2UnLCBUZXN0aW1vbmlhbFNlcnZpY2UpXG4uZmFjdG9yeSgnVXNlclNlcnZpY2UnLCBVc2VyU2VydmljZSlcbi5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0xlZnRDdHJsJywgTGVmdEN0cmwpXG4uY29udHJvbGxlcignUmlnaHRDdHJsJywgUmlnaHRDdHJsKVxuLmNvbnRyb2xsZXIoJ0RpYWxvZ0N0cmwnLCBEaWFsb2dDdHJsKVxuLmNvbnRyb2xsZXIoJ0J1eUN0cmwnLCBCdXlDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ01lZGlhQ29udHJvbGxlcicsIE1lZGlhQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDYXJ0Q29udHJvbGxlcicsIENhcnRDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0NvbnRhY3RDdHJsJywgQ29udGFjdENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignVGVzdGltb25pYWxDb250cm9sbGVyJywgVGVzdGltb25pYWxDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsU2luZ2xlQ3RybCcsIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCk7XG4iLCJsZXQgQ2FydFNlcnZpY2UgPSBmdW5jdGlvbigkY29va2llcywgJHN0YXRlLCAkcm9vdFNjb3BlLCAkaHR0cCwgJGxvZywgQVBJKXtcblxuICBjb25zdCBwYXlwYWwgPSBcImh0dHBzOi8vd3d3LnBheXBhbC5jb20vY2dpLWJpbi93ZWJzY3JcIjtcblxuICAvLyBpdGVtIGNvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gSXRlbShvcHRpb25zKXtcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZTtcbiAgICB0aGlzLnByaWNlID0gb3B0aW9ucy5wcmljZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gb3B0aW9ucy5xdWFudGl0eTtcbiAgICB0aGlzLnRvdGFsID0gZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAodGhpcy5xdWFudGl0eSAqIHRoaXMucHJpY2UpIHx8IDA7XG4gICAgfTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SXRlbXMoKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L2l0ZW1zYCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaW5nbGVJdGVtKGl0ZW0pe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vaXRlbXMvJHtpdGVtfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2FydCgpe1xuICAgIGxldCBjYXJ0TGlzdCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0TGlzdCB8fCBjYXJ0TGlzdC5sZW5ndGggPCAxKXtcbiAgICAgICRyb290U2NvcGUuaGFzQ2FydCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0SXRlbXMgPSBjYXJ0TGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGxldCBjYXJ0SXRlbSA9IG5ldyBJdGVtKGl0ZW0pO1xuICAgICAgcmV0dXJuIGNhcnRJdGVtO1xuICAgIH0pO1xuXG4gICAgdmFyIHBheXBhbEl0ZW1zID0gYWRkUGF5cGFsKGNhcnRJdGVtcyk7XG5cbiAgICB2YXIgY2FydCA9IHt9O1xuXG4gICAgY2FydC5pdGVtcyA9IHBheXBhbEl0ZW1zO1xuICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICB9LCAwKTtcblxuICAgIHJldHVybiBjYXJ0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FydChpdGVtKXtcbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0ID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdjYXJ0Jyk7XG4gICAgaWYoIWNhcnQpe1xuICAgICAgY2FydCA9IFtdO1xuICAgIH1cblxuICAgIGxldCBhbHJlYWR5RXhpc3RzID0gXy5maW5kV2hlcmUoY2FydCwgaXRlbS50aXRsZSk7XG4gICAgaWYoYWxyZWFkeUV4aXN0cyl7XG4gICAgICBjYXJ0ID0gXy53aXRob3V0KGNhcnQsIGFscmVhZHlFeGlzdHMpO1xuICAgICAgYWxyZWFkeUV4aXN0cy5xdWFudGl0eSA9IGFscmVhZHlFeGlzdHMucXVhbnRpdHkgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgY2FydC5wdXNoKGFscmVhZHlFeGlzdHMpO1xuICAgIH1lbHNle1xuICAgICAgY2FydC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICAkY29va2llcy5wdXRPYmplY3QoJ2NhcnQnLCBjYXJ0KTtcbiAgICAkbG9nLmRlYnVnKFwiSXRlbSBhZGRlZCB0byBjYXJ0XCIsIGl0ZW0sIGNhcnQpO1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyNjYXJ0JykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKCdjYXJ0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYXJ0KGl0ZW1zKXtcbiAgICAkbG9nLmRlYnVnKCd1cGRhdGluZyBjYXJ0JywgaXRlbXMpO1xuXG4gICAgdmFyIGNhcnRJdGVtcyA9IGFkZFBheXBhbChpdGVtcyk7XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2hpcHBpbmdUaWVycygpe1xuICAgIGxldCBzaGlwcGluZyA9IHtcbiAgICAgIHRpZXIxOiB7XG4gICAgICAgIHF1YW50aXR5OiA1LFxuICAgICAgICBwcmljZTogNVxuICAgICAgfSxcbiAgICAgIHRpZXIyOiB7XG4gICAgICAgIHF1YW50aXR5OiAxMCxcbiAgICAgICAgcHJpY2U6IDEwXG4gICAgICB9LFxuICAgICAgdGllcjM6IHtcbiAgICAgICAgcXVhbnRpdHk6IDIwLFxuICAgICAgICBwcmljZTogMjBcbiAgICAgIH1cbiAgICB9O1xuICAgICRsb2cuZGVidWcoXCJTaGlwcGluZyBUaWVyc1wiLCBzaGlwcGluZyk7XG4gICAgcmV0dXJuIHNoaXBwaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlU2hpcHBpbmcoY2FydCwgdGllcnMpe1xuICAgIGNhcnQuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgaWYoaXRlbS5xdWFudGl0eSA+PSB0aWVycy50aWVyMS5xdWFudGl0eSAmJiBpdGVtLnF1YW50aXR5IDwgdGllcnMudGllcjIucXVhbnRpdHkpe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjEucHJpY2U7XG4gICAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID49IHRpZXJzLnRpZXIyLnF1YW50aXR5ICYmIGl0ZW0ucXVhbnRpdHkgPCB0aWVycy50aWVyMy5xdWFudGl0eSl7XG4gICAgICAgIGl0ZW0uc2hpcHBpbmcgPSB0aWVycy50aWVyMi5wcmljZTtcbiAgICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPiB0aWVycy50aWVyMy5xdWFudGl0eSApe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjMucHJpY2U7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjYXJ0LnNoaXBwaW5nID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0uc2hpcHBpbmc7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcblxuICB9XG5cbiAgZnVuY3Rpb24gY2FydFdhdGNoKGNhcnQsIHNoaXBwaW5nKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KGNhcnQpKXtcblxuICAgICAgaWYoY2FydC5pdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgY2FydC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYXJ0ID0gdXBkYXRlQ2FydChjYXJ0Lml0ZW1zKTtcbiAgICAgICAgY2FydC50b3RhbEl0ZW1zID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuXG4gICAgICBjYXJ0LnNoaXBwaW5nID0gIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHNoaXBwaW5nKTtcbiAgICAgIGNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgY2FydC50b3RhbCA9IChzdWJ0b3RhbCArIGNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG5cbiAgICAgICRsb2cuZGVidWcoXCJDYXJ0IGxvYWRlZCBvciB1cGRhdGVkXCIsIGNhcnQpO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUGF5cGFsKGNhcnRJdGVtcyl7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhcnRJdGVtcy5sZW5ndGg7IGkgKyspe1xuICAgICAgdmFyIGl0ZW1OdW1iZXIgPSAoaSArIDEpO1xuICAgICAgY2FydEl0ZW1zW2ldLnBheXBhbCA9IHtcbiAgICAgICAgaXRlbSA6IFwiaXRlbV9uYW1lX1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgYW1vdW50OiBcImFtb3VudF9cIisgaXRlbU51bWJlcixcbiAgICAgICAgcXVhbnRpdHk6IFwicXVhbnRpdHlfXCIgKyBpdGVtTnVtYmVyLFxuICAgICAgICBzaGlwcGluZyA6IFwic2hpcHBpbmdfXCIgKyBpdGVtTnVtYmVyXG4gICAgICB9O1xuICAgIH1cblxuICAgICRsb2cuZGVidWcoXCJhZGRpbmcgcGF5cGFsIGluZm9cIiwgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRJdGVtcyxcbiAgICBnZXRTaW5nbGVJdGVtLFxuICAgIGdldENhcnQsXG4gICAgc2V0Q2FydCxcbiAgICB1cGRhdGVDYXJ0LFxuICAgIGdldFNoaXBwaW5nVGllcnMsXG4gICAgY2FsY3VsYXRlU2hpcHBpbmcsXG4gICAgY2FydFdhdGNoXG4gIH07XG5cblxufTtcblxuQ2FydFNlcnZpY2UuJGluamVjdCA9IFsnJGNvb2tpZXMnLCAnJHN0YXRlJywgJyRyb290U2NvcGUnLCAnJGh0dHAnLCAnJGxvZycsICdBUEknXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydFNlcnZpY2U7XG4iLCJsZXQgVGVzdGltb25pYWxTZXJ2aWNlID0gZnVuY3Rpb24oJGh0dHAsIEFQSSl7XG5cbiAgZnVuY3Rpb24gZ2V0VGVzdGltb25pYWxzKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNpbmdsZVRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsSWQpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzLyR7dGVzdGltb25pYWxJZH1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgLCB0ZXN0aW1vbmlhbCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFRlc3RpbW9uaWFscyxcbiAgICBnZXRTaW5nbGVUZXN0aW1vbmlhbCxcbiAgICBhZGRUZXN0aW1vbmlhbFxuICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IFRlc3RpbW9uaWFsU2VydmljZTtcbiIsImxldCBVc2VyU2VydmljZSA9IGZ1bmN0aW9uKCRodHRwLCBBUEksICRjb29raWVzLCAkc3RhdGUsICRyb290U2NvcGUpe1xuXG4gIGZ1bmN0aW9uIGdldFVzZXJJbmZvKCl7XG4gICAgJGh0dHAuZ2V0KGAke0FQSS5VUkx9L21lYClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRyb290U2NvcGUudXNlck5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgICRyb290U2NvcGUudXNlckl0ZW1zID0gZGF0YS5pdGVtcztcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVc2VyKCl7XG4gICAgY29uc3QgdG9rZW4gPSAkY29va2llcy5nZXQoJ3Rva2VuJyk7XG4gICAgaWYodG9rZW4pe1xuICAgICAgZ2V0VXNlckluZm8oKTtcbiAgICAgIF9zZXRUb2tlbih0b2tlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX3NldFRva2VuKHRva2VuKXtcbiAgICBpZih0b2tlbil7XG4gICAgICBBUEkuQ09ORklHLmhlYWRlcnNbJ3gtYWNjZXNzLXRva2VuJ10gPSB0b2tlbjtcbiAgICAgICRyb290U2NvcGUuaXNVc2VyTG9nZ2VkSW4gPSB0cnVlO1xuICAgIH1lbHNle1xuICAgICAgJHJvb3RTY29wZS5pc1VzZXJMb2dnZWRJbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdob2xlc2FsZVJlcXVlc3QoZW1haWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L3dob2xlc2FsZWAsIGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRhY3QoZW1haWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L2NvbnRhY3RgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dpbih1c2VyKXtcbiAgICAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L2F1dGhlbnRpY2F0ZWAsIHVzZXIpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT4ge1xuICAgICAgICBfc3VjY2Vzc0xvZyhkYXRhKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gX3N1Y2Nlc3NMb2coZGF0YSl7XG4gICAgJGNvb2tpZXMucHV0KCd0b2tlbicsIGRhdGEudG9rZW4pO1xuICB9XG5cbiAgZnVuY3Rpb24gX3VwZGF0ZVVzZXIodXNlcklkLCB1c2VyKXtcbiAgICByZXR1cm4gJGh0dHAucHV0KGAke0FQSS5VUkx9L3VzZXJzLyR7dXNlcklkfWAsIHVzZXIsIEFQSS5DT05GSUcpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9nT3V0KCl7XG4gICAgJGNvb2tpZXMucmVtb3ZlKCd0b2tlbicpO1xuICAgIF9zZXRUb2tlbigpO1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gX2dldFVzZXIodXNlcklkKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L3VzZXJzLyR7dXNlcklkfWAsIEFQSS5DT05GSUcpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yZ290UGFzc3dvcmQoZW1haWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L2ZvcmdvdFBhc3N3b3JkYCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZVVzZXIodXNlcklkKXtcbiAgICByZXR1cm4gJGh0dHAuZGVsZXRlKGAke0FQSS5VUkx9L3VzZXJzLyR7dXNlcklkfWApO1xuICB9XG5cbiAgcmV0dXJue1xuICAgIGNoZWNrVXNlcixcbiAgICB3aG9sZXNhbGVSZXF1ZXN0LFxuICAgIGNvbnRhY3QsXG4gICAgbG9naW4sXG4gICAgbG9nT3V0LFxuICAgIF91cGRhdGVVc2VyLFxuICAgIF9nZXRVc2VyLFxuICAgIF9kZWxldGVVc2VyLFxuICAgIGZvcmdvdFBhc3N3b3JkXG5cbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJTZXJ2aWNlO1xuIl19
