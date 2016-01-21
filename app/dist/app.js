(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $logProvider) {
  $logProvider.debugEnabled(false);

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

  $scope.loading = true;

  CartService.getItems().success(function (data) {
    $log.debug('items', data);
    var itemData = data.map(function (i) {
      i.price = i.basePrice;
      return i;
    });

    $scope.items = itemData;
    $scope.loading = false;
  }).error(function () {
    $scope.items = [{
      title: "The Pro Low Putting System",
      basePrice: 39.95,
      price: 39.95,
      pricingTiers: [{
        price: 39.95,
        quantity: 5
      }, {
        price: 39.95,
        quantity: 10
      }, {
        price: 39.95,
        quantity: 15
      }]
    }];
    $log.error('Error loading items, defaulting to item defaults', $scope.items);
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

  $scope.contactUs = function (form) {
    $scope.loading = true;

    var message = '<p>' + form.message + '</p>    <p>' + form.firstName + ' ' + form.lastName + '</p>    <p>' + form.phone + '</p>    <p>' + form.email + '</p>';
    var email = {
      message: message,
      body: message,
      from: 'noreply@ProLowPutting.com',
      fromName: 'ProLow Putting',
      subject: "A customer is trying to contact you"
    };

    UserService.contact(email).success(function (data) {
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

  $scope.wholesaleRequest = function (request) {
    $scope.loading = true;

    var message = '<p>You have a new Wholesale Customer request from ProLowPutting.com!     See below for details</p>     <p>Store: ' + request.store + '</p>    <p>' + request.city + ', ' + request.state + ' ' + request.zip + '</p>    <p><strong>Contact Info:</strong></p>    <p><strong>Name:</strong> ' + request.firstName + ' ' + request.lastName + '</p>    <p><strong>Phone:</strong> ' + request.phone + '</p>    <p><strong>Email:</strong> ' + request.email + '</p>    <p><strong>Additional Info:</strong> ' + request.message + '</p>    <p>To approve this use you must log in to admin.prolowputting.com and create a wholesale user profile for this user    once the account is created they will be notified via email with their credentials.';

    var email = {
      message: message,
      body: message
    };

    UserService.wholesaleRequest(email).success(function (data) {
      $scope.loading = false;
      $scope.message = "You're request has been sent! Once approved you will be notified via email!";
    }).error(function (data) {
      $scope.loading = false;
      $scope.message = "We're sorry there was a problem executing your request! Please try again later!";
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

Object.defineProperty(exports, '__esModule', {
  value: true
});
function loading() {
  return {
    restrict: 'E',
    templateUrl: 'js/templates/loading.html'
  };
}
exports['default'] = loading;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
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

var _directivesLoading = require('./directives/loading');

var _directivesLoading2 = _interopRequireDefault(_directivesLoading);

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery', 'ngCookies']).config(_config.config).constant('PAYPAL', _config.paypal).constant('API', _config.API).run(_config.run).directive('myLoader', [_directivesLoading2['default']]).factory('CartService', _servicesCartService2['default']).factory('TestimonialService', _servicesTestimonialService2['default']).factory('UserService', _servicesUserService2['default']).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('DialogCtrl', _controllersMainController.DialogCtrl).controller('BuyCtrl', _controllersBuyController2['default']).controller('MediaController', _controllersMediaController2['default']).controller('CartController', _controllersCartController2['default']).controller('ContactCtrl', _controllersContactController2['default']).controller('TestimonialController', _controllersTestimonialController.TestimonialController).controller('TestimonialSingleCtrl', _controllersTestimonialController.TestimonialSingleCtrl);

},{"./config":1,"./controllers/BuyController":2,"./controllers/CartController":3,"./controllers/ContactController":4,"./controllers/MainController":5,"./controllers/MediaController":6,"./controllers/TestimonialController":7,"./directives/loading":8,"./services/CartService":10,"./services/TestimonialService":11,"./services/UserService":12}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
    return $http.post(API.URL + '/contact/wholesale', email);
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

},{}]},{},[9])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9kaXJlY3RpdmVzL2xvYWRpbmcuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvbWFpbi5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9DYXJ0U2VydmljZS5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9UZXN0aW1vbmlhbFNlcnZpY2UuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvc2VydmljZXMvVXNlclNlcnZpY2UuanMi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dkQ7O0FBRUQsV0FBUyxXQUFXLENBQUMsTUFBTSxFQUFDO0FBQzFCLFdBQU8sS0FBSyxVQUFPLENBQUksR0FBRyxDQUFDLEdBQUcsZUFBVSxNQUFNLENBQUcsQ0FBQztHQUNuRDs7QUFFRCxTQUFNO0FBQ0osYUFBUyxFQUFULFNBQVM7QUFDVCxvQkFBZ0IsRUFBaEIsZ0JBQWdCO0FBQ2hCLFdBQU8sRUFBUCxPQUFPO0FBQ1AsU0FBSyxFQUFMLEtBQUs7QUFDTCxVQUFNLEVBQU4sTUFBTTtBQUNOLGVBQVcsRUFBWCxXQUFXO0FBQ1gsWUFBUSxFQUFSLFFBQVE7QUFDUixlQUFXLEVBQVgsV0FBVztBQUNYLGtCQUFjLEVBQWQsY0FBYzs7R0FFZixDQUFDO0NBQ0gsQ0FBQzs7cUJBRWEsV0FBVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyLCAkbG9nUHJvdmlkZXIpIHtcbiAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZChmYWxzZSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5Jywge1xuICAgICAgdXJsOiAnL2J1eScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0J1eUN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzLmFkZCcsIHtcbiAgICAgIHVybDogJy9hZGQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLmFkZC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge1xuICAgICAgdXJsOiAnLzppZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMuc2luZ2xlLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwcmljaW5nJywge1xuICAgICAgdXJsOiAnL3ByaWNpbmcnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvcHJpY2luZy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2Rlc2lnbicsIHtcbiAgICAgIHVybDogJy9kZXNpZ24nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZGVzaWduLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY2FydCcsIHtcbiAgICAgIHVybDogJy9jYXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NhcnQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NhcnRDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3dob2xlc2FsZVJlcXVlc3QnLCB7XG4gICAgICB1cmw6ICcvd2hvbGVzYWxlUmVxdWVzdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93aG9sZXNhbGVSZXF1ZXN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBydW4oQ2FydFNlcnZpY2UsIFVzZXJTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcbiAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgIFVzZXJTZXJ2aWNlLmNoZWNrVXNlcigpO1xuICAgICRyb290U2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLmdldENhcnQoKTtcbiAgfSk7XG59XG5cbmNvbnN0IHBheXBhbCA9IHtcbiAgICAgIHVzZXJuYW1lOiAnYWluZXMua2V2aW5fYXBpMS5nbWFpbC5jb20nLFxuICAgICAgcGFzc3dvcmQ6ICdUNlg5RFIyQjc3QlE0WVdLJyxcbiAgICAgIGNyZWRlbnRpYWw6ICdBUEkgU2lnbmF0dXJlJyxcbiAgICAgIHNpZ25hdHVyZTogJ0FGY1d4VjIxQzdmZDB2M2JZWVlSQ3BTU1JsMzFBMkVFaEF6V3pseHEtRXpFUXRvWk1xU2NSNnhJJ1xufTtcblxuY29uc3QgQVBJID0ge1xuICBVUkw6ICdodHRwOi8vYWRtaW4ucHJvbG93cHV0dGluZy5jb20vYXBpJyxcbiAgQ09ORklHOiB7XG4gICAgaGVhZGVyczp7XG5cbiAgICB9XG4gIH1cbn07XG5leHBvcnQge1xuICBwYXlwYWwsXG4gIGNvbmZpZyxcbiAgcnVuLFxuICBBUElcbn07XG4iLCJmdW5jdGlvbiBCdXlDb250cm9sbGVyKCRzY29wZSwgJGNvb2tpZXMsICRzdGF0ZSwgQ2FydFNlcnZpY2UsICRsb2cpe1xuXG4gICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICBDYXJ0U2VydmljZS5nZXRJdGVtcygpXG4gICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICRsb2cuZGVidWcoJ2l0ZW1zJywgZGF0YSk7XG4gICAgICBjb25zdCBpdGVtRGF0YSA9IGRhdGEubWFwKChpKSA9PiB7XG4gICAgICAgIGkucHJpY2UgPSBpLmJhc2VQcmljZTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9KTtcblxuICAgICAgJHNjb3BlLml0ZW1zID0gaXRlbURhdGE7XG4gICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgIH0pXG4gICAgLmVycm9yKCgpID0+IHtcbiAgICAgICRzY29wZS5pdGVtcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiBcIlRoZSBQcm8gTG93IFB1dHRpbmcgU3lzdGVtXCIsXG4gICAgICAgICAgYmFzZVByaWNlOiAzOS45NSxcbiAgICAgICAgICBwcmljZTogMzkuOTUsXG4gICAgICAgICAgcHJpY2luZ1RpZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByaWNlOiAzOS45NSxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IDVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByaWNlOiAzOS45NSxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IDEwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcmljZTogMzkuOTUsXG4gICAgICAgICAgICAgIHF1YW50aXR5OiAxNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXTtcbiAgICAgICRsb2cuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgaXRlbXMsIGRlZmF1bHRpbmcgdG8gaXRlbSBkZWZhdWx0cycsICRzY29wZS5pdGVtcyk7XG4gICAgfSk7XG4gIC8vICRzY29wZS5pdGVtID0ge1xuICAvLyAgIHF1YW50aXR5OiAxLFxuICAvLyAgIHRpdGxlOiBcIlRoZSBQcm8gTG93IFB1dHRpbmcgU3lzdGVtXCIsXG4gIC8vICAgcHJpY2U6IDM5Ljk1XG4gIC8vIH07XG5cbiAgJHNjb3BlLmNoZWNrUXVhbnRpdHkgPSBmdW5jdGlvbihpdGVtKSB7XG5cbiAgICBpZihpdGVtLnF1YW50aXR5ID4gaXRlbS5wcmljaW5nVGllcnNbMF0ucXVhbnRpdHkpe1xuICAgICAgaXRlbS5wcmljZSA9IGl0ZW0ucHJpY2luZ1RpZXJzWzBdLnByaWNlO1xuICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPj0gaXRlbS5wcmljaW5nVGllcnNbMV0ucXVhbnRpdHkgJiYgcXVhbnRpdHkgPCBpdGVtLnByaWNpbmdUaWVyc1syXS5xdWFudGl0eSl7XG4gICAgICBpdGVtLnByaWNlID0gaXRlbS5wcmljaW5nVGllcnNbMV0ucHJpY2U7XG4gICAgfWVsc2UgaWYoaXRlbS5xdWFudGl0eSA+IGl0ZW0ucHJpY2luZ1RpZXJzWzJdLnF1YW50aXR5KXtcbiAgICAgIGl0ZW0ucHJpY2UgPSBpdGVtLnByaWNpbmdUaWVyc1syXS5wcmljZTtcbiAgICB9XG5cbiAgfTtcblxuXG4gICRzY29wZS5hZGRUb0NhcnQgPSBmdW5jdGlvbihpdGVtLCBwcmljZSl7XG4gICAgQ2FydFNlcnZpY2Uuc2V0Q2FydChpdGVtLCBwcmljZSk7XG4gIH07XG5cbn1cbmV4cG9ydCBkZWZhdWx0IEJ1eUNvbnRyb2xsZXI7XG4iLCJsZXQgQ2FydENvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUsIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlLCAkbG9nKXtcblxuICAvLyAkc2NvcGUuc2hpcHBpbmdUaWVycyA9IENhcnRTZXJ2aWNlLmdldFNoaXBwaW5nVGllcnMoKTtcblxuXG5cbi8vICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBDYXJ0U2VydmljZS5jYXJ0V2F0Y2goJHJvb3RTY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycykgLHRydWUpO1xuXG5cbiAgJHNjb3BlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbihpdGVtKXtcbiAgICRsb2cuZGVidWcoXCJSZW1vdmluZyBJdGVtXCIsIGl0ZW0pO1xuXG4gICAkc2NvcGUuY2FydC5pdGVtcyA9ICBfLndpdGhvdXQoJHNjb3BlLmNhcnQuaXRlbXMsIGl0ZW0pO1xuICAgQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG4gICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrb3V0ID0gZnVuY3Rpb24oY2FydCl7XG4gICAgQ2FydFNlcnZpY2UuY2hlY2tvdXQoY2FydCk7XG4gIH07XG5cblxuXG59O1xuXG5DYXJ0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQ2FydFNlcnZpY2UnLCAnJHJvb3RTY29wZScsICckbG9nJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gQ29udGFjdENvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSl7XG5cbiAgJHNjb3BlLmNvbnRhY3RVcyA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYDxwPiR7Zm9ybS5tZXNzYWdlfTwvcD5cXFxuICAgIDxwPiR7Zm9ybS5maXJzdE5hbWV9ICR7Zm9ybS5sYXN0TmFtZX08L3A+XFxcbiAgICA8cD4ke2Zvcm0ucGhvbmV9PC9wPlxcXG4gICAgPHA+JHtmb3JtLmVtYWlsfTwvcD5gO1xuICAgIGNvbnN0IGVtYWlsID0ge1xuICAgICAgbWVzc2FnZSxcbiAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICBmcm9tOiAnbm9yZXBseUBQcm9Mb3dQdXR0aW5nLmNvbScsXG4gICAgICBmcm9tTmFtZTogJ1Byb0xvdyBQdXR0aW5nJyxcbiAgICAgIHN1YmplY3Q6IFwiQSBjdXN0b21lciBpcyB0cnlpbmcgdG8gY29udGFjdCB5b3VcIlxuICAgIH07XG5cbiAgICBVc2VyU2VydmljZS5jb250YWN0KGVtYWlsKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICB9KVxuICAgICAgLmVycm9yKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLnN0YXRlcyA9ICgnQUwgQUsgQVogQVIgQ0EgQ08gQ1QgREUgRkwgR0EgSEkgSUQgSUwgSU4gSUEgS1MgS1kgTEEgTUUgTUQgTUEgTUkgTU4gTVMgJyArXG4gICAgICAgICAgICAnTU8gTVQgTkUgTlYgTkggTkogTk0gTlkgTkMgTkQgT0ggT0sgT1IgUEEgUkkgU0MgU0QgVE4gVFggVVQgVlQgVkEgV0EgV1YgV0kgJyArXG4gICAgICAgICAgICAnV1knKS5zcGxpdCgnICcpLm1hcChmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIHsgYWJicmV2OiBzdGF0ZSB9OyB9KTtcblxuICAkc2NvcGUud2hvbGVzYWxlUmVxdWVzdCA9IGZ1bmN0aW9uKHJlcXVlc3Qpe1xuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgY29uc3QgbWVzc2FnZT0gYDxwPllvdSBoYXZlIGEgbmV3IFdob2xlc2FsZSBDdXN0b21lciByZXF1ZXN0IGZyb20gUHJvTG93UHV0dGluZy5jb20hIFxcXG4gICAgU2VlIGJlbG93IGZvciBkZXRhaWxzPC9wPiBcXFxuICAgIDxwPlN0b3JlOiAke3JlcXVlc3Quc3RvcmV9PC9wPlxcXG4gICAgPHA+JHtyZXF1ZXN0LmNpdHl9LCAke3JlcXVlc3Quc3RhdGV9ICR7cmVxdWVzdC56aXB9PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5Db250YWN0IEluZm86PC9zdHJvbmc+PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5OYW1lOjwvc3Ryb25nPiAke3JlcXVlc3QuZmlyc3ROYW1lfSAke3JlcXVlc3QubGFzdE5hbWV9PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5QaG9uZTo8L3N0cm9uZz4gJHtyZXF1ZXN0LnBob25lfTwvcD5cXFxuICAgIDxwPjxzdHJvbmc+RW1haWw6PC9zdHJvbmc+ICR7cmVxdWVzdC5lbWFpbH08L3A+XFxcbiAgICA8cD48c3Ryb25nPkFkZGl0aW9uYWwgSW5mbzo8L3N0cm9uZz4gJHtyZXF1ZXN0Lm1lc3NhZ2V9PC9wPlxcXG4gICAgPHA+VG8gYXBwcm92ZSB0aGlzIHVzZSB5b3UgbXVzdCBsb2cgaW4gdG8gYWRtaW4ucHJvbG93cHV0dGluZy5jb20gYW5kIGNyZWF0ZSBhIHdob2xlc2FsZSB1c2VyIHByb2ZpbGUgZm9yIHRoaXMgdXNlclxcXG4gICAgb25jZSB0aGUgYWNjb3VudCBpcyBjcmVhdGVkIHRoZXkgd2lsbCBiZSBub3RpZmllZCB2aWEgZW1haWwgd2l0aCB0aGVpciBjcmVkZW50aWFscy5gO1xuXG4gICAgY29uc3QgZW1haWwgPSB7XG4gICAgICBtZXNzYWdlLFxuICAgICAgYm9keTogbWVzc2FnZVxuICAgIH07XG5cbiAgICBVc2VyU2VydmljZS53aG9sZXNhbGVSZXF1ZXN0KGVtYWlsKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIllvdSdyZSByZXF1ZXN0IGhhcyBiZWVuIHNlbnQhIE9uY2UgYXBwcm92ZWQgeW91IHdpbGwgYmUgbm90aWZpZWQgdmlhIGVtYWlsIVwiO1xuICAgICAgfSlcbiAgICAgIC5lcnJvcigoZGF0YSkgPT4ge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiV2UncmUgc29ycnkgdGhlcmUgd2FzIGEgcHJvYmxlbSBleGVjdXRpbmcgeW91ciByZXF1ZXN0ISBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyIVwiO1xuICAgICAgfSk7XG4gIH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdENvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkbWRVdGlsLCAkc3RhdGUsICRtZERpYWxvZywgQ2FydFNlcnZpY2UsICRyb290U2NvcGUpe1xuXG4kcm9vdFNjb3BlLnNoaXBwaW5nVGllcnMgPSBDYXJ0U2VydmljZS5nZXRTaGlwcGluZ1RpZXJzKCk7XG5cblxuICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3VidG90YWwgPSAwO1xuICAgIGlmKCFfLmlzRW1wdHkoJHJvb3RTY29wZS5jYXJ0KSl7XG5cbiAgICAgIGlmKCRzY29wZS5jYXJ0Lml0ZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICAkc2NvcGUuY2FydC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jYXJ0Lml0ZW1zID0gQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG5cbiAgICAgICAgJHNjb3BlLmNhcnQudG90YWxJdGVtcyA9ICRzY29wZS5jYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgaXRlbS5xdWFudGl0eTtcbiAgICAgICAgfSwgMCk7XG5cbiAgICAgIH1cbiAgICAgICAgJHNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5jYWxjdWxhdGVTaGlwcGluZygkc2NvcGUuY2FydCwgJHNjb3BlLnNoaXBwaW5nVGllcnMpO1xuICAgICAgICAkc2NvcGUuY2FydC5zdWJ0b3RhbCA9IHN1YnRvdGFsLnRvRml4ZWQoMik7XG4gICAgICAgICRzY29wZS5jYXJ0LnRvdGFsID0gKHN1YnRvdGFsICsgJHNjb3BlLmNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG5cbiAgICAgICAgJGxvZy5kZWJ1ZyhcIkNhcnQgbG9hZGVkIG9yIHVwZGF0ZWRcIiwgJHNjb3BlLmNhcnQpO1xuICAgIH1cblxuICB9LCB0cnVlKTtcblxuXG4gIC8vIG5hdiB0b2dnbGVzXG4gICRzY29wZS50b2dnbGVMZWZ0ID0gYnVpbGRUb2dnbGVyKCdsZWZ0Jyk7XG4gICRzY29wZS50b2dnbGVSaWdodCA9IGJ1aWxkVG9nZ2xlcigncmlnaHQnKTtcbiAgbGV0ICRsZWZ0ID0gJCgnLm1kLXNpZGVuYXYtbGVmdCcpO1xuICBsZXQgJHJpZ2h0ID0gJCgnLm1kLXNpZGVuYXYtcmlnaHQnKTtcblxuICAvLyBsaXN0IGl0ZW0gY2xpY2sgZXZlbnRcbiAgLy8gJCgnbWQtbGlzdC1pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgLy8gICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gICAkKHRoaXMpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyB9KTtcblxuICBmdW5jdGlvbiBidWlsZFRvZ2dsZXIobmF2SUQpIHtcbiAgICBsZXQgZGVib3VuY2VGbiA9ICAkbWRVdGlsLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAkbWRTaWRlbmF2KG5hdklEKS50b2dnbGUoKTtcbiAgICAgIH0sMzAwKTtcbiAgICByZXR1cm4gZGVib3VuY2VGbjtcbiAgfVxuXG5cbiAgLy8gTmF2aWdhdGUgZnVuY3Rpb25cbiAgJHNjb3BlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihzdGF0ZSwgbmF2KXtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjJysgc3RhdGUpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbyhzdGF0ZSkudGhlbigoKSA9PiB7XG4gICAgaWYgKG5hdiA9PSBcImxlZnRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgICAgaWYoISRyaWdodC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgIH1lbHNlIGlmKG5hdiA9PSBcInJpZ2h0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgICBpZighJGxlZnQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgIH19KTtcblxuICB9O1xuXG4gICRzY29wZS5zaG93V2FycmFudHkgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93YXJyYW50eS50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG4gICRzY29wZS5zaG93U2hpcHBpbmcgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zaGlwcGluZy50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLmNvbnRhY3RVcyA9IGZ1bmN0aW9uKGNvbnRhY3Qpe1xuXG4gIH07XG59XG5cblxuZnVuY3Rpb24gUmlnaHRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdyaWdodCcpLmNsb3NlKCk7XG4gIH07XG5cblxufVxuZnVuY3Rpb24gTGVmdEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xuICB9O1xuXG59XG5cbmZ1bmN0aW9uIERpYWxvZ0N0cmwoJHNjb3BlLCAkbWREaWFsb2cpe1xuICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmNhbmNlbCgpO1xuICB9O1xuXG4gICRzY29wZS5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmhpZGUoKTtcbiAgfTtcbn1cblxuZXhwb3J0IHtcbiAgTWFpbkNvbnRyb2xsZXIsXG4gIFJpZ2h0Q3RybCxcbiAgTGVmdEN0cmwsXG4gIERpYWxvZ0N0cmxcbn07XG4iLCJmdW5jdGlvbiBNZWRpYUNvbnRyb2xsZXIoJHNjb3BlKXtcblxuICAgICRzY29wZS50ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgIGNvbnNvbGUubG9nKCd3b3JrZWQnKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2Nsb3NldXAxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9jbG9zZXVwMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2tldmluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9rZXZpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICAvLyB7XG4gICAgICAvLyAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAvLyAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbjMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgLy8gICBkZXNjcmlwdGlvbjogJydcbiAgICAgIC8vIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU0LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU0LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfVxuICAgIF07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gVGVzdGltb25pYWxDb250cm9sbGVyKCRzY29wZSwgVGVzdGltb25pYWxTZXJ2aWNlLCAkc3RhdGUsICRsb2cpe1xuICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFscyA9IHRydWU7XG5cbiAgVGVzdGltb25pYWxTZXJ2aWNlLmdldFRlc3RpbW9uaWFscygpXG4gICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSBmYWxzZTtcbiAgICAgICRzY29wZS50ZXN0aW1vbmlhbHMgPSBkYXRhO1xuICAgICAgJGxvZy5kZWJ1ZyhcIlRlc3RpbW9uaWFsc1wiLCAkc2NvcGUudGVzdGltb25pYWxzKTtcbiAgICB9KVxuICAgIC5lcnJvcigoZGF0YSkgPT57XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFscyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IFwiV2UncmUgc29ycnkgd2UgY291bGQgbm90IGxvYWQgdGVzdGltb25pYWxzIGF0IHRoaXMgdGltZS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIjtcbiAgICB9KTtcbiAgJHNjb3BlLmdvVG9TaW5nbGUgPSBmdW5jdGlvbihpZCl7XG4gICAkc3RhdGUuZ28oJ3Rlc3RpbW9uaWFscy5zaW5nbGUnLCB7aWQ6IGlkfSk7XG4gIH07XG4gICRzY29wZS5hZGRUZXN0aW1vbmlhbCA9IGZ1bmN0aW9uKHRlc3RpbW9uaWFsKXtcbiAgICAkc2NvcGUuYWRkaW5nVGVzdGltb25pYWwgPSB0cnVlO1xuICAgIHRlc3RpbW9uaWFsLmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIFRlc3RpbW9uaWFsU2VydmljZS5hZGRUZXN0aW1vbmlhbCh0ZXN0aW1vbmlhbClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAgICRzY29wZS50ZXN0aW1vbmlhbEFkZGVkID0gdHJ1ZTtcbiAgICAgICRzY29wZS5hZGRlZFRlc3RpbW9uaWFsTWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gVGVzdGltb25pYWxTaW5nbGVDdHJsKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBUZXN0aW1vbmlhbFNlcnZpY2UsICRsb2cpe1xuICBjb25zdCBpZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbCA9IHRydWU7XG4gIFRlc3RpbW9uaWFsU2VydmljZS5nZXRTaW5nbGVUZXN0aW1vbmlhbChpZClcbiAgICAuc3VjY2VzcygoZGF0YSkgPT4ge1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLnRlc3RpbW9uaWFsID0gZGF0YTtcbiAgICAgICRsb2cuZGVidWcoXCJUZXN0aW1vbmlhbFwiLCBkYXRhKTtcbiAgICB9KVxuICAgIC5lcnJvcigoZGF0YSkgPT57XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFsID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gXCJXZSdyZSBzb3JyeSB3ZSBjb3VsZCBub3QgbG9hZCB0aGlzIHRlc3RpbW9uaWFsIGF0IHRoaXMgdGltZS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHtcbiAgVGVzdGltb25pYWxDb250cm9sbGVyLFxuICBUZXN0aW1vbmlhbFNpbmdsZUN0cmxcbn07XG4iLCJmdW5jdGlvbiBsb2FkaW5nKCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9sb2FkaW5nLmh0bWwnXG4gIH07XG59XG5leHBvcnQgZGVmYXVsdCBsb2FkaW5nO1xuIiwiaW1wb3J0IHtjb25maWcsIHJ1biwgcGF5cGFsLCBBUEl9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1haW5Db250cm9sbGVyLCBMZWZ0Q3RybCwgUmlnaHRDdHJsLCBEaWFsb2dDdHJsIH0gZnJvbSAnLi9jb250cm9sbGVycy9NYWluQ29udHJvbGxlcic7XG5pbXBvcnQgQnV5Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXInO1xuaW1wb3J0IE1lZGlhQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL01lZGlhQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9DYXJ0Q29udHJvbGxlcic7XG5pbXBvcnQgQ29udGFjdENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Db250YWN0Q29udHJvbGxlcic7XG5pbXBvcnQgeyBUZXN0aW1vbmlhbENvbnRyb2xsZXIsIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvVGVzdGltb25pYWxDb250cm9sbGVyJztcbmltcG9ydCBDYXJ0U2VydmljZSBmcm9tICcuL3NlcnZpY2VzL0NhcnRTZXJ2aWNlJztcbmltcG9ydCBUZXN0aW1vbmlhbFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9UZXN0aW1vbmlhbFNlcnZpY2UnO1xuaW1wb3J0IFVzZXJTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvVXNlclNlcnZpY2UnO1xuaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi9kaXJlY3RpdmVzL2xvYWRpbmcnO1xuYW5ndWxhclxuLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICdqa3VyaS5nYWxsZXJ5JyAsICduZ0Nvb2tpZXMnXSlcbi5jb25maWcoY29uZmlnKVxuLmNvbnN0YW50KCdQQVlQQUwnLCBwYXlwYWwpXG4uY29uc3RhbnQoJ0FQSScsIEFQSSlcbi5ydW4ocnVuKVxuLmRpcmVjdGl2ZSgnbXlMb2FkZXInLCBbbG9hZGluZ10pXG4uZmFjdG9yeSgnQ2FydFNlcnZpY2UnLCBDYXJ0U2VydmljZSlcbi5mYWN0b3J5KCdUZXN0aW1vbmlhbFNlcnZpY2UnLCBUZXN0aW1vbmlhbFNlcnZpY2UpXG4uZmFjdG9yeSgnVXNlclNlcnZpY2UnLCBVc2VyU2VydmljZSlcbi5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0xlZnRDdHJsJywgTGVmdEN0cmwpXG4uY29udHJvbGxlcignUmlnaHRDdHJsJywgUmlnaHRDdHJsKVxuLmNvbnRyb2xsZXIoJ0RpYWxvZ0N0cmwnLCBEaWFsb2dDdHJsKVxuLmNvbnRyb2xsZXIoJ0J1eUN0cmwnLCBCdXlDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ01lZGlhQ29udHJvbGxlcicsIE1lZGlhQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDYXJ0Q29udHJvbGxlcicsIENhcnRDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0NvbnRhY3RDdHJsJywgQ29udGFjdENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignVGVzdGltb25pYWxDb250cm9sbGVyJywgVGVzdGltb25pYWxDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsU2luZ2xlQ3RybCcsIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCk7XG4iLCJsZXQgQ2FydFNlcnZpY2UgPSBmdW5jdGlvbigkY29va2llcywgJHN0YXRlLCAkcm9vdFNjb3BlLCAkaHR0cCwgJGxvZywgQVBJKXtcblxuICBjb25zdCBwYXlwYWwgPSBcImh0dHBzOi8vd3d3LnBheXBhbC5jb20vY2dpLWJpbi93ZWJzY3JcIjtcblxuICAvLyBpdGVtIGNvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gSXRlbShvcHRpb25zKXtcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZTtcbiAgICB0aGlzLnByaWNlID0gb3B0aW9ucy5wcmljZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gb3B0aW9ucy5xdWFudGl0eTtcbiAgICB0aGlzLnRvdGFsID0gZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAodGhpcy5xdWFudGl0eSAqIHRoaXMucHJpY2UpIHx8IDA7XG4gICAgfTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SXRlbXMoKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L2l0ZW1zYCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaW5nbGVJdGVtKGl0ZW0pe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vaXRlbXMvJHtpdGVtfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2FydCgpe1xuICAgIGxldCBjYXJ0TGlzdCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0TGlzdCB8fCBjYXJ0TGlzdC5sZW5ndGggPCAxKXtcbiAgICAgICRyb290U2NvcGUuaGFzQ2FydCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0SXRlbXMgPSBjYXJ0TGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGxldCBjYXJ0SXRlbSA9IG5ldyBJdGVtKGl0ZW0pO1xuICAgICAgcmV0dXJuIGNhcnRJdGVtO1xuICAgIH0pO1xuXG4gICAgdmFyIHBheXBhbEl0ZW1zID0gYWRkUGF5cGFsKGNhcnRJdGVtcyk7XG5cbiAgICB2YXIgY2FydCA9IHt9O1xuXG4gICAgY2FydC5pdGVtcyA9IHBheXBhbEl0ZW1zO1xuICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICB9LCAwKTtcblxuICAgIHJldHVybiBjYXJ0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FydChpdGVtKXtcbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0ID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdjYXJ0Jyk7XG4gICAgaWYoIWNhcnQpe1xuICAgICAgY2FydCA9IFtdO1xuICAgIH1cblxuICAgIGxldCBhbHJlYWR5RXhpc3RzID0gXy5maW5kV2hlcmUoY2FydCwgaXRlbS50aXRsZSk7XG4gICAgaWYoYWxyZWFkeUV4aXN0cyl7XG4gICAgICBjYXJ0ID0gXy53aXRob3V0KGNhcnQsIGFscmVhZHlFeGlzdHMpO1xuICAgICAgYWxyZWFkeUV4aXN0cy5xdWFudGl0eSA9IGFscmVhZHlFeGlzdHMucXVhbnRpdHkgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgY2FydC5wdXNoKGFscmVhZHlFeGlzdHMpO1xuICAgIH1lbHNle1xuICAgICAgY2FydC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICAkY29va2llcy5wdXRPYmplY3QoJ2NhcnQnLCBjYXJ0KTtcbiAgICAkbG9nLmRlYnVnKFwiSXRlbSBhZGRlZCB0byBjYXJ0XCIsIGl0ZW0sIGNhcnQpO1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyNjYXJ0JykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKCdjYXJ0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYXJ0KGl0ZW1zKXtcbiAgICAkbG9nLmRlYnVnKCd1cGRhdGluZyBjYXJ0JywgaXRlbXMpO1xuXG4gICAgdmFyIGNhcnRJdGVtcyA9IGFkZFBheXBhbChpdGVtcyk7XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2hpcHBpbmdUaWVycygpe1xuICAgIGxldCBzaGlwcGluZyA9IHtcbiAgICAgIHRpZXIxOiB7XG4gICAgICAgIHF1YW50aXR5OiA1LFxuICAgICAgICBwcmljZTogNVxuICAgICAgfSxcbiAgICAgIHRpZXIyOiB7XG4gICAgICAgIHF1YW50aXR5OiAxMCxcbiAgICAgICAgcHJpY2U6IDEwXG4gICAgICB9LFxuICAgICAgdGllcjM6IHtcbiAgICAgICAgcXVhbnRpdHk6IDIwLFxuICAgICAgICBwcmljZTogMjBcbiAgICAgIH1cbiAgICB9O1xuICAgICRsb2cuZGVidWcoXCJTaGlwcGluZyBUaWVyc1wiLCBzaGlwcGluZyk7XG4gICAgcmV0dXJuIHNoaXBwaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlU2hpcHBpbmcoY2FydCwgdGllcnMpe1xuICAgIGNhcnQuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgaWYoaXRlbS5xdWFudGl0eSA+PSB0aWVycy50aWVyMS5xdWFudGl0eSAmJiBpdGVtLnF1YW50aXR5IDwgdGllcnMudGllcjIucXVhbnRpdHkpe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjEucHJpY2U7XG4gICAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID49IHRpZXJzLnRpZXIyLnF1YW50aXR5ICYmIGl0ZW0ucXVhbnRpdHkgPCB0aWVycy50aWVyMy5xdWFudGl0eSl7XG4gICAgICAgIGl0ZW0uc2hpcHBpbmcgPSB0aWVycy50aWVyMi5wcmljZTtcbiAgICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPiB0aWVycy50aWVyMy5xdWFudGl0eSApe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjMucHJpY2U7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjYXJ0LnNoaXBwaW5nID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0uc2hpcHBpbmc7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcblxuICB9XG5cbiAgZnVuY3Rpb24gY2FydFdhdGNoKGNhcnQsIHNoaXBwaW5nKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KGNhcnQpKXtcblxuICAgICAgaWYoY2FydC5pdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgY2FydC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYXJ0ID0gdXBkYXRlQ2FydChjYXJ0Lml0ZW1zKTtcbiAgICAgICAgY2FydC50b3RhbEl0ZW1zID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuXG4gICAgICBjYXJ0LnNoaXBwaW5nID0gIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHNoaXBwaW5nKTtcbiAgICAgIGNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgY2FydC50b3RhbCA9IChzdWJ0b3RhbCArIGNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG5cbiAgICAgICRsb2cuZGVidWcoXCJDYXJ0IGxvYWRlZCBvciB1cGRhdGVkXCIsIGNhcnQpO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUGF5cGFsKGNhcnRJdGVtcyl7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhcnRJdGVtcy5sZW5ndGg7IGkgKyspe1xuICAgICAgdmFyIGl0ZW1OdW1iZXIgPSAoaSArIDEpO1xuICAgICAgY2FydEl0ZW1zW2ldLnBheXBhbCA9IHtcbiAgICAgICAgaXRlbSA6IFwiaXRlbV9uYW1lX1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgYW1vdW50OiBcImFtb3VudF9cIisgaXRlbU51bWJlcixcbiAgICAgICAgcXVhbnRpdHk6IFwicXVhbnRpdHlfXCIgKyBpdGVtTnVtYmVyLFxuICAgICAgICBzaGlwcGluZyA6IFwic2hpcHBpbmdfXCIgKyBpdGVtTnVtYmVyXG4gICAgICB9O1xuICAgIH1cblxuICAgICRsb2cuZGVidWcoXCJhZGRpbmcgcGF5cGFsIGluZm9cIiwgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRJdGVtcyxcbiAgICBnZXRTaW5nbGVJdGVtLFxuICAgIGdldENhcnQsXG4gICAgc2V0Q2FydCxcbiAgICB1cGRhdGVDYXJ0LFxuICAgIGdldFNoaXBwaW5nVGllcnMsXG4gICAgY2FsY3VsYXRlU2hpcHBpbmcsXG4gICAgY2FydFdhdGNoXG4gIH07XG5cblxufTtcblxuQ2FydFNlcnZpY2UuJGluamVjdCA9IFsnJGNvb2tpZXMnLCAnJHN0YXRlJywgJyRyb290U2NvcGUnLCAnJGh0dHAnLCAnJGxvZycsICdBUEknXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydFNlcnZpY2U7XG4iLCJsZXQgVGVzdGltb25pYWxTZXJ2aWNlID0gZnVuY3Rpb24oJGh0dHAsIEFQSSl7XG5cbiAgZnVuY3Rpb24gZ2V0VGVzdGltb25pYWxzKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNpbmdsZVRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsSWQpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzLyR7dGVzdGltb25pYWxJZH1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgLCB0ZXN0aW1vbmlhbCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFRlc3RpbW9uaWFscyxcbiAgICBnZXRTaW5nbGVUZXN0aW1vbmlhbCxcbiAgICBhZGRUZXN0aW1vbmlhbFxuICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IFRlc3RpbW9uaWFsU2VydmljZTtcbiIsImxldCBVc2VyU2VydmljZSA9IGZ1bmN0aW9uKCRodHRwLCBBUEksICRjb29raWVzLCAkc3RhdGUsICRyb290U2NvcGUpe1xuXG4gIGZ1bmN0aW9uIGdldFVzZXJJbmZvKCl7XG4gICAgJGh0dHAuZ2V0KGAke0FQSS5VUkx9L21lYClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRyb290U2NvcGUudXNlck5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgICRyb290U2NvcGUudXNlckl0ZW1zID0gZGF0YS5pdGVtcztcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVc2VyKCl7XG4gICAgY29uc3QgdG9rZW4gPSAkY29va2llcy5nZXQoJ3Rva2VuJyk7XG4gICAgaWYodG9rZW4pe1xuICAgICAgZ2V0VXNlckluZm8oKTtcbiAgICAgIF9zZXRUb2tlbih0b2tlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX3NldFRva2VuKHRva2VuKXtcbiAgICBpZih0b2tlbil7XG4gICAgICBBUEkuQ09ORklHLmhlYWRlcnNbJ3gtYWNjZXNzLXRva2VuJ10gPSB0b2tlbjtcbiAgICAgICRyb290U2NvcGUuaXNVc2VyTG9nZ2VkSW4gPSB0cnVlO1xuICAgIH1lbHNle1xuICAgICAgJHJvb3RTY29wZS5pc1VzZXJMb2dnZWRJbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdob2xlc2FsZVJlcXVlc3QoZW1haWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L2NvbnRhY3Qvd2hvbGVzYWxlYCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udGFjdChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vY29udGFjdGAsIGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ2luKHVzZXIpe1xuICAgICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vYXV0aGVudGljYXRlYCwgdXNlcilcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgIF9zdWNjZXNzTG9nKGRhdGEpO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfc3VjY2Vzc0xvZyhkYXRhKXtcbiAgICAkY29va2llcy5wdXQoJ3Rva2VuJywgZGF0YS50b2tlbik7XG4gIH1cblxuICBmdW5jdGlvbiBfdXBkYXRlVXNlcih1c2VySWQsIHVzZXIpe1xuICAgIHJldHVybiAkaHR0cC5wdXQoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCwgdXNlciwgQVBJLkNPTkZJRyk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dPdXQoKXtcbiAgICAkY29va2llcy5yZW1vdmUoJ3Rva2VuJyk7XG4gICAgX3NldFRva2VuKCk7XG4gICAgJHN0YXRlLmdvKCdob21lJyk7XG4gIH1cblxuICBmdW5jdGlvbiBfZ2V0VXNlcih1c2VySWQpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCwgQVBJLkNPTkZJRyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3Jnb3RQYXNzd29yZChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vZm9yZ290UGFzc3dvcmRgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBfZGVsZXRlVXNlcih1c2VySWQpe1xuICAgIHJldHVybiAkaHR0cC5kZWxldGUoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCk7XG4gIH1cblxuICByZXR1cm57XG4gICAgY2hlY2tVc2VyLFxuICAgIHdob2xlc2FsZVJlcXVlc3QsXG4gICAgY29udGFjdCxcbiAgICBsb2dpbixcbiAgICBsb2dPdXQsXG4gICAgX3VwZGF0ZVVzZXIsXG4gICAgX2dldFVzZXIsXG4gICAgX2RlbGV0ZVVzZXIsXG4gICAgZm9yZ290UGFzc3dvcmRcblxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlclNlcnZpY2U7XG4iXX0=
