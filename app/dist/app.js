(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {

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
  }).state('contact', {
    url: '/contact',
    templateUrl: 'js/templates/contact.tpl.html',
    controller: 'ContactCtrl'
  });
}
exports['default'] = config;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function BuyController($scope) {}
exports["default"] = BuyController;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ContactController($scope) {}
exports["default"] = ContactController;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state, $mdDialog) {

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

  $scope.contactUs = function (contact) {
    console.log(contact);
  };
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TestimonialController;

function TestimonialController($scope) {}

module.exports = exports["default"];

},{}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _controllersMainController = require('./controllers/MainController');

var _controllersBuyController = require('./controllers/BuyController');

var _controllersBuyController2 = _interopRequireDefault(_controllersBuyController);

var _controllersMediaController = require('./controllers/MediaController');

var _controllersMediaController2 = _interopRequireDefault(_controllersMediaController);

var _controllersContactController = require('./controllers/ContactController');

var _controllersContactController2 = _interopRequireDefault(_controllersContactController);

var _controllersTestimonialController = require('./controllers/TestimonialController');

var _controllersTestimonialController2 = _interopRequireDefault(_controllersTestimonialController);

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery']).config(_config2['default']).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('DialogCtrl', _controllersMainController.DialogCtrl).controller('BuyCtrl', _controllersBuyController2['default']).controller('MediaController', _controllersMediaController2['default']).controller('ContactCtrl', _controllersContactController2['default']).controller('TestimonialController', _controllersTestimonialController2['default']);

},{"./config":1,"./controllers/BuyController":2,"./controllers/ContactController":3,"./controllers/MainController":4,"./controllers/MediaController":5,"./controllers/TestimonialController":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL1Rlc3RpbW9uaWFsQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxTQUFTLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUU7O0FBRXRFLG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FDWCxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ2IsT0FBRyxFQUFFLEdBQUc7QUFDUixlQUFXLEVBQUUsNEJBQTRCO0FBQ3pDLGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDWixPQUFHLEVBQUUsTUFBTTtBQUNYLGVBQVcsRUFBRSwyQkFBMkI7QUFDeEMsY0FBVSxFQUFFLFNBQVM7R0FDdEIs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RUFBRTtHQUNoQixFQUNEO0FBQ0UsU0FBSyxFQUFFLDRDQUE0QztBQUNuRCxPQUFHLEVBQUUseUNBQXlDO0FBQzlDLGVBQVcsRUFBRSxFQUFFO0dBQ2hCLEVBQ0Q7QUFDRSxTQUFLLEVBQUUsNENBQTRDO0FBQ25ELE9BQUcsRUFBRSx5Q0FBeUM7QUFDOUMsZUFBVyxFQUFFLEVBQUU7R0FDaEIsQ0FDRixDQUFDO0NBRUw7O3FCQUVjLGVBQWU7Ozs7Ozs7OztxQkN4RE4scUJBQXFCOztBQUE5QixTQUFTLHFCQUFxQixDQUFDLE1BQU0sRUFBQyxFQUVwRDs7Ozs7Ozs7O3NCQ0ZrQixVQUFVOzs7O3lDQUNtQyw4QkFBOEI7O3dDQUNwRSw2QkFBNkI7Ozs7MENBQzNCLCtCQUErQjs7Ozs0Q0FDN0IsaUNBQWlDOzs7O2dEQUM3QixxQ0FBcUM7Ozs7QUFFdkUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQ2xFLE1BQU0scUJBQVEsQ0FDZCxVQUFVLENBQUMsZ0JBQWdCLDRDQUFpQixDQUM1QyxVQUFVLENBQUMsVUFBVSxzQ0FBVyxDQUNoQyxVQUFVLENBQUMsV0FBVyx1Q0FBWSxDQUNsQyxVQUFVLENBQUMsWUFBWSx3Q0FBYSxDQUNwQyxVQUFVLENBQUMsU0FBUyx3Q0FBZ0IsQ0FDcEMsVUFBVSxDQUFDLGlCQUFpQiwwQ0FBa0IsQ0FDOUMsVUFBVSxDQUFDLGFBQWEsNENBQW9CLENBQzVDLFVBQVUsQ0FBQyx1QkFBdUIsZ0RBQXdCLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlcikge1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvaG9tZS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2J1eScsIHtcbiAgICAgIHVybDogJy9idXknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvYnV5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdCdXlDdHJsJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzdG9yeScsIHtcbiAgICAgIHVybDogJy9zdG9yeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zdG9yeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3Rlc3RpbW9uaWFscycsIHtcbiAgICAgIHVybDogJy90ZXN0aW1vbmlhbHMnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXN0aW1vbmlhbENvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbGxlcnknLCB7XG4gICAgICB1cmw6ICcvZ2FsbGVyeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9nYWxsZXJ5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ZpZGVvcycsIHtcbiAgICAgIHVybDogJy92aWRlb3MnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdmlkZW9zLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNZWRpYUNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3ByaWNpbmcnLCB7XG4gICAgICB1cmw6ICcvcHJpY2luZycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9wcmljaW5nLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnZGVzaWduJywge1xuICAgICAgdXJsOiAnL2Rlc2lnbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9kZXNpZ24udHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSk7XG5cbn1cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImZ1bmN0aW9uIEJ1eUNvbnRyb2xsZXIoJHNjb3BlKXtcblxufVxuZXhwb3J0IGRlZmF1bHQgQnV5Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIENvbnRhY3RDb250cm9sbGVyKCRzY29wZSl7XG5cbn1cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlLCAkbWREaWFsb2cpe1xuXG4gIC8vIG5hdiB0b2dnbGVzXG4gICRzY29wZS50b2dnbGVMZWZ0ID0gYnVpbGRUb2dnbGVyKCdsZWZ0Jyk7XG4gICRzY29wZS50b2dnbGVSaWdodCA9IGJ1aWxkVG9nZ2xlcigncmlnaHQnKTtcbiAgbGV0ICRsZWZ0ID0gJCgnLm1kLXNpZGVuYXYtbGVmdCcpO1xuICBsZXQgJHJpZ2h0ID0gJCgnLm1kLXNpZGVuYXYtcmlnaHQnKTtcblxuICAvLyBsaXN0IGl0ZW0gY2xpY2sgZXZlbnRcbiAgLy8gJCgnbWQtbGlzdC1pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgLy8gICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgLy8gICAkKHRoaXMpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyB9KTtcblxuICBmdW5jdGlvbiBidWlsZFRvZ2dsZXIobmF2SUQpIHtcbiAgICBsZXQgZGVib3VuY2VGbiA9ICAkbWRVdGlsLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAkbWRTaWRlbmF2KG5hdklEKS50b2dnbGUoKTtcbiAgICAgIH0sMzAwKTtcbiAgICByZXR1cm4gZGVib3VuY2VGbjtcbiAgfVxuXG5cbiAgLy8gTmF2aWdhdGUgZnVuY3Rpb25cbiAgJHNjb3BlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihzdGF0ZSwgbmF2KXtcbiAgICAkKCdtZC1saXN0LWl0ZW0nKS5yZW1vdmVDbGFzcygnc2lkZW5hdi1hY3RpdmUnKTtcbiAgICAkKCcjJysgc3RhdGUpLmFkZENsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAgICRzdGF0ZS5nbyhzdGF0ZSkudGhlbigoKSA9PiB7XG4gICAgaWYgKG5hdiA9PSBcImxlZnRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgICAgaWYoISRyaWdodC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVSaWdodCgpO1xuICAgIH1lbHNlIGlmKG5hdiA9PSBcInJpZ2h0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgICBpZighJGxlZnQuaGFzQ2xhc3MoJ21kLWNsb3NlZCcpKVxuICAgICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgIH19KTtcblxuICB9O1xuXG4gICRzY29wZS5zaG93V2FycmFudHkgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy93YXJyYW50eS50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG4gICRzY29wZS5zaG93U2hpcHBpbmcgPSBmdW5jdGlvbihldikge1xuICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgIGNvbnRyb2xsZXI6IERpYWxvZ0N0cmwsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zaGlwcGluZy50cGwuaHRtbCcsXG4gICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgIHRhcmdldEV2ZW50OiBldixcbiAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLmNvbnRhY3RVcyA9IGZ1bmN0aW9uKGNvbnRhY3Qpe1xuICAgIGNvbnNvbGUubG9nKGNvbnRhY3QpO1xuICB9O1xufVxuXG5cbmZ1bmN0aW9uIFJpZ2h0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdigncmlnaHQnKS5jbG9zZSgpO1xuICB9O1xuXG5cbn1cbmZ1bmN0aW9uIExlZnRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcbiAgfTtcblxufVxuXG5mdW5jdGlvbiBEaWFsb2dDdHJsKCRzY29wZSwgJG1kRGlhbG9nKXtcbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5jYW5jZWwoKTtcbiAgfTtcblxuICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5oaWRlKCk7XG4gIH07XG59XG5cbmV4cG9ydCB7XG4gIE1haW5Db250cm9sbGVyLFxuICBSaWdodEN0cmwsXG4gIExlZnRDdHJsLFxuICBEaWFsb2dDdHJsXG59O1xuIiwiZnVuY3Rpb24gTWVkaWFDb250cm9sbGVyKCRzY29wZSl7XG5cbiAgICAkc2NvcGUudGVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZygnd29ya2VkJyk7XG4gICAgfTtcblxuICAgICRzY29wZS5pbWFnZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9jbG9zZXVwMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvY2xvc2V1cDEtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9rZXZpbi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMva2V2aW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9tYWluLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAgLy8ge1xuICAgICAgLy8gICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbWFpbjMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgLy8gICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4zLWNvbXByZXNzb3IuanBnJyxcbiAgICAgIC8vICAgZGVzY3JpcHRpb246ICcnXG4gICAgICAvLyB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTItY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTItY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUzLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUzLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNC1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNC1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTUtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTUtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH1cbiAgICBdO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhQ29udHJvbGxlcjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRlc3RpbW9uaWFsQ29udHJvbGxlcigkc2NvcGUpe1xuXG59XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1haW5Db250cm9sbGVyLCBMZWZ0Q3RybCwgUmlnaHRDdHJsLCBEaWFsb2dDdHJsIH0gZnJvbSAnLi9jb250cm9sbGVycy9NYWluQ29udHJvbGxlcic7XG5pbXBvcnQgQnV5Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXInO1xuaW1wb3J0IE1lZGlhQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL01lZGlhQ29udHJvbGxlcic7XG5pbXBvcnQgQ29udGFjdENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Db250YWN0Q29udHJvbGxlcic7XG5pbXBvcnQgVGVzdGltb25pYWxDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvVGVzdGltb25pYWxDb250cm9sbGVyJztcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsndWkucm91dGVyJywgJ25nTWF0ZXJpYWwnLCAnamt1cmkuZ2FsbGVyeSddKVxuLmNvbmZpZyhjb25maWcpXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdMZWZ0Q3RybCcsIExlZnRDdHJsKVxuLmNvbnRyb2xsZXIoJ1JpZ2h0Q3RybCcsIFJpZ2h0Q3RybClcbi5jb250cm9sbGVyKCdEaWFsb2dDdHJsJywgRGlhbG9nQ3RybClcbi5jb250cm9sbGVyKCdCdXlDdHJsJywgQnV5Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdNZWRpYUNvbnRyb2xsZXInLCBNZWRpYUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignQ29udGFjdEN0cmwnLCBDb250YWN0Q29udHJvbGxlcilcbi5jb250cm9sbGVyKCdUZXN0aW1vbmlhbENvbnRyb2xsZXInLCBUZXN0aW1vbmlhbENvbnRyb2xsZXIpO1xuIl19
