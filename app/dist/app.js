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
  }).state('buyWholesale.edit', {
    url: '/editProfile',
    templateUrl: 'js/templates/edit.tpl.html',
    controller: 'UserController'
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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function UserController($scope, UserService, $log, $state) {
  $scope.loginWholesaleUser = function (wholesaleUser) {
    UserService.login(wholesaleUser);
  };
  $scope.editUser = function (user) {
    UserService._updateUser(user._id, user).success(function (data) {
      $state.go('buyWholesale');
    });
  };
}
exports['default'] = UserController;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function WholesaleController($scope, UserService, CartService, $log, $cookies, $state) {

  var id = $cookies.get('userId'),
      token = $cookies.get('token'),
      userItems = $cookies.getObject('items');

  if (id && token) {
    UserService._getUser(id).success(function (data) {
      $scope.userData = data;
      $log.debug('User Data', data);
    });
    if (!userItems) {
      UserService.getUserInfo().success(function (data) {
        $cookies.put('items', data.items);
        $log.debug(data.items);
        $scope.userItems = data.items;
      });
    } else {
      $scope.userItems = userItems;
    }
    CartService.getItems().success(function (data) {
      $log.debug('Retrieved Items', data);
      $scope.userItems = data.map(function (item) {
        var thisItem = $scope.userItems.find(function (i) {
          return i.itemId === item._id;
        });
        thisItem.title = item.title;
        return thisItem;
      });
    });
    $log.debug("User Items", userItems);
  } else {
    $state.go('home');
  }

  $scope.editProfile = function () {
    $state.go('buyWholesale.edit');
  };
}

exports['default'] = WholesaleController;
module.exports = exports['default'];

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
    $cookies.put('userId', data.id);
    _setToken(data.token);
    getUserInfo().success(function (userData) {
      $log.debug('User data', userData);
      $cookies.putObject('items', userData.items);
      $cookies.put('username', userData.username);
    });
    $state.go('buyWholesale');
    $log.debug('Logged in!', data);
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
    forgotPassword: forgotPassword,
    getUserInfo: getUserInfo

  };
};

