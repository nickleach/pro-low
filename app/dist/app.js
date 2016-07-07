(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
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
  })
  // .state('testimonials', {
  //   url: '/testimonials',
  //   templateUrl: 'js/templates/testimonials.tpl.html',
  //   controller: 'TestimonialController'
  // })
  // .state('testimonials.add', {
  //   url: '/add',
  //   templateUrl: 'js/templates/testimonials.add.tpl.html',
  //   controller: 'TestimonialController'
  // })
  // .state('testimonials.single', {
  //   url: '/:id',
  //   templateUrl: 'js/templates/testimonials.single.tpl.html',
  //   controller: 'TestimonialSingleCtrl',
  // })
  // .state('gallery', {
  //   url: '/gallery',
  //   templateUrl: 'js/templates/gallery.tpl.html',
  //   controller: 'MediaController'
  // })
  .state('videos', {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
function BuyController($scope, $cookies, $state, CartService, $log, $rootScope) {

  $scope.loading = true;
  $rootScope.failedLoginMessage = '';

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
exports.default = BuyController;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
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

exports.default = CartController;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
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

exports.default = ContactController;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state, $mdDialog, CartService, $rootScope) {
  $(".dropdown-button").dropdown();
  // $rootScope.shippingTiers = CartService.getShippingTiers();
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
      $scope.cart.shipping = 0;
      // $scope.cart = CartService.calculateShipping($scope.cart, $scope.shippingTiers);
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

Object.defineProperty(exports, "__esModule", {
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

exports.default = MediaController;

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

Object.defineProperty(exports, "__esModule", {
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
exports.default = UserController;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function WholesaleController($scope, UserService, CartService, $log, $cookies, $state) {

  var id = $cookies.get('userId'),
      token = $cookies.get('token'),
      userItems = $cookies.getObject('items').items;

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
        thisItem.basePrice = thisItem.price;
        return thisItem;
      });
    });
    $log.debug("User Items", userItems);
  } else {
    $state.go('home');
  }

  $scope.addToCart = function (item) {
    CartService.setCart(item);
  };

  $scope.editProfile = function () {
    $state.go('buyWholesale.edit');
  };
}

exports.default = WholesaleController;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function loading() {
  return {
    restrict: 'E',
    templateUrl: 'js/templates/loading.html'
  };
}
exports.default = loading;

},{}],11:[function(require,module,exports){
'use strict';

var _config = require('./config');

var _MainController = require('./controllers/MainController');

var _BuyController = require('./controllers/BuyController');

var _BuyController2 = _interopRequireDefault(_BuyController);

var _MediaController = require('./controllers/MediaController');

var _MediaController2 = _interopRequireDefault(_MediaController);

var _CartController = require('./controllers/CartController');

var _CartController2 = _interopRequireDefault(_CartController);

var _ContactController = require('./controllers/ContactController');

var _ContactController2 = _interopRequireDefault(_ContactController);

var _UserController = require('./controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _WholesaleController = require('./controllers/WholesaleController');

var _WholesaleController2 = _interopRequireDefault(_WholesaleController);

var _TestimonialController = require('./controllers/TestimonialController');

var _CartService = require('./services/CartService');

var _CartService2 = _interopRequireDefault(_CartService);

var _TestimonialService = require('./services/TestimonialService');

var _TestimonialService2 = _interopRequireDefault(_TestimonialService);

var _UserService = require('./services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

var _loading = require('./directives/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery', 'ngCookies']).config(_config.config).constant('PAYPAL', _config.paypal).constant('API', _config.API).run(_config.run).directive('myLoader', [_loading2.default]).factory('CartService', _CartService2.default).factory('TestimonialService', _TestimonialService2.default).factory('UserService', _UserService2.default).controller('MainController', _MainController.MainController).controller('LeftCtrl', _MainController.LeftCtrl).controller('RightCtrl', _MainController.RightCtrl).controller('DialogCtrl', _MainController.DialogCtrl).controller('BuyCtrl', _BuyController2.default).controller('WholesaleController', _WholesaleController2.default).controller('MediaController', _MediaController2.default).controller('CartController', _CartController2.default).controller('UserController', _UserController2.default).controller('ContactCtrl', _ContactController2.default).controller('TestimonialController', _TestimonialController.TestimonialController).controller('TestimonialSingleCtrl', _TestimonialController.TestimonialSingleCtrl);

},{"./config":1,"./controllers/BuyController":2,"./controllers/CartController":3,"./controllers/ContactController":4,"./controllers/MainController":5,"./controllers/MediaController":6,"./controllers/TestimonialController":7,"./controllers/UserController":8,"./controllers/WholesaleController":9,"./directives/loading":10,"./services/CartService":12,"./services/TestimonialService":13,"./services/UserService":14}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
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

  // function getShippingTiers(){
  //   let shipping = {
  //     tier1: {
  //       quantity: 5,
  //       price: 5
  //     },
  //     tier2: {
  //       quantity: 10,
  //       price: 10
  //     },
  //     tier3: {
  //       quantity: 20,
  //       price: 20
  //     }
  //   };
  //   $log.debug("Shipping Tiers", shipping);
  //   return shipping;
  // }

  // function calculateShipping(cart, tiers){
  //   cart.items.forEach((item) =>{
  //   if(item.quantity >= tiers.tier1.quantity && item.quantity < tiers.tier2.quantity){
  //       item.shipping = tiers.tier1.price;
  //     }else if(item.quantity >= tiers.tier2.quantity && item.quantity < tiers.tier3.quantity){
  //       item.shipping = tiers.tier2.price;
  //     }else if(item.quantity > tiers.tier3.quantity ){
  //       item.shipping = tiers.tier3.price;
  //     }else{
  //       item.shipping = 0;
  //     }
  //   });

  //   cart.shipping = cart.items.reduce((total, item) =>{
  //     return total + item.shipping;
  //   }, 0);

  //   return cart;

  // }

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
    // getShippingTiers,
    // calculateShipping,
    cartWatch: cartWatch
  };
};

CartService.$inject = ['$cookies', '$state', '$rootScope', '$http', '$log', 'API'];

