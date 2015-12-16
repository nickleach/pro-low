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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function MediaController($scope) {

  $scope.images = [{
    thumb: '',
    img: 'assets/images/closeup1.jpg',
    description: ''
  }, {
    thumb: '',
    img: 'assets/images/kevin.jpg',
    description: ''
  }, {
    thumb: '',
    img: 'assets/images/main.jpg',
    description: ''
  }, {
    thumb: '',
    img: 'assets/images/main3.jpg',
    description: ''
  }, {
    thumb: '',
    img: 'assets/images/landscape1.jpg',
    description: ''
  }, {
    thumb: '',
    img: 'assets/images/landscape2.jpg',
    description: ''
  }, {
    thumb: '',
    img: 'assets/images/landscape3.jpg',
    description: ''
  }, {
    thumb: '',
    img: 'assets/images/landscape4.jpg',
    description: ''
  }, {
    thumb: '',
    img: 'assets/images/landscape5.jpg',
    description: ''
  }];
}

exports.MediaController = MediaController;

},{}],6:[function(require,module,exports){
'use strict';

var _config = require('./config');

var _controllersMainController = require('./controllers/MainController');

var _controllersBuyController = require('./controllers/BuyController');

var _controllersMediaController = require('./controllers/MediaController');

var _controllersContactController = require('./controllers/ContactController');

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery']).config(_config.config).controller('MainController', _controllersMainController.MainController).controller('LeftCtrl', _controllersMainController.LeftCtrl).controller('RightCtrl', _controllersMainController.RightCtrl).controller('BuyCtrl', _controllersBuyController.BuyController).controller('MediaController', _controllersMediaController.MediaController);

},{"./config":1,"./controllers/BuyController":2,"./controllers/ContactController":3,"./controllers/MainController":4,"./controllers/MediaController":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBLFNBQVMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRTs7QUFFdEUsb0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVsQyxnQkFBYyxDQUNYLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDYixPQUFHLEVBQUUsR0FBRztBQUNSLGVBQVcsRUFBRSw0QkFBNEI7QUFDekMsY0FBVSxFQUFFLGdCQUFnQjtHQUM3QixDQUFDLENBQ0QsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNaLE9BQUcsRUFBRSxNQUFNO0FBQ1gsZUFBVyxFQUFFLDJCQUEyQjtBQUN4QyxjQUFVLEVBQUUsU0FBUztHQUN0QixDQUFDLENBQ0QsS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUNkLE9BQUcsRUFBRSxRQUFRO0FBQ2IsZUFBVyxFQUFFLDZCQUE2QjtBQUMxQyxj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LGVBQWUsQ0FBQyxDQUFDLENBQ2xFLE1BQU0sZ0JBQVEsQ0FDZCxVQUFVLENBQUMsZ0JBQWdCLDRDQUFpQixDQUM1QyxVQUFVLENBQUMsVUFBVSxzQ0FBVyxDQUNoQyxVQUFVLENBQUMsV0FBVyx1Q0FBWSxDQUNsQyxVQUFVLENBQUMsU0FBUywwQ0FBZ0IsQ0FDcEMsVUFBVSxDQUFDLGlCQUFpQiw4Q0FBa0IsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5Jywge1xuICAgICAgdXJsOiAnL2J1eScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0J1eUN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdkZXNpZ24nLCB7XG4gICAgICB1cmw6ICcvZGVzaWduJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2Rlc2lnbi50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2NvbnRhY3QnLCB7XG4gICAgICB1cmw6ICcvY29udGFjdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9jb250YWN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KTtcblxuXG4gICAvLyAgdmFyIGN1c3RvbVByaW1hcnkgPSB7XG4gICAvLyAgICAgICc1MCc6ICcjODVkOTcxJyxcbiAgIC8vICAgICAgJzEwMCc6ICcjNzNkMzVkJyxcbiAgIC8vICAgICAgJzIwMCc6ICcjNjJjZTQ5JyxcbiAgIC8vICAgICAgJzMwMCc6ICcjNTFjNzM2JyxcbiAgIC8vICAgICAgJzQwMCc6ICcjNDliMzMwJyxcbiAgIC8vICAgICAgJzUwMCc6ICcjNDE5RjJCJyxcbiAgIC8vICAgICAgJzYwMCc6ICcjMzk4YjI2JyxcbiAgIC8vICAgICAgJzcwMCc6ICcjMzE3NzIwJyxcbiAgIC8vICAgICAgJzgwMCc6ICcjMjg2MzFiJyxcbiAgIC8vICAgICAgJzkwMCc6ICcjMjA0ZjE1JyxcbiAgIC8vICAgICAgJ0ExMDAnOiAnIzk2ZGU4NScsXG4gICAvLyAgICAgICdBMjAwJzogJyNhN2UzOTknLFxuICAgLy8gICAgICAnQTQwMCc6ICcjYjhlOWFkJyxcbiAgIC8vICAgICAgJ0E3MDAnOiAnIzE4M2IxMCdcbiAgIC8vICB9O1xuICAgLy8gICRtZFRoZW1pbmdQcm92aWRlclxuICAgLy8gICAgICAuZGVmaW5lUGFsZXR0ZSgnY3VzdG9tUHJpbWFyeScsXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBjdXN0b21QcmltYXJ5KTtcblxuICAgLy8gIHZhciBjdXN0b21BY2NlbnQgPSB7XG4gICAvLyAgICAgICc1MCc6ICcjZTFjMzkyJyxcbiAgIC8vICAgICAgJzEwMCc6ICcjZGJiODdlJyxcbiAgIC8vICAgICAgJzIwMCc6ICcjZDVhZDZhJyxcbiAgIC8vICAgICAgJzMwMCc6ICcjZDBhMzU2JyxcbiAgIC8vICAgICAgJzQwMCc6ICcjY2E5ODQyJyxcbiAgIC8vICAgICAgJzUwMCc6ICcjQkU4QjM1JyxcbiAgIC8vICAgICAgJzYwMCc6ICcjYWE3YzJmJyxcbiAgIC8vICAgICAgJzcwMCc6ICcjOTY2ZTJhJyxcbiAgIC8vICAgICAgJzgwMCc6ICcjODI1ZjI0JyxcbiAgIC8vICAgICAgJzkwMCc6ICcjNmU1MTFmJyxcbiAgIC8vICAgICAgJ0ExMDAnOiAnI2U2Y2VhNicsXG4gICAvLyAgICAgICdBMjAwJzogJyNlY2Q5YmEnLFxuICAgLy8gICAgICAnQTQwMCc6ICcjZjFlNGNlJyxcbiAgIC8vICAgICAgJ0E3MDAnOiAnIzVhNDIxOSdcbiAgIC8vICB9O1xuICAgLy8gICRtZFRoZW1pbmdQcm92aWRlclxuICAgLy8gICAgICAuZGVmaW5lUGFsZXR0ZSgnY3VzdG9tQWNjZW50JyxcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUFjY2VudCk7XG5cbiAgIC8vICB2YXIgY3VzdG9tV2FybiA9IHtcbiAgIC8vICAgICAgJzUwJzogJyNkZTk0OWInLFxuICAgLy8gICAgICAnMTAwJzogJyNkODgwODgnLFxuICAgLy8gICAgICAnMjAwJzogJyNkMjZkNzYnLFxuICAgLy8gICAgICAnMzAwJzogJyNjYzU5NjQnLFxuICAgLy8gICAgICAnNDAwJzogJyNjNjQ2NTInLFxuICAgLy8gICAgICAnNTAwJzogJyNCOTM5NDUnLFxuICAgLy8gICAgICAnNjAwJzogJyNhNTMzM2UnLFxuICAgLy8gICAgICAnNzAwJzogJyM5MjJkMzYnLFxuICAgLy8gICAgICAnODAwJzogJyM3ZjI3MmYnLFxuICAgLy8gICAgICAnOTAwJzogJyM2YjIxMjgnLFxuICAgLy8gICAgICAnQTEwMCc6ICcjZTRhN2FkJyxcbiAgIC8vICAgICAgJ0EyMDAnOiAnI2VhYmJiZicsXG4gICAvLyAgICAgICdBNDAwJzogJyNmMGNlZDEnLFxuICAgLy8gICAgICAnQTcwMCc6ICcjNTgxYjIxJ1xuICAgLy8gIH07XG4gICAvLyAgJG1kVGhlbWluZ1Byb3ZpZGVyXG4gICAvLyAgICAgIC5kZWZpbmVQYWxldHRlKCdjdXN0b21XYXJuJyxcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVdhcm4pO1xuXG4gICAvLyAgdmFyIGN1c3RvbUJhY2tncm91bmQgPSB7XG4gICAvLyAgICAgICc1MCc6ICcjNjE5MWM3JyxcbiAgIC8vICAgICAgJzEwMCc6ICcjNGU4NGMxJyxcbiAgIC8vICAgICAgJzIwMCc6ICcjNDA3N2I2JyxcbiAgIC8vICAgICAgJzMwMCc6ICcjMzk2YmEzJyxcbiAgIC8vICAgICAgJzQwMCc6ICcjMzM1ZTkwJyxcbiAgIC8vICAgICAgJzUwMCc6ICcjMkM1MjdEJyxcbiAgIC8vICAgICAgJzYwMCc6ICcjMjU0NjZhJyxcbiAgIC8vICAgICAgJzcwMCc6ICcjMWYzOTU3JyxcbiAgIC8vICAgICAgJzgwMCc6ICcjMTgyZDQ0JyxcbiAgIC8vICAgICAgJzkwMCc6ICcjMTEyMDMyJyxcbiAgIC8vICAgICAgJ0ExMDAnOiAnIzc0OWVjZScsXG4gICAvLyAgICAgICdBMjAwJzogJyM4N2FiZDUnLFxuICAgLy8gICAgICAnQTQwMCc6ICcjOWFiOGRiJyxcbiAgIC8vICAgICAgJ0E3MDAnOiAnIzBiMTQxZidcbiAgIC8vICB9O1xuICAgLy8gICRtZFRoZW1pbmdQcm92aWRlclxuICAgLy8gICAgICAuZGVmaW5lUGFsZXR0ZSgnY3VzdG9tQmFja2dyb3VuZCcsXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBjdXN0b21CYWNrZ3JvdW5kKTtcblxuICAgLy8gJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcbiAgIC8vICAgICAucHJpbWFyeVBhbGV0dGUoJ2N1c3RvbVByaW1hcnknKVxuICAgLy8gICAgIC5hY2NlbnRQYWxldHRlKCdjdXN0b21BY2NlbnQnKVxuICAgLy8gICAgIC53YXJuUGFsZXR0ZSgnY3VzdG9tV2FybicpXG4gICAvLyAgICAgLmJhY2tncm91bmRQYWxldHRlKCdjdXN0b21CYWNrZ3JvdW5kJylcbiAgIC8vICAgICAuZGFyaygpO1xuXG59XG5leHBvcnQge1xuICBjb25maWdcbn07XG4iLCJmdW5jdGlvbiBCdXlDb250cm9sbGVyKCRzY29wZSl7XG5cbn1cbmV4cG9ydHtcbiAgQnV5Q29udHJvbGxlclxufTtcbiIsImZ1bmN0aW9uIENvbnRhY3RDb250cm9sbGVyKCRzY29wZSl7XG5cbn1cbmV4cG9ydCB7XG4gIENvbnRhY3RDb250cm9sbGVyXG59O1xuIiwiZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJG1kVXRpbCwgJHN0YXRlKXtcblxuICAvLyBuYXYgdG9nZ2xlc1xuICAkc2NvcGUudG9nZ2xlTGVmdCA9IGJ1aWxkVG9nZ2xlcignbGVmdCcpO1xuICAkc2NvcGUudG9nZ2xlUmlnaHQgPSBidWlsZFRvZ2dsZXIoJ3JpZ2h0Jyk7XG5cbiAgZnVuY3Rpb24gYnVpbGRUb2dnbGVyKG5hdklEKSB7XG4gICAgbGV0IGRlYm91bmNlRm4gPSAgJG1kVXRpbC5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgJG1kU2lkZW5hdihuYXZJRCkudG9nZ2xlKCk7XG4gICAgICB9LDMwMCk7XG4gICAgcmV0dXJuIGRlYm91bmNlRm47XG4gIH1cbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5jYW5jZWwoKTtcbiAgfTtcblxuXG4gIC8vIE5hdmlnYXRlIGZ1bmN0aW9uXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24oc3RhdGUsIG5hdil7XG4gICAgJHN0YXRlLmdvKHN0YXRlKTtcbiAgICBpZiAobmF2ID09IFwibGVmdFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgfWVsc2UgaWYobmF2ID09IFwicmlnaHRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBSaWdodEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ3JpZ2h0JykuY2xvc2UoKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIExlZnRDdHJsKCRzY29wZSwgJG1kU2lkZW5hdil7XG4gICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcbiAgfTtcbn1cbmV4cG9ydCB7XG4gIE1haW5Db250cm9sbGVyLFxuICBSaWdodEN0cmwsXG4gIExlZnRDdHJsXG59O1xuIiwiZnVuY3Rpb24gTWVkaWFDb250cm9sbGVyKCRzY29wZSl7XG5cblxuXG4gICAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2Nsb3NldXAxLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2tldmluLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4uanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbjMuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMS5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUyLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTMuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNC5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU1LmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfVxuICAgIF07XG5cbn1cblxuZXhwb3J0e1xuICBNZWRpYUNvbnRyb2xsZXJcbn07XG4iLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciwgTGVmdEN0cmwsIFJpZ2h0Q3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXInO1xuaW1wb3J0IHsgQnV5Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcnMvQnV5Q29udHJvbGxlcic7XG5pbXBvcnQgeyBNZWRpYUNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzL01lZGlhQ29udHJvbGxlcic7XG5pbXBvcnQgeyBDb250YWN0Q29udG9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy9Db250YWN0Q29udHJvbGxlcic7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ2prdXJpLmdhbGxlcnknXSlcbi5jb25maWcoY29uZmlnKVxuLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTGVmdEN0cmwnLCBMZWZ0Q3RybClcbi5jb250cm9sbGVyKCdSaWdodEN0cmwnLCBSaWdodEN0cmwpXG4uY29udHJvbGxlcignQnV5Q3RybCcsIEJ1eUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTWVkaWFDb250cm9sbGVyJywgTWVkaWFDb250cm9sbGVyKTtcbiJdfQ==
