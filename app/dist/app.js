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
  }).state('buyWholesale', {
    url: '/buyWholesale',
    templateUrl: 'js/templates/buyWholesale.tpl.html',
    controller: 'WholesaleController'
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function UserController($scope, UserService, $log) {
  $scope.loginWholesaleUser = function (wholesaleUser) {
    UserService.login(wholesaleUser);
  };
}
exports["default"] = UserController;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function WholesaleController($scope, UserService) {}

exports["default"] = WholesaleController;
module.exports = exports["default"];

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

var _controllersUserController = require('./controllers/UserController');

var _controllersUserController2 = _interopRequireDefault(_controllersUserController);

var _controllersWholesaleController = require('./controllers/WholesaleController');

var _controllersWholesaleController2 = _interopRequireDefault(_controllersWholesaleController);

var _controllersTestimonialController = require('./controllers/TestimonialController');

var _servicesCartService = require('./services/CartService');

var _servicesCartService2 = _interopRequireDefault(_servicesCartService);

var _servicesTestimonialService = require('./services/TestimonialService');

var _servicesTestimonialService2 = _interopRequireDefault(_servicesTestimonialService);

var _servicesUserService = require('./services/UserService');

var _servicesUserService2 = _interopRequireDefault(_servicesUserService);

var _directivesLoading = require('./directives/loading');

var _directivesLoading2 = _interopRequireDefault(_directivesLoading);

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery', 'ngCookies']).config(_config.config).constant('PAYPAL', _config.paypal).constant('API', _config.API).run(_config.run).directive('myLoader', [_directivesLoading2['default']]).factory('CartService', _servicesCartService2['default']).factory('TestimonialService', _servicesTestimonialService2['default']).factory('UserService', _servicesUserService2['default']).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('DialogCtrl', _controllersMainController.DialogCtrl).controller('BuyCtrl', _controllersBuyController2['default']).controller('WholesaleController', _controllersWholesaleController2['default']).controller('MediaController', _controllersMediaController2['default']).controller('CartController', _controllersCartController2['default']).controller('UserController', _controllersUserController2['default']).controller('ContactCtrl', _controllersContactController2['default']).controller('TestimonialController', _controllersTestimonialController.TestimonialController).controller('TestimonialSingleCtrl', _controllersTestimonialController.TestimonialSingleCtrl);

},{"./config":1,"./controllers/BuyController":2,"./controllers/CartController":3,"./controllers/ContactController":4,"./controllers/MainController":5,"./controllers/MediaController":6,"./controllers/TestimonialController":7,"./controllers/UserController":8,"./controllers/WholesaleController":9,"./directives/loading":10,"./services/CartService":12,"./services/TestimonialService":13,"./services/UserService":14}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var UserService = function UserService($http, API, $cookies, $state, $rootScope, $log) {

  function getUserInfo() {
    return $http.get(API.URL + '/me', API.CONFIG);
  }

  function checkUser() {
    var token = $cookies.get('token');
    if (token) {
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
    $log.debug('Logged in!', data);
    getUserInfo().success(function (userData) {
      $log.debug('User data', userData);
      $cookies.put('items', userData.items);
      $cookies.put('username', userData.username);
    });
    $state.go('buyWholesale');
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

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9jb250cm9sbGVycy9Vc2VyQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9jb250cm9sbGVycy9XaG9sZXNhbGVDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2RpcmVjdGl2ZXMvbG9hZGluZy5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZS5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsU0FBUyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRTtBQUNwRixjQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVoQyxvQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWxDLGdCQUFjLENBQ1gsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNiLE9BQUcsRUFBRSxHQUFHO0FBQ1IsZUFBVyxFQUFFLDRCQUE0QjtBQUN6QyxjQUFVLEVBQUUsZ0JBQWdCO0dBQzdCLENBQUMsQ0FDRCxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ1osT0FBRyxFQUFFLE1BQU07QUFDWCxlQUFXLEVBQUUsMkJBQTJCO0FBQ3hDLGNBQVUsRUFBRSxTQUFTO0dBQ3RCLENBQUMsQ0FDRCxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ2QsT0FBRyxFQUFFLFFBQVE7QUFDYixlQUFXLEVBQUUsNkJBQTZCO0FBQzFDLGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDckIsT0FBRyxFQUFFLGVBQWU7QUFDcEIsZUFBVyxFQUFFLG9DQUFvQztBQUNqRCxjQUFVLEVBQUUsdUJBQXVCO0dBQ3BDLENBQUMsQ0FDRCxLQUFLLENBQUMsa0JBQWtCLEVBQUU7QUFDekIsT0FBRyxFQUFFLE1BQU07QUFDWCxlQUFXLEVBQUUsd0NBQXdDO0FBQ3JELGNBQVUsRUFBRSx1QkFBdUI7R0FDcEMsQ0FBQyxDQUNELEtBQUssQ0FBQyxxQkFBcUIsRUFBRTtBQUM1QixPQUFHLEVBQUUsTUFB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QUNKLGFBQVMsRUFBVCxTQUFTO0FBQ1Qsb0JBQWdCLEVBQWhCLGdCQUFnQjtBQUNoQixXQUFPLEVBQVAsT0FBTztBQUNQLFNBQUssRUFBTCxLQUFLO0FBQ0wsVUFBTSxFQUFOLE1BQU07QUFDTixlQUFXLEVBQVgsV0FBVztBQUNYLFlBQVEsRUFBUixRQUFRO0FBQ1IsZUFBVyxFQUFYLFdBQVc7QUFDWCxrQkFBYyxFQUFkLGNBQWM7O0dBRWYsQ0FBQztDQUNILENBQUM7O3FCQUVhLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJGxvZ1Byb3ZpZGVyKSB7XG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5Jywge1xuICAgICAgdXJsOiAnL2J1eScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0J1eUN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzLmFkZCcsIHtcbiAgICAgIHVybDogJy9hZGQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLmFkZC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge1xuICAgICAgdXJsOiAnLzppZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMuc2luZ2xlLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwcmljaW5nJywge1xuICAgICAgdXJsOiAnL3ByaWNpbmcnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvcHJpY2luZy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2Rlc2lnbicsIHtcbiAgICAgIHVybDogJy9kZXNpZ24nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZGVzaWduLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY2FydCcsIHtcbiAgICAgIHVybDogJy9jYXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NhcnQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NhcnRDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3dob2xlc2FsZVJlcXVlc3QnLCB7XG4gICAgICB1cmw6ICcvd2hvbGVzYWxlUmVxdWVzdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93aG9sZXNhbGVSZXF1ZXN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5V2hvbGVzYWxlJywge1xuICAgICAgdXJsOiAnL2J1eVdob2xlc2FsZScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXlXaG9sZXNhbGUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1dob2xlc2FsZUNvbnRyb2xsZXInXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gcnVuKENhcnRTZXJ2aWNlLCBVc2VyU2VydmljZSwgJHJvb3RTY29wZSl7XG4gICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICBVc2VyU2VydmljZS5jaGVja1VzZXIoKTtcbiAgICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG4gIH0pO1xufVxuXG5jb25zdCBwYXlwYWwgPSB7XG4gICAgICB1c2VybmFtZTogJ2FpbmVzLmtldmluX2FwaTEuZ21haWwuY29tJyxcbiAgICAgIHBhc3N3b3JkOiAnVDZYOURSMkI3N0JRNFlXSycsXG4gICAgICBjcmVkZW50aWFsOiAnQVBJIFNpZ25hdHVyZScsXG4gICAgICBzaWduYXR1cmU6ICdBRmNXeFYyMUM3ZmQwdjNiWVlZUkNwU1NSbDMxQTJFRWhBeld6bHhxLUV6RVF0b1pNcVNjUjZ4SSdcbn07XG5cbmNvbnN0IEFQSSA9IHtcbiAgVVJMOiAnaHR0cDovL2FkbWluLnByb2xvd3B1dHRpbmcuY29tL2FwaScsXG4gIENPTkZJRzoge1xuICAgIGhlYWRlcnM6e1xuXG4gICAgfVxuICB9XG59O1xuZXhwb3J0IHtcbiAgcGF5cGFsLFxuICBjb25maWcsXG4gIHJ1bixcbiAgQVBJXG59O1xuIiwiZnVuY3Rpb24gQnV5Q29udHJvbGxlcigkc2NvcGUsICRjb29raWVzLCAkc3RhdGUsIENhcnRTZXJ2aWNlLCAkbG9nKXtcblxuICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgQ2FydFNlcnZpY2UuZ2V0SXRlbXMoKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAkbG9nLmRlYnVnKCdpdGVtcycsIGRhdGEpO1xuICAgICAgY29uc3QgaXRlbURhdGEgPSBkYXRhLm1hcCgoaSkgPT4ge1xuICAgICAgICBpLnByaWNlID0gaS5iYXNlUHJpY2U7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfSk7XG5cbiAgICAgICRzY29wZS5pdGVtcyA9IGl0ZW1EYXRhO1xuICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9KVxuICAgIC5lcnJvcigoKSA9PiB7XG4gICAgICAkc2NvcGUuaXRlbXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogXCJUaGUgUHJvIExvdyBQdXR0aW5nIFN5c3RlbVwiLFxuICAgICAgICAgIGJhc2VQcmljZTogMzkuOTUsXG4gICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgIHByaWNpbmdUaWVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcmljZTogMzkuOTUsXG4gICAgICAgICAgICAgIHF1YW50aXR5OiA1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcmljZTogMzkuOTUsXG4gICAgICAgICAgICAgIHF1YW50aXR5OiAxMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgICAgICBxdWFudGl0eTogMTVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgICAkbG9nLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zLCBkZWZhdWx0aW5nIHRvIGl0ZW0gZGVmYXVsdHMnLCAkc2NvcGUuaXRlbXMpO1xuICAgIH0pO1xuXG5cbiAgJHNjb3BlLmNoZWNrUXVhbnRpdHkgPSBmdW5jdGlvbihpdGVtKSB7XG5cbiAgICBpZihpdGVtLnF1YW50aXR5ID4gaXRlbS5wcmljaW5nVGllcnNbMF0ucXVhbnRpdHkpe1xuICAgICAgaXRlbS5wcmljZSA9IGl0ZW0ucHJpY2luZ1RpZXJzWzBdLnByaWNlO1xuICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPj0gaXRlbS5wcmljaW5nVGllcnNbMV0ucXVhbnRpdHkgJiYgcXVhbnRpdHkgPCBpdGVtLnByaWNpbmdUaWVyc1syXS5xdWFudGl0eSl7XG4gICAgICBpdGVtLnByaWNlID0gaXRlbS5wcmljaW5nVGllcnNbMV0ucHJpY2U7XG4gICAgfWVsc2UgaWYoaXRlbS5xdWFudGl0eSA+IGl0ZW0ucHJpY2luZ1RpZXJzWzJdLnF1YW50aXR5KXtcbiAgICAgIGl0ZW0ucHJpY2UgPSBpdGVtLnByaWNpbmdUaWVyc1syXS5wcmljZTtcbiAgICB9XG5cbiAgfTtcblxuXG4gICRzY29wZS5hZGRUb0NhcnQgPSBmdW5jdGlvbihpdGVtLCBwcmljZSl7XG4gICAgQ2FydFNlcnZpY2Uuc2V0Q2FydChpdGVtLCBwcmljZSk7XG4gIH07XG5cbn1cbmV4cG9ydCBkZWZhdWx0IEJ1eUNvbnRyb2xsZXI7XG4iLCJsZXQgQ2FydENvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUsIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlLCAkbG9nKXtcblxuICAvLyAkc2NvcGUuc2hpcHBpbmdUaWVycyA9IENhcnRTZXJ2aWNlLmdldFNoaXBwaW5nVGllcnMoKTtcblxuXG5cbi8vICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBDYXJ0U2VydmljZS5jYXJ0V2F0Y2goJHJvb3RTY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycykgLHRydWUpO1xuXG5cbiAgJHNjb3BlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbihpdGVtKXtcbiAgICRsb2cuZGVidWcoXCJSZW1vdmluZyBJdGVtXCIsIGl0ZW0pO1xuXG4gICAkc2NvcGUuY2FydC5pdGVtcyA9ICBfLndpdGhvdXQoJHNjb3BlLmNhcnQuaXRlbXMsIGl0ZW0pO1xuICAgQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG4gICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrb3V0ID0gZnVuY3Rpb24oY2FydCl7XG4gICAgQ2FydFNlcnZpY2UuY2hlY2tvdXQoY2FydCk7XG4gIH07XG5cblxuXG59O1xuXG5DYXJ0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQ2FydFNlcnZpY2UnLCAnJHJvb3RTY29wZScsICckbG9nJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gQ29udGFjdENvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSl7XG5cbiAgJHNjb3BlLmNvbnRhY3RVcyA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYDxwPiR7Zm9ybS5tZXNzYWdlfTwvcD5cXFxuICAgIDxwPiR7Zm9ybS5maXJzdE5hbWV9ICR7Zm9ybS5sYXN0TmFtZX08L3A+XFxcbiAgICA8cD4ke2Zvcm0ucGhvbmV9PC9wPlxcXG4gICAgPHA+JHtmb3JtLmVtYWlsfTwvcD5gO1xuICAgIGNvbnN0IGVtYWlsID0ge1xuICAgICAgbWVzc2FnZSxcbiAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICBmcm9tOiAnbm9yZXBseUBQcm9Mb3dQdXR0aW5nLmNvbScsXG4gICAgICBmcm9tTmFtZTogJ1Byb0xvdyBQdXR0aW5nJyxcbiAgICAgIHN1YmplY3Q6IFwiQSBjdXN0b21lciBpcyB0cnlpbmcgdG8gY29udGFjdCB5b3VcIlxuICAgIH07XG5cbiAgICBVc2VyU2VydmljZS5jb250YWN0KGVtYWlsKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICB9KVxuICAgICAgLmVycm9yKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLnN0YXRlcyA9ICgnQUwgQUsgQVogQVIgQ0EgQ08gQ1QgREUgRkwgR0EgSEkgSUQgSUwgSU4gSUEgS1MgS1kgTEEgTUUgTUQgTUEgTUkgTU4gTVMgJyArXG4gICAgICAgICAgICAnTU8gTVQgTkUgTlYgTkggTkogTk0gTlkgTkMgTkQgT0ggT0sgT1IgUEEgUkkgU0MgU0QgVE4gVFggVVQgVlQgVkEgV0EgV1YgV0kgJyArXG4gICAgICAgICAgICAnV1knKS5zcGxpdCgnICcpLm1hcChmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIHsgYWJicmV2OiBzdGF0ZSB9OyB9KTtcblxuICAkc2NvcGUud2hvbGVzYWxlUmVxdWVzdCA9IGZ1bmN0aW9uKHJlcXVlc3Qpe1xuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgY29uc3QgbWVzc2FnZT0gYDxwPllvdSBoYXZlIGEgbmV3IFdob2xlc2FsZSBDdXN0b21lciByZXF1ZXN0IGZyb20gUHJvTG93UHV0dGluZy5jb20hIFxcXG4gICAgU2VlIGJlbG93IGZvciBkZXRhaWxzPC9wPiBcXFxuICAgIDxwPlN0b3JlOiAke3JlcXVlc3Quc3RvcmV9PC9wPlxcXG4gICAgPHA+JHtyZXF1ZXN0LmNpdHl9LCAke3JlcXVlc3Quc3RhdGV9ICR7cmVxdWVzdC56aXB9PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5Db250YWN0IEluZm86PC9zdHJvbmc+PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5OYW1lOjwvc3Ryb25nPiAke3JlcXVlc3QuZmlyc3ROYW1lfSAke3JlcXVlc3QubGFzdE5hbWV9PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5QaG9uZTo8L3N0cm9uZz4gJHtyZXF1ZXN0LnBob25lfTwvcD5cXFxuICAgIDxwPjxzdHJvbmc+RW1haWw6PC9zdHJvbmc+ICR7cmVxdWVzdC5lbWFpbH08L3A+XFxcbiAgICA8cD48c3Ryb25nPkFkZGl0aW9uYWwgSW5mbzo8L3N0cm9uZz4gJHtyZXF1ZXN0Lm1lc3NhZ2V9PC9wPlxcXG4gICAgPHA+VG8gYXBwcm92ZSB0aGlzIHVzZSB5b3UgbXVzdCBsb2cgaW4gdG8gYWRtaW4ucHJvbG93cHV0dGluZy5jb20gYW5kIGNyZWF0ZSBhIHdob2xlc2FsZSB1c2VyIHByb2ZpbGUgZm9yIHRoaXMgdXNlclxcXG4gICAgb25jZSB0aGUgYWNjb3VudCBpcyBjcmVhdGVkIHRoZXkgd2lsbCBiZSBub3RpZmllZCB2aWEgZW1haWwgd2l0aCB0aGVpciBjcmVkZW50aWFscy5gO1xuXG4gICAgY29uc3QgZW1haWwgPSB7XG4gICAgICBtZXNzYWdlLFxuICAgICAgYm9keTogbWVzc2FnZVxuICAgIH07XG5cbiAgICBVc2VyU2VydmljZS53aG9sZXNhbGVSZXF1ZXN0KGVtYWlsKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIllvdSdyZSByZXF1ZXN0IGhhcyBiZWVuIHNlbnQhIE9uY2UgYXBwcm92ZWQgeW91IHdpbGwgYmUgbm90aWZpZWQgdmlhIGVtYWlsIVwiO1xuICAgICAgfSlcbiAgICAgIC5lcnJvcigoZGF0YSkgPT4ge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiV2UncmUgc29ycnkgdGhlcmUgd2FzIGEgcHJvYmxlbSBleGVjdXRpbmcgeW91ciByZXF1ZXN0ISBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyIVwiO1xuICAgICAgfSk7XG4gIH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdENvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkbWRVdGlsLCAkc3RhdGUsICRtZERpYWxvZywgQ2FydFNlcnZpY2UsICRyb290U2NvcGUpe1xuXG4kcm9vdFNjb3BlLnNoaXBwaW5nVGllcnMgPSBDYXJ0U2VydmljZS5nZXRTaGlwcGluZ1RpZXJzKCk7XG5cblxuICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3VidG90YWwgPSAwO1xuICAgIGlmKCFfLmlzRW1wdHkoJHJvb3RTY29wZS5jYXJ0KSl7XG5cbiAgICAgIGlmKCRzY29wZS5jYXJ0Lml0ZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICAkc2NvcGUuY2FydC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jYXJ0Lml0ZW1zID0gQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG5cbiAgICAgICAgJHNjb3BlLmNhcnQudG90YWxJdGVtcyA9ICRzY29wZS5jYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgaXRlbS5xdWFudGl0eTtcbiAgICAgICAgfSwgMCk7XG5cbiAgICAgIH1cbiAgICAgICAgJHNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5jYWxjdWxhdGVTaGlwcGluZygkc2NvcGUuY2FydCwgJHNjb3BlLnNoaXBwaW5nVGllcnMpO1xuICAgICAgICAkc2NvcGUuY2FydC5zdWJ0b3RhbCA9IHN1YnRvdGFsLnRvRml4ZWQoMik7XG4gICAgICAgICRzY29wZS5jYXJ0LnRvdGFsID0gKHN1YnRvdGFsICsgJHNjb3BlLmNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG5cbiAgICAgICAgJGxvZy5kZWJ1ZyhcIkNhcnQgbG9hZGVkIG9yIHVwZGF0ZWRcIiwgJHNjb3BlLmNhcnQpO1xuICAgIH1cblxuICB9LCB0cnVlKTtcblxuXG4gIC8vIG5hdiB0b2dnbGVzXG4gICRzY29wZS50b2dnbGVMZWZ0ID0gYnVpbGRUb2dnbGVyKCdsZWZ0Jyk7XG4gICRzY29wZS50b2dnbGVSaWdodCA9IGJ1aWxkVG9nZ2xlcigncmlnaHQnKTtcbiAgbGV0ICRsZWZ0ID0gJCgnLm1kLXNpZGVuYXYtbGVmdCcpO1xuICBsZXQgJHJpZ2h0ID0gJCgnLm1kLXNpZGVuYXYtcmlnaHQnKTtcblxuICAvLyBsaXN0IGl0ZW0gY2xpY2sgZXZlbnRcbiAgLy8gJCgnbWQtbGlzdC1pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgLy8gICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gICAkKHRoaXMpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyB9KTtcblxuICBmdW5jdGlvbiBidWlsZFRvZ2dsZXIobmF2SUQpIHtcbiAgICBsZXQgZGVib3VuY2VGbiA9ICAkbWRVdGlsLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAkbWRTaWRlbmF2KG5hdklEKS50b2dnbGUoKTtcbiAgICAgIH0sMzAwKTtcbiAgICByZXR1cm4gZGVib3VuY2VGbjtcbiAgfVxuXG5cbiAgLy8gTmF2aWdhdGUgZnVuY3Rpb25cbiAgJHNjb3BlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihzdGF0ZSwgbmF2KXtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjJysgc3RhdGUpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbyhzdGF0ZSkudGhlbigoKSA9PiB7XG4gICAgaWYgKG5hdiA9PSBcImxlZnRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgICAgaWYoISRyaWdodC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgIH1lbHNlIGlmKG5hdiA9PSBcInJpZ2h0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgICBpZighJGxlZnQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgIH19KTtcblxuICB9O1xuXG4gICRzY29wZS5zaG93V2FycmFudHkgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93YXJyYW50eS50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG4gICRzY29wZS5zaG93U2hpcHBpbmcgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zaGlwcGluZy50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLmNvbnRhY3RVcyA9IGZ1bmN0aW9uKGNvbnRhY3Qpe1xuXG4gIH07XG59XG5cblxuZnVuY3Rpb24gUmlnaHRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdyaWdodCcpLmNsb3NlKCk7XG4gIH07XG5cblxufVxuZnVuY3Rpb24gTGVmdEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xuICB9O1xuXG59XG5cbmZ1bmN0aW9uIERpYWxvZ0N0cmwoJHNjb3BlLCAkbWREaWFsb2cpe1xuICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmNhbmNlbCgpO1xuICB9O1xuXG4gICRzY29wZS5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgJG1kRGlhbG9nLmhpZGUoKTtcbiAgfTtcbn1cblxuZXhwb3J0IHtcbiAgTWFpbkNvbnRyb2xsZXIsXG4gIFJpZ2h0Q3RybCxcbiAgTGVmdEN0cmwsXG4gIERpYWxvZ0N0cmxcbn07XG4iLCJmdW5jdGlvbiBNZWRpYUNvbnRyb2xsZXIoJHNjb3BlKXtcblxuICAgICRzY29wZS50ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgIGNvbnNvbGUubG9nKCd3b3JrZWQnKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2Nsb3NldXAxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9jbG9zZXVwMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2tldmluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9rZXZpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICAvLyB7XG4gICAgICAvLyAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAvLyAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbjMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgLy8gICBkZXNjcmlwdGlvbjogJydcbiAgICAgIC8vIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU0LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU0LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfVxuICAgIF07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gVGVzdGltb25pYWxDb250cm9sbGVyKCRzY29wZSwgVGVzdGltb25pYWxTZXJ2aWNlLCAkc3RhdGUsICRsb2cpe1xuICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFscyA9IHRydWU7XG5cbiAgVGVzdGltb25pYWxTZXJ2aWNlLmdldFRlc3RpbW9uaWFscygpXG4gICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSBmYWxzZTtcbiAgICAgICRzY29wZS50ZXN0aW1vbmlhbHMgPSBkYXRhO1xuICAgICAgJGxvZy5kZWJ1ZyhcIlRlc3RpbW9uaWFsc1wiLCAkc2NvcGUudGVzdGltb25pYWxzKTtcbiAgICB9KVxuICAgIC5lcnJvcigoZGF0YSkgPT57XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFscyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IFwiV2UncmUgc29ycnkgd2UgY291bGQgbm90IGxvYWQgdGVzdGltb25pYWxzIGF0IHRoaXMgdGltZS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIjtcbiAgICB9KTtcbiAgJHNjb3BlLmdvVG9TaW5nbGUgPSBmdW5jdGlvbihpZCl7XG4gICAkc3RhdGUuZ28oJ3Rlc3RpbW9uaWFscy5zaW5nbGUnLCB7aWQ6IGlkfSk7XG4gIH07XG4gICRzY29wZS5hZGRUZXN0aW1vbmlhbCA9IGZ1bmN0aW9uKHRlc3RpbW9uaWFsKXtcbiAgICAkc2NvcGUuYWRkaW5nVGVzdGltb25pYWwgPSB0cnVlO1xuICAgIHRlc3RpbW9uaWFsLmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIFRlc3RpbW9uaWFsU2VydmljZS5hZGRUZXN0aW1vbmlhbCh0ZXN0aW1vbmlhbClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAgICRzY29wZS50ZXN0aW1vbmlhbEFkZGVkID0gdHJ1ZTtcbiAgICAgICRzY29wZS5hZGRlZFRlc3RpbW9uaWFsTWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gVGVzdGltb25pYWxTaW5nbGVDdHJsKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBUZXN0aW1vbmlhbFNlcnZpY2UsICRsb2cpe1xuICBjb25zdCBpZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbCA9IHRydWU7XG4gIFRlc3RpbW9uaWFsU2VydmljZS5nZXRTaW5nbGVUZXN0aW1vbmlhbChpZClcbiAgICAuc3VjY2VzcygoZGF0YSkgPT4ge1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLnRlc3RpbW9uaWFsID0gZGF0YTtcbiAgICAgICRsb2cuZGVidWcoXCJUZXN0aW1vbmlhbFwiLCBkYXRhKTtcbiAgICB9KVxuICAgIC5lcnJvcigoZGF0YSkgPT57XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFsID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gXCJXZSdyZSBzb3JyeSB3ZSBjb3VsZCBub3QgbG9hZCB0aGlzIHRlc3RpbW9uaWFsIGF0IHRoaXMgdGltZS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHtcbiAgVGVzdGltb25pYWxDb250cm9sbGVyLFxuICBUZXN0aW1vbmlhbFNpbmdsZUN0cmxcbn07XG4iLCJmdW5jdGlvbiBVc2VyQ29udHJvbGxlcigkc2NvcGUsIFVzZXJTZXJ2aWNlLCAkbG9nKXtcbiAgJHNjb3BlLmxvZ2luV2hvbGVzYWxlVXNlciA9IGZ1bmN0aW9uKHdob2xlc2FsZVVzZXIpe1xuICAgIFVzZXJTZXJ2aWNlLmxvZ2luKHdob2xlc2FsZVVzZXIpO1xuICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgVXNlckNvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBXaG9sZXNhbGVDb250cm9sbGVyKCRzY29wZSwgVXNlclNlcnZpY2Upe1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdob2xlc2FsZUNvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBsb2FkaW5nKCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9sb2FkaW5nLmh0bWwnXG4gIH07XG59XG5leHBvcnQgZGVmYXVsdCBsb2FkaW5nO1xuIiwiaW1wb3J0IHtjb25maWcsIHJ1biwgcGF5cGFsLCBBUEl9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1haW5Db250cm9sbGVyLCBMZWZ0Q3RybCwgUmlnaHRDdHJsLCBEaWFsb2dDdHJsIH0gZnJvbSAnLi9jb250cm9sbGVycy9NYWluQ29udHJvbGxlcic7XG5pbXBvcnQgQnV5Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXInO1xuaW1wb3J0IE1lZGlhQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL01lZGlhQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9DYXJ0Q29udHJvbGxlcic7XG5pbXBvcnQgQ29udGFjdENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Db250YWN0Q29udHJvbGxlcic7XG5pbXBvcnQgVXNlckNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Vc2VyQ29udHJvbGxlcic7XG5pbXBvcnQgV2hvbGVzYWxlQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL1dob2xlc2FsZUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgVGVzdGltb25pYWxDb250cm9sbGVyLCBUZXN0aW1vbmlhbFNpbmdsZUN0cmwgfSBmcm9tICcuL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9DYXJ0U2VydmljZSc7XG5pbXBvcnQgVGVzdGltb25pYWxTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvVGVzdGltb25pYWxTZXJ2aWNlJztcbmltcG9ydCBVc2VyU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4vZGlyZWN0aXZlcy9sb2FkaW5nJztcbmFuZ3VsYXJcbi5tb2R1bGUoJ2FwcCcsIFsndWkucm91dGVyJywgJ25nTWF0ZXJpYWwnLCAnamt1cmkuZ2FsbGVyeScgLCAnbmdDb29raWVzJ10pXG4uY29uZmlnKGNvbmZpZylcbi5jb25zdGFudCgnUEFZUEFMJywgcGF5cGFsKVxuLmNvbnN0YW50KCdBUEknLCBBUEkpXG4ucnVuKHJ1bilcbi5kaXJlY3RpdmUoJ215TG9hZGVyJywgW2xvYWRpbmddKVxuLmZhY3RvcnkoJ0NhcnRTZXJ2aWNlJywgQ2FydFNlcnZpY2UpXG4uZmFjdG9yeSgnVGVzdGltb25pYWxTZXJ2aWNlJywgVGVzdGltb25pYWxTZXJ2aWNlKVxuLmZhY3RvcnkoJ1VzZXJTZXJ2aWNlJywgVXNlclNlcnZpY2UpXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdMZWZ0Q3RybCcsIExlZnRDdHJsKVxuLmNvbnRyb2xsZXIoJ1JpZ2h0Q3RybCcsIFJpZ2h0Q3RybClcbi5jb250cm9sbGVyKCdEaWFsb2dDdHJsJywgRGlhbG9nQ3RybClcbi5jb250cm9sbGVyKCdCdXlDdHJsJywgQnV5Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdXaG9sZXNhbGVDb250cm9sbGVyJywgV2hvbGVzYWxlQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdNZWRpYUNvbnRyb2xsZXInLCBNZWRpYUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignQ2FydENvbnRyb2xsZXInLCBDYXJ0Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdVc2VyQ29udHJvbGxlcicsIFVzZXJDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0NvbnRhY3RDdHJsJywgQ29udGFjdENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignVGVzdGltb25pYWxDb250cm9sbGVyJywgVGVzdGltb25pYWxDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsU2luZ2xlQ3RybCcsIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCk7XG4iLCJsZXQgQ2FydFNlcnZpY2UgPSBmdW5jdGlvbigkY29va2llcywgJHN0YXRlLCAkcm9vdFNjb3BlLCAkaHR0cCwgJGxvZywgQVBJKXtcblxuICBjb25zdCBwYXlwYWwgPSBcImh0dHBzOi8vd3d3LnBheXBhbC5jb20vY2dpLWJpbi93ZWJzY3JcIjtcblxuICAvLyBpdGVtIGNvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gSXRlbShvcHRpb25zKXtcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZTtcbiAgICB0aGlzLnByaWNlID0gb3B0aW9ucy5wcmljZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gb3B0aW9ucy5xdWFudGl0eTtcbiAgICB0aGlzLnRvdGFsID0gZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAodGhpcy5xdWFudGl0eSAqIHRoaXMucHJpY2UpIHx8IDA7XG4gICAgfTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SXRlbXMoKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L2l0ZW1zYCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaW5nbGVJdGVtKGl0ZW0pe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vaXRlbXMvJHtpdGVtfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2FydCgpe1xuICAgIGxldCBjYXJ0TGlzdCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0TGlzdCB8fCBjYXJ0TGlzdC5sZW5ndGggPCAxKXtcbiAgICAgICRyb290U2NvcGUuaGFzQ2FydCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0SXRlbXMgPSBjYXJ0TGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGxldCBjYXJ0SXRlbSA9IG5ldyBJdGVtKGl0ZW0pO1xuICAgICAgcmV0dXJuIGNhcnRJdGVtO1xuICAgIH0pO1xuXG4gICAgdmFyIHBheXBhbEl0ZW1zID0gYWRkUGF5cGFsKGNhcnRJdGVtcyk7XG5cbiAgICB2YXIgY2FydCA9IHt9O1xuXG4gICAgY2FydC5pdGVtcyA9IHBheXBhbEl0ZW1zO1xuICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICB9LCAwKTtcblxuICAgIHJldHVybiBjYXJ0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FydChpdGVtKXtcbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0ID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdjYXJ0Jyk7XG4gICAgaWYoIWNhcnQpe1xuICAgICAgY2FydCA9IFtdO1xuICAgIH1cblxuICAgIGxldCBhbHJlYWR5RXhpc3RzID0gXy5maW5kV2hlcmUoY2FydCwgaXRlbS50aXRsZSk7XG4gICAgaWYoYWxyZWFkeUV4aXN0cyl7XG4gICAgICBjYXJ0ID0gXy53aXRob3V0KGNhcnQsIGFscmVhZHlFeGlzdHMpO1xuICAgICAgYWxyZWFkeUV4aXN0cy5xdWFudGl0eSA9IGFscmVhZHlFeGlzdHMucXVhbnRpdHkgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgY2FydC5wdXNoKGFscmVhZHlFeGlzdHMpO1xuICAgIH1lbHNle1xuICAgICAgY2FydC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICAkY29va2llcy5wdXRPYmplY3QoJ2NhcnQnLCBjYXJ0KTtcbiAgICAkbG9nLmRlYnVnKFwiSXRlbSBhZGRlZCB0byBjYXJ0XCIsIGl0ZW0sIGNhcnQpO1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyNjYXJ0JykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKCdjYXJ0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYXJ0KGl0ZW1zKXtcbiAgICAkbG9nLmRlYnVnKCd1cGRhdGluZyBjYXJ0JywgaXRlbXMpO1xuXG4gICAgdmFyIGNhcnRJdGVtcyA9IGFkZFBheXBhbChpdGVtcyk7XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2hpcHBpbmdUaWVycygpe1xuICAgIGxldCBzaGlwcGluZyA9IHtcbiAgICAgIHRpZXIxOiB7XG4gICAgICAgIHF1YW50aXR5OiA1LFxuICAgICAgICBwcmljZTogNVxuICAgICAgfSxcbiAgICAgIHRpZXIyOiB7XG4gICAgICAgIHF1YW50aXR5OiAxMCxcbiAgICAgICAgcHJpY2U6IDEwXG4gICAgICB9LFxuICAgICAgdGllcjM6IHtcbiAgICAgICAgcXVhbnRpdHk6IDIwLFxuICAgICAgICBwcmljZTogMjBcbiAgICAgIH1cbiAgICB9O1xuICAgICRsb2cuZGVidWcoXCJTaGlwcGluZyBUaWVyc1wiLCBzaGlwcGluZyk7XG4gICAgcmV0dXJuIHNoaXBwaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlU2hpcHBpbmcoY2FydCwgdGllcnMpe1xuICAgIGNhcnQuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgaWYoaXRlbS5xdWFudGl0eSA+PSB0aWVycy50aWVyMS5xdWFudGl0eSAmJiBpdGVtLnF1YW50aXR5IDwgdGllcnMudGllcjIucXVhbnRpdHkpe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjEucHJpY2U7XG4gICAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID49IHRpZXJzLnRpZXIyLnF1YW50aXR5ICYmIGl0ZW0ucXVhbnRpdHkgPCB0aWVycy50aWVyMy5xdWFudGl0eSl7XG4gICAgICAgIGl0ZW0uc2hpcHBpbmcgPSB0aWVycy50aWVyMi5wcmljZTtcbiAgICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPiB0aWVycy50aWVyMy5xdWFudGl0eSApe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjMucHJpY2U7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjYXJ0LnNoaXBwaW5nID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0uc2hpcHBpbmc7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcblxuICB9XG5cbiAgZnVuY3Rpb24gY2FydFdhdGNoKGNhcnQsIHNoaXBwaW5nKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KGNhcnQpKXtcblxuICAgICAgaWYoY2FydC5pdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgY2FydC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYXJ0ID0gdXBkYXRlQ2FydChjYXJ0Lml0ZW1zKTtcbiAgICAgICAgY2FydC50b3RhbEl0ZW1zID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuXG4gICAgICBjYXJ0LnNoaXBwaW5nID0gIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHNoaXBwaW5nKTtcbiAgICAgIGNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgY2FydC50b3RhbCA9IChzdWJ0b3RhbCArIGNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG5cbiAgICAgICRsb2cuZGVidWcoXCJDYXJ0IGxvYWRlZCBvciB1cGRhdGVkXCIsIGNhcnQpO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUGF5cGFsKGNhcnRJdGVtcyl7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhcnRJdGVtcy5sZW5ndGg7IGkgKyspe1xuICAgICAgdmFyIGl0ZW1OdW1iZXIgPSAoaSArIDEpO1xuICAgICAgY2FydEl0ZW1zW2ldLnBheXBhbCA9IHtcbiAgICAgICAgaXRlbSA6IFwiaXRlbV9uYW1lX1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgYW1vdW50OiBcImFtb3VudF9cIisgaXRlbU51bWJlcixcbiAgICAgICAgcXVhbnRpdHk6IFwicXVhbnRpdHlfXCIgKyBpdGVtTnVtYmVyLFxuICAgICAgICBzaGlwcGluZyA6IFwic2hpcHBpbmdfXCIgKyBpdGVtTnVtYmVyXG4gICAgICB9O1xuICAgIH1cblxuICAgICRsb2cuZGVidWcoXCJhZGRpbmcgcGF5cGFsIGluZm9cIiwgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRJdGVtcyxcbiAgICBnZXRTaW5nbGVJdGVtLFxuICAgIGdldENhcnQsXG4gICAgc2V0Q2FydCxcbiAgICB1cGRhdGVDYXJ0LFxuICAgIGdldFNoaXBwaW5nVGllcnMsXG4gICAgY2FsY3VsYXRlU2hpcHBpbmcsXG4gICAgY2FydFdhdGNoXG4gIH07XG5cblxufTtcblxuQ2FydFNlcnZpY2UuJGluamVjdCA9IFsnJGNvb2tpZXMnLCAnJHN0YXRlJywgJyRyb290U2NvcGUnLCAnJGh0dHAnLCAnJGxvZycsICdBUEknXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydFNlcnZpY2U7XG4iLCJsZXQgVGVzdGltb25pYWxTZXJ2aWNlID0gZnVuY3Rpb24oJGh0dHAsIEFQSSl7XG5cbiAgZnVuY3Rpb24gZ2V0VGVzdGltb25pYWxzKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNpbmdsZVRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsSWQpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzLyR7dGVzdGltb25pYWxJZH1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgLCB0ZXN0aW1vbmlhbCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFRlc3RpbW9uaWFscyxcbiAgICBnZXRTaW5nbGVUZXN0aW1vbmlhbCxcbiAgICBhZGRUZXN0aW1vbmlhbFxuICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IFRlc3RpbW9uaWFsU2VydmljZTtcbiIsImxldCBVc2VyU2VydmljZSA9IGZ1bmN0aW9uKCRodHRwLCBBUEksICRjb29raWVzLCAkc3RhdGUsICRyb290U2NvcGUsICRsb2cpe1xuXG4gIGZ1bmN0aW9uIGdldFVzZXJJbmZvKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS9tZWAsIEFQSS5DT05GSUcpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVc2VyKCl7XG4gICAgY29uc3QgdG9rZW4gPSAkY29va2llcy5nZXQoJ3Rva2VuJyk7XG4gICAgaWYodG9rZW4pe1xuICAgICAgX3NldFRva2VuKHRva2VuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0VG9rZW4odG9rZW4pe1xuICAgIGlmKHRva2VuKXtcbiAgICAgIEFQSS5DT05GSUcuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXSA9IHRva2VuO1xuICAgICAgJHJvb3RTY29wZS5pc1VzZXJMb2dnZWRJbiA9IHRydWU7XG4gICAgfWVsc2V7XG4gICAgICAkcm9vdFNjb3BlLmlzVXNlckxvZ2dlZEluID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2hvbGVzYWxlUmVxdWVzdChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vY29udGFjdC93aG9sZXNhbGVgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWN0KGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS9jb250YWN0YCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9naW4odXNlcil7XG4gICAgJGh0dHAucG9zdChgJHtBUEkuVVJMfS9hdXRoZW50aWNhdGVgLCB1c2VyKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgX3N1Y2Nlc3NMb2coZGF0YSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWNjZXNzTG9nKGRhdGEpe1xuICAgICRjb29raWVzLnB1dCgndG9rZW4nLCBkYXRhLnRva2VuKTtcbiAgICAkbG9nLmRlYnVnKCdMb2dnZWQgaW4hJywgZGF0YSk7XG4gICAgZ2V0VXNlckluZm8oKVxuICAgICAgLnN1Y2Nlc3MoKHVzZXJEYXRhKSA9PntcbiAgICAgICAgJGxvZy5kZWJ1ZygnVXNlciBkYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAkY29va2llcy5wdXQoJ2l0ZW1zJywgdXNlckRhdGEuaXRlbXMpO1xuICAgICAgICAkY29va2llcy5wdXQoJ3VzZXJuYW1lJywgdXNlckRhdGEudXNlcm5hbWUpO1xuICAgICAgfSk7XG4gICAgJHN0YXRlLmdvKCdidXlXaG9sZXNhbGUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF91cGRhdGVVc2VyKHVzZXJJZCwgdXNlcil7XG4gICAgcmV0dXJuICRodHRwLnB1dChgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gLCB1c2VyLCBBUEkuQ09ORklHKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ091dCgpe1xuICAgICRjb29raWVzLnJlbW92ZSgndG9rZW4nKTtcbiAgICBfc2V0VG9rZW4oKTtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9nZXRVc2VyKHVzZXJJZCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gLCBBUEkuQ09ORklHKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcmdvdFBhc3N3b3JkKGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS9mb3Jnb3RQYXNzd29yZGAsIGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVVc2VyKHVzZXJJZCl7XG4gICAgcmV0dXJuICRodHRwLmRlbGV0ZShgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gKTtcbiAgfVxuXG4gIHJldHVybntcbiAgICBjaGVja1VzZXIsXG4gICAgd2hvbGVzYWxlUmVxdWVzdCxcbiAgICBjb250YWN0LFxuICAgIGxvZ2luLFxuICAgIGxvZ091dCxcbiAgICBfdXBkYXRlVXNlcixcbiAgICBfZ2V0VXNlcixcbiAgICBfZGVsZXRlVXNlcixcbiAgICBmb3Jnb3RQYXNzd29yZFxuXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyU2VydmljZTtcbiJdfQ==