exports.default = CartService;

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
exports.default = TestimonialService;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
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
    if (token) {
      API.CONFIG.headers['x-access-token'] = token;
      $rootScope.isUserLoggedIn = true;
      if (username) {
        $rootScope.username = username;
      }
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
    }).error(function (data) {
      $rootScope.failedLoginMessage = '' + data;
    });
  }

  function _successLog(data) {
    $cookies.put('token', data.token);
    $cookies.put('userId', data.id);
    _setToken(data.token);
    getUserInfo().success(function (userData) {
      $log.debug('User data from login', userData);
      $cookies.putObject('items', { items: userData.items });
      $cookies.put('username', userData.username);
      $log.debug('Logged in!', data);
      $state.go('buyWholesale');
    });
  }

  function _updateUser(userId, user) {
    return $http.put(API.URL + '/users/' + userId, user, API.CONFIG);
  }

  function logOut() {
    $cookies.remove('token');
    $cookies.remove('items');
    $cookies.remove('userId');
    $cookies.remove('username');
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
    return $http.delete(API.URL + '/users/' + userId);
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

exports.default = UserService;

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvY29uZmlnLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCJhcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCJhcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCJhcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCJhcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsImFwcC9qcy9jb250cm9sbGVycy9Vc2VyQ29udHJvbGxlci5qcyIsImFwcC9qcy9jb250cm9sbGVycy9XaG9sZXNhbGVDb250cm9sbGVyLmpzIiwiYXBwL2pzL2RpcmVjdGl2ZXMvbG9hZGluZy5qcyIsImFwcC9qcy9tYWluLmpzIiwiYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIiwiYXBwL2pzL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZS5qcyIsImFwcC9qcy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsU0FBQSxBQUFTLE9BQVQsQUFBZ0IsZ0JBQWhCLEFBQWdDLG9CQUFoQyxBQUFvRCxvQkFBcEQsQUFBd0UsY0FBYyxBQUNwRjtlQUFBLEFBQWEsYUFBYixBQUEwQixBQUUxQjs7cUJBQUEsQUFBbUIsVUFBbkIsQUFBNkIsQUFFN0I7O2lCQUFBLEFBQ0csTUFESCxBQUNTO1NBQVEsQUFDUixBQUNMO2lCQUZhLEFBRUEsQUFDYjtnQkFKSixBQUNpQixBQUdEO0FBSEMsQUFDYixLQUZKLEFBTUcsTUFOSCxBQU1TO1NBQU8sQUFDUCxBQUNMO2lCQUZZLEFBRUMsQUFDYjtnQkFUSixBQU1nQixBQUdBO0FBSEEsQUFDWixLQVBKLEFBV0cs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LFNBQVQsQUFBa0IsUUFBTyxBQUN2QjtXQUFPLE1BQUEsQUFBTSxBQUFLLElBQUUsSUFBSSxBQUFJLGtCQUFyQixBQUE4QixBQUFPLFFBQUcsSUFBL0MsQUFBTyxBQUE0QyxBQUNwRDtBQUVEOztXQUFBLEFBQVMsZUFBVCxBQUF3QixPQUFNLEFBQzVCO1dBQU8sTUFBQSxBQUFNLEFBQU0sS0FBRSxJQUFkLEFBQWtCLEFBQUkseUJBQTdCLEFBQU8sQUFBd0MsQUFDaEQ7QUFFRDs7V0FBQSxBQUFTLFlBQVQsQUFBcUIsUUFBTyxBQUMxQjtXQUFPLE1BQUEsQUFBTSxBQUFRLE9BQUUsSUFBSSxBQUFJLGtCQUEvQixBQUFPLEFBQWlDLEFBQU8sQUFDaEQ7QUFFRDs7O0FBQU0sQUFFSjtBQUZJLEFBR0o7QUFISSxBQUlKO0FBSkksQUFLSjtBQUxJLEFBTUo7QUFOSSxBQU9KO0FBUEksQUFRSjtBQVJJLEFBU0o7QUFUSSxBQVVKO0FBVkYsQUFBTSxBQWFQOztBQWJPLEFBQ0o7QUFyRkosQUFtR0E7O2tCQUFBLEFBQWUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJGxvZ1Byb3ZpZGVyKSB7XG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5Jywge1xuICAgICAgdXJsOiAnL2J1eScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0J1eUN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC8vIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgIC8vICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgLy8gICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgIC8vICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcidcbiAgICAvLyB9KVxuICAgIC8vIC5zdGF0ZSgndGVzdGltb25pYWxzLmFkZCcsIHtcbiAgICAvLyAgIHVybDogJy9hZGQnLFxuICAgIC8vICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLmFkZC50cGwuaHRtbCcsXG4gICAgLy8gICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIC8vIH0pXG4gICAgLy8gLnN0YXRlKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge1xuICAgIC8vICAgdXJsOiAnLzppZCcsXG4gICAgLy8gICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMuc2luZ2xlLnRwbC5odG1sJyxcbiAgICAvLyAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLFxuICAgIC8vIH0pXG4gICAgLy8gLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgIC8vICAgdXJsOiAnL2dhbGxlcnknLFxuICAgIC8vICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgLy8gICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIC8vIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwcmljaW5nJywge1xuICAgICAgdXJsOiAnL3ByaWNpbmcnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvcHJpY2luZy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2Rlc2lnbicsIHtcbiAgICAgIHVybDogJy9kZXNpZ24nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZGVzaWduLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnY2FydCcsIHtcbiAgICAgIHVybDogJy9jYXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2NhcnQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NhcnRDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3dob2xlc2FsZVJlcXVlc3QnLCB7XG4gICAgICB1cmw6ICcvd2hvbGVzYWxlUmVxdWVzdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93aG9sZXNhbGVSZXF1ZXN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5V2hvbGVzYWxlJywge1xuICAgICAgdXJsOiAnL2J1eVdob2xlc2FsZScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXlXaG9sZXNhbGUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1dob2xlc2FsZUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2J1eVdob2xlc2FsZS5lZGl0Jywge1xuICAgICAgdXJsOiAnL2VkaXRQcm9maWxlJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2VkaXQudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1VzZXJDb250cm9sbGVyJ1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHJ1bihDYXJ0U2VydmljZSwgVXNlclNlcnZpY2UsICRyb290U2NvcGUpe1xuICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgVXNlclNlcnZpY2UuY2hlY2tVc2VyKCk7XG4gICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9KTtcbn1cblxuY29uc3QgcGF5cGFsID0ge1xuICAgICAgdXNlcm5hbWU6ICdhaW5lcy5rZXZpbl9hcGkxLmdtYWlsLmNvbScsXG4gICAgICBwYXNzd29yZDogJ1Q2WDlEUjJCNzdCUTRZV0snLFxuICAgICAgY3JlZGVudGlhbDogJ0FQSSBTaWduYXR1cmUnLFxuICAgICAgc2lnbmF0dXJlOiAnQUZjV3hWMjFDN2ZkMHYzYllZWVJDcFNTUmwzMUEyRUVoQXpXemx4cS1FekVRdG9aTXFTY1I2eEknXG59O1xuXG5jb25zdCBBUEkgPSB7XG4gIFVSTDogJ2h0dHA6Ly9hZG1pbi5wcm9sb3dwdXR0aW5nLmNvbS9hcGknLFxuICBDT05GSUc6IHtcbiAgICBoZWFkZXJzOntcblxuICAgIH1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIHBheXBhbCxcbiAgY29uZmlnLFxuICBydW4sXG4gIEFQSVxufTtcbiIsImZ1bmN0aW9uIEJ1eUNvbnRyb2xsZXIoJHNjb3BlLCAkY29va2llcywgJHN0YXRlLCBDYXJ0U2VydmljZSwgJGxvZywgJHJvb3RTY29wZSl7XG5cbiAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuICAkcm9vdFNjb3BlLmZhaWxlZExvZ2luTWVzc2FnZSA9ICcnO1xuXG4gIENhcnRTZXJ2aWNlLmdldEl0ZW1zKClcbiAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgJGxvZy5kZWJ1ZygnaXRlbXMnLCBkYXRhKTtcbiAgICAgIGNvbnN0IGl0ZW1EYXRhID0gZGF0YS5tYXAoKGkpID0+IHtcbiAgICAgICAgaS5wcmljZSA9IGkuYmFzZVByaWNlO1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH0pO1xuXG4gICAgICAkc2NvcGUuaXRlbXMgPSBpdGVtRGF0YTtcbiAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSlcbiAgICAuZXJyb3IoKCkgPT4ge1xuICAgICAgJHNjb3BlLml0ZW1zID0gW1xuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwiVGhlIFBybyBMb3cgUHV0dGluZyBTeXN0ZW1cIixcbiAgICAgICAgICBiYXNlUHJpY2U6IDM5Ljk1LFxuICAgICAgICAgIHByaWNlOiAzOS45NSxcbiAgICAgICAgICBwcmljaW5nVGllcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgICAgICBxdWFudGl0eTogNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgICAgICBxdWFudGl0eTogMTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByaWNlOiAzOS45NSxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IDE1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdO1xuICAgICAgJGxvZy5lcnJvcignRXJyb3IgbG9hZGluZyBpdGVtcywgZGVmYXVsdGluZyB0byBpdGVtIGRlZmF1bHRzJywgJHNjb3BlLml0ZW1zKTtcbiAgICB9KTtcblxuXG4gICRzY29wZS5jaGVja1F1YW50aXR5ID0gZnVuY3Rpb24oaXRlbSkge1xuXG4gICAgaWYoaXRlbS5xdWFudGl0eSA+IGl0ZW0ucHJpY2luZ1RpZXJzWzBdLnF1YW50aXR5KXtcbiAgICAgIGl0ZW0ucHJpY2UgPSBpdGVtLnByaWNpbmdUaWVyc1swXS5wcmljZTtcbiAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID49IGl0ZW0ucHJpY2luZ1RpZXJzWzFdLnF1YW50aXR5ICYmIHF1YW50aXR5IDwgaXRlbS5wcmljaW5nVGllcnNbMl0ucXVhbnRpdHkpe1xuICAgICAgaXRlbS5wcmljZSA9IGl0ZW0ucHJpY2luZ1RpZXJzWzFdLnByaWNlO1xuICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPiBpdGVtLnByaWNpbmdUaWVyc1syXS5xdWFudGl0eSl7XG4gICAgICBpdGVtLnByaWNlID0gaXRlbS5wcmljaW5nVGllcnNbMl0ucHJpY2U7XG4gICAgfVxuXG4gIH07XG5cblxuICAkc2NvcGUuYWRkVG9DYXJ0ID0gZnVuY3Rpb24oaXRlbSwgcHJpY2Upe1xuICAgIENhcnRTZXJ2aWNlLnNldENhcnQoaXRlbSwgcHJpY2UpO1xuICB9O1xuXG59XG5leHBvcnQgZGVmYXVsdCBCdXlDb250cm9sbGVyO1xuIiwibGV0IENhcnRDb250cm9sbGVyID0gZnVuY3Rpb24oJHNjb3BlLCBDYXJ0U2VydmljZSwgJHJvb3RTY29wZSwgJGxvZyl7XG5cbiAgLy8gJHNjb3BlLnNoaXBwaW5nVGllcnMgPSBDYXJ0U2VydmljZS5nZXRTaGlwcGluZ1RpZXJzKCk7XG5cblxuXG4vLyAkc2NvcGUuJHdhdGNoKCdjYXJ0JywgQ2FydFNlcnZpY2UuY2FydFdhdGNoKCRyb290U2NvcGUuY2FydCwgJHNjb3BlLnNoaXBwaW5nVGllcnMpICx0cnVlKTtcblxuXG4gICRzY29wZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24oaXRlbSl7XG4gICAkbG9nLmRlYnVnKFwiUmVtb3ZpbmcgSXRlbVwiLCBpdGVtKTtcblxuICAgJHNjb3BlLmNhcnQuaXRlbXMgPSAgXy53aXRob3V0KCRzY29wZS5jYXJ0Lml0ZW1zLCBpdGVtKTtcbiAgIENhcnRTZXJ2aWNlLnVwZGF0ZUNhcnQoJHNjb3BlLmNhcnQuaXRlbXMpO1xuICAgJHJvb3RTY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuZ2V0Q2FydCgpO1xuICB9O1xuXG4gICRzY29wZS5jaGVja291dCA9IGZ1bmN0aW9uKGNhcnQpe1xuICAgIENhcnRTZXJ2aWNlLmNoZWNrb3V0KGNhcnQpO1xuICB9O1xuXG5cblxufTtcblxuQ2FydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ0NhcnRTZXJ2aWNlJywgJyRyb290U2NvcGUnLCAnJGxvZyddO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJ0Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIENvbnRhY3RDb250cm9sbGVyKCRzY29wZSwgVXNlclNlcnZpY2Upe1xuXG4gICRzY29wZS5jb250YWN0VXMgPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgY29uc3QgbWVzc2FnZSA9IGA8cD4ke2Zvcm0ubWVzc2FnZX08L3A+XFxcbiAgICA8cD4ke2Zvcm0uZmlyc3ROYW1lfSAke2Zvcm0ubGFzdE5hbWV9PC9wPlxcXG4gICAgPHA+JHtmb3JtLnBob25lfTwvcD5cXFxuICAgIDxwPiR7Zm9ybS5lbWFpbH08L3A+YDtcbiAgICBjb25zdCBlbWFpbCA9IHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBib2R5OiBtZXNzYWdlLFxuICAgICAgZnJvbTogJ25vcmVwbHlAUHJvTG93UHV0dGluZy5jb20nLFxuICAgICAgZnJvbU5hbWU6ICdQcm9Mb3cgUHV0dGluZycsXG4gICAgICBzdWJqZWN0OiBcIkEgY3VzdG9tZXIgaXMgdHJ5aW5nIHRvIGNvbnRhY3QgeW91XCJcbiAgICB9O1xuXG4gICAgVXNlclNlcnZpY2UuY29udGFjdChlbWFpbClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSlcbiAgICAgIC5lcnJvcigoZGF0YSkgPT4ge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5zdGF0ZXMgPSAoJ0FMIEFLIEFaIEFSIENBIENPIENUIERFIEZMIEdBIEhJIElEIElMIElOIElBIEtTIEtZIExBIE1FIE1EIE1BIE1JIE1OIE1TICcgK1xuICAgICAgICAgICAgJ01PIE1UIE5FIE5WIE5IIE5KIE5NIE5ZIE5DIE5EIE9IIE9LIE9SIFBBIFJJIFNDIFNEIFROIFRYIFVUIFZUIFZBIFdBIFdWIFdJICcgK1xuICAgICAgICAgICAgJ1dZJykuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiB7IGFiYnJldjogc3RhdGUgfTsgfSk7XG5cbiAgJHNjb3BlLndob2xlc2FsZVJlcXVlc3QgPSBmdW5jdGlvbihyZXF1ZXN0KXtcbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgIGNvbnN0IG1lc3NhZ2U9IGA8cD5Zb3UgaGF2ZSBhIG5ldyBXaG9sZXNhbGUgQ3VzdG9tZXIgcmVxdWVzdCBmcm9tIFByb0xvd1B1dHRpbmcuY29tISBcXFxuICAgIFNlZSBiZWxvdyBmb3IgZGV0YWlsczwvcD4gXFxcbiAgICA8cD5TdG9yZTogJHtyZXF1ZXN0LnN0b3JlfTwvcD5cXFxuICAgIDxwPiR7cmVxdWVzdC5jaXR5fSwgJHtyZXF1ZXN0LnN0YXRlfSAke3JlcXVlc3QuemlwfTwvcD5cXFxuICAgIDxwPjxzdHJvbmc+Q29udGFjdCBJbmZvOjwvc3Ryb25nPjwvcD5cXFxuICAgIDxwPjxzdHJvbmc+TmFtZTo8L3N0cm9uZz4gJHtyZXF1ZXN0LmZpcnN0TmFtZX0gJHtyZXF1ZXN0Lmxhc3ROYW1lfTwvcD5cXFxuICAgIDxwPjxzdHJvbmc+UGhvbmU6PC9zdHJvbmc+ICR7cmVxdWVzdC5waG9uZX08L3A+XFxcbiAgICA8cD48c3Ryb25nPkVtYWlsOjwvc3Ryb25nPiAke3JlcXVlc3QuZW1haWx9PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5BZGRpdGlvbmFsIEluZm86PC9zdHJvbmc+ICR7cmVxdWVzdC5tZXNzYWdlfTwvcD5cXFxuICAgIDxwPlRvIGFwcHJvdmUgdGhpcyB1c2UgeW91IG11c3QgbG9nIGluIHRvIGFkbWluLnByb2xvd3B1dHRpbmcuY29tIGFuZCBjcmVhdGUgYSB3aG9sZXNhbGUgdXNlciBwcm9maWxlIGZvciB0aGlzIHVzZXJcXFxuICAgIG9uY2UgdGhlIGFjY291bnQgaXMgY3JlYXRlZCB0aGV5IHdpbGwgYmUgbm90aWZpZWQgdmlhIGVtYWlsIHdpdGggdGhlaXIgY3JlZGVudGlhbHMuYDtcblxuICAgIGNvbnN0IGVtYWlsID0ge1xuICAgICAgbWVzc2FnZSxcbiAgICAgIGJvZHk6IG1lc3NhZ2VcbiAgICB9O1xuXG4gICAgVXNlclNlcnZpY2Uud2hvbGVzYWxlUmVxdWVzdChlbWFpbClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJZb3UncmUgcmVxdWVzdCBoYXMgYmVlbiBzZW50ISBPbmNlIGFwcHJvdmVkIHlvdSB3aWxsIGJlIG5vdGlmaWVkIHZpYSBlbWFpbCFcIjtcbiAgICAgIH0pXG4gICAgICAuZXJyb3IoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHRoZXJlIHdhcyBhIHByb2JsZW0gZXhlY3V0aW5nIHlvdXIgcmVxdWVzdCEgUGxlYXNlIHRyeSBhZ2FpbiBsYXRlciFcIjtcbiAgICAgIH0pO1xuICB9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlLCAkbWREaWFsb2csIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlKXtcbiAgJChcIi5kcm9wZG93bi1idXR0b25cIikuZHJvcGRvd24oKTtcbiAgLy8gJHJvb3RTY29wZS5zaGlwcGluZ1RpZXJzID0gQ2FydFNlcnZpY2UuZ2V0U2hpcHBpbmdUaWVycygpO1xuJHNjb3BlLm9wZW5NZW51ID0gZnVuY3Rpb24oJG1kT3Blbk1lbnUsIGV2KSB7XG4gICAgJG1kT3Blbk1lbnUoZXYpO1xuICB9O1xuXG5cbiAkc2NvcGUuJHdhdGNoKCdjYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KCRyb290U2NvcGUuY2FydCkpe1xuXG4gICAgICBpZigkc2NvcGUuY2FydC5pdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgJHNjb3BlLmNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2FydC5pdGVtcyA9IENhcnRTZXJ2aWNlLnVwZGF0ZUNhcnQoJHNjb3BlLmNhcnQuaXRlbXMpO1xuXG4gICAgICAgICRzY29wZS5jYXJ0LnRvdGFsSXRlbXMgPSAkc2NvcGUuY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIH0sIDApO1xuXG4gICAgICB9XG4gICAgICAkc2NvcGUuY2FydC5zaGlwcGluZyA9IDA7XG4gICAgICAgIC8vICRzY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuY2FsY3VsYXRlU2hpcHBpbmcoJHNjb3BlLmNhcnQsICRzY29wZS5zaGlwcGluZ1RpZXJzKTtcbiAgICAgICAgJHNjb3BlLmNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgICAkc2NvcGUuY2FydC50b3RhbCA9IChzdWJ0b3RhbCArICRzY29wZS5jYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgICAgICRsb2cuZGVidWcoXCJDYXJ0IGxvYWRlZCBvciB1cGRhdGVkXCIsICRzY29wZS5jYXJ0KTtcbiAgICB9XG5cbiAgfSwgdHJ1ZSk7XG5cblxuICAvLyBuYXYgdG9nZ2xlc1xuICAkc2NvcGUudG9nZ2xlTGVmdCA9IGJ1aWxkVG9nZ2xlcignbGVmdCcpO1xuICAkc2NvcGUudG9nZ2xlUmlnaHQgPSBidWlsZFRvZ2dsZXIoJ3JpZ2h0Jyk7XG4gIGxldCAkbGVmdCA9ICQoJy5tZC1zaWRlbmF2LWxlZnQnKTtcbiAgbGV0ICRyaWdodCA9ICQoJy5tZC1zaWRlbmF2LXJpZ2h0Jyk7XG5cbiAgLy8gbGlzdCBpdGVtIGNsaWNrIGV2ZW50XG4gIC8vICQoJ21kLWxpc3QtaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gIC8vICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vICAgJCh0aGlzKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGRUb2dnbGVyKG5hdklEKSB7XG4gICAgbGV0IGRlYm91bmNlRm4gPSAgJG1kVXRpbC5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgJG1kU2lkZW5hdihuYXZJRCkudG9nZ2xlKCk7XG4gICAgICB9LDMwMCk7XG4gICAgcmV0dXJuIGRlYm91bmNlRm47XG4gIH1cblxuXG4gIC8vIE5hdmlnYXRlIGZ1bmN0aW9uXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24oc3RhdGUsIG5hdil7XG4gICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJCgnIycrIHN0YXRlKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkc3RhdGUuZ28oc3RhdGUpLnRoZW4oKCkgPT4ge1xuICAgIGlmIChuYXYgPT0gXCJsZWZ0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICAgIGlmKCEkcmlnaHQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICB9ZWxzZSBpZihuYXYgPT0gXCJyaWdodFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgICAgaWYoISRsZWZ0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICB9fSk7XG5cbiAgfTtcblxuICAkc2NvcGUuc2hvd1dhcnJhbnR5ID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvd2FycmFudHkudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuICAkc2NvcGUuc2hvd1NoaXBwaW5nID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvc2hpcHBpbmcudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5jb250YWN0VXMgPSBmdW5jdGlvbihjb250YWN0KXtcblxuICB9O1xufVxuXG5cbmZ1bmN0aW9uIFJpZ2h0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdigncmlnaHQnKS5jbG9zZSgpO1xuICB9O1xuXG5cbn1cbmZ1bmN0aW9uIExlZnRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcbiAgfTtcblxufVxuXG5mdW5jdGlvbiBEaWFsb2dDdHJsKCRzY29wZSwgJG1kRGlhbG9nKXtcbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5jYW5jZWwoKTtcbiAgfTtcblxuICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5oaWRlKCk7XG4gIH07XG59XG5cbmV4cG9ydCB7XG4gIE1haW5Db250cm9sbGVyLFxuICBSaWdodEN0cmwsXG4gIExlZnRDdHJsLFxuICBEaWFsb2dDdHJsXG59O1xuIiwiZnVuY3Rpb24gTWVkaWFDb250cm9sbGVyKCRzY29wZSl7XG5cbiAgICAkc2NvcGUudGVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZygnd29ya2VkJyk7XG4gICAgfTtcblxuICAgICRzY29wZS5pbWFnZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9jbG9zZXVwMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvY2xvc2V1cDEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9rZXZpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMva2V2aW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAgLy8ge1xuICAgICAgLy8gICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbjMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgLy8gICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4zLWNvbXByZXNzb3IuanBnJyxcbiAgICAgIC8vICAgZGVzY3JpcHRpb246ICcnXG4gICAgICAvLyB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTItY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTItY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUzLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUzLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNC1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNC1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTUtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTUtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH1cbiAgICBdO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhQ29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIFRlc3RpbW9uaWFsQ29udHJvbGxlcigkc2NvcGUsIFRlc3RpbW9uaWFsU2VydmljZSwgJHN0YXRlLCAkbG9nKXtcbiAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSB0cnVlO1xuXG4gIFRlc3RpbW9uaWFsU2VydmljZS5nZXRUZXN0aW1vbmlhbHMoKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gZmFsc2U7XG4gICAgICAkc2NvcGUudGVzdGltb25pYWxzID0gZGF0YTtcbiAgICAgICRsb2cuZGVidWcoXCJUZXN0aW1vbmlhbHNcIiwgJHNjb3BlLnRlc3RpbW9uaWFscyk7XG4gICAgfSlcbiAgICAuZXJyb3IoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSBmYWxzZTtcbiAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHdlIGNvdWxkIG5vdCBsb2FkIHRlc3RpbW9uaWFscyBhdCB0aGlzIHRpbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG4gICAgfSk7XG4gICRzY29wZS5nb1RvU2luZ2xlID0gZnVuY3Rpb24oaWQpe1xuICAgJHN0YXRlLmdvKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge2lkOiBpZH0pO1xuICB9O1xuICAkc2NvcGUuYWRkVGVzdGltb25pYWwgPSBmdW5jdGlvbih0ZXN0aW1vbmlhbCl7XG4gICAgJHNjb3BlLmFkZGluZ1Rlc3RpbW9uaWFsID0gdHJ1ZTtcbiAgICB0ZXN0aW1vbmlhbC5kYXRlID0gbmV3IERhdGUoKTtcbiAgICBUZXN0aW1vbmlhbFNlcnZpY2UuYWRkVGVzdGltb25pYWwodGVzdGltb25pYWwpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAkc2NvcGUudGVzdGltb25pYWxBZGRlZCA9IHRydWU7XG4gICAgICAkc2NvcGUuYWRkZWRUZXN0aW1vbmlhbE1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCgkc2NvcGUsICRzdGF0ZVBhcmFtcywgVGVzdGltb25pYWxTZXJ2aWNlLCAkbG9nKXtcbiAgY29uc3QgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XG4gICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSB0cnVlO1xuICBUZXN0aW1vbmlhbFNlcnZpY2UuZ2V0U2luZ2xlVGVzdGltb25pYWwoaWQpXG4gICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS50ZXN0aW1vbmlhbCA9IGRhdGE7XG4gICAgICAkbG9nLmRlYnVnKFwiVGVzdGltb25pYWxcIiwgZGF0YSk7XG4gICAgfSlcbiAgICAuZXJyb3IoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IFwiV2UncmUgc29ycnkgd2UgY291bGQgbm90IGxvYWQgdGhpcyB0ZXN0aW1vbmlhbCBhdCB0aGlzIHRpbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIFRlc3RpbW9uaWFsQ29udHJvbGxlcixcbiAgVGVzdGltb25pYWxTaW5nbGVDdHJsXG59O1xuIiwiZnVuY3Rpb24gVXNlckNvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSwgJGxvZywgJHN0YXRlKXtcbiAgJHNjb3BlLmxvZ2luV2hvbGVzYWxlVXNlciA9IGZ1bmN0aW9uKHdob2xlc2FsZVVzZXIpIHtcbiAgICBVc2VyU2VydmljZS5sb2dpbih3aG9sZXNhbGVVc2VyKTtcbiAgfTtcbiAgJHNjb3BlLmVkaXRVc2VyID0gZnVuY3Rpb24odXNlcikge1xuICAgIFVzZXJTZXJ2aWNlLl91cGRhdGVVc2VyKHVzZXIuX2lkLCB1c2VyKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCdidXlXaG9sZXNhbGUnKTtcbiAgICAgIH0pO1xuICB9O1xuICAkc2NvcGUubG9nT3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UubG9nT3V0KCk7XG4gIH07XG59XG5leHBvcnQgZGVmYXVsdCBVc2VyQ29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIFdob2xlc2FsZUNvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSwgQ2FydFNlcnZpY2UsICRsb2csICRjb29raWVzLCAkc3RhdGUpe1xuXG4gIGNvbnN0XG4gICAgICBpZCA9ICRjb29raWVzLmdldCgndXNlcklkJyksXG4gICAgICB0b2tlbiA9ICRjb29raWVzLmdldCgndG9rZW4nKSxcbiAgICAgIHVzZXJJdGVtcyA9ICRjb29raWVzLmdldE9iamVjdCgnaXRlbXMnKS5pdGVtcztcblxuICBpZiAoaWQgJiYgdG9rZW4pIHtcbiAgICBVc2VyU2VydmljZS5fZ2V0VXNlcihpZClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAkc2NvcGUudXNlckRhdGEgPSBkYXRhO1xuICAgICAgJGxvZy5kZWJ1ZygnVXNlciBEYXRhJywgZGF0YSk7XG4gICAgfSk7XG4gICAgaWYgKCF1c2VySXRlbXMpIHtcbiAgICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvKClcbiAgICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgICAkY29va2llcy5wdXQoJ2l0ZW1zJywgZGF0YS5pdGVtcyk7XG4gICAgICAgICRsb2cuZGVidWcoZGF0YS5pdGVtcyk7XG4gICAgICAgICRzY29wZS51c2VySXRlbXMgPSBkYXRhLml0ZW1zO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRzY29wZS51c2VySXRlbXMgPSB1c2VySXRlbXM7XG4gICAgfVxuICAgIENhcnRTZXJ2aWNlLmdldEl0ZW1zKClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRsb2cuZGVidWcoJ1JldHJpZXZlZCBJdGVtcycsIGRhdGEpO1xuICAgICAgICAkc2NvcGUudXNlckl0ZW1zID0gZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCB0aGlzSXRlbSA9ICRzY29wZS51c2VySXRlbXMuZmluZCgoaSkgPT4gaS5pdGVtSWQgPT09IGl0ZW0uX2lkKTtcbiAgICAgICAgICB0aGlzSXRlbS50aXRsZSA9IGl0ZW0udGl0bGU7XG4gICAgICAgICAgdGhpc0l0ZW0uYmFzZVByaWNlID0gdGhpc0l0ZW0ucHJpY2U7XG4gICAgICAgICAgcmV0dXJuIHRoaXNJdGVtO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICRsb2cuZGVidWcoXCJVc2VyIEl0ZW1zXCIsIHVzZXJJdGVtcyk7XG4gIH0gZWxzZSB7XG4gICAgJHN0YXRlLmdvKCdob21lJyk7XG4gIH1cblxuICAkc2NvcGUuYWRkVG9DYXJ0ID0gZnVuY3Rpb24oaXRlbSl7XG4gICAgQ2FydFNlcnZpY2Uuc2V0Q2FydChpdGVtKTtcbiAgfTtcblxuICAkc2NvcGUuZWRpdFByb2ZpbGUgPSBmdW5jdGlvbigpe1xuICAgICRzdGF0ZS5nbygnYnV5V2hvbGVzYWxlLmVkaXQnKTtcbiAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBXaG9sZXNhbGVDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gbG9hZGluZygpe1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvbG9hZGluZy5odG1sJ1xuICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgbG9hZGluZztcbiIsImltcG9ydCB7Y29uZmlnLCBydW4sIHBheXBhbCwgQVBJfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciwgTGVmdEN0cmwsIFJpZ2h0Q3RybCwgRGlhbG9nQ3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXInO1xuaW1wb3J0IEJ1eUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9CdXlDb250cm9sbGVyJztcbmltcG9ydCBNZWRpYUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9NZWRpYUNvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXInO1xuaW1wb3J0IENvbnRhY3RDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXInO1xuaW1wb3J0IFVzZXJDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvVXNlckNvbnRyb2xsZXInO1xuaW1wb3J0IFdob2xlc2FsZUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9XaG9sZXNhbGVDb250cm9sbGVyJztcbmltcG9ydCB7IFRlc3RpbW9uaWFsQ29udHJvbGxlciwgVGVzdGltb25pYWxTaW5nbGVDdHJsIH0gZnJvbSAnLi9jb250cm9sbGVycy9UZXN0aW1vbmlhbENvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvQ2FydFNlcnZpY2UnO1xuaW1wb3J0IFRlc3RpbW9uaWFsU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZSc7XG5pbXBvcnQgVXNlclNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9Vc2VyU2VydmljZSc7XG5pbXBvcnQgbG9hZGluZyBmcm9tICcuL2RpcmVjdGl2ZXMvbG9hZGluZyc7XG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ2prdXJpLmdhbGxlcnknICwgJ25nQ29va2llcyddKVxuLmNvbmZpZyhjb25maWcpXG4uY29uc3RhbnQoJ1BBWVBBTCcsIHBheXBhbClcbi5jb25zdGFudCgnQVBJJywgQVBJKVxuLnJ1bihydW4pXG4uZGlyZWN0aXZlKCdteUxvYWRlcicsIFtsb2FkaW5nXSlcbi5mYWN0b3J5KCdDYXJ0U2VydmljZScsIENhcnRTZXJ2aWNlKVxuLmZhY3RvcnkoJ1Rlc3RpbW9uaWFsU2VydmljZScsIFRlc3RpbW9uaWFsU2VydmljZSlcbi5mYWN0b3J5KCdVc2VyU2VydmljZScsIFVzZXJTZXJ2aWNlKVxuLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTGVmdEN0cmwnLCBMZWZ0Q3RybClcbi5jb250cm9sbGVyKCdSaWdodEN0cmwnLCBSaWdodEN0cmwpXG4uY29udHJvbGxlcignRGlhbG9nQ3RybCcsIERpYWxvZ0N0cmwpXG4uY29udHJvbGxlcignQnV5Q3RybCcsIEJ1eUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignV2hvbGVzYWxlQ29udHJvbGxlcicsIFdob2xlc2FsZUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTWVkaWFDb250cm9sbGVyJywgTWVkaWFDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0NhcnRDb250cm9sbGVyJywgQ2FydENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignVXNlckNvbnRyb2xsZXInLCBVc2VyQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDb250YWN0Q3RybCcsIENvbnRhY3RDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcicsIFRlc3RpbW9uaWFsQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLCBUZXN0aW1vbmlhbFNpbmdsZUN0cmwpO1xuIiwibGV0IENhcnRTZXJ2aWNlID0gZnVuY3Rpb24oJGNvb2tpZXMsICRzdGF0ZSwgJHJvb3RTY29wZSwgJGh0dHAsICRsb2csIEFQSSl7XG5cbiAgY29uc3QgcGF5cGFsID0gXCJodHRwczovL3d3dy5wYXlwYWwuY29tL2NnaS1iaW4vd2Vic2NyXCI7XG5cbiAgLy8gaXRlbSBjb25zdHJ1Y3RvclxuXG4gIGZ1bmN0aW9uIEl0ZW0ob3B0aW9ucyl7XG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGU7XG4gICAgdGhpcy5wcmljZSA9IG9wdGlvbnMucHJpY2U7XG4gICAgdGhpcy5xdWFudGl0eSA9IG9wdGlvbnMucXVhbnRpdHk7XG4gICAgdGhpcy50b3RhbCA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gKHRoaXMucXVhbnRpdHkgKiB0aGlzLnByaWNlKSB8fCAwO1xuICAgIH07XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEl0ZW1zKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS9pdGVtc2ApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2luZ2xlSXRlbShpdGVtKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L2l0ZW1zLyR7aXRlbX1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENhcnQoKXtcbiAgICBsZXQgY2FydExpc3QgPSAkY29va2llcy5nZXRPYmplY3QoJ2NhcnQnKTtcbiAgICBpZighY2FydExpc3QgfHwgY2FydExpc3QubGVuZ3RoIDwgMSl7XG4gICAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICB2YXIgY2FydEl0ZW1zID0gY2FydExpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICBsZXQgY2FydEl0ZW0gPSBuZXcgSXRlbShpdGVtKTtcbiAgICAgIHJldHVybiBjYXJ0SXRlbTtcbiAgICB9KTtcblxuICAgIHZhciBwYXlwYWxJdGVtcyA9IGFkZFBheXBhbChjYXJ0SXRlbXMpO1xuXG4gICAgdmFyIGNhcnQgPSB7fTtcblxuICAgIGNhcnQuaXRlbXMgPSBwYXlwYWxJdGVtcztcbiAgICBjYXJ0LnRvdGFsSXRlbXMgPSBjYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENhcnQoaXRlbSl7XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICB2YXIgY2FydCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0KXtcbiAgICAgIGNhcnQgPSBbXTtcbiAgICB9XG5cbiAgICBsZXQgYWxyZWFkeUV4aXN0cyA9IF8uZmluZFdoZXJlKGNhcnQsIGl0ZW0udGl0bGUpO1xuICAgIGlmKGFscmVhZHlFeGlzdHMpe1xuICAgICAgY2FydCA9IF8ud2l0aG91dChjYXJ0LCBhbHJlYWR5RXhpc3RzKTtcbiAgICAgIGFscmVhZHlFeGlzdHMucXVhbnRpdHkgPSBhbHJlYWR5RXhpc3RzLnF1YW50aXR5ICsgaXRlbS5xdWFudGl0eTtcbiAgICAgIGNhcnQucHVzaChhbHJlYWR5RXhpc3RzKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNhcnQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydCk7XG4gICAgJGxvZy5kZWJ1ZyhcIkl0ZW0gYWRkZWQgdG8gY2FydFwiLCBpdGVtLCBjYXJ0KTtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjY2FydCcpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbygnY2FydCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2FydChpdGVtcyl7XG4gICAgJGxvZy5kZWJ1ZygndXBkYXRpbmcgY2FydCcsIGl0ZW1zKTtcblxuICAgIHZhciBjYXJ0SXRlbXMgPSBhZGRQYXlwYWwoaXRlbXMpO1xuICAgICRjb29raWVzLnB1dE9iamVjdCgnY2FydCcsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIGdldFNoaXBwaW5nVGllcnMoKXtcbiAgLy8gICBsZXQgc2hpcHBpbmcgPSB7XG4gIC8vICAgICB0aWVyMToge1xuICAvLyAgICAgICBxdWFudGl0eTogNSxcbiAgLy8gICAgICAgcHJpY2U6IDVcbiAgLy8gICAgIH0sXG4gIC8vICAgICB0aWVyMjoge1xuICAvLyAgICAgICBxdWFudGl0eTogMTAsXG4gIC8vICAgICAgIHByaWNlOiAxMFxuICAvLyAgICAgfSxcbiAgLy8gICAgIHRpZXIzOiB7XG4gIC8vICAgICAgIHF1YW50aXR5OiAyMCxcbiAgLy8gICAgICAgcHJpY2U6IDIwXG4gIC8vICAgICB9XG4gIC8vICAgfTtcbiAgLy8gICAkbG9nLmRlYnVnKFwiU2hpcHBpbmcgVGllcnNcIiwgc2hpcHBpbmcpO1xuICAvLyAgIHJldHVybiBzaGlwcGluZztcbiAgLy8gfVxuXG4gIC8vIGZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHRpZXJzKXtcbiAgLy8gICBjYXJ0Lml0ZW1zLmZvckVhY2goKGl0ZW0pID0+e1xuICAvLyAgIGlmKGl0ZW0ucXVhbnRpdHkgPj0gdGllcnMudGllcjEucXVhbnRpdHkgJiYgaXRlbS5xdWFudGl0eSA8IHRpZXJzLnRpZXIyLnF1YW50aXR5KXtcbiAgLy8gICAgICAgaXRlbS5zaGlwcGluZyA9IHRpZXJzLnRpZXIxLnByaWNlO1xuICAvLyAgICAgfWVsc2UgaWYoaXRlbS5xdWFudGl0eSA+PSB0aWVycy50aWVyMi5xdWFudGl0eSAmJiBpdGVtLnF1YW50aXR5IDwgdGllcnMudGllcjMucXVhbnRpdHkpe1xuICAvLyAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjIucHJpY2U7XG4gIC8vICAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID4gdGllcnMudGllcjMucXVhbnRpdHkgKXtcbiAgLy8gICAgICAgaXRlbS5zaGlwcGluZyA9IHRpZXJzLnRpZXIzLnByaWNlO1xuICAvLyAgICAgfWVsc2V7XG4gIC8vICAgICAgIGl0ZW0uc2hpcHBpbmcgPSAwO1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuXG4gIC8vICAgY2FydC5zaGlwcGluZyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gIC8vICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnNoaXBwaW5nO1xuICAvLyAgIH0sIDApO1xuXG4gIC8vICAgcmV0dXJuIGNhcnQ7XG5cbiAgLy8gfVxuXG4gIGZ1bmN0aW9uIGNhcnRXYXRjaChjYXJ0LCBzaGlwcGluZykge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoIV8uaXNFbXB0eShjYXJ0KSl7XG5cbiAgICAgIGlmKGNhcnQuaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgIGNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2FydCA9IHVwZGF0ZUNhcnQoY2FydC5pdGVtcyk7XG4gICAgICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgICB9LCAwKTtcbiAgICAgIH1cblxuICAgICAgY2FydC5zaGlwcGluZyA9ICBjYWxjdWxhdGVTaGlwcGluZyhjYXJ0LCBzaGlwcGluZyk7XG4gICAgICBjYXJ0LnN1YnRvdGFsID0gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgICAgIGNhcnQudG90YWwgPSAoc3VidG90YWwgKyBjYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgICAkbG9nLmRlYnVnKFwiQ2FydCBsb2FkZWQgb3IgdXBkYXRlZFwiLCBjYXJ0KTtcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBheXBhbChjYXJ0SXRlbXMpe1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYXJ0SXRlbXMubGVuZ3RoOyBpICsrKXtcbiAgICAgIHZhciBpdGVtTnVtYmVyID0gKGkgKyAxKTtcbiAgICAgIGNhcnRJdGVtc1tpXS5wYXlwYWwgPSB7XG4gICAgICAgIGl0ZW0gOiBcIml0ZW1fbmFtZV9cIiArIGl0ZW1OdW1iZXIsXG4gICAgICAgIGFtb3VudDogXCJhbW91bnRfXCIrIGl0ZW1OdW1iZXIsXG4gICAgICAgIHF1YW50aXR5OiBcInF1YW50aXR5X1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgc2hpcHBpbmcgOiBcInNoaXBwaW5nX1wiICsgaXRlbU51bWJlclxuICAgICAgfTtcbiAgICB9XG5cbiAgICAkbG9nLmRlYnVnKFwiYWRkaW5nIHBheXBhbCBpbmZvXCIsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0SXRlbXMsXG4gICAgZ2V0U2luZ2xlSXRlbSxcbiAgICBnZXRDYXJ0LFxuICAgIHNldENhcnQsXG4gICAgdXBkYXRlQ2FydCxcbiAgICAvLyBnZXRTaGlwcGluZ1RpZXJzLFxuICAgIC8vIGNhbGN1bGF0ZVNoaXBwaW5nLFxuICAgIGNhcnRXYXRjaFxuICB9O1xuXG5cbn07XG5cbkNhcnRTZXJ2aWNlLiRpbmplY3QgPSBbJyRjb29raWVzJywgJyRzdGF0ZScsICckcm9vdFNjb3BlJywgJyRodHRwJywgJyRsb2cnLCAnQVBJJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRTZXJ2aWNlO1xuIiwibGV0IFRlc3RpbW9uaWFsU2VydmljZSA9IGZ1bmN0aW9uKCRodHRwLCBBUEkpe1xuXG4gIGZ1bmN0aW9uIGdldFRlc3RpbW9uaWFscygpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzYCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaW5nbGVUZXN0aW1vbmlhbCh0ZXN0aW1vbmlhbElkKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L3Rlc3RpbW9uaWFscy8ke3Rlc3RpbW9uaWFsSWR9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUZXN0aW1vbmlhbCh0ZXN0aW1vbmlhbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzYCwgdGVzdGltb25pYWwpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRUZXN0aW1vbmlhbHMsXG4gICAgZ2V0U2luZ2xlVGVzdGltb25pYWwsXG4gICAgYWRkVGVzdGltb25pYWxcbiAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBUZXN0aW1vbmlhbFNlcnZpY2U7XG4iLCJsZXQgVXNlclNlcnZpY2UgPSBmdW5jdGlvbigkaHR0cCwgQVBJLCAkY29va2llcywgJHN0YXRlLCAkcm9vdFNjb3BlLCAkbG9nKXtcblxuICBmdW5jdGlvbiBnZXRVc2VySW5mbygpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vbWVgLCBBUEkuQ09ORklHKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVXNlcigpe1xuICAgIGNvbnN0XG4gICAgICB0b2tlbiA9ICRjb29raWVzLmdldCgndG9rZW4nKSxcbiAgICAgIHVzZXJuYW1lID0gJGNvb2tpZXMuZ2V0KCd1c2VybmFtZScpO1xuICAgIGlmKHRva2VuICYmIHVzZXJuYW1lKXtcbiAgICAgIF9zZXRUb2tlbih0b2tlbiwgdXNlcm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRUb2tlbih0b2tlbiwgdXNlcm5hbWUpe1xuICAgIGlmICh0b2tlbikge1xuICAgICAgQVBJLkNPTkZJRy5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddID0gdG9rZW47XG4gICAgICAkcm9vdFNjb3BlLmlzVXNlckxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgIGlmICh1c2VybmFtZSkge1xuICAgICAgICAkcm9vdFNjb3BlLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAkcm9vdFNjb3BlLmlzVXNlckxvZ2dlZEluID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2hvbGVzYWxlUmVxdWVzdChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vY29udGFjdC93aG9sZXNhbGVgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWN0KGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS9jb250YWN0YCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9naW4odXNlcil7XG4gICAgJGh0dHAucG9zdChgJHtBUEkuVVJMfS9hdXRoZW50aWNhdGVgLCB1c2VyKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgX3N1Y2Nlc3NMb2coZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmVycm9yKChkYXRhKSA9PiB7XG4gICAgICAgICRyb290U2NvcGUuZmFpbGVkTG9naW5NZXNzYWdlID0gYCR7ZGF0YX1gO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfc3VjY2Vzc0xvZyhkYXRhKXtcbiAgICAkY29va2llcy5wdXQoJ3Rva2VuJywgZGF0YS50b2tlbik7XG4gICAgJGNvb2tpZXMucHV0KCd1c2VySWQnLCBkYXRhLmlkKTtcbiAgICBfc2V0VG9rZW4oZGF0YS50b2tlbik7XG4gICAgZ2V0VXNlckluZm8oKVxuICAgICAgLnN1Y2Nlc3MoKHVzZXJEYXRhKSA9PntcbiAgICAgICAgJGxvZy5kZWJ1ZygnVXNlciBkYXRhIGZyb20gbG9naW4nLCB1c2VyRGF0YSk7XG4gICAgICAgICRjb29raWVzLnB1dE9iamVjdCgnaXRlbXMnLCB7aXRlbXM6IHVzZXJEYXRhLml0ZW1zfSk7XG4gICAgICAgICRjb29raWVzLnB1dCgndXNlcm5hbWUnLCB1c2VyRGF0YS51c2VybmFtZSk7XG4gICAgICAgICRsb2cuZGVidWcoJ0xvZ2dlZCBpbiEnLCBkYXRhKTtcbiAgICAgICAgJHN0YXRlLmdvKCdidXlXaG9sZXNhbGUnKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gX3VwZGF0ZVVzZXIodXNlcklkLCB1c2VyKXtcbiAgICByZXR1cm4gJGh0dHAucHV0KGAke0FQSS5VUkx9L3VzZXJzLyR7dXNlcklkfWAsIHVzZXIsIEFQSS5DT05GSUcpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9nT3V0KCl7XG4gICAgJGNvb2tpZXMucmVtb3ZlKCd0b2tlbicpO1xuICAgICRjb29raWVzLnJlbW92ZSgnaXRlbXMnKTtcbiAgICAkY29va2llcy5yZW1vdmUoJ3VzZXJJZCcpO1xuICAgICRjb29raWVzLnJlbW92ZSgndXNlcm5hbWUnKTtcbiAgICBfc2V0VG9rZW4oKTtcbiAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9nZXRVc2VyKHVzZXJJZCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gLCBBUEkuQ09ORklHKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcmdvdFBhc3N3b3JkKGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS9mb3Jnb3RQYXNzd29yZGAsIGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVVc2VyKHVzZXJJZCl7XG4gICAgcmV0dXJuICRodHRwLmRlbGV0ZShgJHtBUEkuVVJMfS91c2Vycy8ke3VzZXJJZH1gKTtcbiAgfVxuXG4gIHJldHVybntcbiAgICBjaGVja1VzZXIsXG4gICAgd2hvbGVzYWxlUmVxdWVzdCxcbiAgICBjb250YWN0LFxuICAgIGxvZ2luLFxuICAgIGxvZ091dCxcbiAgICBfdXBkYXRlVXNlcixcbiAgICBfZ2V0VXNlcixcbiAgICBfZGVsZXRlVXNlcixcbiAgICBmb3Jnb3RQYXNzd29yZCxcbiAgICBnZXRVc2VySW5mb1xuXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyU2VydmljZTtcbiJdfQ==
