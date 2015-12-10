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
    controller: 'MainController'
  }).state('gallery', {
    url: '/gallery',
    templateUrl: 'js/templates/gallery.tpl.html',
    controller: 'MediaController'
  }).state('videos', {
    url: '/videos',
    templateUrl: 'js/templates/videos.tpl.html',
    controller: 'MediaController'
  }).state('design', {
    url: '/design',
    templateUrl: 'js/templates/design.tpl.html',
    controller: 'MainController'
  }).state('contact', {
    url: '/contact',
    templateUrl: 'js/templates/contact.tpl.html',
    controller: 'ContactCtrl'
  });

  //  var customPrimary = {
  //      '50': '#85d971',
  //      '100': '#73d35d',
  //      '200': '#62ce49',
  //      '300': '#51c736',
  //      '400': '#49b330',
  //      '500': '#419F2B',
  //      '600': '#398b26',
  //      '700': '#317720',
  //      '800': '#28631b',
  //      '900': '#204f15',
  //      'A100': '#96de85',
  //      'A200': '#a7e399',
  //      'A400': '#b8e9ad',
  //      'A700': '#183b10'
  //  };
  //  $mdThemingProvider
  //      .definePalette('customPrimary',
  //                      customPrimary);

  //  var customAccent = {
  //      '50': '#e1c392',
  //      '100': '#dbb87e',
  //      '200': '#d5ad6a',
  //      '300': '#d0a356',
  //      '400': '#ca9842',
  //      '500': '#BE8B35',
  //      '600': '#aa7c2f',
  //      '700': '#966e2a',
  //      '800': '#825f24',
  //      '900': '#6e511f',
  //      'A100': '#e6cea6',
  //      'A200': '#ecd9ba',
  //      'A400': '#f1e4ce',
  //      'A700': '#5a4219'
  //  };
  //  $mdThemingProvider
  //      .definePalette('customAccent',
  //                      customAccent);

  //  var customWarn = {
  //      '50': '#de949b',
  //      '100': '#d88088',
  //      '200': '#d26d76',
  //      '300': '#cc5964',
  //      '400': '#c64652',
  //      '500': '#B93945',
  //      '600': '#a5333e',
  //      '700': '#922d36',
  //      '800': '#7f272f',
  //      '900': '#6b2128',
  //      'A100': '#e4a7ad',
  //      'A200': '#eabbbf',
  //      'A400': '#f0ced1',
  //      'A700': '#581b21'
  //  };
  //  $mdThemingProvider
  //      .definePalette('customWarn',
  //                      customWarn);

  //  var customBackground = {
  //      '50': '#6191c7',
  //      '100': '#4e84c1',
  //      '200': '#4077b6',
  //      '300': '#396ba3',
  //      '400': '#335e90',
  //      '500': '#2C527D',
  //      '600': '#25466a',
  //      '700': '#1f3957',
  //      '800': '#182d44',
  //      '900': '#112032',
  //      'A100': '#749ece',
  //      'A200': '#87abd5',
  //      'A400': '#9ab8db',
  //      'A700': '#0b141f'
  //  };
  //  $mdThemingProvider
  //      .definePalette('customBackground',
  //                      customBackground);

  // $mdThemingProvider.theme('default')
  //     .primaryPalette('customPrimary')
  //     .accentPalette('customAccent')
  //     .warnPalette('customWarn')
  //     .backgroundPalette('customBackground')
  //     .dark();
}
exports.config = config;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function BuyController($scope) {}
exports.BuyController = BuyController;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ContactController($scope) {}
exports.ContactController = ContactController;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function MainController($scope, $timeout, $mdSidenav, $log, $mdUtil, $state) {

  // nav toggles
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(navID) {
    var debounceFn = $mdUtil.debounce(function () {
      $mdSidenav(navID).toggle();
    }, 300);
    return debounceFn;
  }
  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  // Navigate function
  $scope.navigateTo = function (state, nav) {
    $state.go(state);
    if (nav == "left") {
      $scope.toggleLeft();
    } else if (nav == "right") {
      $scope.toggleRight();
    }
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
exports.MainController = MainController;
exports.RightCtrl = RightCtrl;
exports.LeftCtrl = LeftCtrl;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function MediaController($scope) {}

exports.MediaController = MediaController;

},{}],6:[function(require,module,exports){
'use strict';

var _config = require('./config');

var _controllersMainController = require('./controllers/MainController');

var _controllersBuyController = require('./controllers/BuyController');

var _controllersMediaController = require('./controllers/MediaController');

var _controllersContactController = require('./controllers/ContactController');

angular.module('app', ['ui.router', 'ngMaterial']).config(_config.config).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('BuyCtrl', _controllersBuyController.BuyController).controller('MediaController', _controllersMediaController.MediaController);

},{"./config":1,"./controllers/BuyController":2,"./controllers/ContactController":3,"./controllers/MainController":4,"./controllers/MediaController":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBLFNBQVMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRTs7QUFFdEUsb0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVsQyxnQkFBYyxDQUNYLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDYixPQUFHLEVBQUUsR0FBRztBQUNSLGVBQVcsRUFBRSw0QkFBNEI7QUFDekMsY0FBVSxFQUFFLGdCQUFnQjtHQUM3QixDQUFDLENBQ0QsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNaLE9BQUcsRUFBRSxNQUFNO0FBQ1gsZUFBVyxFQUFFLDJCQUEyQjtBQUN4QyxjQUFVLEVBQUUsU0FBUztHQUN0QixDQUFDLENBQ0QsS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUNkLE9BQUcsRUFBRSxRQUFRO0FBQ2IsZUFBVyxFQUFFLDZCQUE2QjtBQUMxQyxj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Ozs7QUN4Q1YsU0FBUyxlQUFlLENBQUMsTUFBTSxFQUFDLEVBRS9COztRQUdDLGVBQWUsR0FBZixlQUFlOzs7OztzQkNMTSxVQUFVOzt5Q0FDbUIsOEJBQThCOzt3Q0FDcEQsNkJBQTZCOzswQ0FDM0IsK0JBQStCOzs0Q0FDOUIsaUNBQWlDOztBQUVsRSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUNqRCxNQUFNLGdCQUFRLENBQ2QsVUFBVSxDQUFDLGdCQUFnQiw0Q0FBaUIsQ0FDNUMsVUFBVSxDQUFDLFVBQVUsc0NBQVcsQ0FDaEMsVUFBVSxDQUFDLFdBQVcsdUNBQVksQ0FDbEMsVUFBVSxDQUFDLFNBQVMsMENBQWdCLENBQ3BDLFVBQVUsQ0FBQyxpQkFBaUIsOENBQWtCLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlcikge1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvaG9tZS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2J1eScsIHtcbiAgICAgIHVybDogJy9idXknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvYnV5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdCdXlDdHJsJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdzdG9yeScsIHtcbiAgICAgIHVybDogJy9zdG9yeScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9zdG9yeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3Rlc3RpbW9uaWFscycsIHtcbiAgICAgIHVybDogJy90ZXN0aW1vbmlhbHMnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvdGVzdGltb25pYWxzLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2FsbGVyeScsIHtcbiAgICAgIHVybDogJy9nYWxsZXJ5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2dhbGxlcnkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01lZGlhQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndmlkZW9zJywge1xuICAgICAgdXJsOiAnL3ZpZGVvcycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy92aWRlb3MudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01lZGlhQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnZGVzaWduJywge1xuICAgICAgdXJsOiAnL2Rlc2lnbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9kZXNpZ24udHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdjb250YWN0Jywge1xuICAgICAgdXJsOiAnL2NvbnRhY3QnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvY29udGFjdC50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgfSk7XG5cblxuICAgLy8gIHZhciBjdXN0b21QcmltYXJ5ID0ge1xuICAgLy8gICAgICAnNTAnOiAnIzg1ZDk3MScsXG4gICAvLyAgICAgICcxMDAnOiAnIzczZDM1ZCcsXG4gICAvLyAgICAgICcyMDAnOiAnIzYyY2U0OScsXG4gICAvLyAgICAgICczMDAnOiAnIzUxYzczNicsXG4gICAvLyAgICAgICc0MDAnOiAnIzQ5YjMzMCcsXG4gICAvLyAgICAgICc1MDAnOiAnIzQxOUYyQicsXG4gICAvLyAgICAgICc2MDAnOiAnIzM5OGIyNicsXG4gICAvLyAgICAgICc3MDAnOiAnIzMxNzcyMCcsXG4gICAvLyAgICAgICc4MDAnOiAnIzI4NjMxYicsXG4gICAvLyAgICAgICc5MDAnOiAnIzIwNGYxNScsXG4gICAvLyAgICAgICdBMTAwJzogJyM5NmRlODUnLFxuICAgLy8gICAgICAnQTIwMCc6ICcjYTdlMzk5JyxcbiAgIC8vICAgICAgJ0E0MDAnOiAnI2I4ZTlhZCcsXG4gICAvLyAgICAgICdBNzAwJzogJyMxODNiMTAnXG4gICAvLyAgfTtcbiAgIC8vICAkbWRUaGVtaW5nUHJvdmlkZXJcbiAgIC8vICAgICAgLmRlZmluZVBhbGV0dGUoJ2N1c3RvbVByaW1hcnknLFxuICAgLy8gICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUHJpbWFyeSk7XG5cbiAgIC8vICB2YXIgY3VzdG9tQWNjZW50ID0ge1xuICAgLy8gICAgICAnNTAnOiAnI2UxYzM5MicsXG4gICAvLyAgICAgICcxMDAnOiAnI2RiYjg3ZScsXG4gICAvLyAgICAgICcyMDAnOiAnI2Q1YWQ2YScsXG4gICAvLyAgICAgICczMDAnOiAnI2QwYTM1NicsXG4gICAvLyAgICAgICc0MDAnOiAnI2NhOTg0MicsXG4gICAvLyAgICAgICc1MDAnOiAnI0JFOEIzNScsXG4gICAvLyAgICAgICc2MDAnOiAnI2FhN2MyZicsXG4gICAvLyAgICAgICc3MDAnOiAnIzk2NmUyYScsXG4gICAvLyAgICAgICc4MDAnOiAnIzgyNWYyNCcsXG4gICAvLyAgICAgICc5MDAnOiAnIzZlNTExZicsXG4gICAvLyAgICAgICdBMTAwJzogJyNlNmNlYTYnLFxuICAgLy8gICAgICAnQTIwMCc6ICcjZWNkOWJhJyxcbiAgIC8vICAgICAgJ0E0MDAnOiAnI2YxZTRjZScsXG4gICAvLyAgICAgICdBNzAwJzogJyM1YTQyMTknXG4gICAvLyAgfTtcbiAgIC8vICAkbWRUaGVtaW5nUHJvdmlkZXJcbiAgIC8vICAgICAgLmRlZmluZVBhbGV0dGUoJ2N1c3RvbUFjY2VudCcsXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBjdXN0b21BY2NlbnQpO1xuXG4gICAvLyAgdmFyIGN1c3RvbVdhcm4gPSB7XG4gICAvLyAgICAgICc1MCc6ICcjZGU5NDliJyxcbiAgIC8vICAgICAgJzEwMCc6ICcjZDg4MDg4JyxcbiAgIC8vICAgICAgJzIwMCc6ICcjZDI2ZDc2JyxcbiAgIC8vICAgICAgJzMwMCc6ICcjY2M1OTY0JyxcbiAgIC8vICAgICAgJzQwMCc6ICcjYzY0NjUyJyxcbiAgIC8vICAgICAgJzUwMCc6ICcjQjkzOTQ1JyxcbiAgIC8vICAgICAgJzYwMCc6ICcjYTUzMzNlJyxcbiAgIC8vICAgICAgJzcwMCc6ICcjOTIyZDM2JyxcbiAgIC8vICAgICAgJzgwMCc6ICcjN2YyNzJmJyxcbiAgIC8vICAgICAgJzkwMCc6ICcjNmIyMTI4JyxcbiAgIC8vICAgICAgJ0ExMDAnOiAnI2U0YTdhZCcsXG4gICAvLyAgICAgICdBMjAwJzogJyNlYWJiYmYnLFxuICAgLy8gICAgICAnQTQwMCc6ICcjZjBjZWQxJyxcbiAgIC8vICAgICAgJ0E3MDAnOiAnIzU4MWIyMSdcbiAgIC8vICB9O1xuICAgLy8gICRtZFRoZW1pbmdQcm92aWRlclxuICAgLy8gICAgICAuZGVmaW5lUGFsZXR0ZSgnY3VzdG9tV2FybicsXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBjdXN0b21XYXJuKTtcblxuICAgLy8gIHZhciBjdXN0b21CYWNrZ3JvdW5kID0ge1xuICAgLy8gICAgICAnNTAnOiAnIzYxOTFjNycsXG4gICAvLyAgICAgICcxMDAnOiAnIzRlODRjMScsXG4gICAvLyAgICAgICcyMDAnOiAnIzQwNzdiNicsXG4gICAvLyAgICAgICczMDAnOiAnIzM5NmJhMycsXG4gICAvLyAgICAgICc0MDAnOiAnIzMzNWU5MCcsXG4gICAvLyAgICAgICc1MDAnOiAnIzJDNTI3RCcsXG4gICAvLyAgICAgICc2MDAnOiAnIzI1NDY2YScsXG4gICAvLyAgICAgICc3MDAnOiAnIzFmMzk1NycsXG4gICAvLyAgICAgICc4MDAnOiAnIzE4MmQ0NCcsXG4gICAvLyAgICAgICc5MDAnOiAnIzExMjAzMicsXG4gICAvLyAgICAgICdBMTAwJzogJyM3NDllY2UnLFxuICAgLy8gICAgICAnQTIwMCc6ICcjODdhYmQ1JyxcbiAgIC8vICAgICAgJ0E0MDAnOiAnIzlhYjhkYicsXG4gICAvLyAgICAgICdBNzAwJzogJyMwYjE0MWYnXG4gICAvLyAgfTtcbiAgIC8vICAkbWRUaGVtaW5nUHJvdmlkZXJcbiAgIC8vICAgICAgLmRlZmluZVBhbGV0dGUoJ2N1c3RvbUJhY2tncm91bmQnLFxuICAgLy8gICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQmFja2dyb3VuZCk7XG5cbiAgIC8vICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXG4gICAvLyAgICAgLnByaW1hcnlQYWxldHRlKCdjdXN0b21QcmltYXJ5JylcbiAgIC8vICAgICAuYWNjZW50UGFsZXR0ZSgnY3VzdG9tQWNjZW50JylcbiAgIC8vICAgICAud2FyblBhbGV0dGUoJ2N1c3RvbVdhcm4nKVxuICAgLy8gICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnY3VzdG9tQmFja2dyb3VuZCcpXG4gICAvLyAgICAgLmRhcmsoKTtcblxufVxuZXhwb3J0IHtcbiAgY29uZmlnXG59O1xuIiwiZnVuY3Rpb24gQnV5Q29udHJvbGxlcigkc2NvcGUpe1xuXG59XG5leHBvcnR7XG4gIEJ1eUNvbnRyb2xsZXJcbn07XG4iLCJmdW5jdGlvbiBDb250YWN0Q29udHJvbGxlcigkc2NvcGUpe1xuXG59XG5leHBvcnQge1xuICBDb250YWN0Q29udHJvbGxlclxufTtcbiIsImZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRtZFV0aWwsICRzdGF0ZSl7XG5cbiAgLy8gbmF2IHRvZ2dsZXNcbiAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBidWlsZFRvZ2dsZXIoJ2xlZnQnKTtcbiAgJHNjb3BlLnRvZ2dsZVJpZ2h0ID0gYnVpbGRUb2dnbGVyKCdyaWdodCcpO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkVG9nZ2xlcihuYXZJRCkge1xuICAgIGxldCBkZWJvdW5jZUZuID0gICRtZFV0aWwuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICRtZFNpZGVuYXYobmF2SUQpLnRvZ2dsZSgpO1xuICAgICAgfSwzMDApO1xuICAgIHJldHVybiBkZWJvdW5jZUZuO1xuICB9XG4gICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAkbWREaWFsb2cuY2FuY2VsKCk7XG4gIH07XG5cblxuICAvLyBOYXZpZ2F0ZSBmdW5jdGlvblxuICAkc2NvcGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHN0YXRlLCBuYXYpe1xuICAgICRzdGF0ZS5nbyhzdGF0ZSk7XG4gICAgaWYgKG5hdiA9PSBcImxlZnRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlTGVmdCgpO1xuICAgIH1lbHNlIGlmKG5hdiA9PSBcInJpZ2h0XCIpe1xuICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gUmlnaHRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdyaWdodCcpLmNsb3NlKCk7XG4gIH07XG59XG5mdW5jdGlvbiBMZWZ0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XG4gIH07XG59XG5leHBvcnQge1xuICBNYWluQ29udHJvbGxlcixcbiAgUmlnaHRDdHJsLFxuICBMZWZ0Q3RybFxufTtcbiIsImZ1bmN0aW9uIE1lZGlhQ29udHJvbGxlcigkc2NvcGUpe1xuXG59XG5cbmV4cG9ydHtcbiAgTWVkaWFDb250cm9sbGVyXG59O1xuIiwiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIsIExlZnRDdHJsLCBSaWdodEN0cmwgfSBmcm9tICcuL2NvbnRyb2xsZXJzL01haW5Db250cm9sbGVyJztcbmltcG9ydCB7IEJ1eUNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTWVkaWFDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy9NZWRpYUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgQ29udGFjdENvbnRvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXInXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJ10pXG4uY29uZmlnKGNvbmZpZylcbi5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ0xlZnRDdHJsJywgTGVmdEN0cmwpXG4uY29udHJvbGxlcignUmlnaHRDdHJsJywgUmlnaHRDdHJsKVxuLmNvbnRyb2xsZXIoJ0J1eUN0cmwnLCBCdXlDb250cm9sbGVyKVxuLmNvbnRyb2xsZXIoJ01lZGlhQ29udHJvbGxlcicsIE1lZGlhQ29udHJvbGxlcik7XG4iXX0=
