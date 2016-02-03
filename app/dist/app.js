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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9jb250cm9sbGVycy9Vc2VyQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9jb250cm9sbGVycy9XaG9sZXNhbGVDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2RpcmVjdGl2ZXMvbG9hZGluZy5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL0NhcnRTZXJ2aWNlLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZS5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9zZXJ2aWNlcy9Vc2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsU0FBUyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRTtBQUNwRixjQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVoQyxvQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWxDLGdCQUFjLENBQ1gsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNiLE9BQUcsRUFBRSxHQUFHO0FBQ1IsZUFBVyxFQUFFLDRCQUE0QjtBQUN6QyxjQUFVLEVBQUUsZ0JBQWdCO0dBQzdCLENBQUMsQ0FDRCxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ1osT0FBRyxFQUFFLE1BQU07QUFDWCxlQUFXLEVBQUUsMkJBQTJCO0FBQ3hDLGNBQVUsRUFBRSxTQUFTO0dBQ3RCLENBQUMsQ0FDRCxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ2QsT0FBRyxFQUFFLFFBQVE7QUFDYixlQUFXLEVBQUUsNkJBQTZCO0FBQzFDLGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDckIsT0FBRyxFQUFFLGVBQWU7QUFDcEIsZUFBVyxFQUFFLG9DQUFvQztBQUNqRCxjQUFVLEVBQUUsdUJBQXVCO0dBQ3BDLENBQUMsQ0FDRCxLQUFLLENBQUMsa0JBQWtCLEVBQUU7QUFDekIsT0FBRyxFQUFFLE1BQU07QUFDWCxlQUFXLEVBQUUsd0NBQXdDO0FBQ3JELGNBQVUsRUFBRSx1QkFBdUI7R0FDcEMsQ0FBQyxDQUNELEtBQUssQ0FBQyxxQkFBcUIsRUFBRTtBQUM1QixPQUFHLEVBQUUsTUFBTTtBQUNYLGVBQVcsRUFBRSwyQ0FBMkM7QUFDeEQsY0FBVSxFQUFFLHVCQUF1QjtHQUNwQyxDQUFDLENBQ0QsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUNoQixPQUFHLEVBQUUsVUFBVTtBQUNmLGVBQVcsRUFBRSwrQkFBK0I7QUFDNUMsY0FBVSxFQUFFLGlCQUFpQjtHQUM5QixDQUFDLENBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUNmLE9BQUcsRUFBRSxTQUFTO0FBQ2QsZUFBVyxFQUFFLDhCQUE4QjtBQUMzQyxjQUFVLEVBQUUsaUJBQWlCO0dBQzlCLENBQUMsQ0FDRCxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQ2hCLE9BQUcsRUFBRSxVQUFVO0FBQ2YsZUFBVyxFQUFFLCtCQUErQjtBQUM1QyxjQUFVLEVBQUUsZ0JBQWdCO0dBQzdCLENBQUMsQ0FDRCxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ2YsT0FBRyxFQUFFLFNBQVM7QUFDZCxlQUFXLEVBQUUsOEJBQThCO0FBQzNDLGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDYixPQUFHLEVBQUUsT0FBTztBQUNaLGVBQVcsRUFBRSw0QkFBNEI7QUFDekMsY0FBVSxFQUFFLGdCQUFnQjtHQUM3QixDQUFDLENBQ0QsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUNoQixPQUFHLEVBQUUsVUFBVTtBQUNmLGVBQVcsRUFBRSwrQkFBK0I7QUFDNUMsY0FBVSxFQUFFLGFBQWE7R0FDMUIsQ0FBQyxDQUNELEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtBQUN6QixPQUFHLEVBQUUsbUJBQW1CO0FBQ3hCLGVBQVcsRUFBRSx3Q0FBd0M7QUFDckQsY0FBVSxFQUFFLGFBQWE7R0FDMUIsQ0FBQyxDQUNELEtBQUssQ0FBQyxjQUFjLEVBQUU7QUFDckIsT0FBRyxFQUFFLGVBQWU7QUFDcEIsZUFBVyxFQUFFLG9DQUFvQztBQUNqRCxjQUFVLEVBQUUscUJBQXFCO0dBQ2xDLENBQUMsQ0FDRCxLQUFLLENBQUMsbUJBQW1CLEVBQUU7QUFDMUIsT0FBRyxFQUFFLGNBQWM7QUFDbkIsZUFBVyxFQUFFLDRCQUE0QjtBQUN6QyxjQUFVLEVBQUUsZ0JBQWdCO0dBQzdCLENBQUMsQ0FBQztDQUVOOztBQUVELFNBQVMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDO0FBQ2hELFlBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsWUFBWTtBQUM5QyxlQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDeEIsY0FBVSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7R0FDekMsQ0FBQyxDQUFDO0NBQ0o7O0FBRUQsSUFBTSxNQUFNLEdBQUc7QUFDVCxVQUFRLEVBQUUsNEJBQTRCO0FBQ3RDLFVBQVEsRUFBRSxrQkFBa0I7QUFDNUIsWUFBVSxFQUFFLGVBQWU7QUFDM0IsV0FBUyxFQUFFLDBEQUEwRDtDQUMxRSxDQUFDOztBQUVGLElBQU0sR0FBRyxHQUFHO0FBQ1YsS0FBRyxFQUFFLG9DQUFvQztBQUN6QyxRQUFNLEVBQUU7QUFDTixXQUFPLEVBQUMsRUFFUDtHQUNGO0NBQ0YsQ0FBQztRQUVBLE1BQU0sR0FBTixNQUFNO1FBQ04sTUFBTSxHQUFOLE1BQU07UUFDTixHQUFHLEdBQUgsR0FBRztRQUNILEdBQUcsR0FBSCxHQUFHOzs7Ozs7OztBQzlHTCxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFDOztBQUVqRSxRQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7QUFFdEIsYUFBVyxDQUFDLFFBQVEsRUFBRSxDQUNuQixPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUk7QUFDbEIsUUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEIsUUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBSztBQUMvQixPQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDdEIsYUFBTyxDQUFDLENBQUM7S0FDVixDQUFDLENBQUM7O0FBRUgsVUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7QUFDeEIsVUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7R0FDeEIsQ0FBQyxDQUNELEtBQUssQ0FBQyxZQUFNO0FBQ1gsVUFBTSxDQUFDLEtBQUssR0FBRyxDQUNiO0FBQ0UsV0FBSyxFQUFFLDRCQUE0QjtBQUNuQyxlQUFTLEVBQUUsS0FBSztBQUNoQixXQUFLLEVBQUUsS0FBSztBQUNaLGtCQUFZLEVBQUUsQ0FDWjtBQUNFLGFBQUssRUFBRSxLQUFLO0FBQ1osZ0JBQVEsRUFBRSxDQUFDO09BQ1osRUFDRDtBQUNFLGFBQUssRUFBRSxLQUFLO0FBQ1osZ0JBQVEsRUFBRSxFQUFFO09BQ2IsRUFDRDtBQUNFLGFBQUssRUFBRSxLQUFLO0FBQ1osZ0JBQVEsRUFBRSxFQUFFO09BQ2IsQ0FDRjtLQUNGLENBQ0YsQ0FBQztBQUNGLFFBQUksQ0FBQyxLQUFLLENBQUMsa0RBQWtELEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzlFLENBQUMsQ0FBQzs7QUFHTCxRQUFNLENBQUMsYUFBYSxHQUFHLFVBQVMsSUFBSSxFQUFFOztBQUVwQyxRQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUM7QUFDL0MsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUN6QyxNQUFLLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUM7QUFDbEcsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUN6QyxNQUFLLElBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBQztBQUNyRCxVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ3pDO0dBRUYsQ0FBQzs7QUFHRixRQUFNLENBQUMsU0FBUyxHQUFHLFVBQVMsSUFBSSxFQUFFLEtBQUssRUFBQztBQUN0QyxlQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztHQUNsQyxDQUFDO0NBRUg7cUJBQ2MsYUFBYTs7Ozs7Ozs7O0FDM0Q1QixJQUFJLGNBQWMsR0FBRyxTQUFqQixjQUFjLENBQVksTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDOzs7Ozs7QUFTbEUsUUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFTLElBQUksRUFBQztBQUNqQyxRQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFbEMsVUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4RCxlQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUMsY0FBVSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7R0FDeEMsQ0FBQzs7QUFFRixRQUFNLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFDO0FBQzlCLGVBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDNUIsQ0FBQztDQUlILENBQUM7O0FBRUYsY0FBYyxDQUFDLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztxQkFFMUQsY0FBYzs7Ozs7Ozs7O0FDM0I3QixTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUM7O0FBRTdDLFFBQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxJQUFJLEVBQUM7QUFDaEMsVUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O0FBRXRCLFFBQU0sT0FBTyxXQUFTLElBQUksQ0FBQyxPQUFPLG1CQUM3QixJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxRQUFRLG1CQUMvQixJQUFJLENBQUMsS0FBSyxtQkFDVixJQUFJLENBQUMsS0FBSyxTQUFNLENBQUM7QUFDdEIsUUFBTSxLQUFLLEdBQUc7QUFDWixhQUFPLEVBQVAsT0FBTztBQUNQLFVBQUksRUFBRSxPQUFPO0FBQ2IsVUFBSSxFQUFFLDJCQUEyQjtBQUNqQyxjQUFRLEVBQUUsZ0JBQWdCO0FBQzFCLGFBQU8sRUFBRSxxQ0FBcUM7S0FDL0MsQ0FBQzs7QUFFRixlQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUN2QixPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDakIsWUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDdkIsWUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQy9CLENBQUMsQ0FDRCxLQUFLLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDZixZQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUN2QixZQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDL0IsQ0FBQyxDQUFDO0dBQ04sQ0FBQzs7QUFFRixRQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsMEVBQTBFLEdBQ2pGLDZFQUE2RSxHQUM3RSxJQUFJLENBQUEsQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxFQUFFO0FBQUUsV0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztHQUFFLENBQUMsQ0FBQzs7QUFFL0UsUUFBTSxDQUFDLGdCQUFnQixHQUFHLFVBQVMsT0FBTyxFQUFDO0FBQ3pDLFVBQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOztBQUV2QixRQUFNLE9BQU8seUhBRUEsT0FBTyxDQUFDLEtBQUssbUJBQ3BCLE9BQU8sQ0FBQyxJQUFJLFVBQUssT0FBTyxDQUFDLEtBQUssU0FBSSxPQUFPLENBQUMsR0FBRyxtRkFFdEIsT0FBTyxDQUFDLFNBQVMsU0FBSSxPQUFPLENBQUMsUUFBUSwyQ0FDcEMsT0FBTyxDQUFDLEtBQUssMkNBQ2IsT0FBTyxDQUFDLEtBQUsscURBQ0gsT0FBTyxDQUFDLE9BQU8sdU5BRThCLENBQUM7O0FBRXJGLFFBQU0sS0FBSyxHQUFHO0FBQ1osYUFBTyxFQUFQLE9BQU87QUFDUCxVQUFJLEVBQUUsT0FBTztLQUNkLENBQUM7O0FBRUYsZUFBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUNoQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDakIsWUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDdkIsWUFBTSxDQUFDLE9BQU8sR0FBRyw2RUFBNkUsQ0FBQztLQUNoRyxDQUFDLENBQ0QsS0FBSyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2YsWUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDdkIsWUFBTSxDQUFDLE9BQU8sR0FBRyxpRkFBaUYsQ0FBQztLQUNwRyxDQUFDLENBQUM7R0FDTixDQUFDO0NBRUg7O3FCQUVjLGlCQUFpQjs7Ozs7Ozs7O0FDakVoQyxTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQztBQUM5RyxHQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7QUFFbkMsUUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFTLFdBQVcsRUFBRSxFQUFFLEVBQUU7QUFDeEMsZUFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQ2pCLENBQUM7O0FBRUgsUUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsWUFBVztBQUM5QixRQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDakIsUUFBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDOztBQUU3QixVQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7QUFDOUIsY0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQ3ZDLGtCQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFCLENBQUMsQ0FBQzs7QUFFSCxjQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTlELGNBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJLEVBQUk7QUFDOUQsaUJBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQztPQUVQO0FBQ0QsWUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDOztBQUV2QixZQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNDLFlBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqRSxVQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNyRDtHQUVGLEVBQUUsSUFBSSxDQUFDLENBQUM7OztBQUlULFFBQU0sQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLFFBQU0sQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLE1BQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2xDLE1BQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7Ozs7OztBQVFwQyxXQUFTLFlBQVksQ0FBQyxLQUFLLEVBQUU7QUFDM0IsUUFBSSxVQUFVLEdBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFNO0FBQ25DLGdCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDOUIsRUFBQyxHQUFHLENBQUMsQ0FBQztBQUNULFdBQU8sVUFBVSxDQUFDO0dBQ25COzs7QUFJRCxRQUFNLENBQUMsVUFBVSxHQUFHLFVBQVMsS0FBSyxFQUFFLEdBQUcsRUFBQztBQUN0QyxLQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDaEQsS0FBQyxDQUFDLEdBQUcsR0FBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN6QyxVQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQzVCLFVBQUksR0FBRyxJQUFJLE1BQU0sRUFBQztBQUNoQixjQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDcEIsWUFBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQzlCLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztPQUN4QixNQUFLLElBQUcsR0FBRyxJQUFJLE9BQU8sRUFBQztBQUN0QixjQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDckIsWUFBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQzdCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztPQUN2QjtLQUFDLENBQUMsQ0FBQztHQUVMLENBQUM7O0FBRUYsUUFBTSxDQUFDLFlBQVksR0FBRyxVQUFTLEVBQUUsRUFBRTtBQUNqQyxhQUFTLENBQUMsSUFBSSxDQUFDO0FBQ2IsZ0JBQVUsRUFBRSxVQUFVO0FBQ3RCLGlCQUFXLEVBQUUsZ0NBQWdDO0FBQzdDLFlBQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDdEMsaUJBQVcsRUFBRSxFQUFFO0FBQ2YseUJBQW1CLEVBQUUsSUFBSTtLQUMxQixDQUFDLENBQUM7R0FDSixDQUFDO0FBQ0YsUUFBTSxDQUFDLFlBQVksR0FBRyxVQUFTLEVBQUUsRUFBRTtBQUNqQyxhQUFTLENBQUMsSUFBSSxDQUFDO0FBQ2IsZ0JBQVUsRUFBRSxVQUFVO0FBQ3RCLGlCQUFXLEVBQUUsZ0NBQWdDO0FBQzdDLFlBQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDdEMsaUJBQVcsRUFBRSxFQUFFO0FBQ2YseUJBQW1CLEVBQUUsSUFBSTtLQUMxQixDQUFDLENBQUM7R0FDSixDQUFDOztBQUVGLFFBQU0sQ0FBQyxTQUFTLEdBQUcsVUFBUyxPQUFPLEVBQUMsRUFFbkMsQ0FBQztDQUNIOztBQUdELFNBQVMsU0FBUyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUM7QUFDcEMsUUFBTSxDQUFDLEtBQUssR0FBRyxZQUFZO0FBQ3pCLGNBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUM3QixDQUFDO0NBR0g7QUFDRCxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFDO0FBQ25DLFFBQU0sQ0FBQyxLQUFLLEdBQUcsWUFBWTtBQUN6QixjQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7R0FDNUIsQ0FBQztDQUVIOztBQUVELFNBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUM7QUFDcEMsUUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFXO0FBQ3pCLGFBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztHQUNwQixDQUFDOztBQUVGLFFBQU0sQ0FBQyxJQUFJLEdBQUcsWUFBVztBQUN2QixhQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDbEIsQ0FBQztDQUNIOztRQUdDLGNBQWMsR0FBZCxjQUFjO1FBQ2QsU0FBUyxHQUFULFNBQVM7UUFDVCxRQUFRLEdBQVIsUUFBUTtRQUNSLFVBQVUsR0FBVixVQUFVOzs7Ozs7OztBQzVIWixTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUM7O0FBRTVCLFFBQU0sQ0FBQyxJQUFJLEdBQUcsWUFBVTtBQUN0QixXQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0dBQ3ZCLENBQUM7O0FBRUYsUUFBTSxDQUFDLE1BQU0sR0FBRyxDQUNkO0FBQ0UsU0FBSyxFQUFFLDBDQUEwQztBQUNqRCxPQUFHLEVBQUUsdUNBQXVDO0FBQzVDLGVBQVcsRUFBRSxFQUFFO0dBQ2hCLEVBQ0Q7QUFDRSxTQUFLLEVBQUUsdUNBQXVDO0FBQzlDLE9BQUcsRUFBRSxvQ0FBb0M7QUFDekMsZUFBVyxFQUFFLEVBQUU7R0FDaEIsRUFDRDtBQUNFLFNBQUssRUFBRSxzQ0FBc0M7QUFDN0MsT0FBRyxFQUFFLG1DQUFtQztBQUN4QyxlQUFXLEVBQUUsRUFBRTtHQUNoQjs7Ozs7O0FBTUQ7QUFDRSxTQUFLLEVBQUUsNENBQTRDO0FBQ25ELE9BQUcsRUFBRSx5Q0FBeUM7QUFDOUMsZUFBVyxFQUFFLEVBQUU7R0FDaEIsRUFDRDtBQUNFLFNBQUssRUFBRSw0Q0FBNEM7QUFDbkQsT0FBRyxFQUFFLHlDQUF5QztBQUM5QyxlQUFXLEVBQUUsRUFBRTtHQUNoQixFQUNEO0FBQ0UsU0FBSyxFQUFFLDRDQUE0QztBQUNuRCxPQUFHLEVBQUUseUNBQXlDO0FBQzlDLGVBQVcsRUFBRSxFQUFFO0dBQ2hCLEVBQ0Q7QUFDRSxTQUFLLEVBQUUsNENBQTRDO0FBQ25ELE9BQUcsRUFBRSx5Q0FBeUM7QUFDOUMsZUFBVyxFQUFFLEVBQUU7R0FDaEIsRUFDRDtBQUNFLFNBQUssRUFBRSw0Q0FBNEM7QUFDbkQsT0FBRyxFQUFFLHlDQUF5QztBQUM5QyxlQUFXLEVBQUUsRUFBRTtHQUNoQixDQUNGLENBQUM7Q0FFTDs7cUJBRWMsZUFBZTs7Ozs7Ozs7O0FDeEQ5QixTQUFTLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO0FBQ3RFLFFBQU0sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7O0FBRWxDLG9CQUFrQixDQUFDLGVBQWUsRUFBRSxDQUNqQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUk7QUFDaEIsVUFBTSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztBQUNuQyxVQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztBQUMzQixRQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7R0FDakQsQ0FBQyxDQUNELEtBQUssQ0FBQyxVQUFDLElBQUksRUFBSTtBQUNkLFVBQU0sQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDbkMsVUFBTSxDQUFDLFlBQVksR0FBRyxrRkFBa0YsQ0FBQztHQUMxRyxDQUFDLENBQUM7QUFDTCxRQUFNLENBQUMsVUFBVSxHQUFHLFVBQVMsRUFBRSxFQUFDO0FBQy9CLFVBQU0sQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUUsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztHQUMzQyxDQUFDO0FBQ0YsUUFBTSxDQUFDLGNBQWMsR0FBRyxVQUFTLFdBQVcsRUFBQztBQUMzQyxVQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQ2hDLGVBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUM5QixzQkFBa0IsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQzNDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSTtBQUNsQixZQUFNLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQy9CLFlBQU0sQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQy9DLENBQUMsQ0FBQztHQUNKLENBQUM7Q0FDSDs7QUFFRCxTQUFTLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDO0FBQzVFLE1BQU0sRUFBRSxHQUFHLFlBQVksQ0FBQyxFQUFFLENBQUM7QUFDM0IsUUFBTSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUNqQyxvQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FDeEMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2pCLFVBQU0sQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDbEMsVUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDMUIsUUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDakMsQ0FBQyxDQUNELEtBQUssQ0FBQyxVQUFDLElBQUksRUFBSTtBQUNkLFVBQU0sQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDbEMsVUFBTSxDQUFDLFlBQVksR0FBRyxzRkFBc0YsQ0FBQztHQUM5RyxDQUFDLENBQUM7Q0FDTjs7UUFHQyxxQkFBcUIsR0FBckIscUJBQXFCO1FBQ3JCLHFCQUFxQixHQUFyQixxQkFBcUI7Ozs7Ozs7O0FDNUN2QixTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUM7QUFDeEQsUUFBTSxDQUFDLGtCQUFrQixHQUFHLFVBQVMsYUFBYSxFQUFFO0FBQ2xELGVBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDbEMsQ0FBQztBQUNGLFFBQU0sQ0FBQyxRQUFRLEdBQUcsVUFBUyxJQUFJLEVBQUU7QUFDL0IsZUFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUNwQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDakIsWUFBTSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUMzQixDQUFDLENBQUM7R0FDTixDQUFDO0FBQ0YsUUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFXO0FBQ3pCLGVBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztHQUN0QixDQUFDO0NBQ0g7cUJBQ2MsY0FBYzs7Ozs7Ozs7O0FDZDdCLFNBQVMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7O0FBRXBGLE1BQ0ksRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQzNCLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUM3QixTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7O0FBRWxELE1BQUksRUFBRSxJQUFJLEtBQUssRUFBRTtBQUNmLGVBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQ3JCLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUNuQixZQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUN2QixVQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMvQixDQUFDLENBQUM7QUFDSCxRQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2QsaUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FDdEIsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFJO0FBQ2xCLGdCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsWUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsY0FBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO09BQy9CLENBQUMsQ0FBQztLQUNKLE1BQU07QUFDTCxZQUFNLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUM5QjtBQUNELGVBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FDbkIsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2pCLFVBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEMsWUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ3BDLFlBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQztpQkFBSyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxHQUFHO1NBQUEsQ0FBQyxDQUFDO0FBQ3JFLGdCQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDNUIsZ0JBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNwQyxlQUFPLFFBQVEsQ0FBQztPQUNqQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7QUFDTCxRQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztHQUNyQyxNQUFNO0FBQ0wsVUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUNuQjs7QUFFRCxRQUFNLENBQUMsU0FBUyxHQUFHLFVBQVMsSUFBSSxFQUFDO0FBQy9CLGVBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDM0IsQ0FBQzs7QUFFRixRQUFNLENBQUMsV0FBVyxHQUFHLFlBQVU7QUFDN0IsVUFBTSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0dBQ2hDLENBQUM7Q0FFSDs7cUJBRWMsbUJBQW1COzs7Ozs7Ozs7QUNoRGxDLFNBQVMsT0FBTyxHQUFFO0FBQ2hCLFNBQU87QUFDTCxZQUFRLEVBQUUsR0FBRztBQUNiLGVBQVcsRUFBRSwyQkFBMkI7R0FDekMsQ0FBQztDQUNIO3FCQUNjLE9BQU87Ozs7Ozs7O3NCQ05pQixVQUFVOzt5Q0FDZSw4QkFBOEI7O3dDQUNwRSw2QkFBNkI7Ozs7MENBQzNCLCtCQUErQjs7Ozt5Q0FDaEMsOEJBQThCOzs7OzRDQUMzQixpQ0FBaUM7Ozs7eUNBQ3BDLDhCQUE4Qjs7Ozs4Q0FDekIsbUNBQW1DOzs7O2dEQUNOLHFDQUFxQzs7bUNBQzFFLHdCQUF3Qjs7OzswQ0FDakIsK0JBQStCOzs7O21DQUN0Qyx3QkFBd0I7Ozs7aUNBQzVCLHNCQUFzQjs7OztBQUMxQyxPQUFPLENBQ04sTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFHLFdBQVcsQ0FBQyxDQUFDLENBQ3pFLE1BQU0sZ0JBQVEsQ0FDZCxRQUFRLENBQUMsUUFBUSxpQkFBUyxDQUMxQixRQUFRLENBQUMsS0FBSyxjQUFNLENBQ3BCLEdBQUcsYUFBSyxDQUNSLFNBQVMsQ0FBQyxVQUFVLEVBQUUsZ0NBQVMsQ0FBQyxDQUNoQyxPQUFPLENBQUMsYUFBYSxtQ0FBYyxDQUNuQyxPQUFPLENBQUMsb0JBQW9CLDBDQUFxQixDQUNqRCxPQUFPLENBQUMsYUFBYSxtQ0FBYyxDQUNuQyxVQUFVLENBQUMsZ0JBQWdCLDRDQUFpQixDQUM1QyxVQUFVLENBQUMsVUFBVSxzQ0FBVyxDQUNoQyxVQUFVLENBQUMsV0FBVyx1Q0FBWSxDQUNsQyxVQUFVLENBQUMsWUFBWSx3Q0FBYSxDQUNwQyxVQUFVLENBQUMsU0FBUyx3Q0FBZ0IsQ0FDcEMsVUFBVSxDQUFDLHFCQUFxQiw4Q0FBc0IsQ0FDdEQsVUFBVSxDQUFDLGlCQUFpQiwwQ0FBa0IsQ0FDOUMsVUFBVSxDQUFDLGdCQUFnQix5Q0FBaUIsQ0FDNUMsVUFBVSxDQUFDLGdCQUFnQix5Q0FBaUIsQ0FDNUMsVUFBVSxDQUFDLGFBQWEsNENBQW9CLENBQzVDLFVBQVUsQ0FBQyx1QkFBdUIsMERBQXdCLENBQzFELFVBQVUsQ0FBQyx1QkFBdUIsMERBQXdCLENBQUM7Ozs7Ozs7O0FDbEM1RCxJQUFJLFdBQVcsR0FBRyxTQUFkLFdBQVcsQ0FBWSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQzs7QUFFeEUsTUFBTSxNQUFNLEdBQUcsdUNBQXVDLENBQUM7Ozs7QUFJdkQsV0FBUyxJQUFJLENBQUMsT0FBTyxFQUFDO0FBQ3BCLFFBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUMzQixRQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDM0IsUUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ2pDLFFBQUksQ0FBQyxLQUFLLEdBQUcsWUFBVTtBQUNyQixhQUFPLEFBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFLLENBQUMsQ0FBQztLQUMxQyxDQUFDO0dBRUg7O0FBRUQsV0FBUyxRQUFRLEdBQUU7QUFDakIsV0FBTyxLQUFLLENBQUMsR0FBRyxDQUFJLEdBQUcsQ0FBQyxHQUFHLFlBQVMsQ0FBQztHQUN0Qzs7QUFFRCxXQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUM7QUFDMUIsV0FBTyxLQUFLLENBQUMsR0FBRyxDQUFJLEdBQUcsQ0FBQyxHQUFHLGVBQVUsSUFBSSxDQUFHLENBQUM7R0FDOUM7O0FBRUQsV0FBUyxPQUFPLEdBQUU7QUFDaEIsUUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxRQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO0FBQ2xDLGdCQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUMzQixhQUFPLEVBQUUsQ0FBQztLQUNYO0FBQ0QsY0FBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDMUIsUUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBSztBQUNyQyxVQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixhQUFPLFFBQVEsQ0FBQztLQUNqQixDQUFDLENBQUM7O0FBRUgsUUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUV2QyxRQUFJLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWQsUUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7QUFDekIsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJLEVBQUk7QUFDaEQsYUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVSLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBRUQsV0FBUyxPQUFPLENBQUMsSUFBSSxFQUFDO0FBQ3BCLGNBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFFBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsUUFBRyxDQUFDLElBQUksRUFBQztBQUNQLFVBQUksR0FBRyxFQUFFLENBQUM7S0FDWDs7QUFFRCxRQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEQsUUFBRyxhQUFhLEVBQUM7QUFDZixVQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDdEMsbUJBQWEsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2hFLFVBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDMUIsTUFBSTtBQUNILFVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakI7QUFDRCxZQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqQyxRQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QyxLQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDaEQsS0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RDLFVBQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDbkI7O0FBRUQsV0FBUyxVQUFVLENBQUMsS0FBSyxFQUFDO0FBQ3hCLFFBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUVuQyxRQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsWUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDdEMsV0FBTyxTQUFTLENBQUM7R0FDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDRCxXQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ2pDLFFBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNqQixRQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQzs7QUFFbEIsVUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7QUFDdkIsWUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFJLEVBQUU7QUFDaEMsa0JBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUIsWUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJLEVBQUk7QUFDaEQsaUJBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQztPQUNQOztBQUVELFVBQUksQ0FBQyxRQUFRLEdBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ25ELFVBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxVQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUEsQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRW5ELFVBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDNUM7R0FFRjs7QUFFRCxXQUFTLFNBQVMsQ0FBQyxTQUFTLEVBQUM7QUFDM0IsU0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUM7QUFDeEMsVUFBSSxVQUFVLEdBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxDQUFDO0FBQ3pCLGVBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUc7QUFDcEIsWUFBSSxFQUFHLFlBQVksR0FBRyxVQUFVO0FBQ2hDLGNBQU0sRUFBRSxTQUFTLEdBQUUsVUFBVTtBQUM3QixnQkFBUSxFQUFFLFdBQVcsR0FBRyxVQUFVO0FBQ2xDLGdCQUFRLEVBQUcsV0FBVyxHQUFHLFVBQVU7T0FDcEMsQ0FBQztLQUNIOztBQUVELFFBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDNUMsV0FBTyxTQUFTLENBQUM7R0FDbEI7O0FBRUQsU0FBTztBQUNMLFlBQVEsRUFBUixRQUFRO0FBQ1IsaUJBQWEsRUFBYixhQUFhO0FBQ2IsV0FBTyxFQUFQLE9BQU87QUFDUCxXQUFPLEVBQVAsT0FBTztBQUNQLGNBQVUsRUFBVixVQUFVOzs7QUFHVixhQUFTLEVBQVQsU0FBUztHQUNWLENBQUM7Q0FHSCxDQUFDOztBQUVGLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDOztxQkFFcEUsV0FBVzs7Ozs7Ozs7O0FDNUsxQixJQUFJLGtCQUFrQixHQUFHLFNBQXJCLGtCQUFrQixDQUFZLEtBQUssRUFBRSxHQUFHLEVBQUM7O0FBRTNDLFdBQVMsZUFBZSxHQUFFO0FBQ3hCLFdBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBSSxHQUFHLENBQUMsR0FBRyxtQkFBZ0IsQ0FBQztHQUM3Qzs7QUFFRCxXQUFTLG9CQUFvQixDQUFDLGFBQWEsRUFBQztBQUMxQyxXQUFPLEtBQUssQ0FBQyxHQUFHLENBQUksR0FBRyxDQUFDLEdBQUcsc0JBQWlCLGFBQWEsQ0FBRyxDQUFDO0dBQzlEOztBQUVELFdBQVMsY0FBYyxDQUFDLFdBQVcsRUFBQztBQUNsQyxXQUFPLEtBQUssQ0FBQyxJQUFJLENBQUksR0FBRyxDQUFDLEdBQUcsb0JBQWlCLFdBQVcsQ0FBQyxDQUFDO0dBQzNEOztBQUVELFNBQU87QUFDTCxtQkFBZSxFQUFmLGVBQWU7QUFDZix3QkFBb0IsRUFBcEIsb0JBQW9CO0FBQ3BCLGtCQUFjLEVBQWQsY0FBYztHQUNmLENBQUM7Q0FDSCxDQUFDO3FCQUNhLGtCQUFrQjs7Ozs7Ozs7O0FDcEJqQyxJQUFJLFdBQVcsR0FBRyxTQUFkLFdBQVcsQ0FBWSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQzs7QUFFeEUsV0FBUyxXQUFXLEdBQUU7QUFDcEIsV0FBTyxLQUFLLENBQUMsR0FBRyxDQUFJLEdBQUcsQ0FBQyxHQUFHLFVBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQy9DOztBQUVELFdBQVMsU0FBUyxHQUFFO0FBQ2xCLFFBQ0UsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzdCLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLFFBQUcsS0FBSyxJQUFJLFFBQVEsRUFBQztBQUNuQixlQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzVCO0dBQ0Y7O0FBRUQsV0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQztBQUNqQyxRQUFJLEtBQUssRUFBRTtBQUNULFNBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQzdDLGdCQUFVLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztBQUNqQyxVQUFJLFFBQVEsRUFBRTtBQUNaLGtCQUFVLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztPQUNoQztLQUNGLE1BQUk7QUFDSCxnQkFBVSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7S0FDbkM7R0FDRjs7QUFFRCxXQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBQztBQUM5QixXQUFPLEtBQUssQ0FBQyxJQUFJLENBQUksR0FBRyxDQUFDLEdBQUcseUJBQXNCLEtBQUssQ0FBQyxDQUFDO0dBQzFEOztBQUVELFdBQVMsT0FBTyxDQUFDLEtBQUssRUFBQztBQUNyQixXQUFPLEtBQUssQ0FBQyxJQUFJLENBQUksR0FBRyxDQUFDLEdBQUcsZUFBWSxLQUFLLENBQUMsQ0FBQztHQUNoRDs7QUFFRCxXQUFTLEtBQUssQ0FBQyxJQUFJLEVBQUM7QUFDbEIsU0FBSyxDQUFDLElBQUksQ0FBSSxHQUFHLENBQUMsR0FBRyxvQkFBaUIsSUFBSSxDQUFDLENBQ3hDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUNqQixpQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25CLENBQUMsQ0FBQztHQUNOOztBQUVELFdBQVMsV0FBVyxDQUFDLElBQUksRUFBQztBQUN4QixZQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsWUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLGFBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEIsZUFBVyxFQUFFLENBQ1YsT0FBTyxDQUFDLFVBQUMsUUFBUSxFQUFJO0FBQ3BCLFVBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDN0MsY0FBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDckQsY0FBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLFVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9CLFlBQU0sQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDM0IsQ0FBQyxDQUFDO0dBQ047O0FBRUQsV0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBQztBQUNoQyxXQUFPLEtBQUssQ0FBQyxHQUFHLENBQUksR0FBRyxDQUFDLEdBQUcsZUFBVSxNQUFNLEVBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUNsRTs7QUFFRCxXQUFTLE1BQU0sR0FBRTtBQUNmLFlBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsWUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixZQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLFlBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUIsYUFBUyxFQUFFLENBQUM7QUFDWixVQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ25COztBQUVELFdBQVMsUUFBUSxDQUFDLE1BQU0sRUFBQztBQUN2QixXQUFPLEtBQUssQ0FBQyxHQUFHLENBQUksR0FBRyxDQUFDLEdBQUcsZUFBVSxNQUFNLEVBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQzVEOztBQUVELFdBQVMsY0FBYyxDQUFDLEtBQUssRUFBQztBQUM1QixXQUFPLEtBQUssQ0FBQyxJQUFJLENBQUksR0FBRyxDQUFDLEdBQUcsc0JBQW1CLEtBQUssQ0FBQyxDQUFDO0dBQ3ZEOztBQUVELFdBQVMsV0FBVyxDQUFDLE1BQU0sRUFBQztBQUMxQixXQUFPLEtBQUssVUFBTyxDQUFJLEdBQUcsQ0FBQyxHQUFHLGVBQVUsTUFBTSxDQUFHLENBQUM7R0FDbkQ7O0FBRUQsU0FBTTtBQUNKLGFBQVMsRUFBVCxTQUFTO0FBQ1Qsb0JBQWdCLEVBQWhCLGdCQUFnQjtBQUNoQixXQUFPLEVBQVAsT0FBTztBQUNQLFNBQUssRUFBTCxLQUFLO0FBQ0wsVUFBTSxFQUFOLE1BQU07QUFDTixlQUFXLEVBQVgsV0FBVztBQUNYLFlBQVEsRUFBUixRQUFRO0FBQ1IsZUFBVyxFQUFYLFdBQVc7QUFDWCxrQkFBYyxFQUFkLGNBQWM7QUFDZCxlQUFXLEVBQVgsV0FBVzs7R0FFWixDQUFDO0NBQ0gsQ0FBQzs7cUJBRWEsV0FBVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyLCAkbG9nUHJvdmlkZXIpIHtcbiAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcblxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2hvbWUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdidXknLCB7XG4gICAgICB1cmw6ICcvYnV5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2J1eS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQnV5Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnc3RvcnknLCB7XG4gICAgICB1cmw6ICcvc3RvcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvc3RvcnkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMnLCB7XG4gICAgICB1cmw6ICcvdGVzdGltb25pYWxzJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3Rlc3RpbW9uaWFscy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVzdGltb25pYWxDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd0ZXN0aW1vbmlhbHMuYWRkJywge1xuICAgICAgdXJsOiAnL2FkZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMuYWRkLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3Rlc3RpbW9uaWFscy5zaW5nbGUnLCB7XG4gICAgICB1cmw6ICcvOmlkJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3Rlc3RpbW9uaWFscy5zaW5nbGUudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1Rlc3RpbW9uaWFsU2luZ2xlQ3RybCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbGxlcnknLCB7XG4gICAgICB1cmw6ICcvZ2FsbGVyeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9nYWxsZXJ5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ZpZGVvcycsIHtcbiAgICAgIHVybDogJy92aWRlb3MnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdmlkZW9zLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ByaWNpbmcnLCB7XG4gICAgICB1cmw6ICcvcHJpY2luZycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9wcmljaW5nLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnZGVzaWduJywge1xuICAgICAgdXJsOiAnL2Rlc2lnbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9kZXNpZ24udHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgdXJsOiAnL2NhcnQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY2FydC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ2FydENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2NvbnRhY3QnLCB7XG4gICAgICB1cmw6ICcvY29udGFjdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9jb250YWN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnd2hvbGVzYWxlUmVxdWVzdCcsIHtcbiAgICAgIHVybDogJy93aG9sZXNhbGVSZXF1ZXN0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3dob2xlc2FsZVJlcXVlc3QudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdidXlXaG9sZXNhbGUnLCB7XG4gICAgICB1cmw6ICcvYnV5V2hvbGVzYWxlJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2J1eVdob2xlc2FsZS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnV2hvbGVzYWxlQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5V2hvbGVzYWxlLmVkaXQnLCB7XG4gICAgICB1cmw6ICcvZWRpdFByb2ZpbGUnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZWRpdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVXNlckNvbnRyb2xsZXInXG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gcnVuKENhcnRTZXJ2aWNlLCBVc2VyU2VydmljZSwgJHJvb3RTY29wZSl7XG4gICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICBVc2VyU2VydmljZS5jaGVja1VzZXIoKTtcbiAgICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG4gIH0pO1xufVxuXG5jb25zdCBwYXlwYWwgPSB7XG4gICAgICB1c2VybmFtZTogJ2FpbmVzLmtldmluX2FwaTEuZ21haWwuY29tJyxcbiAgICAgIHBhc3N3b3JkOiAnVDZYOURSMkI3N0JRNFlXSycsXG4gICAgICBjcmVkZW50aWFsOiAnQVBJIFNpZ25hdHVyZScsXG4gICAgICBzaWduYXR1cmU6ICdBRmNXeFYyMUM3ZmQwdjNiWVlZUkNwU1NSbDMxQTJFRWhBeld6bHhxLUV6RVF0b1pNcVNjUjZ4SSdcbn07XG5cbmNvbnN0IEFQSSA9IHtcbiAgVVJMOiAnaHR0cDovL2FkbWluLnByb2xvd3B1dHRpbmcuY29tL2FwaScsXG4gIENPTkZJRzoge1xuICAgIGhlYWRlcnM6e1xuXG4gICAgfVxuICB9XG59O1xuZXhwb3J0IHtcbiAgcGF5cGFsLFxuICBjb25maWcsXG4gIHJ1bixcbiAgQVBJXG59O1xuIiwiZnVuY3Rpb24gQnV5Q29udHJvbGxlcigkc2NvcGUsICRjb29raWVzLCAkc3RhdGUsIENhcnRTZXJ2aWNlLCAkbG9nKXtcblxuICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgQ2FydFNlcnZpY2UuZ2V0SXRlbXMoKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAkbG9nLmRlYnVnKCdpdGVtcycsIGRhdGEpO1xuICAgICAgY29uc3QgaXRlbURhdGEgPSBkYXRhLm1hcCgoaSkgPT4ge1xuICAgICAgICBpLnByaWNlID0gaS5iYXNlUHJpY2U7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfSk7XG5cbiAgICAgICRzY29wZS5pdGVtcyA9IGl0ZW1EYXRhO1xuICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9KVxuICAgIC5lcnJvcigoKSA9PiB7XG4gICAgICAkc2NvcGUuaXRlbXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogXCJUaGUgUHJvIExvdyBQdXR0aW5nIFN5c3RlbVwiLFxuICAgICAgICAgIGJhc2VQcmljZTogMzkuOTUsXG4gICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgIHByaWNpbmdUaWVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcmljZTogMzkuOTUsXG4gICAgICAgICAgICAgIHF1YW50aXR5OiA1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcmljZTogMzkuOTUsXG4gICAgICAgICAgICAgIHF1YW50aXR5OiAxMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJpY2U6IDM5Ljk1LFxuICAgICAgICAgICAgICBxdWFudGl0eTogMTVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgICAkbG9nLmVycm9yKCdFcnJvciBsb2FkaW5nIGl0ZW1zLCBkZWZhdWx0aW5nIHRvIGl0ZW0gZGVmYXVsdHMnLCAkc2NvcGUuaXRlbXMpO1xuICAgIH0pO1xuXG5cbiAgJHNjb3BlLmNoZWNrUXVhbnRpdHkgPSBmdW5jdGlvbihpdGVtKSB7XG5cbiAgICBpZihpdGVtLnF1YW50aXR5ID4gaXRlbS5wcmljaW5nVGllcnNbMF0ucXVhbnRpdHkpe1xuICAgICAgaXRlbS5wcmljZSA9IGl0ZW0ucHJpY2luZ1RpZXJzWzBdLnByaWNlO1xuICAgIH1lbHNlIGlmKGl0ZW0ucXVhbnRpdHkgPj0gaXRlbS5wcmljaW5nVGllcnNbMV0ucXVhbnRpdHkgJiYgcXVhbnRpdHkgPCBpdGVtLnByaWNpbmdUaWVyc1syXS5xdWFudGl0eSl7XG4gICAgICBpdGVtLnByaWNlID0gaXRlbS5wcmljaW5nVGllcnNbMV0ucHJpY2U7XG4gICAgfWVsc2UgaWYoaXRlbS5xdWFudGl0eSA+IGl0ZW0ucHJpY2luZ1RpZXJzWzJdLnF1YW50aXR5KXtcbiAgICAgIGl0ZW0ucHJpY2UgPSBpdGVtLnByaWNpbmdUaWVyc1syXS5wcmljZTtcbiAgICB9XG5cbiAgfTtcblxuXG4gICRzY29wZS5hZGRUb0NhcnQgPSBmdW5jdGlvbihpdGVtLCBwcmljZSl7XG4gICAgQ2FydFNlcnZpY2Uuc2V0Q2FydChpdGVtLCBwcmljZSk7XG4gIH07XG5cbn1cbmV4cG9ydCBkZWZhdWx0IEJ1eUNvbnRyb2xsZXI7XG4iLCJsZXQgQ2FydENvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUsIENhcnRTZXJ2aWNlLCAkcm9vdFNjb3BlLCAkbG9nKXtcblxuICAvLyAkc2NvcGUuc2hpcHBpbmdUaWVycyA9IENhcnRTZXJ2aWNlLmdldFNoaXBwaW5nVGllcnMoKTtcblxuXG5cbi8vICRzY29wZS4kd2F0Y2goJ2NhcnQnLCBDYXJ0U2VydmljZS5jYXJ0V2F0Y2goJHJvb3RTY29wZS5jYXJ0LCAkc2NvcGUuc2hpcHBpbmdUaWVycykgLHRydWUpO1xuXG5cbiAgJHNjb3BlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbihpdGVtKXtcbiAgICRsb2cuZGVidWcoXCJSZW1vdmluZyBJdGVtXCIsIGl0ZW0pO1xuXG4gICAkc2NvcGUuY2FydC5pdGVtcyA9ICBfLndpdGhvdXQoJHNjb3BlLmNhcnQuaXRlbXMsIGl0ZW0pO1xuICAgQ2FydFNlcnZpY2UudXBkYXRlQ2FydCgkc2NvcGUuY2FydC5pdGVtcyk7XG4gICAkcm9vdFNjb3BlLmNhcnQgPSBDYXJ0U2VydmljZS5nZXRDYXJ0KCk7XG4gIH07XG5cbiAgJHNjb3BlLmNoZWNrb3V0ID0gZnVuY3Rpb24oY2FydCl7XG4gICAgQ2FydFNlcnZpY2UuY2hlY2tvdXQoY2FydCk7XG4gIH07XG5cblxuXG59O1xuXG5DYXJ0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQ2FydFNlcnZpY2UnLCAnJHJvb3RTY29wZScsICckbG9nJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gQ29udGFjdENvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSl7XG5cbiAgJHNjb3BlLmNvbnRhY3RVcyA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYDxwPiR7Zm9ybS5tZXNzYWdlfTwvcD5cXFxuICAgIDxwPiR7Zm9ybS5maXJzdE5hbWV9ICR7Zm9ybS5sYXN0TmFtZX08L3A+XFxcbiAgICA8cD4ke2Zvcm0ucGhvbmV9PC9wPlxcXG4gICAgPHA+JHtmb3JtLmVtYWlsfTwvcD5gO1xuICAgIGNvbnN0IGVtYWlsID0ge1xuICAgICAgbWVzc2FnZSxcbiAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICBmcm9tOiAnbm9yZXBseUBQcm9Mb3dQdXR0aW5nLmNvbScsXG4gICAgICBmcm9tTmFtZTogJ1Byb0xvdyBQdXR0aW5nJyxcbiAgICAgIHN1YmplY3Q6IFwiQSBjdXN0b21lciBpcyB0cnlpbmcgdG8gY29udGFjdCB5b3VcIlxuICAgIH07XG5cbiAgICBVc2VyU2VydmljZS5jb250YWN0KGVtYWlsKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICB9KVxuICAgICAgLmVycm9yKChkYXRhKSA9PiB7XG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLnN0YXRlcyA9ICgnQUwgQUsgQVogQVIgQ0EgQ08gQ1QgREUgRkwgR0EgSEkgSUQgSUwgSU4gSUEgS1MgS1kgTEEgTUUgTUQgTUEgTUkgTU4gTVMgJyArXG4gICAgICAgICAgICAnTU8gTVQgTkUgTlYgTkggTkogTk0gTlkgTkMgTkQgT0ggT0sgT1IgUEEgUkkgU0MgU0QgVE4gVFggVVQgVlQgVkEgV0EgV1YgV0kgJyArXG4gICAgICAgICAgICAnV1knKS5zcGxpdCgnICcpLm1hcChmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIHsgYWJicmV2OiBzdGF0ZSB9OyB9KTtcblxuICAkc2NvcGUud2hvbGVzYWxlUmVxdWVzdCA9IGZ1bmN0aW9uKHJlcXVlc3Qpe1xuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgY29uc3QgbWVzc2FnZT0gYDxwPllvdSBoYXZlIGEgbmV3IFdob2xlc2FsZSBDdXN0b21lciByZXF1ZXN0IGZyb20gUHJvTG93UHV0dGluZy5jb20hIFxcXG4gICAgU2VlIGJlbG93IGZvciBkZXRhaWxzPC9wPiBcXFxuICAgIDxwPlN0b3JlOiAke3JlcXVlc3Quc3RvcmV9PC9wPlxcXG4gICAgPHA+JHtyZXF1ZXN0LmNpdHl9LCAke3JlcXVlc3Quc3RhdGV9ICR7cmVxdWVzdC56aXB9PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5Db250YWN0IEluZm86PC9zdHJvbmc+PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5OYW1lOjwvc3Ryb25nPiAke3JlcXVlc3QuZmlyc3ROYW1lfSAke3JlcXVlc3QubGFzdE5hbWV9PC9wPlxcXG4gICAgPHA+PHN0cm9uZz5QaG9uZTo8L3N0cm9uZz4gJHtyZXF1ZXN0LnBob25lfTwvcD5cXFxuICAgIDxwPjxzdHJvbmc+RW1haWw6PC9zdHJvbmc+ICR7cmVxdWVzdC5lbWFpbH08L3A+XFxcbiAgICA8cD48c3Ryb25nPkFkZGl0aW9uYWwgSW5mbzo8L3N0cm9uZz4gJHtyZXF1ZXN0Lm1lc3NhZ2V9PC9wPlxcXG4gICAgPHA+VG8gYXBwcm92ZSB0aGlzIHVzZSB5b3UgbXVzdCBsb2cgaW4gdG8gYWRtaW4ucHJvbG93cHV0dGluZy5jb20gYW5kIGNyZWF0ZSBhIHdob2xlc2FsZSB1c2VyIHByb2ZpbGUgZm9yIHRoaXMgdXNlclxcXG4gICAgb25jZSB0aGUgYWNjb3VudCBpcyBjcmVhdGVkIHRoZXkgd2lsbCBiZSBub3RpZmllZCB2aWEgZW1haWwgd2l0aCB0aGVpciBjcmVkZW50aWFscy5gO1xuXG4gICAgY29uc3QgZW1haWwgPSB7XG4gICAgICBtZXNzYWdlLFxuICAgICAgYm9keTogbWVzc2FnZVxuICAgIH07XG5cbiAgICBVc2VyU2VydmljZS53aG9sZXNhbGVSZXF1ZXN0KGVtYWlsKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIllvdSdyZSByZXF1ZXN0IGhhcyBiZWVuIHNlbnQhIE9uY2UgYXBwcm92ZWQgeW91IHdpbGwgYmUgbm90aWZpZWQgdmlhIGVtYWlsIVwiO1xuICAgICAgfSlcbiAgICAgIC5lcnJvcigoZGF0YSkgPT4ge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiV2UncmUgc29ycnkgdGhlcmUgd2FzIGEgcHJvYmxlbSBleGVjdXRpbmcgeW91ciByZXF1ZXN0ISBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyIVwiO1xuICAgICAgfSk7XG4gIH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdENvbnRyb2xsZXI7XG4iLCJmdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkbWRVdGlsLCAkc3RhdGUsICRtZERpYWxvZywgQ2FydFNlcnZpY2UsICRyb290U2NvcGUpe1xuICAkKFwiLmRyb3Bkb3duLWJ1dHRvblwiKS5kcm9wZG93bigpO1xuICAvLyAkcm9vdFNjb3BlLnNoaXBwaW5nVGllcnMgPSBDYXJ0U2VydmljZS5nZXRTaGlwcGluZ1RpZXJzKCk7XG4kc2NvcGUub3Blbk1lbnUgPSBmdW5jdGlvbigkbWRPcGVuTWVudSwgZXYpIHtcbiAgICAkbWRPcGVuTWVudShldik7XG4gIH07XG5cbiAkc2NvcGUuJHdhdGNoKCdjYXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gMDtcbiAgICBpZighXy5pc0VtcHR5KCRyb290U2NvcGUuY2FydCkpe1xuXG4gICAgICBpZigkc2NvcGUuY2FydC5pdGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgJHNjb3BlLmNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2FydC5pdGVtcyA9IENhcnRTZXJ2aWNlLnVwZGF0ZUNhcnQoJHNjb3BlLmNhcnQuaXRlbXMpO1xuXG4gICAgICAgICRzY29wZS5jYXJ0LnRvdGFsSXRlbXMgPSAkc2NvcGUuY2FydC5pdGVtcy5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PntcbiAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIH0sIDApO1xuXG4gICAgICB9XG4gICAgICAkc2NvcGUuY2FydC5zaGlwcGluZyA9IDA7XG4gICAgICAgIC8vICRzY29wZS5jYXJ0ID0gQ2FydFNlcnZpY2UuY2FsY3VsYXRlU2hpcHBpbmcoJHNjb3BlLmNhcnQsICRzY29wZS5zaGlwcGluZ1RpZXJzKTtcbiAgICAgICAgJHNjb3BlLmNhcnQuc3VidG90YWwgPSBzdWJ0b3RhbC50b0ZpeGVkKDIpO1xuICAgICAgICAkc2NvcGUuY2FydC50b3RhbCA9IChzdWJ0b3RhbCArICRzY29wZS5jYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgICAgICRsb2cuZGVidWcoXCJDYXJ0IGxvYWRlZCBvciB1cGRhdGVkXCIsICRzY29wZS5jYXJ0KTtcbiAgICB9XG5cbiAgfSwgdHJ1ZSk7XG5cblxuICAvLyBuYXYgdG9nZ2xlc1xuICAkc2NvcGUudG9nZ2xlTGVmdCA9IGJ1aWxkVG9nZ2xlcignbGVmdCcpO1xuICAkc2NvcGUudG9nZ2xlUmlnaHQgPSBidWlsZFRvZ2dsZXIoJ3JpZ2h0Jyk7XG4gIGxldCAkbGVmdCA9ICQoJy5tZC1zaWRlbmF2LWxlZnQnKTtcbiAgbGV0ICRyaWdodCA9ICQoJy5tZC1zaWRlbmF2LXJpZ2h0Jyk7XG5cbiAgLy8gbGlzdCBpdGVtIGNsaWNrIGV2ZW50XG4gIC8vICQoJ21kLWxpc3QtaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gIC8vICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vICAgJCh0aGlzKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGRUb2dnbGVyKG5hdklEKSB7XG4gICAgbGV0IGRlYm91bmNlRm4gPSAgJG1kVXRpbC5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgJG1kU2lkZW5hdihuYXZJRCkudG9nZ2xlKCk7XG4gICAgICB9LDMwMCk7XG4gICAgcmV0dXJuIGRlYm91bmNlRm47XG4gIH1cblxuXG4gIC8vIE5hdmlnYXRlIGZ1bmN0aW9uXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24oc3RhdGUsIG5hdil7XG4gICAgJCgnbWQtbGlzdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gICAgJCgnIycrIHN0YXRlKS5hZGRDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkc3RhdGUuZ28oc3RhdGUpLnRoZW4oKCkgPT4ge1xuICAgIGlmIChuYXYgPT0gXCJsZWZ0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICAgIGlmKCEkcmlnaHQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICB9ZWxzZSBpZihuYXYgPT0gXCJyaWdodFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgICAgaWYoISRsZWZ0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZUxlZnQoKTtcbiAgICB9fSk7XG5cbiAgfTtcblxuICAkc2NvcGUuc2hvd1dhcnJhbnR5ID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvd2FycmFudHkudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuICAkc2NvcGUuc2hvd1NoaXBwaW5nID0gZnVuY3Rpb24oZXYpIHtcbiAgICAkbWREaWFsb2cuc2hvdyh7XG4gICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvc2hpcHBpbmcudHBsLmh0bWwnLFxuICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICB0YXJnZXRFdmVudDogZXYsXG4gICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5jb250YWN0VXMgPSBmdW5jdGlvbihjb250YWN0KXtcblxuICB9O1xufVxuXG5cbmZ1bmN0aW9uIFJpZ2h0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdigncmlnaHQnKS5jbG9zZSgpO1xuICB9O1xuXG5cbn1cbmZ1bmN0aW9uIExlZnRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcbiAgfTtcblxufVxuXG5mdW5jdGlvbiBEaWFsb2dDdHJsKCRzY29wZSwgJG1kRGlhbG9nKXtcbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5jYW5jZWwoKTtcbiAgfTtcblxuICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5oaWRlKCk7XG4gIH07XG59XG5cbmV4cG9ydCB7XG4gIE1haW5Db250cm9sbGVyLFxuICBSaWdodEN0cmwsXG4gIExlZnRDdHJsLFxuICBEaWFsb2dDdHJsXG59O1xuIiwiZnVuY3Rpb24gTWVkaWFDb250cm9sbGVyKCRzY29wZSl7XG5cbiAgICAkc2NvcGUudGVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZygnd29ya2VkJyk7XG4gICAgfTtcblxuICAgICRzY29wZS5pbWFnZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9jbG9zZXVwMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvY2xvc2V1cDEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9rZXZpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMva2V2aW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAgLy8ge1xuICAgICAgLy8gICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbjMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgLy8gICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4zLWNvbXByZXNzb3IuanBnJyxcbiAgICAgIC8vICAgZGVzY3JpcHRpb246ICcnXG4gICAgICAvLyB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTItY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTItY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUzLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUzLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNC1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNC1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTUtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTUtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH1cbiAgICBdO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhQ29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIFRlc3RpbW9uaWFsQ29udHJvbGxlcigkc2NvcGUsIFRlc3RpbW9uaWFsU2VydmljZSwgJHN0YXRlLCAkbG9nKXtcbiAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSB0cnVlO1xuXG4gIFRlc3RpbW9uaWFsU2VydmljZS5nZXRUZXN0aW1vbmlhbHMoKVxuICAgIC5zdWNjZXNzKChkYXRhKSA9PntcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWxzID0gZmFsc2U7XG4gICAgICAkc2NvcGUudGVzdGltb25pYWxzID0gZGF0YTtcbiAgICAgICRsb2cuZGVidWcoXCJUZXN0aW1vbmlhbHNcIiwgJHNjb3BlLnRlc3RpbW9uaWFscyk7XG4gICAgfSlcbiAgICAuZXJyb3IoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbHMgPSBmYWxzZTtcbiAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSBcIldlJ3JlIHNvcnJ5IHdlIGNvdWxkIG5vdCBsb2FkIHRlc3RpbW9uaWFscyBhdCB0aGlzIHRpbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG4gICAgfSk7XG4gICRzY29wZS5nb1RvU2luZ2xlID0gZnVuY3Rpb24oaWQpe1xuICAgJHN0YXRlLmdvKCd0ZXN0aW1vbmlhbHMuc2luZ2xlJywge2lkOiBpZH0pO1xuICB9O1xuICAkc2NvcGUuYWRkVGVzdGltb25pYWwgPSBmdW5jdGlvbih0ZXN0aW1vbmlhbCl7XG4gICAgJHNjb3BlLmFkZGluZ1Rlc3RpbW9uaWFsID0gdHJ1ZTtcbiAgICB0ZXN0aW1vbmlhbC5kYXRlID0gbmV3IERhdGUoKTtcbiAgICBUZXN0aW1vbmlhbFNlcnZpY2UuYWRkVGVzdGltb25pYWwodGVzdGltb25pYWwpXG4gICAgICAuc3VjY2VzcygoZGF0YSkgPT57XG4gICAgICAkc2NvcGUudGVzdGltb25pYWxBZGRlZCA9IHRydWU7XG4gICAgICAkc2NvcGUuYWRkZWRUZXN0aW1vbmlhbE1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFRlc3RpbW9uaWFsU2luZ2xlQ3RybCgkc2NvcGUsICRzdGF0ZVBhcmFtcywgVGVzdGltb25pYWxTZXJ2aWNlLCAkbG9nKXtcbiAgY29uc3QgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XG4gICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSB0cnVlO1xuICBUZXN0aW1vbmlhbFNlcnZpY2UuZ2V0U2luZ2xlVGVzdGltb25pYWwoaWQpXG4gICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICRzY29wZS5sb2FkaW5nVGVzdGltb25pYWwgPSBmYWxzZTtcbiAgICAgICRzY29wZS50ZXN0aW1vbmlhbCA9IGRhdGE7XG4gICAgICAkbG9nLmRlYnVnKFwiVGVzdGltb25pYWxcIiwgZGF0YSk7XG4gICAgfSlcbiAgICAuZXJyb3IoKGRhdGEpID0+e1xuICAgICAgJHNjb3BlLmxvYWRpbmdUZXN0aW1vbmlhbCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IFwiV2UncmUgc29ycnkgd2UgY291bGQgbm90IGxvYWQgdGhpcyB0ZXN0aW1vbmlhbCBhdCB0aGlzIHRpbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIFRlc3RpbW9uaWFsQ29udHJvbGxlcixcbiAgVGVzdGltb25pYWxTaW5nbGVDdHJsXG59O1xuIiwiZnVuY3Rpb24gVXNlckNvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSwgJGxvZywgJHN0YXRlKXtcbiAgJHNjb3BlLmxvZ2luV2hvbGVzYWxlVXNlciA9IGZ1bmN0aW9uKHdob2xlc2FsZVVzZXIpIHtcbiAgICBVc2VyU2VydmljZS5sb2dpbih3aG9sZXNhbGVVc2VyKTtcbiAgfTtcbiAgJHNjb3BlLmVkaXRVc2VyID0gZnVuY3Rpb24odXNlcikge1xuICAgIFVzZXJTZXJ2aWNlLl91cGRhdGVVc2VyKHVzZXIuX2lkLCB1c2VyKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCdidXlXaG9sZXNhbGUnKTtcbiAgICAgIH0pO1xuICB9O1xuICAkc2NvcGUubG9nT3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgVXNlclNlcnZpY2UubG9nT3V0KCk7XG4gIH07XG59XG5leHBvcnQgZGVmYXVsdCBVc2VyQ29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIFdob2xlc2FsZUNvbnRyb2xsZXIoJHNjb3BlLCBVc2VyU2VydmljZSwgQ2FydFNlcnZpY2UsICRsb2csICRjb29raWVzLCAkc3RhdGUpe1xuXG4gIGNvbnN0XG4gICAgICBpZCA9ICRjb29raWVzLmdldCgndXNlcklkJyksXG4gICAgICB0b2tlbiA9ICRjb29raWVzLmdldCgndG9rZW4nKSxcbiAgICAgIHVzZXJJdGVtcyA9ICRjb29raWVzLmdldE9iamVjdCgnaXRlbXMnKS5pdGVtcztcblxuICBpZiAoaWQgJiYgdG9rZW4pIHtcbiAgICBVc2VyU2VydmljZS5fZ2V0VXNlcihpZClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAkc2NvcGUudXNlckRhdGEgPSBkYXRhO1xuICAgICAgJGxvZy5kZWJ1ZygnVXNlciBEYXRhJywgZGF0YSk7XG4gICAgfSk7XG4gICAgaWYgKCF1c2VySXRlbXMpIHtcbiAgICAgIFVzZXJTZXJ2aWNlLmdldFVzZXJJbmZvKClcbiAgICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+e1xuICAgICAgICAkY29va2llcy5wdXQoJ2l0ZW1zJywgZGF0YS5pdGVtcyk7XG4gICAgICAgICRsb2cuZGVidWcoZGF0YS5pdGVtcyk7XG4gICAgICAgICRzY29wZS51c2VySXRlbXMgPSBkYXRhLml0ZW1zO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRzY29wZS51c2VySXRlbXMgPSB1c2VySXRlbXM7XG4gICAgfVxuICAgIENhcnRTZXJ2aWNlLmdldEl0ZW1zKClcbiAgICAgIC5zdWNjZXNzKChkYXRhKSA9PiB7XG4gICAgICAgICRsb2cuZGVidWcoJ1JldHJpZXZlZCBJdGVtcycsIGRhdGEpO1xuICAgICAgICAkc2NvcGUudXNlckl0ZW1zID0gZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCB0aGlzSXRlbSA9ICRzY29wZS51c2VySXRlbXMuZmluZCgoaSkgPT4gaS5pdGVtSWQgPT09IGl0ZW0uX2lkKTtcbiAgICAgICAgICB0aGlzSXRlbS50aXRsZSA9IGl0ZW0udGl0bGU7XG4gICAgICAgICAgdGhpc0l0ZW0uYmFzZVByaWNlID0gdGhpc0l0ZW0ucHJpY2U7XG4gICAgICAgICAgcmV0dXJuIHRoaXNJdGVtO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICRsb2cuZGVidWcoXCJVc2VyIEl0ZW1zXCIsIHVzZXJJdGVtcyk7XG4gIH0gZWxzZSB7XG4gICAgJHN0YXRlLmdvKCdob21lJyk7XG4gIH1cblxuICAkc2NvcGUuYWRkVG9DYXJ0ID0gZnVuY3Rpb24oaXRlbSl7XG4gICAgQ2FydFNlcnZpY2Uuc2V0Q2FydChpdGVtKTtcbiAgfTtcblxuICAkc2NvcGUuZWRpdFByb2ZpbGUgPSBmdW5jdGlvbigpe1xuICAgICRzdGF0ZS5nbygnYnV5V2hvbGVzYWxlLmVkaXQnKTtcbiAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBXaG9sZXNhbGVDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gbG9hZGluZygpe1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvbG9hZGluZy5odG1sJ1xuICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgbG9hZGluZztcbiIsImltcG9ydCB7Y29uZmlnLCBydW4sIHBheXBhbCwgQVBJfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciwgTGVmdEN0cmwsIFJpZ2h0Q3RybCwgRGlhbG9nQ3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXInO1xuaW1wb3J0IEJ1eUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9CdXlDb250cm9sbGVyJztcbmltcG9ydCBNZWRpYUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9NZWRpYUNvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ2FydENvbnRyb2xsZXInO1xuaW1wb3J0IENvbnRhY3RDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXInO1xuaW1wb3J0IFVzZXJDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvVXNlckNvbnRyb2xsZXInO1xuaW1wb3J0IFdob2xlc2FsZUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9XaG9sZXNhbGVDb250cm9sbGVyJztcbmltcG9ydCB7IFRlc3RpbW9uaWFsQ29udHJvbGxlciwgVGVzdGltb25pYWxTaW5nbGVDdHJsIH0gZnJvbSAnLi9jb250cm9sbGVycy9UZXN0aW1vbmlhbENvbnRyb2xsZXInO1xuaW1wb3J0IENhcnRTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvQ2FydFNlcnZpY2UnO1xuaW1wb3J0IFRlc3RpbW9uaWFsU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL1Rlc3RpbW9uaWFsU2VydmljZSc7XG5pbXBvcnQgVXNlclNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9Vc2VyU2VydmljZSc7XG5pbXBvcnQgbG9hZGluZyBmcm9tICcuL2RpcmVjdGl2ZXMvbG9hZGluZyc7XG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ2prdXJpLmdhbGxlcnknICwgJ25nQ29va2llcyddKVxuLmNvbmZpZyhjb25maWcpXG4uY29uc3RhbnQoJ1BBWVBBTCcsIHBheXBhbClcbi5jb25zdGFudCgnQVBJJywgQVBJKVxuLnJ1bihydW4pXG4uZGlyZWN0aXZlKCdteUxvYWRlcicsIFtsb2FkaW5nXSlcbi5mYWN0b3J5KCdDYXJ0U2VydmljZScsIENhcnRTZXJ2aWNlKVxuLmZhY3RvcnkoJ1Rlc3RpbW9uaWFsU2VydmljZScsIFRlc3RpbW9uaWFsU2VydmljZSlcbi5mYWN0b3J5KCdVc2VyU2VydmljZScsIFVzZXJTZXJ2aWNlKVxuLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTGVmdEN0cmwnLCBMZWZ0Q3RybClcbi5jb250cm9sbGVyKCdSaWdodEN0cmwnLCBSaWdodEN0cmwpXG4uY29udHJvbGxlcignRGlhbG9nQ3RybCcsIERpYWxvZ0N0cmwpXG4uY29udHJvbGxlcignQnV5Q3RybCcsIEJ1eUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignV2hvbGVzYWxlQ29udHJvbGxlcicsIFdob2xlc2FsZUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTWVkaWFDb250cm9sbGVyJywgTWVkaWFDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0NhcnRDb250cm9sbGVyJywgQ2FydENvbnRyb2xsZXIpXG4uY29udHJvbGxlcignVXNlckNvbnRyb2xsZXInLCBVc2VyQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdDb250YWN0Q3RybCcsIENvbnRhY3RDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ1Rlc3RpbW9uaWFsQ29udHJvbGxlcicsIFRlc3RpbW9uaWFsQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdUZXN0aW1vbmlhbFNpbmdsZUN0cmwnLCBUZXN0aW1vbmlhbFNpbmdsZUN0cmwpO1xuIiwibGV0IENhcnRTZXJ2aWNlID0gZnVuY3Rpb24oJGNvb2tpZXMsICRzdGF0ZSwgJHJvb3RTY29wZSwgJGh0dHAsICRsb2csIEFQSSl7XG5cbiAgY29uc3QgcGF5cGFsID0gXCJodHRwczovL3d3dy5wYXlwYWwuY29tL2NnaS1iaW4vd2Vic2NyXCI7XG5cbiAgLy8gaXRlbSBjb25zdHJ1Y3RvclxuXG4gIGZ1bmN0aW9uIEl0ZW0ob3B0aW9ucyl7XG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGU7XG4gICAgdGhpcy5wcmljZSA9IG9wdGlvbnMucHJpY2U7XG4gICAgdGhpcy5xdWFudGl0eSA9IG9wdGlvbnMucXVhbnRpdHk7XG4gICAgdGhpcy50b3RhbCA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gKHRoaXMucXVhbnRpdHkgKiB0aGlzLnByaWNlKSB8fCAwO1xuICAgIH07XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEl0ZW1zKCl7XG4gICAgcmV0dXJuICRodHRwLmdldChgJHtBUEkuVVJMfS9pdGVtc2ApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2luZ2xlSXRlbShpdGVtKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L2l0ZW1zLyR7aXRlbX1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENhcnQoKXtcbiAgICBsZXQgY2FydExpc3QgPSAkY29va2llcy5nZXRPYmplY3QoJ2NhcnQnKTtcbiAgICBpZighY2FydExpc3QgfHwgY2FydExpc3QubGVuZ3RoIDwgMSl7XG4gICAgICAkcm9vdFNjb3BlLmhhc0NhcnQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICB2YXIgY2FydEl0ZW1zID0gY2FydExpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICBsZXQgY2FydEl0ZW0gPSBuZXcgSXRlbShpdGVtKTtcbiAgICAgIHJldHVybiBjYXJ0SXRlbTtcbiAgICB9KTtcblxuICAgIHZhciBwYXlwYWxJdGVtcyA9IGFkZFBheXBhbChjYXJ0SXRlbXMpO1xuXG4gICAgdmFyIGNhcnQgPSB7fTtcblxuICAgIGNhcnQuaXRlbXMgPSBwYXlwYWxJdGVtcztcbiAgICBjYXJ0LnRvdGFsSXRlbXMgPSBjYXJ0Lml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+e1xuICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgfSwgMCk7XG5cbiAgICByZXR1cm4gY2FydDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENhcnQoaXRlbSl7XG4gICAgJHJvb3RTY29wZS5oYXNDYXJ0ID0gdHJ1ZTtcbiAgICB2YXIgY2FydCA9ICRjb29raWVzLmdldE9iamVjdCgnY2FydCcpO1xuICAgIGlmKCFjYXJ0KXtcbiAgICAgIGNhcnQgPSBbXTtcbiAgICB9XG5cbiAgICBsZXQgYWxyZWFkeUV4aXN0cyA9IF8uZmluZFdoZXJlKGNhcnQsIGl0ZW0udGl0bGUpO1xuICAgIGlmKGFscmVhZHlFeGlzdHMpe1xuICAgICAgY2FydCA9IF8ud2l0aG91dChjYXJ0LCBhbHJlYWR5RXhpc3RzKTtcbiAgICAgIGFscmVhZHlFeGlzdHMucXVhbnRpdHkgPSBhbHJlYWR5RXhpc3RzLnF1YW50aXR5ICsgaXRlbS5xdWFudGl0eTtcbiAgICAgIGNhcnQucHVzaChhbHJlYWR5RXhpc3RzKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNhcnQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgJGNvb2tpZXMucHV0T2JqZWN0KCdjYXJ0JywgY2FydCk7XG4gICAgJGxvZy5kZWJ1ZyhcIkl0ZW0gYWRkZWQgdG8gY2FydFwiLCBpdGVtLCBjYXJ0KTtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjY2FydCcpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbygnY2FydCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2FydChpdGVtcyl7XG4gICAgJGxvZy5kZWJ1ZygndXBkYXRpbmcgY2FydCcsIGl0ZW1zKTtcblxuICAgIHZhciBjYXJ0SXRlbXMgPSBhZGRQYXlwYWwoaXRlbXMpO1xuICAgICRjb29raWVzLnB1dE9iamVjdCgnY2FydCcsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIGdldFNoaXBwaW5nVGllcnMoKXtcbiAgLy8gICBsZXQgc2hpcHBpbmcgPSB7XG4gIC8vICAgICB0aWVyMToge1xuICAvLyAgICAgICBxdWFudGl0eTogNSxcbiAgLy8gICAgICAgcHJpY2U6IDVcbiAgLy8gICAgIH0sXG4gIC8vICAgICB0aWVyMjoge1xuICAvLyAgICAgICBxdWFudGl0eTogMTAsXG4gIC8vICAgICAgIHByaWNlOiAxMFxuICAvLyAgICAgfSxcbiAgLy8gICAgIHRpZXIzOiB7XG4gIC8vICAgICAgIHF1YW50aXR5OiAyMCxcbiAgLy8gICAgICAgcHJpY2U6IDIwXG4gIC8vICAgICB9XG4gIC8vICAgfTtcbiAgLy8gICAkbG9nLmRlYnVnKFwiU2hpcHBpbmcgVGllcnNcIiwgc2hpcHBpbmcpO1xuICAvLyAgIHJldHVybiBzaGlwcGluZztcbiAgLy8gfVxuXG4gIC8vIGZ1bmN0aW9uIGNhbGN1bGF0ZVNoaXBwaW5nKGNhcnQsIHRpZXJzKXtcbiAgLy8gICBjYXJ0Lml0ZW1zLmZvckVhY2goKGl0ZW0pID0+e1xuICAvLyAgIGlmKGl0ZW0ucXVhbnRpdHkgPj0gdGllcnMudGllcjEucXVhbnRpdHkgJiYgaXRlbS5xdWFudGl0eSA8IHRpZXJzLnRpZXIyLnF1YW50aXR5KXtcbiAgLy8gICAgICAgaXRlbS5zaGlwcGluZyA9IHRpZXJzLnRpZXIxLnByaWNlO1xuICAvLyAgICAgfWVsc2UgaWYoaXRlbS5xdWFudGl0eSA+PSB0aWVycy50aWVyMi5xdWFudGl0eSAmJiBpdGVtLnF1YW50aXR5IDwgdGllcnMudGllcjMucXVhbnRpdHkpe1xuICAvLyAgICAgICBpdGVtLnNoaXBwaW5nID0gdGllcnMudGllcjIucHJpY2U7XG4gIC8vICAgICB9ZWxzZSBpZihpdGVtLnF1YW50aXR5ID4gdGllcnMudGllcjMucXVhbnRpdHkgKXtcbiAgLy8gICAgICAgaXRlbS5zaGlwcGluZyA9IHRpZXJzLnRpZXIzLnByaWNlO1xuICAvLyAgICAgfWVsc2V7XG4gIC8vICAgICAgIGl0ZW0uc2hpcHBpbmcgPSAwO1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuXG4gIC8vICAgY2FydC5zaGlwcGluZyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gIC8vICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnNoaXBwaW5nO1xuICAvLyAgIH0sIDApO1xuXG4gIC8vICAgcmV0dXJuIGNhcnQ7XG5cbiAgLy8gfVxuXG4gIGZ1bmN0aW9uIGNhcnRXYXRjaChjYXJ0LCBzaGlwcGluZykge1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgaWYoIV8uaXNFbXB0eShjYXJ0KSl7XG5cbiAgICAgIGlmKGNhcnQuaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgIGNhcnQuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgc3VidG90YWwgKz0gaXRlbS50b3RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2FydCA9IHVwZGF0ZUNhcnQoY2FydC5pdGVtcyk7XG4gICAgICAgIGNhcnQudG90YWxJdGVtcyA9IGNhcnQuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT57XG4gICAgICAgICAgICByZXR1cm4gdG90YWwgKyBpdGVtLnF1YW50aXR5O1xuICAgICAgICB9LCAwKTtcbiAgICAgIH1cblxuICAgICAgY2FydC5zaGlwcGluZyA9ICBjYWxjdWxhdGVTaGlwcGluZyhjYXJ0LCBzaGlwcGluZyk7XG4gICAgICBjYXJ0LnN1YnRvdGFsID0gc3VidG90YWwudG9GaXhlZCgyKTtcbiAgICAgIGNhcnQudG90YWwgPSAoc3VidG90YWwgKyBjYXJ0LnNoaXBwaW5nKS50b0ZpeGVkKDIpO1xuXG4gICAgICAkbG9nLmRlYnVnKFwiQ2FydCBsb2FkZWQgb3IgdXBkYXRlZFwiLCBjYXJ0KTtcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFBheXBhbChjYXJ0SXRlbXMpe1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYXJ0SXRlbXMubGVuZ3RoOyBpICsrKXtcbiAgICAgIHZhciBpdGVtTnVtYmVyID0gKGkgKyAxKTtcbiAgICAgIGNhcnRJdGVtc1tpXS5wYXlwYWwgPSB7XG4gICAgICAgIGl0ZW0gOiBcIml0ZW1fbmFtZV9cIiArIGl0ZW1OdW1iZXIsXG4gICAgICAgIGFtb3VudDogXCJhbW91bnRfXCIrIGl0ZW1OdW1iZXIsXG4gICAgICAgIHF1YW50aXR5OiBcInF1YW50aXR5X1wiICsgaXRlbU51bWJlcixcbiAgICAgICAgc2hpcHBpbmcgOiBcInNoaXBwaW5nX1wiICsgaXRlbU51bWJlclxuICAgICAgfTtcbiAgICB9XG5cbiAgICAkbG9nLmRlYnVnKFwiYWRkaW5nIHBheXBhbCBpbmZvXCIsIGNhcnRJdGVtcyk7XG4gICAgcmV0dXJuIGNhcnRJdGVtcztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0SXRlbXMsXG4gICAgZ2V0U2luZ2xlSXRlbSxcbiAgICBnZXRDYXJ0LFxuICAgIHNldENhcnQsXG4gICAgdXBkYXRlQ2FydCxcbiAgICAvLyBnZXRTaGlwcGluZ1RpZXJzLFxuICAgIC8vIGNhbGN1bGF0ZVNoaXBwaW5nLFxuICAgIGNhcnRXYXRjaFxuICB9O1xuXG5cbn07XG5cbkNhcnRTZXJ2aWNlLiRpbmplY3QgPSBbJyRjb29raWVzJywgJyRzdGF0ZScsICckcm9vdFNjb3BlJywgJyRodHRwJywgJyRsb2cnLCAnQVBJJ107XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRTZXJ2aWNlO1xuIiwibGV0IFRlc3RpbW9uaWFsU2VydmljZSA9IGZ1bmN0aW9uKCRodHRwLCBBUEkpe1xuXG4gIGZ1bmN0aW9uIGdldFRlc3RpbW9uaWFscygpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzYCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaW5nbGVUZXN0aW1vbmlhbCh0ZXN0aW1vbmlhbElkKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L3Rlc3RpbW9uaWFscy8ke3Rlc3RpbW9uaWFsSWR9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUZXN0aW1vbmlhbCh0ZXN0aW1vbmlhbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vdGVzdGltb25pYWxzYCwgdGVzdGltb25pYWwpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRUZXN0aW1vbmlhbHMsXG4gICAgZ2V0U2luZ2xlVGVzdGltb25pYWwsXG4gICAgYWRkVGVzdGltb25pYWxcbiAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBUZXN0aW1vbmlhbFNlcnZpY2U7XG4iLCJsZXQgVXNlclNlcnZpY2UgPSBmdW5jdGlvbigkaHR0cCwgQVBJLCAkY29va2llcywgJHN0YXRlLCAkcm9vdFNjb3BlLCAkbG9nKXtcblxuICBmdW5jdGlvbiBnZXRVc2VySW5mbygpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoYCR7QVBJLlVSTH0vbWVgLCBBUEkuQ09ORklHKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrVXNlcigpe1xuICAgIGNvbnN0XG4gICAgICB0b2tlbiA9ICRjb29raWVzLmdldCgndG9rZW4nKSxcbiAgICAgIHVzZXJuYW1lID0gJGNvb2tpZXMuZ2V0KCd1c2VybmFtZScpO1xuICAgIGlmKHRva2VuICYmIHVzZXJuYW1lKXtcbiAgICAgIF9zZXRUb2tlbih0b2tlbiwgdXNlcm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRUb2tlbih0b2tlbiwgdXNlcm5hbWUpe1xuICAgIGlmICh0b2tlbikge1xuICAgICAgQVBJLkNPTkZJRy5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddID0gdG9rZW47XG4gICAgICAkcm9vdFNjb3BlLmlzVXNlckxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgIGlmICh1c2VybmFtZSkge1xuICAgICAgICAkcm9vdFNjb3BlLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAkcm9vdFNjb3BlLmlzVXNlckxvZ2dlZEluID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2hvbGVzYWxlUmVxdWVzdChlbWFpbCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYCR7QVBJLlVSTH0vY29udGFjdC93aG9sZXNhbGVgLCBlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWN0KGVtYWlsKXtcbiAgICByZXR1cm4gJGh0dHAucG9zdChgJHtBUEkuVVJMfS9jb250YWN0YCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9naW4odXNlcil7XG4gICAgJGh0dHAucG9zdChgJHtBUEkuVVJMfS9hdXRoZW50aWNhdGVgLCB1c2VyKVxuICAgICAgLnN1Y2Nlc3MoKGRhdGEpID0+IHtcbiAgICAgICAgX3N1Y2Nlc3NMb2coZGF0YSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWNjZXNzTG9nKGRhdGEpe1xuICAgICRjb29raWVzLnB1dCgndG9rZW4nLCBkYXRhLnRva2VuKTtcbiAgICAkY29va2llcy5wdXQoJ3VzZXJJZCcsIGRhdGEuaWQpO1xuICAgIF9zZXRUb2tlbihkYXRhLnRva2VuKTtcbiAgICBnZXRVc2VySW5mbygpXG4gICAgICAuc3VjY2VzcygodXNlckRhdGEpID0+e1xuICAgICAgICAkbG9nLmRlYnVnKCdVc2VyIGRhdGEgZnJvbSBsb2dpbicsIHVzZXJEYXRhKTtcbiAgICAgICAgJGNvb2tpZXMucHV0T2JqZWN0KCdpdGVtcycsIHtpdGVtczogdXNlckRhdGEuaXRlbXN9KTtcbiAgICAgICAgJGNvb2tpZXMucHV0KCd1c2VybmFtZScsIHVzZXJEYXRhLnVzZXJuYW1lKTtcbiAgICAgICAgJGxvZy5kZWJ1ZygnTG9nZ2VkIGluIScsIGRhdGEpO1xuICAgICAgICAkc3RhdGUuZ28oJ2J1eVdob2xlc2FsZScpO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfdXBkYXRlVXNlcih1c2VySWQsIHVzZXIpe1xuICAgIHJldHVybiAkaHR0cC5wdXQoYCR7QVBJLlVSTH0vdXNlcnMvJHt1c2VySWR9YCwgdXNlciwgQVBJLkNPTkZJRyk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2dPdXQoKXtcbiAgICAkY29va2llcy5yZW1vdmUoJ3Rva2VuJyk7XG4gICAgJGNvb2tpZXMucmVtb3ZlKCdpdGVtcycpO1xuICAgICRjb29raWVzLnJlbW92ZSgndXNlcklkJyk7XG4gICAgJGNvb2tpZXMucmVtb3ZlKCd1c2VybmFtZScpO1xuICAgIF9zZXRUb2tlbigpO1xuICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gX2dldFVzZXIodXNlcklkKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KGAke0FQSS5VUkx9L3VzZXJzLyR7dXNlcklkfWAsIEFQSS5DT05GSUcpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yZ290UGFzc3dvcmQoZW1haWwpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGAke0FQSS5VUkx9L2ZvcmdvdFBhc3N3b3JkYCwgZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZVVzZXIodXNlcklkKXtcbiAgICByZXR1cm4gJGh0dHAuZGVsZXRlKGAke0FQSS5VUkx9L3VzZXJzLyR7dXNlcklkfWApO1xuICB9XG5cbiAgcmV0dXJue1xuICAgIGNoZWNrVXNlcixcbiAgICB3aG9sZXNhbGVSZXF1ZXN0LFxuICAgIGNvbnRhY3QsXG4gICAgbG9naW4sXG4gICAgbG9nT3V0LFxuICAgIF91cGRhdGVVc2VyLFxuICAgIF9nZXRVc2VyLFxuICAgIF9kZWxldGVVc2VyLFxuICAgIGZvcmdvdFBhc3N3b3JkLFxuICAgIGdldFVzZXJJbmZvXG5cbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJTZXJ2aWNlO1xuIl19
