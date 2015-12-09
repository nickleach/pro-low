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
  $scope.navigateTo = function (state) {
    $state.go(state);
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function MediaController($scope) {}

exports.MediaController = MediaController;

},{}],4:[function(require,module,exports){
'use strict';

var _config = require('./config');

var _controllersMainController = require('./controllers/MainController');

var _controllersMediaController = require('./controllers/MediaController');

angular.module('app', ['ui.router', 'ngMaterial']).config(_config.config).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('MediaController', _controllersMediaController.MediaController);

},{"./config":1,"./controllers/MainController":2,"./controllers/MediaController":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL01haW5Db250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL01lZGlhQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9uaWNrbGVhY2gvd2Vic2l0ZXMvcHJvbG93L2FwcC9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxTQUFTLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUU7O0FBRXRFLG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEMsZ0JBQWMsQ0FDWCxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ2IsT0FBRyxFQUFFLEdBQUc7QUFDUixlQUFXLEVBQUUsNEJBQTRCO0FBQ3pDLGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDZCxPQUFHLEVBQUUsUUFBUTtBQUNiLGVBQVcsRUFBRSw2QkFBNkI7QUFDMUMsY0FBVSxFQUFFLGdCQUFnQjtHQUM3QixDQUFDLENBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRTtBQUNyQixPQUFHLEVBQUUsZUFBZTtBQUNwQixlQUFXLEVBQUUsb0NBQW9DO0FBQ2pELGNBQVUsRUFBRSxnQkFBZ0I7R0FDN0IsQ0FBQyxDQUNELEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDaEIsT0FBRyxFQUFFLFVBQVU7QUFDZixlQUFXLEVBQUUsK0JBQStCO0FBQzVDLGNBQVUsRUFBRSxpQkFBaUI7R0FDOUIsQ0FBQyxDQUNELEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDZixPQUFHLEVBQUUsU0FBUztBQUNkLGVBQVcsRUFBRSw4QkFBOEI7QUFDM0MsY0FBVSxFQUFFLGlCQUFpQjtHQUM5QixDQUFDLENBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUNmLE9BQUcsRUFBRSxTQUFTO0FBQ2QsZUFBVyxFQUFFLDhCQUE4QjtBQUMzQyxjQUFVLEVBQUUsZ0JBQWdCO0dBQzdCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBGTjtRQUVDLE1BQU0sR0FBTixNQUFNOzs7Ozs7OztBQzlIUixTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQzs7O0FBRzFFLFFBQU0sQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLFFBQU0sQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUzQyxXQUFTLFlBQVksQ0FBQyxLQUFLLEVBQUU7QUFDM0IsUUFBSSxVQUFVLEdBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFNO0FBQ25DLGdCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDOUIsRUFBQyxHQUFHLENBQUMsQ0FBQztBQUNULFdBQU8sVUFBVSxDQUFDO0dBQ25CO0FBQ0QsUUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFXO0FBQ3pCLGFBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztHQUNwQixDQUFDOzs7QUFJRixRQUFNLENBQUMsVUFBVSxHQUFHLFVBQVMsS0FBSyxFQUFDO0FBQ2pDLFVBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDbEIsQ0FBQztDQUNIO0FBQ0QsU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQztBQUNwQyxRQUFNLENBQUMsS0FBSyxHQUFHLFlBQVk7QUFDekIsY0FBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0dBQzdCLENBQUM7Q0FDSDtBQUNELFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUM7QUFDbkMsUUFBTSxDQUFDLEtBQUssR0FBRyxZQUFZO0FBQ3pCLGNBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUM1QixDQUFDO0NBQ0g7UUFFQyxjQUFjLEdBQWQsY0FBYztRQUNkLFNBQVMsR0FBVCxTQUFTO1FBQ1QsUUFBUSxHQUFSLFFBQVE7Ozs7Ozs7O0FDbkNWLFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBQyxFQUUvQjs7UUFHQyxlQUFlLEdBQWYsZUFBZTs7Ozs7c0JDTE0sVUFBVTs7eUNBQ21CLDhCQUE4Qjs7MENBQ2xELCtCQUErQjs7QUFFL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FDakQsTUFBTSxnQkFBUSxDQUNkLFVBQVUsQ0FBQyxnQkFBZ0IsNENBQWlCLENBQzVDLFVBQVUsQ0FBQyxVQUFVLHNDQUFXLENBQ2hDLFVBQVUsQ0FBQyxXQUFXLHVDQUFZLENBQ2xDLFVBQVUsQ0FBQyxpQkFBaUIsOENBQWtCLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlcikge1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvaG9tZS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdkZXNpZ24nLCB7XG4gICAgICB1cmw6ICcvZGVzaWduJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2Rlc2lnbi50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSk7XG5cblxuICAgLy8gIHZhciBjdXN0b21QcmltYXJ5ID0ge1xuICAgLy8gICAgICAnNTAnOiAnIzg1ZDk3MScsXG4gICAvLyAgICAgICcxMDAnOiAnIzczZDM1ZCcsXG4gICAvLyAgICAgICcyMDAnOiAnIzYyY2U0OScsXG4gICAvLyAgICAgICczMDAnOiAnIzUxYzczNicsXG4gICAvLyAgICAgICc0MDAnOiAnIzQ5YjMzMCcsXG4gICAvLyAgICAgICc1MDAnOiAnIzQxOUYyQicsXG4gICAvLyAgICAgICc2MDAnOiAnIzM5OGIyNicsXG4gICAvLyAgICAgICc3MDAnOiAnIzMxNzcyMCcsXG4gICAvLyAgICAgICc4MDAnOiAnIzI4NjMxYicsXG4gICAvLyAgICAgICc5MDAnOiAnIzIwNGYxNScsXG4gICAvLyAgICAgICdBMTAwJzogJyM5NmRlODUnLFxuICAgLy8gICAgICAnQTIwMCc6ICcjYTdlMzk5JyxcbiAgIC8vICAgICAgJ0E0MDAnOiAnI2I4ZTlhZCcsXG4gICAvLyAgICAgICdBNzAwJzogJyMxODNiMTAnXG4gICAvLyAgfTtcbiAgIC8vICAkbWRUaGVtaW5nUHJvdmlkZXJcbiAgIC8vICAgICAgLmRlZmluZVBhbGV0dGUoJ2N1c3RvbVByaW1hcnknLFxuICAgLy8gICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUHJpbWFyeSk7XG5cbiAgIC8vICB2YXIgY3VzdG9tQWNjZW50ID0ge1xuICAgLy8gICAgICAnNTAnOiAnI2UxYzM5MicsXG4gICAvLyAgICAgICcxMDAnOiAnI2RiYjg3ZScsXG4gICAvLyAgICAgICcyMDAnOiAnI2Q1YWQ2YScsXG4gICAvLyAgICAgICczMDAnOiAnI2QwYTM1NicsXG4gICAvLyAgICAgICc0MDAnOiAnI2NhOTg0MicsXG4gICAvLyAgICAgICc1MDAnOiAnI0JFOEIzNScsXG4gICAvLyAgICAgICc2MDAnOiAnI2FhN2MyZicsXG4gICAvLyAgICAgICc3MDAnOiAnIzk2NmUyYScsXG4gICAvLyAgICAgICc4MDAnOiAnIzgyNWYyNCcsXG4gICAvLyAgICAgICc5MDAnOiAnIzZlNTExZicsXG4gICAvLyAgICAgICdBMTAwJzogJyNlNmNlYTYnLFxuICAgLy8gICAgICAnQTIwMCc6ICcjZWNkOWJhJyxcbiAgIC8vICAgICAgJ0E0MDAnOiAnI2YxZTRjZScsXG4gICAvLyAgICAgICdBNzAwJzogJyM1YTQyMTknXG4gICAvLyAgfTtcbiAgIC8vICAkbWRUaGVtaW5nUHJvdmlkZXJcbiAgIC8vICAgICAgLmRlZmluZVBhbGV0dGUoJ2N1c3RvbUFjY2VudCcsXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBjdXN0b21BY2NlbnQpO1xuXG4gICAvLyAgdmFyIGN1c3RvbVdhcm4gPSB7XG4gICAvLyAgICAgICc1MCc6ICcjZGU5NDliJyxcbiAgIC8vICAgICAgJzEwMCc6ICcjZDg4MDg4JyxcbiAgIC8vICAgICAgJzIwMCc6ICcjZDI2ZDc2JyxcbiAgIC8vICAgICAgJzMwMCc6ICcjY2M1OTY0JyxcbiAgIC8vICAgICAgJzQwMCc6ICcjYzY0NjUyJyxcbiAgIC8vICAgICAgJzUwMCc6ICcjQjkzOTQ1JyxcbiAgIC8vICAgICAgJzYwMCc6ICcjYTUzMzNlJyxcbiAgIC8vICAgICAgJzcwMCc6ICcjOTIyZDM2JyxcbiAgIC8vICAgICAgJzgwMCc6ICcjN2YyNzJmJyxcbiAgIC8vICAgICAgJzkwMCc6ICcjNmIyMTI4JyxcbiAgIC8vICAgICAgJ0ExMDAnOiAnI2U0YTdhZCcsXG4gICAvLyAgICAgICdBMjAwJzogJyNlYWJiYmYnLFxuICAgLy8gICAgICAnQTQwMCc6ICcjZjBjZWQxJyxcbiAgIC8vICAgICAgJ0E3MDAnOiAnIzU4MWIyMSdcbiAgIC8vICB9O1xuICAgLy8gICRtZFRoZW1pbmdQcm92aWRlclxuICAgLy8gICAgICAuZGVmaW5lUGFsZXR0ZSgnY3VzdG9tV2FybicsXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBjdXN0b21XYXJuKTtcblxuICAgLy8gIHZhciBjdXN0b21CYWNrZ3JvdW5kID0ge1xuICAgLy8gICAgICAnNTAnOiAnIzYxOTFjNycsXG4gICAvLyAgICAgICcxMDAnOiAnIzRlODRjMScsXG4gICAvLyAgICAgICcyMDAnOiAnIzQwNzdiNicsXG4gICAvLyAgICAgICczMDAnOiAnIzM5NmJhMycsXG4gICAvLyAgICAgICc0MDAnOiAnIzMzNWU5MCcsXG4gICAvLyAgICAgICc1MDAnOiAnIzJDNTI3RCcsXG4gICAvLyAgICAgICc2MDAnOiAnIzI1NDY2YScsXG4gICAvLyAgICAgICc3MDAnOiAnIzFmMzk1NycsXG4gICAvLyAgICAgICc4MDAnOiAnIzE4MmQ0NCcsXG4gICAvLyAgICAgICc5MDAnOiAnIzExMjAzMicsXG4gICAvLyAgICAgICdBMTAwJzogJyM3NDllY2UnLFxuICAgLy8gICAgICAnQTIwMCc6ICcjODdhYmQ1JyxcbiAgIC8vICAgICAgJ0E0MDAnOiAnIzlhYjhkYicsXG4gICAvLyAgICAgICdBNzAwJzogJyMwYjE0MWYnXG4gICAvLyAgfTtcbiAgIC8vICAkbWRUaGVtaW5nUHJvdmlkZXJcbiAgIC8vICAgICAgLmRlZmluZVBhbGV0dGUoJ2N1c3RvbUJhY2tncm91bmQnLFxuICAgLy8gICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQmFja2dyb3VuZCk7XG5cbiAgIC8vICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXG4gICAvLyAgICAgLnByaW1hcnlQYWxldHRlKCdjdXN0b21QcmltYXJ5JylcbiAgIC8vICAgICAuYWNjZW50UGFsZXR0ZSgnY3VzdG9tQWNjZW50JylcbiAgIC8vICAgICAud2FyblBhbGV0dGUoJ2N1c3RvbVdhcm4nKVxuICAgLy8gICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnY3VzdG9tQmFja2dyb3VuZCcpXG4gICAvLyAgICAgLmRhcmsoKTtcblxufVxuZXhwb3J0IHtcbiAgY29uZmlnXG59O1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlKXtcblxuICAvLyBuYXYgdG9nZ2xlc1xuICAkc2NvcGUudG9nZ2xlTGVmdCA9IGJ1aWxkVG9nZ2xlcignbGVmdCcpO1xuICAkc2NvcGUudG9nZ2xlUmlnaHQgPSBidWlsZFRvZ2dsZXIoJ3JpZ2h0Jyk7XG5cbiAgZnVuY3Rpb24gYnVpbGRUb2dnbGVyKG5hdklEKSB7XG4gICAgbGV0IGRlYm91bmNlRm4gPSAgJG1kVXRpbC5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgJG1kU2lkZW5hdihuYXZJRCkudG9nZ2xlKCk7XG4gICAgICB9LDMwMCk7XG4gICAgcmV0dXJuIGRlYm91bmNlRm47XG4gIH1cbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5jYW5jZWwoKTtcbiAgfTtcblxuXG4gIC8vIE5hdmlnYXRlIGZ1bmN0aW9uXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICRzdGF0ZS5nbyhzdGF0ZSk7XG4gIH07XG59XG5mdW5jdGlvbiBSaWdodEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ3JpZ2h0JykuY2xvc2UoKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIExlZnRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcbiAgfTtcbn1cbmV4cG9ydCB7XG4gIE1haW5Db250cm9sbGVyLFxuICBSaWdodEN0cmwsXG4gIExlZnRDdHJsXG59O1xuIiwiZnVuY3Rpb24gTWVkaWFDb250cm9sbGVyKCRzY29wZSl7XG5cbn1cblxuZXhwb3J0e1xuICBNZWRpYUNvbnRyb2xsZXJcbn07XG4iLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciwgTGVmdEN0cmwsIFJpZ2h0Q3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTWVkaWFDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy9NZWRpYUNvbnRyb2xsZXInO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCddKVxuLmNvbmZpZyhjb25maWcpXG4uY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbi5jb250cm9sbGVyKCdMZWZ0Q3RybCcsIExlZnRDdHJsKVxuLmNvbnRyb2xsZXIoJ1JpZ2h0Q3RybCcsIFJpZ2h0Q3RybClcbi5jb250cm9sbGVyKCdNZWRpYUNvbnRyb2xsZXInLCBNZWRpYUNvbnRyb2xsZXIpO1xuIl19