exports['default'] = UserService;
module.exports = exports['default'];

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9jb250cm9sbGVycy9Vc2VyQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9jb250cm9sbGVycy9XaG9sZXNhbGVDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2RpcmVjdGl2ZXMvbG9hZGluZy5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZS5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsU0FBUyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRTtBQUNwRixjQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVoQyxvQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWxDLGdCQUFjLENBQ1gsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNiLE9BQUcsRUFBRSxHQUFHO0FBQ1IsZUFBVyxFQUFFLDRCQUE0QjtBQUN6QyxjQUFVLEVBQUUsZ0JBQWdCO0dBQzdCLENBQUMsQ0FDRCxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ1osT0FBRyxFQUFFLE1BQU07QUFDWCxlQUFXLEVBQUUsMkJBQTJCO0FBQ3hDLGNBQVUsRUFBRSxTQUFTO0dBQ3RCLENBQUMsQ0FDRCxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ2QsT0FBRyxFQUFFLFFBQVE7QUFDYixlQUFXLEVBQUUsNkJBQTZCO0FBQzFDLGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDckIsT0FBRyxFQUFFLGVBQWU7QUFDcEIsZUFBVyxFQUFFLG9DQUFvQztBQUNqRCxjQUFVLEVBQUUsdUJBQXVCO0dBQ3BDLENBQUMsQ0FDRCxLQUFLLENBQUMsa0JBQWtCLEVBQUU7QUFDekIsT0FBRyxFQUFFLE1BQU07QUFDWCxlQUFXLEVBQUUsd0NBQXdDO0FBQ3JELGNBQVUsRUFBRSx1QkFBdUI7R0FDcEMsQ0FBQyxDQUNELEtBQUssQ0FBQyxxQkFBcUIsRUFBRTtBQUM1QixPQUFHLEVBQUUsTUFB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VyxFQUFYLFdBQVc7QUFDWCxZQUFRLEVBQVIsUUFBUTtBQUNSLGVBQVcsRUFBWCxXQUFXO0FBQ1gsa0JBQWMsRUFBZCxjQUFjO0FBQ2QsZUFBVyxFQUFYLFdBQVc7O0dBRVosQ0FBQztDQUNILENBQUM7O3FCQUVhLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJGxvZ1Byb3ZpZGVyKSB7XG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5Jywge1xuICAgICAgdXJsOiAnL2J1eScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0J1eUN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzLmFkZCcsIHtcbiAgICAgIHVybDogJy9hZGQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLmFkZC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge1xuICAgICAgdXJsOiAnLzppZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMuc2luZ2xlLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwcmljaW5nJywge1xuICAgICAgdXJsOiAnL3ByaWNpbmcnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvcHJpY2luZy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2Rlc2lnbicsIHtcbiAgICAgIHVybDogJy9kZXNpZ24nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZGVzaWduLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY2FydCcsIHtcbiAgICAgIHVybDogJy9jYXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NhcnQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NhcnRDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3dob2xlc2FsZVJlcXVlc3QnLCB7XG4gICAgICB1cmw6ICcvd2hvbGVzYWxlUmVxdWVzdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93aG9sZXNhbGVSZXF1ZXN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5V2hvbGVzYWxlJywge1xuICAgICAgdXJsOiAnL2J1eVdob2xlc2FsZScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXlXaG9sZXNhbGUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1dob2xlc2FsZUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2J1eVdob2xlc2FsZS5lZGl0Jywge1xuICAgICAgdXJsOiAnL2VkaXRQcm9maWxlJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2VkaXQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1VzZXJDb250cm9sbGVyJ1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHJ1bihDYXJ0U2VydmljZSwgVXNlclNlcnZpY2UsICRyb290U2NvcGUpe1xuICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgVXNlclNlcnZpY2UuY2hlY2tVc2VyKCk7XG4gICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9KTtcbn1cblxuY29uc3QgcGF5cGFsID0ge1xuICAgICAgdXNlcm5hbWU6ICdhaW5lcy5rZXZpbl9hcGkxLmdtYWlsLmNvbScsXG4gICAgICBwYXNzd29yZDogJ1Q2WDlEUjJCNzdCUTRZV0snLFxuICAgICAgY3JlZGVudGlhbDogJ0FQSSBTaWduYXR1cmUnLFxuICAgICAgc2lnbmF0dXJlOiAnQUZjV3hWMjFDN2ZkMHYzYllZWVJDcFNTUmwzMUEyRUVoQXpXemx4cS1FekVRdG9aTXFTY1I2eEknXG59O1xuXG5jb25zdCBBUEkgPSB7XG4gIFVSTDogJ2h0dHA6Ly9hZG1pbi5wcm9sb3dwdXR0aW5nLmNvbS9hcGknLFxuICBDT05GSUc6IHtcbiAgICBoZWFkZXJzOntcblxuICAgIH1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIHBheXBhbCxcbiAgY29uZmlnLFxuICBydW4sXG4gIEFQSVxufTtcbiIsImZ1bmN0aW9uIEJ1eUNvbnRyb2xsZXIoJHNjb3BlLCAkY29va2llcywgJHN0YXRlLCBDYXJ0U2VydmljZSwgJGxvZyl7XG5cbiAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gIENhcnRTZXJ2aWNlLmdldEl0ZW1zKClcbiAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgJGxvZy5kZWJ1ZygnaXRlbXMnLCBkYXRhKTtcbiAgICAgIGNvbnN0IGl0ZW1EYXRhID0gZGF0YS5tYXAoKGkpID0+IHtcbiAgICAgICAgaS5wcmljZSA9IGkuYmFzZVByaWNlO1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH0pO1xuXG4gICAgICAkc2NvcGUuaXRlbXMgPSBpdGVtRGF0YTtcbiAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSlcbiAgICAuZXJyb3IoKCkgPT4ge1xuICAgICAgJHNjb3BlLml0ZW1zID0gW1xuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwiVGhlIFBybyBMb3cgUHV0dGluZyBTeXN0ZW1cIixcbiAgICAgICAgICBiYXNlUHJpY2U6IDM5Ljk1LFxuICAgICAgICAgIHByaWNlOiAzOS45NSxcbiAgICAgICAgICBwcmljaW5nVGllcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgICAgICBxdWFudGl0eTogNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgICAgICBxdWFudGl0eTogMTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByaWNlOiAzOS45NSxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IDE1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdO1xuICAgICAgJGxvZy5lcnJvcignRXJyb3IgbG9hZGluZyBpdGVtcywgZGVmYXVsdGluZyB0byBpdGVtIGRlZmF1bHRzJywgJHNjb3BlLml0ZW1zKTtcbiAgICB9KTtcblxuXG4gICRzY29wZS5jaGVja1F1YW50aXR5ID0gZnVuY3Rpb24oaXRlbSkge1xuXG4gICAgaWYoaXRlbS5xdWFudGl0eSA+IGl0ZW0ucHJpY2luZ1RpZXJzWzBdLnF1YW50aXR5KXtcbiAgICAgIGl0ZW0ucHJpY2UgPSBpdGVtLnByaWNpbmdUaWVyc1swXS5wcmljZTtcbiAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID49IGl0ZW0ucHJpY2luZ1RpZXJzWzFdLnF1YW50aXR5ICYmIHF1YW50aXR5IDwgaXRlbS5wcmljaW5nVGllcnNbMl0ucXVhbnRpdHkpe1xuICAgICAgaXRlbS5wcmljZSA9IGl0ZW0ucHJpY2luZ1RpZXJzWzFdLnByaWNlO1xuICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPiBpdGVtLnByaWNpbmdUaWVyc1syXS5xdWFudGl0eSl7XG4gICAgICBpdGVtLnByaWNlID0gaXRlbS5wcmljaW5nVGllcnNbMl0ucHJpY2U7XG4gICAgfVxuXG4gIH07XG5cblxuICAkc2NvcGUuYWRkVG9DYXJ0ID0gZnVuY3Rpb24oaXRlbSwgcHJpY2Upe1xuICAgIENhcnRTZXJ2aWNlLnNldENhcnQoaXRlbSwgcHJpY2UpO1xuICB9O1xuXG59XG5leHBvcnQgZGVmYXVsdCBCdXlDb250cm9sbGVyO1xuIiwibGV0IENhcnRDb250cm9sbGVyID0gZnVuY3Rpb24oJHNjb3BlLCBDYXJ0U2VydmljZSwgJHJvb3RTY29wZSwgJGxvZyl7XG5cbiAgLy8gJHNjb3BlLnNoaXBwaW5nVGllcnMgPSBDYXJ0U2VydmljZS5nZXRTaGlwcGluZ1RpZXJzKCk7XG5cblxuXG4vLyAkc2NvcGUuJHdhdGNoKCdjYXJ0JywgQ2FydFNlcnZpY2UuY2FydFdhdGNoKCRyb290U2NvcGUuY2FydCwgJHNjb3BlLnNoaXBwaW5nVGllcnMpICx0cnVlKTtcblxuXG4gICRzY29wZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24oaXRlbSl7XG4gICAkbG9nLmRlYnVnKFwiUmVtb3ZpbmcgSXRlbVwiLCBpdGVtKTtcblxuICAgJHNjb3BlLmNhcnQuaXRlbXMgPSAgXy53aXRob3V0KCRzY29wZS5jYXJ0Lml0ZW1zLCBpdGVtKTtcbiAgIENhcnRTZXJ2aWNlLnVwZGF0ZUNhcnQoJHNjb3BlLmNhcnQuaXRlbXMpO1xuICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9O1xuXG4gICRzY29wZS5jaGVja291dCA9IGZ1bmN0aW9uKGNhcnQpe1xuICAgIENhcnRTZXJ2aWNlLmNoZWNrb3V0KGNhcnQpO1xuICB9O1xuXG5cblxufTtcblxuQ2FydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ0NhcnRTZXJ2aWNlJywgJyRyb290U2NvcGUnLCAnJGxvZyddO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJ0Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIENvbnRhY3RDb250cm9sbGVyKCRzY29wZSwgVXNlclNlcnZpY2Upe1xuXG4gICRzY29wZS5jb250YWN0VXMgPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgY29uc3QgbWVzc2FnZSA9IGA8cD4ke2Zvcm0ubWVzc2FnZX08L3A+XFxcbiAgICA8cD4ke2Zvcm0uZmlyc3ROYW1lfSAke2Zvcm0ubGFzdE5hbWV9PC9wPlxcXG4gICAgPHA+JHtmb3JtLnBob25lfTwvcD5cXFxuICAgIDxwPiR7Zm9ybS5lbWFpbH08L3A+YDtcbiAgICBjb25zdCBlbWFpbCA9IHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgZnJvbTogJ25vcmVwbHlAUHJvTG93UHV0dGluZy5jb20nLFxuICAgICAgZnJvbU5hbWU6ICdQcm9Mb3cgUHV0dGluZycsXG4gICAgICBzdWJqZWN0OiBcIkEgY3VzdG9tZXIgaXMgdHJ5aW5nIHRvIGNvbnRhY3QgeW91XCJcbiAgICB9O1xuXG4gICAgVXNlclNlcnZpY2UuY29udGFjdChlbWFpbClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSlcbiAgICAgIC5lcnJvcigoZGF0YSkgPT4ge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5zdGF0ZXMgPSAoJ0FMIEFLIEFaIEFSIENBIENPIENUIERFIEZMIEdBIEhJIElEIElMIElOIElBIEtTIEtZIExBIE1FIE1EIE1BIE1JIE1OIE1TICcgK1xuICAgICAgICAgICAgJ01PIE1UIE5FIE5WIE5IIE5KIE5NIE5ZIE5DIE5EIE9IIE9LIE9SIFBBIFJJIFNDIFNEIFROIFRYIFVUIFZUIFZBIFdBIFdWIFdJICcgK1xuICAgICAgICAgICAgJ1dZJykuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiB7IGFiYnJldjogc3RhdGUgfTsgfSk7XG5cbiAgJHNjb3BlLndob2xlc2FsZVJlcXVlc3QgPSBmdW5jdGlvbihyZXF1ZXN0KXtcbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgIGNvbnN0IG1lc3NhZ2U9IGA8cD5Zb3UgaGF2ZSBhIG5ldyBXaG9sZXNhbGUgQ3VzdG9tZXIgcmVxdWVzdCBmcm9tIFByb0xvd1B1dHRpbmcuY29tISBcXFxuICAgIFNlZSBiZWxvdyBmb3IgZGV0YWlsczwvcD4gXFxcbiAgICA8cD5TdG9yZTogJHtyZXF1ZXN0LnN0b3JlfTwvcD5cXFxuICAgIDxwPiR7cmVxdWVzdC5jaXR5fSwgJHtyZXF1ZXN0LnN0YXRlfSAke3JlcXVlc3QuemlwfTwvcD5cXFxuICAgIDxwPjxzdHJvbmc+Q29udGFjdCBJbmZvOjwvc3Ryb25nPjwvcD5cXFxuICAgIDxwPjxzdHJvbmc+TmFtZTo8L3N0cm9uZz4gJHtyZXF1ZXN0LmZpcnN0TmFtZX0gJHtyZXF1ZXN0Lmxhc3ROYW1lfTwvcD5cXFxuICAgIDxwPjxzdHJvbmc+UGhvbmU6PC9zdHJvbmc+ICR7cmVxdWVzdC5waG9uZX08L3A+XFxcbiAgICA8cD48c3Ryb25nPkVtYWlsOjwvc3Ryb25nPiAke3JlcXVlc3QuZW1haWx9PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5BZGRpdGlvbmFsIEluZm86PC9zdHJvbmc+ICR7cmVxdWVzdC5tZXNzYWdlfTwvcD5cXFxuICAgIDxwPlRvIGFwcHJvdmUgdGhpcyB1c2UgeW91IG11c3QgbG9nIGluIHRvIGFkbWluLnByb2xvd3B1dHRpbmcuY29tIGFuZCBjcmVhdGUgYSB3aG9sZXNhbGUgdXNlciBwcm9maWxlIGZvciB0aGlzIHVzZXJcXFxuICAgIG9uY2UgdGhlIGFjY291bnQgaXMgY3JlYXRlZCB0aGV5IHdpbGwgYmUgbm90aWZpZWQgdmlhIGVtYWlsIHdpdGggdGhlaXIgY3JlZGVudGlhbHMuYDtcblxuICAgIGNvbnN0IGVtYWlsID0ge1xuICAgICAgbWVzc2FnZSxcbiAgICAgIGJvZHk6IG1lc3NhZ2VcbiAgICB9O1xuXG4gICAgVXNlclNlcnZpY2Uud2hvbGVzYWxlUmVxdWVzdChlbWFpbClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJZb3UncmUgcmVxdWVzdCBoYXMgYmVlbiBzZW50ISBPbmNlIGFwcHJvdmVkIHlvdSB3aWxsIGJlIG5vdGlmaWVkIHZpYSBlbWFpbCFcIjtcbiAgICAgIH0pXG4gICAgICAuZXJyb3IoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHRoZXJlIHdhcyBhIHByb2JsZW0gZXhlY3V0aW5nIHlvdXIgcmVxdWVzdCEgUGxlYXNlIHRyeSBhZ2FpbiBsYXRlciFcIjtcbiAgICAgIH0pO1xuICB9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlLCAkbWREaWFsb2csIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcblxuJHJvb3RTY29wZS5zaGlwcGluZ1RpZXJzID0gQ2FydFNlcnZpY2UuZ2V0U2hpcHBpbmdUaWVycygpO1xuXG5cbiAkc2NvcGUuJHdhdGNoKCdjYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KCRyb290U2NvcGUuY2FydCkpe1xuXG4gICAgICBpZigkc2NvcGUuY2FydC5pdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgJHNjb3BlLmNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2FydC5pdGVtcyA9IENhcnRTZXJ2aWNlLnVwZGF0ZUNhcnQoJHNjb3BlLmNhcnQuaXRlbXMpO1xuXG4gICAgICAgICRzY29wZS5jYXJ0LnRvdGFsSXRlbXMgPSAkc2NvcGUuY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIH0sIDApO1xuXG4gICAgICB9XG4gICAgICAgICRzY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuY2FsY3VsYXRlU2hpcHBpbmcoJHNjb3BlLmNhcnQsICRzY29wZS5zaGlwcGluZ1RpZXJzKTtcbiAgICAgICAgJHNjb3BlLmNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgICAkc2NvcGUuY2FydC50b3RhbCA9IChzdWJ0b3RhbCArICRzY29wZS5jYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgICAgICRsb2cuZGVidWcoXCJDYXJ0IGxvYWRlZCBvciB1cGRhdGVkXCIsICRzY29wZS5jYXJ0KTtcbiAgICB9XG5cbiAgfSwgdHJ1ZSk7XG5cblxuICAvLyBuYXYgdG9nZ2xlc1xuICAkc2NvcGUudG9nZ2xlTGVmdCA9IGJ1aWxkVG9nZ2xlcignbGVmdCcpO1xuICAkc2NvcGUudG9nZ2xlUmlnaHQgPSBidWlsZFRvZ2dsZXIoJ3JpZ2h0Jyk7XG4gIGxldCAkbGVmdCA9ICQoJy5tZC1zaWRlbmF2LWxlZnQnKTtcbiAgbGV0ICRyaWdodCA9ICQoJy5tZC1zaWRlbmF2LXJpZ2h0Jyk7XG5cbiAgLy8gbGlzdCBpdGVtIGNsaWNrIGV2ZW50XG4gIC8vICQoJ21kLWxpc3QtaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gIC8vICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vICAgJCh0aGlzKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGRUb2dnbGVyKG5hdklEKSB7XG4gICAgbGV0IGRlYm91bmNlRm4gPSAgJG1kVXRpbC5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgJG1kU2lkZW5hdihuYXZJRCkudG9nZ2xlKCk7XG4gICAgICB9LDMwMCk7XG4gICAgcmV0dXJuIGRlYm91bmNlRm47XG4gIH1cblxuXG4gIC8vIE5hdmlnYXRlIGZ1bmN0aW9uXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24oc3RhdGUsIG5hdil7XG4gICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJCgnIycrIHN0YXRlKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkc3RhdGUuZ28oc3RhdGUpLnRoZW4oKCkgPT4ge1xuICAgIGlmIChuYXYgPT0gXCJsZWZ0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICAgIGlmKCEkcmlnaHQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICB9ZWxzZSBpZihuYXYgPT0gXCJyaWdodFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgICAgaWYoISRsZWZ0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICB9fSk7XG5cbiAgfTtcblxuICAkc2NvcGUuc2hvd1dhcnJhbnR5ID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvd2FycmFudHkudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuICAkc2NvcGUuc2hvd1NoaXBwaW5nID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvc2hpcHBpbmcudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5jb250YWN0VXMgPSBmdW5jdGlvbihjb250YWN0KXtcblxuICB9O1xufVxuXG5cbmZ1bmN0aW9uIFJpZ2h0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdigncmlnaHQnKS5jbG9zZSgpO1xuICB9O1xuXG5cbn1cbmZ1bmN0aW9uIExlZnRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcbiAgfTtcblxufVxuXG5mdW5jdGlvbiBEaWFsb2dDdHJsKCRzY29wZSwgJG1kRGlhbG9nKXtcbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5jYW5jZWwoKTtcbiAgfTtcblxuICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5oaWRlKCk7XG4gIH07XG59XG5cbmV4cG9ydCB7XG4gIE1haW5Db250cm9sbGVyLFxuICBSaWdodEN0cmwsXG4gIExlZnRDdHJsLFxuICBEaWFsb2dDdHJsXG59O1xuIiwiZnVuY3Rpb24gTWVkaWFDb250cm9sbGVyKCRzY29wZSl7XG5cbiAgICAkc2NvcGUudGVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZygnd29ya2VkJyk7XG4gICAgfTtcblxuICAgICRzY29wZS5pbWFnZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9jbG9zZXVwMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvY2xvc2V1cDEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9rZXZpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMva2V2aW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAgLy8ge1xuICAgICAgLy8gICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbjMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgLy8gICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4zLWNvbXByZXNzb3IuanBnJyxcbiAgICAgIC8vICAgZGVzY3JpcHRpb246ICcnXG4gICAgICAvLyB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTItY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTItY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUzLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUzLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNC1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNC1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTUtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTUtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH1cbiAgICBdO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhQ29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIFRlc3RpbW9uaWFsQ29udHJvbGxlcigkc2NvcGUsIFRlc3RpbW9uaWFsU2VydmljZSwgJHN0YXRlLCAkbG9nKXtcbiAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSB0cnVlO1xuXG4gIFRlc3RpbW9uaWFsU2VydmljZS5nZXRUZXN0aW1vbmlhbHMoKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gZmFsc2U7XG4gICAgICAkc2NvcGUudGVzdGltb25pYWxzID0gZGF0YTtcbiAgICAgICRsb2cuZGVidWcoXCJUZXN0aW1vbmlhbHNcIiwgJHNjb3BlLnRlc3RpbW9uaWFscyk7XG4gICAgfSlcbiAgICAuZXJyb3IoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSBmYWxzZTtcbiAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHdlIGNvdWxkIG5vdCBsb2FkIHRlc3RpbW9uaWFscyBhdCB0aGlzIHRpbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG4gICAgfSk7XG4gICRzY29wZS5nb1RvU2luZ2xlID0gZnVuY3Rpb24oaWQpe1xuICAgJHN0YXRlLmdvKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge2lkOiBpZH0pO1xuICB9O1xuICAkc2NvcGUuYWRkVGVzdGltb25pYWwgPSBmdW5jdGlvbih0ZXN0aW1vbmlhbCl7XG4gICAgJHNjb3BlLmFkZGluZ1Rlc3RpbW9uaWFsID0gdHJ1ZTtcbiAgICB0ZXN0aW1vbmlhbC5kYXRlID0gbmV3IERhdGUoKTtcbiAgICBUZXN0aW1vbmlhbFNlcnZpY2UuYWRkVGVzdGltb25pYWwodGVzdGltb25pYWwpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAkc2NvcGUudGVzdGltb25pYWxBZGRlZCA9IHRydWU7XG4gICAgICAkc2NvcGUuYWRkZWRUZXN0aW1vbmlhbE1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCgkc2NvcGUsICRzdGF0ZVBhcmFtcywgVGVzdGltb25pYWxTZXJ2aWNlLCAkbG9nKXtcbiAgY29uc3QgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XG4gICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSB0cnVlO1xuICBUZXN0aW1vbmlhbFNlcnZpY2UuZ2V0U2luZ2xlVGVzdGltb25pYWwoaWQpXG4gICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS50ZXN0aW1vbmlhbCA9IGRhdGE7XG4gICAgICAkbG9nLmRlYnVnKFwiVGVzdGltb25pYWxcIiwgZGF0YSk7XG4gICAgfSlcbiAgICAuZXJyb3IoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IFwiV2UncmUgc29ycnkgd2UgY291bGQgbm90IGxvYWQgdGhpcyB0ZXN0aW1vbmlhbCBhdCB0aGlzIHRpbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIFRlc3RpbW9uaWFsQ29udHJvbGxlcixcbiAgVGVzdGltb25pYWxTaW5nbGVDdHJsXG59O1xuIiwiZnVuY3Rpb24gVXNlckNvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSwgJGxvZywgJHN0YXRlKXtcbiAgJHNjb3BlLmxvZ2luV2hvbGVzYWxlVXNlciA9IGZ1bmN0aW9uKHdob2xlc2FsZVVzZXIpe1xuICAgIFVzZXJTZXJ2aWNlLmxvZ2luKHdob2xlc2FsZVVzZXIpO1xuICB9O1xuICAkc2NvcGUuZWRpdFVzZXIgPSBmdW5jdGlvbih1c2VyKXtcbiAgICBVc2VyU2VydmljZS5fdXBkYXRlVXNlcih1c2VyLl9pZCwgdXNlcilcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnYnV5V2hvbGVzYWxlJyk7XG4gICAgICB9KTtcbiAgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IFVzZXJDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gV2hvbGVzYWxlQ29udHJvbGxlcigkc2NvcGUsIFVzZXJTZXJ2aWNlLCBDYXJ0U2VydmljZSwgJGxvZywgJGNvb2tpZXMsICRzdGF0ZSl7XG5cbiAgY29uc3RcbiAgICAgIGlkID0gJGNvb2tpZXMuZ2V0KCd1c2VySWQnKSxcbiAgICAgIHRva2VuID0gJGNvb2tpZXMuZ2V0KCd0b2tlbicpLFxuICAgICAgdXNlckl0ZW1zID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdpdGVtcycpO1xuXG4gIGlmIChpZCAmJiB0b2tlbikge1xuICAgIFVzZXJTZXJ2aWNlLl9nZXRVc2VyKGlkKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICRzY29wZS51c2VyRGF0YSA9IGRhdGE7XG4gICAgICAkbG9nLmRlYnVnKCdVc2VyIERhdGEnLCBkYXRhKTtcbiAgICB9KTtcbiAgICBpZiAoIXVzZXJJdGVtcykge1xuICAgICAgVXNlclNlcnZpY2UuZ2V0VXNlckluZm8oKVxuICAgICAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAgICRjb29raWVzLnB1dCgnaXRlbXMnLCBkYXRhLml0ZW1zKTtcbiAgICAgICAgJGxvZy5kZWJ1ZyhkYXRhLml0ZW1zKTtcbiAgICAgICAgJHNjb3BlLnVzZXJJdGVtcyA9IGRhdGEuaXRlbXM7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHNjb3BlLnVzZXJJdGVtcyA9IHVzZXJJdGVtcztcbiAgICB9XG4gICAgQ2FydFNlcnZpY2UuZ2V0SXRlbXMoKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJGxvZy5kZWJ1ZygnUmV0cmlldmVkIEl0ZW1zJywgZGF0YSk7XG4gICAgICAgICRzY29wZS51c2VySXRlbXMgPSBkYXRhLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRoaXNJdGVtID0gJHNjb3BlLnVzZXJJdGVtcy5maW5kKChpKSA9PiBpLml0ZW1JZCA9PT0gaXRlbS5faWQpO1xuICAgICAgICAgIHRoaXNJdGVtLnRpdGxlID0gaXRlbS50aXRsZTtcbiAgICAgICAgICByZXR1cm4gdGhpc0l0ZW07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgJGxvZy5kZWJ1ZyhcIlVzZXIgSXRlbXNcIiwgdXNlckl0ZW1zKTtcbiAgfSBlbHNlIHtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfVxuXG4gICRzY29wZS5lZGl0UHJvZmlsZSA9IGZ1bmN0aW9uKCl7XG4gICAgJHN0YXRlLmdvKCdidXlXaG9sZXNhbGUuZWRpdCcpO1xuICB9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdob2xlc2FsZUNvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBsb2FkaW5nKCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9sb2FkaW5nLmh0bWwnXG4gIH07XG59XG5leHBvcnQgZGVmYXVsdCBsb2FkaW5nO1xuIiwiaW1wb3J0IHtjb25maWcsIHJ1biwgcGF5cGFsLCBBUEl9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1haW5Db250cm9sbGVyLCBMZWZ0Q3RybCwgUmlnaHRDdHJsLCBEaWFsb2dDdHJsIH0gZnJvbSAnLi9jb250cm9sbGVycy9NYWluQ29udHJvbGxlcic7XG5pbXBvcnQgQnV5Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXInO1xuaW1wb3J0IE1lZGlhQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL01lZGlhQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9DYXJ0Q29udHJvbGxlcic7XG5pbXBvcnQgQ29udGFjdENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Db250YWN0Q29udHJvbGxlcic7XG5pbXBvcnQgVXNlckNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Vc2VyQ29udHJvbGxlcic7XG5pbXBvcnQgV2hvbGVzYWxlQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL1dob2xlc2FsZUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgVGVzdGltb25pYWxDb250cm9sbGVyLCBUZXN0aW1vbmlhbFNpbmdsZUN0cmwgfSBmcm9tICcuL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlcic7XG5pbXBvcnQgQ2FydFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9DYXJ0U2VydmljZSc7XG5pbXBvcnQgVGVzdGltb25pYWxTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvVGVzdGltb25pYWxTZXJ2aWNlJztcbmltcG9ydCBVc2VyU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4vZGlyZWN0aXZlcy9sb2FkaW5nJztcbmFuZ3VsYXJcbi5tb2R1bGUoJ2FwcCcsIFsndWkucm91dGVyJywgJ25nTWF0ZXJpYWwnLCAnamt1cmkuZ2FsbGVyeScgLCAnbmdDb29raWVzJ10pXG4uY29uZmlnKGNvbmZpZylcbi5jb25zdGFudCgnUEFZUEFMJywgcGF5cGFsKVxuLmNvbnN0YW50KCdBUEknLCBBUEkpXG4ucnVuKHJ1bilcbi5kaXJlY3RpdmUoJ215TG9hZGVyJywgW2xvYWRpbmddKVxuLmZhY3RvcnkoJ0NhcnRTZXJ2aWNlJywgQ2FydFNlcnZpY2UpXG4uZmFjdG9yeSgnVGVzdGltb25pYWxTZXJ2aWNlJywgVGVzdGltb25pYWxTZXJ2aWNlKVxuLmZhY3RvcnkoJ1VzZXJTZXJ2aWNlJywgVXNlclNlcnZpY2UpXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdMZWZ0Q3RybCcsIExlZnRDdHJsKVxuLmNvbnRyb2xsZXIoJ1JpZ2h0Q3RybCcsIFJpZ2h0Q3RybClcbi5jb250cm9sbGVyKCdEaWFsb2dDdHJsJywgRGlhbG9nQ3RybClcbi5jb250cm9sbGVyKCdCdXlDdHJsJywgQnV5Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdXaG9sZXNhbGVDb250cm9sbGVyJywgV2hvbGVzYWxlQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdNZWRpYUNvbnRyb2xsZXInLCBNZWRpYUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignQ2FydENvbnRyb2xsZXInLCBDYXJ0Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdVc2VyQ29udHJvbGxlcicsIFVzZXJDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0NvbnRhY3RDdHJsJywgQ29udGFjdENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignVGVzdGltb25pYWxDb250cm9sbGVyJywgVGVzdGltb25pYWxDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsU2luZ2xlQ3RybCcsIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCk7XG4iLCJsZXQgQ2FydFNlcnZpY2UgPSBmdW5jdGlvbigkY29va2llcywgJHN0YXRlLCAkcm9vdFNjb3BlLCAkaHR0cCwgJGxvZywgQVBJKXtcblxuICBjb25zdCBwYXlwYWwgPSBcImh0dHBzOi8vd3d3LnBheXBhbC5jb20vY2dpLWJpbi93ZWJzY3JcIjtcblxuICAvLyBpdGVtIGNvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gSXRlbShvcHRpb25zKXtcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZTtcbiAgICB0aGlzLnByaWNlID0gb3B0aW9ucy5wcmljZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gb3B0aW9ucy5xdWFudGl0eTtcbiAgICB0aGlzLnRvdGFsID0gZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAodGhpcy5xdWFudGl0eSAqIHRoaXMucHJpY2UpIHx8IDA7XG4gICAgfTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SXRlbXMoKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L2l0ZW1zYCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaW5nbGVJdGVtKGl0ZW0pe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vaXRlbXMvJHtpdGVtfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2FydCgpe1xuICAgIGxldCBjYXJ0TGlzdCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0TGlzdCB8fCBjYXJ0TGlzdC5sZW5ndGggPCAxKXtcbiAgICAgICRyb290U2NvcGUuaGFzQ2FydCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0SXRlbXMgPSBjYXJ0TGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGxldCBjYXJ0SXRlbSA9IG5ldyBJdGVtKGl0ZW0pO1xuICAgICAgcmV0dXJuIGNhcnRJdGVtO1xuICAgIH0pO1xuXG4gICAgdmFyIHBheXBhbEl0ZW1zID0gYWRkUGF5cGFsKGNhcnRJdGVtcyk7XG5cbiAgICB2YXIgY2FydCA9IHt9O1xuXG4gICAgY2FydC5pdGVtcyA9IHBheXBhbEl0ZW1zO1xuICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICB9LCAwKTtcblxuICAgIHJldHVybiBjYXJ0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FydChpdGVtKXtcbiAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSB0cnVlO1xuICAgIHZhciBjYXJ0ID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdjYXJ0Jyk7XG4gICAgaWYoIWNhcnQpe1xuICAgICAgY2FydCA9IFtdO1xuICAgIH1cblxuICAgIGxldCBhbHJlYWR5RXhpc3RzID0gXy5maW5kV2hlcmUoY2FydCwgaXRlbS50aXRsZSk7XG4gICAgaWYoYWxyZWFkeUV4aXN0cyl7XG4gICAgICBjYXJ0ID0gXy53aXRob3V0KGNhcnQsIGFscmVhZHlFeGlzdHMpO1xuICAgICAgYWxyZWFkeUV4aXN0cy5xdWFudGl0eSA9IGFscmVhZHlFeGlzdHMucXVhbnRpdHkgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgY2FydC5wdXNoKGFscmVhZHlFeGlzdHMpO1xuICAgIH1lbHNle1xuICAgICAgY2FydC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICAkY29va2llcy5wdXRPYmplY3QoJ2NhcnQnLCBjYXJ0KTtcbiAgICAkbG9nLmRlYnVnKFwiSXRlbSBhZGRlZCB0byBjYXJ0XCIsIGl0ZW0sIGNhcnQpO1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyNjYXJ0JykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKCdjYXJ0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYXJ0KGl0ZW1zKXtcbiAgICAkbG9nLmRlYnVnKCd1cGRhdGluZyBjYXJ0JywgaXRlbXMpO1xuXG4gICAgdmFyIGNhcnRJdGVtcyA9IGFkZFBheXBhbChpdGVtcyk7XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2hpcHBpbmdUaWVycygpe1xuICAgIGxldCBzaGlwcGluZyA9IHtcbiAgICAgIHRpZXIxOiB7XG4gICAgICAgIHF1YW50aXR5OiA1LFxuICAgICAgICBwcmljZTogNVxuICAgICAgfSxcbiAgICAgIHRpZXIyOiB7XG4gICAgICAgIHF1YW50aXR5OiAxMCxcbiAgICAgICAgcHJpY2U6IDEwXG4gICAgICB9LFxuICAgICAgdGllcjM6IHtcbiAgICAgICAgcXVhbnRpdHk6IDIwLFxuICAgICAgICBwcmljZTogMjBcbiAgICAgIH1cbiAgICB9O1xuICAgICRsb2cuZGVidWcoXCJTaGlwcGluZyBUaWVyc1wiLCBzaGlwcGluZyk7XG4gICAgcmV0dXJuIHNoaXBwaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlU2hpcHBpbmcoY2FydCwgdGllcnMpe1xuICAgIGNhcnQuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT57XG4gICAgaWYoaXRlbS5xdWFudGl0eSA+PSB0aWVycy50aWVyMS5xdWFudGl0eSAmJiBpdGVtLnF1YW50aXR5IDwgdGllcnMudGllcjIucXVhbnRpdHkpe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjEucHJpY2U7XG4gICAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID49IHRpZXJzLnRpZXIyLnF1YW50aXR5ICYmIGl0ZW0ucXVhbnRpdHkgPCB0aWVycy50aWVyMy5xdWFudGl0eSl7XG4gICAgICAgIGl0ZW0uc2hpcHBpbmcgPSB0aWVycy50aWVyMi5wcmljZTtcbiAgICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPiB0aWVycy50aWVyMy5xdWFudGl0eSApe1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjMucHJpY2U7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjYXJ0LnNoaXBwaW5nID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0uc2hpcHBpbmc7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcblxuICB9XG5cbiAgZnVuY3Rpb24gY2FydFdhdGNoKGNhcnQsIHNoaXBwaW5nKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KGNhcnQpKXtcblxuICAgICAgaWYoY2FydC5pdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgY2FydC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBzdWJ0b3RhbCArPSBpdGVtLnRvdGFsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYXJ0ID0gdXBkYXRlQ2FydChjYXJ0Lml0ZW1zKTtcbiAgICAgICAgY2FydC50b3RhbEl0ZW1zID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuXG4gICAgICBjYXJ0LnNoaXBwaW5nID0gIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHNoaXBwaW5nKTtcbiAgICAgIGNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgY2FydC50b3RhbCA9IChzdWJ0b3RhbCArIGNhcnQuc2hpcHBpbmcpLnRvRml4ZWQoMik7XG5cbiAgICAgICRsb2cuZGVidWcoXCJDYXJ0IGxvYWRlZCBvciB1cGRhdGVkXCIsIGNhcnQpO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUGF5cGFsKGNhcnRJdGVtcyl7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhcnRJdGVtcy5sZW5ndGg7IGkgKyspe1xuICAgICAgdmFyIGl0ZW1OdW1iZXIgPSAoaSArIDEpO1xuICAgICAgY2FydEl0ZW1zW2ldLnBheXBhbCA9IHtcbiAgICAgICAgaXRlbSA6IFwiaXRlbV9uYW1lX1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgYW1vdW50OiBcImFtb3VudF9cIisgaXRlbU51bWJlcixcbiAgICAgICAgcXVhbnRpdHk6IFwicXVhbnRpdHlfXCIgKyBpdGVtTnVtYmVyLFxuICAgICAgICBzaGlwcGluZyA6IFwic2hpcHBpbmdfXCIgKyBpdGVtTnVtYmVyXG4gICAgICB9O1xuICAgIH1cblxuICAgICRsb2cuZGVidWcoXCJhZGRpbmcgcGF5cGFsIGluZm9cIiwgY2FydEl0ZW1zKTtcbiAgICByZXR1cm4gY2FydEl0ZW1zO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRJdGVtcyxcbiAgICBnZXRTaW5nbGVJdGVtLFxuICAgIGdldENhcnQsXG4gICAgc2V0Q2FydCxcbiAgICB1cGRhdGVDYXJ0LFxuICAgIGdldFNoaXBwaW5nVGllcnMsXG4gICAgY2FsY3VsYXRlU2hpcHBpbmcsXG4gICAgY2FydFdhdGNoXG4gIH07XG5cblxufTtcblxuQ2FydFNlcnZpY2UuJGluamVjdCA9IFsnJGNvb2tpZXMnLCAnJHN0YXRlJywgJyRyb290U2NvcGUnLCAnJGh0dHAnLCAnJGxvZycsICdBUEknXTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FydFNlcnZpY2U7XG4iLCJsZXQgVGVzdGltb25pYWxTZXJ2aWNlID0gZnVuY3Rpb24oJGh0dHAsIEFQSSl7XG5cbiAgZnVuY3Rpb24gZ2V0VGVzdGltb25pYWxzKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNpbmdsZVRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsSWQpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzLyR7dGVzdGltb25pYWxJZH1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHNgLCB0ZXN0aW1vbmlhbCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFRlc3RpbW9uaWFscyxcbiAgICBnZXRTaW5nbGVUZXN0aW1vbmlhbCxcbiAgICBhZGRUZXN0aW1vbmlhbFxuICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IFRlc3RpbW9uaWFsU2VydmljZTtcbiIsImxldCBVc2VyU2VydmljZSA9IGZ1bmN0aW9uKCRodHRwLCBBUEksICRjb29raWVzLCAkc3RhdGUsICRyb290U2NvcGUsICRsb2cpe1xuXG4gIGZ1bmN0aW9uIGdldFVzZXJJbmZvKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS9tZWAsIEFQSS5DT05GSUcpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tVc2VyKCl7XG4gICAgY29uc3QgdG9rZW4gPSAkY29va2llcy5nZXQoJ3Rva2VuJyk7XG4gICAgaWYodG9rZW4pe1xuICAgICAgX3NldFRva2VuKHRva2VuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0VG9rZW4odG9rZW4pe1xuICAgIGlmKHRva2VuKXtcbiAgICAgIEFQSS5DT05GSUcuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXSA9IHRva2VuO1xuICAgICAgJHJvb3RTY29wZS5pc1VzZXJMb2dnZWRJbiA9IHRydWU7XG4gICAgfWVsc2V7XG4gICAgICAkcm9vdFNjb3BlLmlzVXNlckxvZ2dlZEluID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2hvbGVzYWxlUmVxdWVzdChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vY29udGFjdC93aG9sZXNhbGVgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWN0KGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS9jb250YWN0YCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9naW4odXNlcil7XG4gICAgJGh0dHAucG9zdChgJHtBUEkuVVJMfS9hdXRoZW50aWNhdGVgLCB1c2VyKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgX3N1Y2Nlc3NMb2coZGF0YSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWNjZXNzTG9nKGRhdGEpe1xuICAgICRjb29raWVzLnB1dCgndG9rZW4nLCBkYXRhLnRva2VuKTtcbiAgICAkY29va2llcy5wdXQoJ3VzZXJJZCcsIGRhdGEuaWQpO1xuICAgIF9zZXRUb2tlbihkYXRhLnRva2VuKTtcbiAgICBnZXRVc2VySW5mbygpXG4gICAgICAuc3VjY2VzcygodXNlckRhdGEpID0+e1xuICAgICAgICAkbG9nLmRlYnVnKCdVc2VyIGRhdGEnLCB1c2VyRGF0YSk7XG4gICAgICAgICRjb29raWVzLnB1dE9iamVjdCgnaXRlbXMnLCB1c2VyRGF0YS5pdGVtcyk7XG4gICAgICAgICRjb29raWVzLnB1dCgndXNlcm5hbWUnLCB1c2VyRGF0YS51c2VybmFtZSk7XG4gICAgICB9KTtcbiAgICAkc3RhdGUuZ28oJ2J1eVdob2xlc2FsZScpO1xuICAgICRsb2cuZGVidWcoJ0xvZ2dlZCBpbiEnLCBkYXRhKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF91cGRhdGVVc2VyKHVzZXJJZCwgdXNlcil7XG4gICAgcmV0dXJuICRodHRwLnB1dChgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gLCB1c2VyLCBBUEkuQ09ORklHKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ091dCgpe1xuICAgICRjb29raWVzLnJlbW92ZSgndG9rZW4nKTtcbiAgICBfc2V0VG9rZW4oKTtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9nZXRVc2VyKHVzZXJJZCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gLCBBUEkuQ09ORklHKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcmdvdFBhc3N3b3JkKGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS9mb3Jnb3RQYXNzd29yZGAsIGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVVc2VyKHVzZXJJZCl7XG4gICAgcmV0dXJuICRodHRwLmRlbGV0ZShgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gKTtcbiAgfVxuXG4gIHJldHVybntcbiAgICBjaGVja1VzZXIsXG4gICAgd2hvbGVzYWxlUmVxdWVzdCxcbiAgICBjb250YWN0LFxuICAgIGxvZ2luLFxuICAgIGxvZ091dCxcbiAgICBfdXBkYXRlVXNlcixcbiAgICBfZ2V0VXNlcixcbiAgICBfZGVsZXRlVXNlcixcbiAgICBmb3Jnb3RQYXNzd29yZCxcbiAgICBnZXRVc2VySW5mb1xuXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyU2VydmljZTtcbiJdfQ==
