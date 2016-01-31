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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state, $mdDialog, CartService, $rootScope) {
  $(".dropdown-button").dropdown();
  $rootScope.shippingTiers = CartService.getShippingTiers();
  $scope.openMenu = function ($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

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
  $scope.logOut = function () {
    UserService.logOut();
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
    var token = $cookies.get('token'),
        username = $cookies.get('username');
    if (token && username) {
      _setToken(token, username);
    }
  }

  function _setToken(token, username) {
    if (token && username) {
      API.CONFIG.headers['x-access-token'] = token;
      $rootScope.isUserLoggedIn = true;
      $rootScope.username = username;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9jb250cm9sbGVycy9Vc2VyQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9jb250cm9sbGVycy9XaG9sZXNhbGVDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2RpcmVjdGl2ZXMvbG9hZGluZy5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZS5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsU0FBUyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRTtBQUNwRixjQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVoQyxvQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWxDLGdCQUFjLENBQ1gsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNiLE9BQUcsRUFBRSxHQUFHO0FBQ1IsZUFBVyxFQUFFLDRCQUE0QjtBQUN6QyxjQUFVLEVBQUUsZ0JBQWdCO0dBQzdCLENBQUMsQ0FDRCxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ1osT0FBRyxFQUFFLE1BQU07QUFDWCxlQUFXLEVBQUUsMkJBQTJCO0FBQ3hDLGNBQVUsRUFBRSxTQUFTO0dBQ3RCLENBQUMsQ0FDRCxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ2QsT0FBRyxFQUFFLFFBQVE7QUFDYixlQUFXLEVBQUUsNkJBQTZCO0FBQzFDLGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDckIsT0FBRyxFQUFFLGVBQWU7QUFDcEIsZUFBVyxFQUFFLG9DQUFvQztBQUNqRCxjQUFVLEVBQUUsdUJBQXVCO0dBQ3BDLENBQUMsQ0FDRCxLQUFLLENBQUMsa0JBQWtCLEVBQUU7QUFDekIsT0FBRyxFQUFFLE1BQU07QUFDWCxlQUFXLEVBQUUsd0NBQXdDO0FBQ3JELGNBQVUsRUFBRSx1QkFBdUI7R0FDcEMsQ0FBQyxDQUNELEtBQUssQ0FBQyxxQkFBcUIsRUFBRTtBQUM1QixPQUFHLEVBQUUsTUFB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QztHQUM1RDs7QUFFRCxXQUFTLGNBQWMsQ0FBQyxLQUFLLEVBQUM7QUFDNUIsV0FBTyxLQUFLLENBQUMsSUFBSSxDQUFJLEdBQUcsQ0FBQyxHQUFHLHNCQUFtQixLQUFLLENBQUMsQ0FBQztHQUN2RDs7QUFFRCxXQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUM7QUFDMUIsV0FBTyxLQUFLLFVBQU8sQ0FBSSxHQUFHLENBQUMsR0FBRyxlQUFVLE1BQU0sQ0FBRyxDQUFDO0dBQ25EOztBQUVELFNBQU07QUFDSixhQUFTLEVBQVQsU0FBUztBQUNULG9CQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsV0FBTyxFQUFQLE9BQU87QUFDUCxTQUFLLEVBQUwsS0FBSztBQUNMLFVBQU0sRUFBTixNQUFNO0FBQ04sZUFBVyxFQUFYLFdBQVc7QUFDWCxZQUFRLEVBQVIsUUFBUTtBQUNSLGVBQVcsRUFBWCxXQUFXO0FBQ1gsa0JBQWMsRUFBZCxjQUFjO0FBQ2QsZUFBVyxFQUFYLFdBQVc7O0dBRVosQ0FBQztDQUNILENBQUM7O3FCQUVhLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJGxvZ1Byb3ZpZGVyKSB7XG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5Jywge1xuICAgICAgdXJsOiAnL2J1eScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0J1eUN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzLmFkZCcsIHtcbiAgICAgIHVybDogJy9hZGQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLmFkZC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge1xuICAgICAgdXJsOiAnLzppZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMuc2luZ2xlLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwcmljaW5nJywge1xuICAgICAgdXJsOiAnL3ByaWNpbmcnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvcHJpY2luZy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2Rlc2lnbicsIHtcbiAgICAgIHVybDogJy9kZXNpZ24nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZGVzaWduLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY2FydCcsIHtcbiAgICAgIHVybDogJy9jYXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NhcnQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NhcnRDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3dob2xlc2FsZVJlcXVlc3QnLCB7XG4gICAgICB1cmw6ICcvd2hvbGVzYWxlUmVxdWVzdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93aG9sZXNhbGVSZXF1ZXN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5V2hvbGVzYWxlJywge1xuICAgICAgdXJsOiAnL2J1eVdob2xlc2FsZScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXlXaG9sZXNhbGUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1dob2xlc2FsZUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2J1eVdob2xlc2FsZS5lZGl0Jywge1xuICAgICAgdXJsOiAnL2VkaXRQcm9maWxlJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2VkaXQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1VzZXJDb250cm9sbGVyJ1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHJ1bihDYXJ0U2VydmljZSwgVXNlclNlcnZpY2UsICRyb290U2NvcGUpe1xuICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgVXNlclNlcnZpY2UuY2hlY2tVc2VyKCk7XG4gICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9KTtcbn1cblxuY29uc3QgcGF5cGFsID0ge1xuICAgICAgdXNlcm5hbWU6ICdhaW5lcy5rZXZpbl9hcGkxLmdtYWlsLmNvbScsXG4gICAgICBwYXNzd29yZDogJ1Q2WDlEUjJCNzdCUTRZV0snLFxuICAgICAgY3JlZGVudGlhbDogJ0FQSSBTaWduYXR1cmUnLFxuICAgICAgc2lnbmF0dXJlOiAnQUZjV3hWMjFDN2ZkMHYzYllZWVJDcFNTUmwzMUEyRUVoQXpXemx4cS1FekVRdG9aTXFTY1I2eEknXG59O1xuXG5jb25zdCBBUEkgPSB7XG4gIFVSTDogJ2h0dHA6Ly9hZG1pbi5wcm9sb3dwdXR0aW5nLmNvbS9hcGknLFxuICBDT05GSUc6IHtcbiAgICBoZWFkZXJzOntcblxuICAgIH1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIHBheXBhbCxcbiAgY29uZmlnLFxuICBydW4sXG4gIEFQSVxufTtcbiIsImZ1bmN0aW9uIEJ1eUNvbnRyb2xsZXIoJHNjb3BlLCAkY29va2llcywgJHN0YXRlLCBDYXJ0U2VydmljZSwgJGxvZyl7XG5cbiAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gIENhcnRTZXJ2aWNlLmdldEl0ZW1zKClcbiAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgJGxvZy5kZWJ1ZygnaXRlbXMnLCBkYXRhKTtcbiAgICAgIGNvbnN0IGl0ZW1EYXRhID0gZGF0YS5tYXAoKGkpID0+IHtcbiAgICAgICAgaS5wcmljZSA9IGkuYmFzZVByaWNlO1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH0pO1xuXG4gICAgICAkc2NvcGUuaXRlbXMgPSBpdGVtRGF0YTtcbiAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSlcbiAgICAuZXJyb3IoKCkgPT4ge1xuICAgICAgJHNjb3BlLml0ZW1zID0gW1xuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwiVGhlIFBybyBMb3cgUHV0dGluZyBTeXN0ZW1cIixcbiAgICAgICAgICBiYXNlUHJpY2U6IDM5Ljk1LFxuICAgICAgICAgIHByaWNlOiAzOS45NSxcbiAgICAgICAgICBwcmljaW5nVGllcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgICAgICBxdWFudGl0eTogNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgICAgICBxdWFudGl0eTogMTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByaWNlOiAzOS45NSxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IDE1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdO1xuICAgICAgJGxvZy5lcnJvcignRXJyb3IgbG9hZGluZyBpdGVtcywgZGVmYXVsdGluZyB0byBpdGVtIGRlZmF1bHRzJywgJHNjb3BlLml0ZW1zKTtcbiAgICB9KTtcblxuXG4gICRzY29wZS5jaGVja1F1YW50aXR5ID0gZnVuY3Rpb24oaXRlbSkge1xuXG4gICAgaWYoaXRlbS5xdWFudGl0eSA+IGl0ZW0ucHJpY2luZ1RpZXJzWzBdLnF1YW50aXR5KXtcbiAgICAgIGl0ZW0ucHJpY2UgPSBpdGVtLnByaWNpbmdUaWVyc1swXS5wcmljZTtcbiAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID49IGl0ZW0ucHJpY2luZ1RpZXJzWzFdLnF1YW50aXR5ICYmIHF1YW50aXR5IDwgaXRlbS5wcmljaW5nVGllcnNbMl0ucXVhbnRpdHkpe1xuICAgICAgaXRlbS5wcmljZSA9IGl0ZW0ucHJpY2luZ1RpZXJzWzFdLnByaWNlO1xuICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPiBpdGVtLnByaWNpbmdUaWVyc1syXS5xdWFudGl0eSl7XG4gICAgICBpdGVtLnByaWNlID0gaXRlbS5wcmljaW5nVGllcnNbMl0ucHJpY2U7XG4gICAgfVxuXG4gIH07XG5cblxuICAkc2NvcGUuYWRkVG9DYXJ0ID0gZnVuY3Rpb24oaXRlbSwgcHJpY2Upe1xuICAgIENhcnRTZXJ2aWNlLnNldENhcnQoaXRlbSwgcHJpY2UpO1xuICB9O1xuXG59XG5leHBvcnQgZGVmYXVsdCBCdXlDb250cm9sbGVyO1xuIiwibGV0IENhcnRDb250cm9sbGVyID0gZnVuY3Rpb24oJHNjb3BlLCBDYXJ0U2VydmljZSwgJHJvb3RTY29wZSwgJGxvZyl7XG5cbiAgLy8gJHNjb3BlLnNoaXBwaW5nVGllcnMgPSBDYXJ0U2VydmljZS5nZXRTaGlwcGluZ1RpZXJzKCk7XG5cblxuXG4vLyAkc2NvcGUuJHdhdGNoKCdjYXJ0JywgQ2FydFNlcnZpY2UuY2FydFdhdGNoKCRyb290U2NvcGUuY2FydCwgJHNjb3BlLnNoaXBwaW5nVGllcnMpICx0cnVlKTtcblxuXG4gICRzY29wZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24oaXRlbSl7XG4gICAkbG9nLmRlYnVnKFwiUmVtb3ZpbmcgSXRlbVwiLCBpdGVtKTtcblxuICAgJHNjb3BlLmNhcnQuaXRlbXMgPSAgXy53aXRob3V0KCRzY29wZS5jYXJ0Lml0ZW1zLCBpdGVtKTtcbiAgIENhcnRTZXJ2aWNlLnVwZGF0ZUNhcnQoJHNjb3BlLmNhcnQuaXRlbXMpO1xuICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9O1xuXG4gICRzY29wZS5jaGVja291dCA9IGZ1bmN0aW9uKGNhcnQpe1xuICAgIENhcnRTZXJ2aWNlLmNoZWNrb3V0KGNhcnQpO1xuICB9O1xuXG5cblxufTtcblxuQ2FydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ0NhcnRTZXJ2aWNlJywgJyRyb290U2NvcGUnLCAnJGxvZyddO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJ0Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIENvbnRhY3RDb250cm9sbGVyKCRzY29wZSwgVXNlclNlcnZpY2Upe1xuXG4gICRzY29wZS5jb250YWN0VXMgPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgY29uc3QgbWVzc2FnZSA9IGA8cD4ke2Zvcm0ubWVzc2FnZX08L3A+XFxcbiAgICA8cD4ke2Zvcm0uZmlyc3ROYW1lfSAke2Zvcm0ubGFzdE5hbWV9PC9wPlxcXG4gICAgPHA+JHtmb3JtLnBob25lfTwvcD5cXFxuICAgIDxwPiR7Zm9ybS5lbWFpbH08L3A+YDtcbiAgICBjb25zdCBlbWFpbCA9IHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgZnJvbTogJ25vcmVwbHlAUHJvTG93UHV0dGluZy5jb20nLFxuICAgICAgZnJvbU5hbWU6ICdQcm9Mb3cgUHV0dGluZycsXG4gICAgICBzdWJqZWN0OiBcIkEgY3VzdG9tZXIgaXMgdHJ5aW5nIHRvIGNvbnRhY3QgeW91XCJcbiAgICB9O1xuXG4gICAgVXNlclNlcnZpY2UuY29udGFjdChlbWFpbClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSlcbiAgICAgIC5lcnJvcigoZGF0YSkgPT4ge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5zdGF0ZXMgPSAoJ0FMIEFLIEFaIEFSIENBIENPIENUIERFIEZMIEdBIEhJIElEIElMIElOIElBIEtTIEtZIExBIE1FIE1EIE1BIE1JIE1OIE1TICcgK1xuICAgICAgICAgICAgJ01PIE1UIE5FIE5WIE5IIE5KIE5NIE5ZIE5DIE5EIE9IIE9LIE9SIFBBIFJJIFNDIFNEIFROIFRYIFVUIFZUIFZBIFdBIFdWIFdJICcgK1xuICAgICAgICAgICAgJ1dZJykuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiB7IGFiYnJldjogc3RhdGUgfTsgfSk7XG5cbiAgJHNjb3BlLndob2xlc2FsZVJlcXVlc3QgPSBmdW5jdGlvbihyZXF1ZXN0KXtcbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgIGNvbnN0IG1lc3NhZ2U9IGA8cD5Zb3UgaGF2ZSBhIG5ldyBXaG9sZXNhbGUgQ3VzdG9tZXIgcmVxdWVzdCBmcm9tIFByb0xvd1B1dHRpbmcuY29tISBcXFxuICAgIFNlZSBiZWxvdyBmb3IgZGV0YWlsczwvcD4gXFxcbiAgICA8cD5TdG9yZTogJHtyZXF1ZXN0LnN0b3JlfTwvcD5cXFxuICAgIDxwPiR7cmVxdWVzdC5jaXR5fSwgJHtyZXF1ZXN0LnN0YXRlfSAke3JlcXVlc3QuemlwfTwvcD5cXFxuICAgIDxwPjxzdHJvbmc+Q29udGFjdCBJbmZvOjwvc3Ryb25nPjwvcD5cXFxuICAgIDxwPjxzdHJvbmc+TmFtZTo8L3N0cm9uZz4gJHtyZXF1ZXN0LmZpcnN0TmFtZX0gJHtyZXF1ZXN0Lmxhc3ROYW1lfTwvcD5cXFxuICAgIDxwPjxzdHJvbmc+UGhvbmU6PC9zdHJvbmc+ICR7cmVxdWVzdC5waG9uZX08L3A+XFxcbiAgICA8cD48c3Ryb25nPkVtYWlsOjwvc3Ryb25nPiAke3JlcXVlc3QuZW1haWx9PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5BZGRpdGlvbmFsIEluZm86PC9zdHJvbmc+ICR7cmVxdWVzdC5tZXNzYWdlfTwvcD5cXFxuICAgIDxwPlRvIGFwcHJvdmUgdGhpcyB1c2UgeW91IG11c3QgbG9nIGluIHRvIGFkbWluLnByb2xvd3B1dHRpbmcuY29tIGFuZCBjcmVhdGUgYSB3aG9sZXNhbGUgdXNlciBwcm9maWxlIGZvciB0aGlzIHVzZXJcXFxuICAgIG9uY2UgdGhlIGFjY291bnQgaXMgY3JlYXRlZCB0aGV5IHdpbGwgYmUgbm90aWZpZWQgdmlhIGVtYWlsIHdpdGggdGhlaXIgY3JlZGVudGlhbHMuYDtcblxuICAgIGNvbnN0IGVtYWlsID0ge1xuICAgICAgbWVzc2FnZSxcbiAgICAgIGJvZHk6IG1lc3NhZ2VcbiAgICB9O1xuXG4gICAgVXNlclNlcnZpY2Uud2hvbGVzYWxlUmVxdWVzdChlbWFpbClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJZb3UncmUgcmVxdWVzdCBoYXMgYmVlbiBzZW50ISBPbmNlIGFwcHJvdmVkIHlvdSB3aWxsIGJlIG5vdGlmaWVkIHZpYSBlbWFpbCFcIjtcbiAgICAgIH0pXG4gICAgICAuZXJyb3IoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHRoZXJlIHdhcyBhIHByb2JsZW0gZXhlY3V0aW5nIHlvdXIgcmVxdWVzdCEgUGxlYXNlIHRyeSBhZ2FpbiBsYXRlciFcIjtcbiAgICAgIH0pO1xuICB9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlLCAkbWREaWFsb2csIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcbiAgJChcIi5kcm9wZG93bi1idXR0b25cIikuZHJvcGRvd24oKTtcbiAgJHJvb3RTY29wZS5zaGlwcGluZ1RpZXJzID0gQ2FydFNlcnZpY2UuZ2V0U2hpcHBpbmdUaWVycygpO1xuJHNjb3BlLm9wZW5NZW51ID0gZnVuY3Rpb24oJG1kT3Blbk1lbnUsIGV2KSB7XG4gICAgJG1kT3Blbk1lbnUoZXYpO1xuICB9O1xuXG4gJHNjb3BlLiR3YXRjaCgnY2FydCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoIV8uaXNFbXB0eSgkcm9vdFNjb3BlLmNhcnQpKXtcblxuICAgICAgaWYoJHNjb3BlLmNhcnQuaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICRzY29wZS5jYXJ0Lml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHN1YnRvdGFsICs9IGl0ZW0udG90YWwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNhcnQuaXRlbXMgPSBDYXJ0U2VydmljZS51cGRhdGVDYXJ0KCRzY29wZS5jYXJ0Lml0ZW1zKTtcblxuICAgICAgICAkc2NvcGUuY2FydC50b3RhbEl0ZW1zID0gJHNjb3BlLmNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgICB9LCAwKTtcblxuICAgICAgfVxuICAgICAgICAkc2NvcGUuY2FydCA9IENhcnRTZXJ2aWNlLmNhbGN1bGF0ZVNoaXBwaW5nKCRzY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycyk7XG4gICAgICAgICRzY29wZS5jYXJ0LnN1YnRvdGFsID0gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgICAgICAgJHNjb3BlLmNhcnQudG90YWwgPSAoc3VidG90YWwgKyAkc2NvcGUuY2FydC5zaGlwcGluZykudG9GaXhlZCgyKTtcblxuICAgICAgICAkbG9nLmRlYnVnKFwiQ2FydCBsb2FkZWQgb3IgdXBkYXRlZFwiLCAkc2NvcGUuY2FydCk7XG4gICAgfVxuXG4gIH0sIHRydWUpO1xuXG5cbiAgLy8gbmF2IHRvZ2dsZXNcbiAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBidWlsZFRvZ2dsZXIoJ2xlZnQnKTtcbiAgJHNjb3BlLnRvZ2dsZVJpZ2h0ID0gYnVpbGRUb2dnbGVyKCdyaWdodCcpO1xuICBsZXQgJGxlZnQgPSAkKCcubWQtc2lkZW5hdi1sZWZ0Jyk7XG4gIGxldCAkcmlnaHQgPSAkKCcubWQtc2lkZW5hdi1yaWdodCcpO1xuXG4gIC8vIGxpc3QgaXRlbSBjbGljayBldmVudFxuICAvLyAkKCdtZC1saXN0LWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAvLyAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyAgICQodGhpcykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkVG9nZ2xlcihuYXZJRCkge1xuICAgIGxldCBkZWJvdW5jZUZuID0gICRtZFV0aWwuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICRtZFNpZGVuYXYobmF2SUQpLnRvZ2dsZSgpO1xuICAgICAgfSwzMDApO1xuICAgIHJldHVybiBkZWJvdW5jZUZuO1xuICB9XG5cblxuICAvLyBOYXZpZ2F0ZSBmdW5jdGlvblxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHN0YXRlLCBuYXYpe1xuICAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICQoJyMnKyBzdGF0ZSkuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJHN0YXRlLmdvKHN0YXRlKS50aGVuKCgpID0+IHtcbiAgICBpZiAobmF2ID09IFwibGVmdFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgICBpZighJHJpZ2h0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgfWVsc2UgaWYobmF2ID09IFwicmlnaHRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICAgIGlmKCEkbGVmdC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgfX0pO1xuXG4gIH07XG5cbiAgJHNjb3BlLnNob3dXYXJyYW50eSA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgJG1kRGlhbG9nLnNob3coe1xuICAgICAgY29udHJvbGxlcjogRGlhbG9nQ3RybCxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3dhcnJhbnR5LnRwbC5odG1sJyxcbiAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcbiAgJHNjb3BlLnNob3dTaGlwcGluZyA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgJG1kRGlhbG9nLnNob3coe1xuICAgICAgY29udHJvbGxlcjogRGlhbG9nQ3RybCxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3NoaXBwaW5nLnRwbC5odG1sJyxcbiAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUuY29udGFjdFVzID0gZnVuY3Rpb24oY29udGFjdCl7XG5cbiAgfTtcbn1cblxuXG5mdW5jdGlvbiBSaWdodEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ3JpZ2h0JykuY2xvc2UoKTtcbiAgfTtcblxuXG59XG5mdW5jdGlvbiBMZWZ0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XG4gIH07XG5cbn1cblxuZnVuY3Rpb24gRGlhbG9nQ3RybCgkc2NvcGUsICRtZERpYWxvZyl7XG4gICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAkbWREaWFsb2cuY2FuY2VsKCk7XG4gIH07XG5cbiAgJHNjb3BlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAkbWREaWFsb2cuaGlkZSgpO1xuICB9O1xufVxuXG5leHBvcnQge1xuICBNYWluQ29udHJvbGxlcixcbiAgUmlnaHRDdHJsLFxuICBMZWZ0Q3RybCxcbiAgRGlhbG9nQ3RybFxufTtcbiIsImZ1bmN0aW9uIE1lZGlhQ29udHJvbGxlcigkc2NvcGUpe1xuXG4gICAgJHNjb3BlLnRlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgY29uc29sZS5sb2coJ3dvcmtlZCcpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvY2xvc2V1cDEtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2Nsb3NldXAxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMva2V2aW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2tldmluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4zLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgIC8vICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluMy1jb21wcmVzc29yLmpwZycsXG4gICAgICAvLyAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgLy8gfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTEtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUyLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUyLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMy1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTQtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTQtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU1LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU1LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9XG4gICAgXTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBNZWRpYUNvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBUZXN0aW1vbmlhbENvbnRyb2xsZXIoJHNjb3BlLCBUZXN0aW1vbmlhbFNlcnZpY2UsICRzdGF0ZSwgJGxvZyl7XG4gICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gdHJ1ZTtcblxuICBUZXN0aW1vbmlhbFNlcnZpY2UuZ2V0VGVzdGltb25pYWxzKClcbiAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFscyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLnRlc3RpbW9uaWFscyA9IGRhdGE7XG4gICAgICAkbG9nLmRlYnVnKFwiVGVzdGltb25pYWxzXCIsICRzY29wZS50ZXN0aW1vbmlhbHMpO1xuICAgIH0pXG4gICAgLmVycm9yKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gXCJXZSdyZSBzb3JyeSB3ZSBjb3VsZCBub3QgbG9hZCB0ZXN0aW1vbmlhbHMgYXQgdGhpcyB0aW1lLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiO1xuICAgIH0pO1xuICAkc2NvcGUuZ29Ub1NpbmdsZSA9IGZ1bmN0aW9uKGlkKXtcbiAgICRzdGF0ZS5nbygndGVzdGltb25pYWxzLnNpbmdsZScsIHtpZDogaWR9KTtcbiAgfTtcbiAgJHNjb3BlLmFkZFRlc3RpbW9uaWFsID0gZnVuY3Rpb24odGVzdGltb25pYWwpe1xuICAgICRzY29wZS5hZGRpbmdUZXN0aW1vbmlhbCA9IHRydWU7XG4gICAgdGVzdGltb25pYWwuZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgVGVzdGltb25pYWxTZXJ2aWNlLmFkZFRlc3RpbW9uaWFsKHRlc3RpbW9uaWFsKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLnRlc3RpbW9uaWFsQWRkZWQgPSB0cnVlO1xuICAgICAgJHNjb3BlLmFkZGVkVGVzdGltb25pYWxNZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBUZXN0aW1vbmlhbFNpbmdsZUN0cmwoJHNjb3BlLCAkc3RhdGVQYXJhbXMsIFRlc3RpbW9uaWFsU2VydmljZSwgJGxvZyl7XG4gIGNvbnN0IGlkID0gJHN0YXRlUGFyYW1zLmlkO1xuICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFsID0gdHJ1ZTtcbiAgVGVzdGltb25pYWxTZXJ2aWNlLmdldFNpbmdsZVRlc3RpbW9uaWFsKGlkKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAkc2NvcGUubG9hZGluZ1Rlc3RpbW9uaWFsID0gZmFsc2U7XG4gICAgICAkc2NvcGUudGVzdGltb25pYWwgPSBkYXRhO1xuICAgICAgJGxvZy5kZWJ1ZyhcIlRlc3RpbW9uaWFsXCIsIGRhdGEpO1xuICAgIH0pXG4gICAgLmVycm9yKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHdlIGNvdWxkIG5vdCBsb2FkIHRoaXMgdGVzdGltb25pYWwgYXQgdGhpcyB0aW1lLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiO1xuICAgIH0pO1xufVxuXG5leHBvcnQge1xuICBUZXN0aW1vbmlhbENvbnRyb2xsZXIsXG4gIFRlc3RpbW9uaWFsU2luZ2xlQ3RybFxufTtcbiIsImZ1bmN0aW9uIFVzZXJDb250cm9sbGVyKCRzY29wZSwgVXNlclNlcnZpY2UsICRsb2csICRzdGF0ZSl7XG4gICRzY29wZS5sb2dpbldob2xlc2FsZVVzZXIgPSBmdW5jdGlvbih3aG9sZXNhbGVVc2VyKSB7XG4gICAgVXNlclNlcnZpY2UubG9naW4od2hvbGVzYWxlVXNlcik7XG4gIH07XG4gICRzY29wZS5lZGl0VXNlciA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBVc2VyU2VydmljZS5fdXBkYXRlVXNlcih1c2VyLl9pZCwgdXNlcilcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnYnV5V2hvbGVzYWxlJyk7XG4gICAgICB9KTtcbiAgfTtcbiAgJHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCkge1xuICAgIFVzZXJTZXJ2aWNlLmxvZ091dCgpO1xuICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgVXNlckNvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBXaG9sZXNhbGVDb250cm9sbGVyKCRzY29wZSwgVXNlclNlcnZpY2UsIENhcnRTZXJ2aWNlLCAkbG9nLCAkY29va2llcywgJHN0YXRlKXtcblxuICBjb25zdFxuICAgICAgaWQgPSAkY29va2llcy5nZXQoJ3VzZXJJZCcpLFxuICAgICAgdG9rZW4gPSAkY29va2llcy5nZXQoJ3Rva2VuJyksXG4gICAgICB1c2VySXRlbXMgPSAkY29va2llcy5nZXRPYmplY3QoJ2l0ZW1zJyk7XG5cbiAgaWYgKGlkICYmIHRva2VuKSB7XG4gICAgVXNlclNlcnZpY2UuX2dldFVzZXIoaWQpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT4ge1xuICAgICAgJHNjb3BlLnVzZXJEYXRhID0gZGF0YTtcbiAgICAgICRsb2cuZGVidWcoJ1VzZXIgRGF0YScsIGRhdGEpO1xuICAgIH0pO1xuICAgIGlmICghdXNlckl0ZW1zKSB7XG4gICAgICBVc2VyU2VydmljZS5nZXRVc2VySW5mbygpXG4gICAgICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAgICAgJGNvb2tpZXMucHV0KCdpdGVtcycsIGRhdGEuaXRlbXMpO1xuICAgICAgICAkbG9nLmRlYnVnKGRhdGEuaXRlbXMpO1xuICAgICAgICAkc2NvcGUudXNlckl0ZW1zID0gZGF0YS5pdGVtcztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkc2NvcGUudXNlckl0ZW1zID0gdXNlckl0ZW1zO1xuICAgIH1cbiAgICBDYXJ0U2VydmljZS5nZXRJdGVtcygpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT4ge1xuICAgICAgICAkbG9nLmRlYnVnKCdSZXRyaWV2ZWQgSXRlbXMnLCBkYXRhKTtcbiAgICAgICAgJHNjb3BlLnVzZXJJdGVtcyA9IGRhdGEubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGhpc0l0ZW0gPSAkc2NvcGUudXNlckl0ZW1zLmZpbmQoKGkpID0+IGkuaXRlbUlkID09PSBpdGVtLl9pZCk7XG4gICAgICAgICAgdGhpc0l0ZW0udGl0bGUgPSBpdGVtLnRpdGxlO1xuICAgICAgICAgIHJldHVybiB0aGlzSXRlbTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAkbG9nLmRlYnVnKFwiVXNlciBJdGVtc1wiLCB1c2VySXRlbXMpO1xuICB9IGVsc2Uge1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9XG5cbiAgJHNjb3BlLmVkaXRQcm9maWxlID0gZnVuY3Rpb24oKXtcbiAgICAkc3RhdGUuZ28oJ2J1eVdob2xlc2FsZS5lZGl0Jyk7XG4gIH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2hvbGVzYWxlQ29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIGxvYWRpbmcoKXtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2xvYWRpbmcuaHRtbCdcbiAgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IGxvYWRpbmc7XG4iLCJpbXBvcnQge2NvbmZpZywgcnVuLCBwYXlwYWwsIEFQSX0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIsIExlZnRDdHJsLCBSaWdodEN0cmwsIERpYWxvZ0N0cmwgfSBmcm9tICcuL2NvbnRyb2xsZXJzL01haW5Db250cm9sbGVyJztcbmltcG9ydCBCdXlDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQnV5Q29udHJvbGxlcic7XG5pbXBvcnQgTWVkaWFDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyJztcbmltcG9ydCBDYXJ0Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0NhcnRDb250cm9sbGVyJztcbmltcG9ydCBDb250YWN0Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0NvbnRhY3RDb250cm9sbGVyJztcbmltcG9ydCBVc2VyQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL1VzZXJDb250cm9sbGVyJztcbmltcG9ydCBXaG9sZXNhbGVDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvV2hvbGVzYWxlQ29udHJvbGxlcic7XG5pbXBvcnQgeyBUZXN0aW1vbmlhbENvbnRyb2xsZXIsIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvVGVzdGltb25pYWxDb250cm9sbGVyJztcbmltcG9ydCBDYXJ0U2VydmljZSBmcm9tICcuL3NlcnZpY2VzL0NhcnRTZXJ2aWNlJztcbmltcG9ydCBUZXN0aW1vbmlhbFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9UZXN0aW1vbmlhbFNlcnZpY2UnO1xuaW1wb3J0IFVzZXJTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvVXNlclNlcnZpY2UnO1xuaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi9kaXJlY3RpdmVzL2xvYWRpbmcnO1xuYW5ndWxhclxuLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICdqa3VyaS5nYWxsZXJ5JyAsICduZ0Nvb2tpZXMnXSlcbi5jb25maWcoY29uZmlnKVxuLmNvbnN0YW50KCdQQVlQQUwnLCBwYXlwYWwpXG4uY29uc3RhbnQoJ0FQSScsIEFQSSlcbi5ydW4ocnVuKVxuLmRpcmVjdGl2ZSgnbXlMb2FkZXInLCBbbG9hZGluZ10pXG4uZmFjdG9yeSgnQ2FydFNlcnZpY2UnLCBDYXJ0U2VydmljZSlcbi5mYWN0b3J5KCdUZXN0aW1vbmlhbFNlcnZpY2UnLCBUZXN0aW1vbmlhbFNlcnZpY2UpXG4uZmFjdG9yeSgnVXNlclNlcnZpY2UnLCBVc2VyU2VydmljZSlcbi5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0xlZnRDdHJsJywgTGVmdEN0cmwpXG4uY29udHJvbGxlcignUmlnaHRDdHJsJywgUmlnaHRDdHJsKVxuLmNvbnRyb2xsZXIoJ0RpYWxvZ0N0cmwnLCBEaWFsb2dDdHJsKVxuLmNvbnRyb2xsZXIoJ0J1eUN0cmwnLCBCdXlDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1dob2xlc2FsZUNvbnRyb2xsZXInLCBXaG9sZXNhbGVDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ01lZGlhQ29udHJvbGxlcicsIE1lZGlhQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDYXJ0Q29udHJvbGxlcicsIENhcnRDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1VzZXJDb250cm9sbGVyJywgVXNlckNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignQ29udGFjdEN0cmwnLCBDb250YWN0Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdUZXN0aW1vbmlhbENvbnRyb2xsZXInLCBUZXN0aW1vbmlhbENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignVGVzdGltb25pYWxTaW5nbGVDdHJsJywgVGVzdGltb25pYWxTaW5nbGVDdHJsKTtcbiIsImxldCBDYXJ0U2VydmljZSA9IGZ1bmN0aW9uKCRjb29raWVzLCAkc3RhdGUsICRyb290U2NvcGUsICRodHRwLCAkbG9nLCBBUEkpe1xuXG4gIGNvbnN0IHBheXBhbCA9IFwiaHR0cHM6Ly93d3cucGF5cGFsLmNvbS9jZ2ktYmluL3dlYnNjclwiO1xuXG4gIC8vIGl0ZW0gY29uc3RydWN0b3JcblxuICBmdW5jdGlvbiBJdGVtKG9wdGlvbnMpe1xuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlO1xuICAgIHRoaXMucHJpY2UgPSBvcHRpb25zLnByaWNlO1xuICAgIHRoaXMucXVhbnRpdHkgPSBvcHRpb25zLnF1YW50aXR5O1xuICAgIHRoaXMudG90YWwgPSBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuICh0aGlzLnF1YW50aXR5ICogdGhpcy5wcmljZSkgfHwgMDtcbiAgICB9O1xuXG4gIH1cblxuICBmdW5jdGlvbiBnZXRJdGVtcygpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vaXRlbXNgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNpbmdsZUl0ZW0oaXRlbSl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS9pdGVtcy8ke2l0ZW19YCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDYXJ0KCl7XG4gICAgbGV0IGNhcnRMaXN0ID0gJGNvb2tpZXMuZ2V0T2JqZWN0KCdjYXJ0Jyk7XG4gICAgaWYoIWNhcnRMaXN0IHx8IGNhcnRMaXN0Lmxlbmd0aCA8IDEpe1xuICAgICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gZmFsc2U7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgICRyb290U2NvcGUuaGFzQ2FydCA9IHRydWU7XG4gICAgdmFyIGNhcnRJdGVtcyA9IGNhcnRMaXN0Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgbGV0IGNhcnRJdGVtID0gbmV3IEl0ZW0oaXRlbSk7XG4gICAgICByZXR1cm4gY2FydEl0ZW07XG4gICAgfSk7XG5cbiAgICB2YXIgcGF5cGFsSXRlbXMgPSBhZGRQYXlwYWwoY2FydEl0ZW1zKTtcblxuICAgIHZhciBjYXJ0ID0ge307XG5cbiAgICBjYXJ0Lml0ZW1zID0gcGF5cGFsSXRlbXM7XG4gICAgY2FydC50b3RhbEl0ZW1zID0gY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgcmV0dXJuIHRvdGFsICsgaXRlbS5xdWFudGl0eTtcbiAgICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIGNhcnQ7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRDYXJ0KGl0ZW0pe1xuICAgICRyb290U2NvcGUuaGFzQ2FydCA9IHRydWU7XG4gICAgdmFyIGNhcnQgPSAkY29va2llcy5nZXRPYmplY3QoJ2NhcnQnKTtcbiAgICBpZighY2FydCl7XG4gICAgICBjYXJ0ID0gW107XG4gICAgfVxuXG4gICAgbGV0IGFscmVhZHlFeGlzdHMgPSBfLmZpbmRXaGVyZShjYXJ0LCBpdGVtLnRpdGxlKTtcbiAgICBpZihhbHJlYWR5RXhpc3RzKXtcbiAgICAgIGNhcnQgPSBfLndpdGhvdXQoY2FydCwgYWxyZWFkeUV4aXN0cyk7XG4gICAgICBhbHJlYWR5RXhpc3RzLnF1YW50aXR5ID0gYWxyZWFkeUV4aXN0cy5xdWFudGl0eSArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICBjYXJ0LnB1c2goYWxyZWFkeUV4aXN0cyk7XG4gICAgfWVsc2V7XG4gICAgICBjYXJ0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgICRjb29raWVzLnB1dE9iamVjdCgnY2FydCcsIGNhcnQpO1xuICAgICRsb2cuZGVidWcoXCJJdGVtIGFkZGVkIHRvIGNhcnRcIiwgaXRlbSwgY2FydCk7XG4gICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJCgnI2NhcnQnKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkc3RhdGUuZ28oJ2NhcnQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNhcnQoaXRlbXMpe1xuICAgICRsb2cuZGVidWcoJ3VwZGF0aW5nIGNhcnQnLCBpdGVtcyk7XG5cbiAgICB2YXIgY2FydEl0ZW1zID0gYWRkUGF5cGFsKGl0ZW1zKTtcbiAgICAkY29va2llcy5wdXRPYmplY3QoJ2NhcnQnLCBjYXJ0SXRlbXMpO1xuICAgIHJldHVybiBjYXJ0SXRlbXM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaGlwcGluZ1RpZXJzKCl7XG4gICAgbGV0IHNoaXBwaW5nID0ge1xuICAgICAgdGllcjE6IHtcbiAgICAgICAgcXVhbnRpdHk6IDUsXG4gICAgICAgIHByaWNlOiA1XG4gICAgICB9LFxuICAgICAgdGllcjI6IHtcbiAgICAgICAgcXVhbnRpdHk6IDEwLFxuICAgICAgICBwcmljZTogMTBcbiAgICAgIH0sXG4gICAgICB0aWVyMzoge1xuICAgICAgICBxdWFudGl0eTogMjAsXG4gICAgICAgIHByaWNlOiAyMFxuICAgICAgfVxuICAgIH07XG4gICAgJGxvZy5kZWJ1ZyhcIlNoaXBwaW5nIFRpZXJzXCIsIHNoaXBwaW5nKTtcbiAgICByZXR1cm4gc2hpcHBpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBjYWxjdWxhdGVTaGlwcGluZyhjYXJ0LCB0aWVycyl7XG4gICAgY2FydC5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PntcbiAgICBpZihpdGVtLnF1YW50aXR5ID49IHRpZXJzLnRpZXIxLnF1YW50aXR5ICYmIGl0ZW0ucXVhbnRpdHkgPCB0aWVycy50aWVyMi5xdWFudGl0eSl7XG4gICAgICAgIGl0ZW0uc2hpcHBpbmcgPSB0aWVycy50aWVyMS5wcmljZTtcbiAgICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPj0gdGllcnMudGllcjIucXVhbnRpdHkgJiYgaXRlbS5xdWFudGl0eSA8IHRpZXJzLnRpZXIzLnF1YW50aXR5KXtcbiAgICAgICAgaXRlbS5zaGlwcGluZyA9IHRpZXJzLnRpZXIyLnByaWNlO1xuICAgICAgfWVsc2UgaWYoaXRlbS5xdWFudGl0eSA+IHRpZXJzLnRpZXIzLnF1YW50aXR5ICl7XG4gICAgICAgIGl0ZW0uc2hpcHBpbmcgPSB0aWVycy50aWVyMy5wcmljZTtcbiAgICAgIH1lbHNle1xuICAgICAgICBpdGVtLnNoaXBwaW5nID0gMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNhcnQuc2hpcHBpbmcgPSBjYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgcmV0dXJuIHRvdGFsICsgaXRlbS5zaGlwcGluZztcbiAgICB9LCAwKTtcblxuICAgIHJldHVybiBjYXJ0O1xuXG4gIH1cblxuICBmdW5jdGlvbiBjYXJ0V2F0Y2goY2FydCwgc2hpcHBpbmcpIHtcbiAgICB2YXIgc3VidG90YWwgPSAwO1xuICAgIGlmKCFfLmlzRW1wdHkoY2FydCkpe1xuXG4gICAgICBpZihjYXJ0Lml0ZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICBjYXJ0Lml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHN1YnRvdGFsICs9IGl0ZW0udG90YWwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNhcnQgPSB1cGRhdGVDYXJ0KGNhcnQuaXRlbXMpO1xuICAgICAgICBjYXJ0LnRvdGFsSXRlbXMgPSBjYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgaXRlbS5xdWFudGl0eTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG5cbiAgICAgIGNhcnQuc2hpcHBpbmcgPSAgY2FsY3VsYXRlU2hpcHBpbmcoY2FydCwgc2hpcHBpbmcpO1xuICAgICAgY2FydC5zdWJ0b3RhbCA9IHN1YnRvdGFsLnRvRml4ZWQoMik7XG4gICAgICBjYXJ0LnRvdGFsID0gKHN1YnRvdGFsICsgY2FydC5zaGlwcGluZykudG9GaXhlZCgyKTtcblxuICAgICAgJGxvZy5kZWJ1ZyhcIkNhcnQgbG9hZGVkIG9yIHVwZGF0ZWRcIiwgY2FydCk7XG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRQYXlwYWwoY2FydEl0ZW1zKXtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2FydEl0ZW1zLmxlbmd0aDsgaSArKyl7XG4gICAgICB2YXIgaXRlbU51bWJlciA9IChpICsgMSk7XG4gICAgICBjYXJ0SXRlbXNbaV0ucGF5cGFsID0ge1xuICAgICAgICBpdGVtIDogXCJpdGVtX25hbWVfXCIgKyBpdGVtTnVtYmVyLFxuICAgICAgICBhbW91bnQ6IFwiYW1vdW50X1wiKyBpdGVtTnVtYmVyLFxuICAgICAgICBxdWFudGl0eTogXCJxdWFudGl0eV9cIiArIGl0ZW1OdW1iZXIsXG4gICAgICAgIHNoaXBwaW5nIDogXCJzaGlwcGluZ19cIiArIGl0ZW1OdW1iZXJcbiAgICAgIH07XG4gICAgfVxuXG4gICAgJGxvZy5kZWJ1ZyhcImFkZGluZyBwYXlwYWwgaW5mb1wiLCBjYXJ0SXRlbXMpO1xuICAgIHJldHVybiBjYXJ0SXRlbXM7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEl0ZW1zLFxuICAgIGdldFNpbmdsZUl0ZW0sXG4gICAgZ2V0Q2FydCxcbiAgICBzZXRDYXJ0LFxuICAgIHVwZGF0ZUNhcnQsXG4gICAgZ2V0U2hpcHBpbmdUaWVycyxcbiAgICBjYWxjdWxhdGVTaGlwcGluZyxcbiAgICBjYXJ0V2F0Y2hcbiAgfTtcblxuXG59O1xuXG5DYXJ0U2VydmljZS4kaW5qZWN0ID0gWyckY29va2llcycsICckc3RhdGUnLCAnJHJvb3RTY29wZScsICckaHR0cCcsICckbG9nJywgJ0FQSSddO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJ0U2VydmljZTtcbiIsImxldCBUZXN0aW1vbmlhbFNlcnZpY2UgPSBmdW5jdGlvbigkaHR0cCwgQVBJKXtcblxuICBmdW5jdGlvbiBnZXRUZXN0aW1vbmlhbHMoKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L3Rlc3RpbW9uaWFsc2ApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2luZ2xlVGVzdGltb25pYWwodGVzdGltb25pYWxJZCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS90ZXN0aW1vbmlhbHMvJHt0ZXN0aW1vbmlhbElkfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGVzdGltb25pYWwodGVzdGltb25pYWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L3Rlc3RpbW9uaWFsc2AsIHRlc3RpbW9uaWFsKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0VGVzdGltb25pYWxzLFxuICAgIGdldFNpbmdsZVRlc3RpbW9uaWFsLFxuICAgIGFkZFRlc3RpbW9uaWFsXG4gIH07XG59O1xuZXhwb3J0IGRlZmF1bHQgVGVzdGltb25pYWxTZXJ2aWNlO1xuIiwibGV0IFVzZXJTZXJ2aWNlID0gZnVuY3Rpb24oJGh0dHAsIEFQSSwgJGNvb2tpZXMsICRzdGF0ZSwgJHJvb3RTY29wZSwgJGxvZyl7XG5cbiAgZnVuY3Rpb24gZ2V0VXNlckluZm8oKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L21lYCwgQVBJLkNPTkZJRyk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1VzZXIoKXtcbiAgICBjb25zdFxuICAgICAgdG9rZW4gPSAkY29va2llcy5nZXQoJ3Rva2VuJyksXG4gICAgICB1c2VybmFtZSA9ICRjb29raWVzLmdldCgndXNlcm5hbWUnKTtcbiAgICBpZih0b2tlbiAmJiB1c2VybmFtZSl7XG4gICAgICBfc2V0VG9rZW4odG9rZW4sIHVzZXJuYW1lKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0VG9rZW4odG9rZW4sIHVzZXJuYW1lKXtcbiAgICBpZih0b2tlbiAmJiB1c2VybmFtZSl7XG4gICAgICBBUEkuQ09ORklHLmhlYWRlcnNbJ3gtYWNjZXNzLXRva2VuJ10gPSB0b2tlbjtcbiAgICAgICRyb290U2NvcGUuaXNVc2VyTG9nZ2VkSW4gPSB0cnVlO1xuICAgICAgJHJvb3RTY29wZS51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIH1lbHNle1xuICAgICAgJHJvb3RTY29wZS5pc1VzZXJMb2dnZWRJbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdob2xlc2FsZVJlcXVlc3QoZW1haWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L2NvbnRhY3Qvd2hvbGVzYWxlYCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udGFjdChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vY29udGFjdGAsIGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ2luKHVzZXIpe1xuICAgICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vYXV0aGVudGljYXRlYCwgdXNlcilcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgIF9zdWNjZXNzTG9nKGRhdGEpO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfc3VjY2Vzc0xvZyhkYXRhKXtcbiAgICAkY29va2llcy5wdXQoJ3Rva2VuJywgZGF0YS50b2tlbik7XG4gICAgJGNvb2tpZXMucHV0KCd1c2VySWQnLCBkYXRhLmlkKTtcbiAgICBfc2V0VG9rZW4oZGF0YS50b2tlbik7XG4gICAgZ2V0VXNlckluZm8oKVxuICAgICAgLnN1Y2Nlc3MoKHVzZXJEYXRhKSA9PntcbiAgICAgICAgJGxvZy5kZWJ1ZygnVXNlciBkYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAkY29va2llcy5wdXRPYmplY3QoJ2l0ZW1zJywgdXNlckRhdGEuaXRlbXMpO1xuICAgICAgICAkY29va2llcy5wdXQoJ3VzZXJuYW1lJywgdXNlckRhdGEudXNlcm5hbWUpO1xuICAgICAgfSk7XG4gICAgJHN0YXRlLmdvKCdidXlXaG9sZXNhbGUnKTtcbiAgICAkbG9nLmRlYnVnKCdMb2dnZWQgaW4hJywgZGF0YSk7XG4gIH1cblxuICBmdW5jdGlvbiBfdXBkYXRlVXNlcih1c2VySWQsIHVzZXIpe1xuICAgIHJldHVybiAkaHR0cC5wdXQoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCwgdXNlciwgQVBJLkNPTkZJRyk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dPdXQoKXtcbiAgICAkY29va2llcy5yZW1vdmUoJ3Rva2VuJyk7XG4gICAgX3NldFRva2VuKCk7XG4gICAgJHN0YXRlLmdvKCdob21lJyk7XG4gIH1cblxuICBmdW5jdGlvbiBfZ2V0VXNlcih1c2VySWQpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCwgQVBJLkNPTkZJRyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3Jnb3RQYXNzd29yZChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vZm9yZ290UGFzc3dvcmRgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBfZGVsZXRlVXNlcih1c2VySWQpe1xuICAgIHJldHVybiAkaHR0cC5kZWxldGUoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCk7XG4gIH1cblxuICByZXR1cm57XG4gICAgY2hlY2tVc2VyLFxuICAgIHdob2xlc2FsZVJlcXVlc3QsXG4gICAgY29udGFjdCxcbiAgICBsb2dpbixcbiAgICBsb2dPdXQsXG4gICAgX3VwZGF0ZVVzZXIsXG4gICAgX2dldFVzZXIsXG4gICAgX2RlbGV0ZVVzZXIsXG4gICAgZm9yZ290UGFzc3dvcmQsXG4gICAgZ2V0VXNlckluZm9cblxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlclNlcnZpY2U7XG4iXX0=
