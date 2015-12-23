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

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  // Navigate function
  $scope.navigateTo = function (state, nav) {
    $state.go(state);
    if (nav == "left") {
      $scope.toggleLeft();
      if (!$right.hasClass('md-closed')) $scope.toggleRight();
    } else if (nav == "right") {
      $scope.toggleRight();
      if (!$left.hasClass('md-closed')) $scope.toggleLeft();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29uZmlnLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL2NvbnRyb2xsZXJzL0J1eUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmlja2xlYWNoL3dlYnNpdGVzL3Byb2xvdy9hcHAvanMvY29udHJvbGxlcnMvTWVkaWFDb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY2tsZWFjaC93ZWJzaXRlcy9wcm9sb3cvYXBwL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBLFNBQVMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRTs7QUFFdEUsb0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVsQyxnQkFBYyxDQUNYLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDYixPQUFHLEVBQUUsR0FBRztBQUNSLGVBQVcsRUFBRSw0QkFBNEI7QUFDekMsY0FBVSxFQUFFLGdCQUFnQjtHQUM3QixDQUFDLENBQ0QsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNaLE9BQUcsRUFBRSxNQUFNO0FBQ1gsZUFBVyxFQUFFLDJCQUEyQjtBQUN4QyxjQUFVLEVBQUUsU0FBUztHQUN0QixDQUFDLENBQ0QsS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUNkLE9BQUcsRUFBRSxRQUFRO0FBQ2IsZUFBVyxFQUFFLDZCQUE2QjtBQUMxQyxj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eUNBQXlDO0FBQzlDLGVBQVcsRUFBRSxFQUFFO0dBQ2hCLENBQ0YsQ0FBQztDQUVMOztRQUdDLGVBQWUsR0FBZixlQUFlOzs7OztzQkN6RE0sVUFBVTs7eUNBQ21CLDhCQUE4Qjs7d0NBQ3BELDZCQUE2Qjs7MENBQzNCLCtCQUErQjs7NENBQzlCLGlDQUFpQzs7QUFFbEUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQ2xFLE1BQU0sZ0JBQVEsQ0FDZCxVQUFVLENBQUMsZ0JBQWdCLDRDQUFpQixDQUM1QyxVQUFVLENBQUMsVUFBVSxzQ0FBVyxDQUNoQyxVQUFVLENBQUMsV0FBVyx1Q0FBWSxDQUNsQyxVQUFVLENBQUMsU0FBUywwQ0FBZ0IsQ0FDcEMsVUFBVSxDQUFDLGlCQUFpQiw4Q0FBa0IsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG5cbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnLycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9ob21lLnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgnYnV5Jywge1xuICAgICAgdXJsOiAnL2J1eScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9idXkudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0J1eUN0cmwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3N0b3J5LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcidcbiAgICB9KVxuICAgIC5zdGF0ZSgndGVzdGltb25pYWxzJywge1xuICAgICAgdXJsOiAnL3Rlc3RpbW9uaWFscycsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy90ZXN0aW1vbmlhbHMudHBsLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdnYWxsZXJ5Jywge1xuICAgICAgdXJsOiAnL2dhbGxlcnknLFxuICAgICAgdGVtcGxhdGVVcmw6ICdqcy90ZW1wbGF0ZXMvZ2FsbGVyeS50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCd2aWRlb3MnLCB7XG4gICAgICB1cmw6ICcvdmlkZW9zJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL3ZpZGVvcy50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWVkaWFDb250cm9sbGVyJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdkZXNpZ24nLCB7XG4gICAgICB1cmw6ICcvZGVzaWduJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnanMvdGVtcGxhdGVzL2Rlc2lnbi50cGwuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXG4gICAgfSlcbiAgICAuc3RhdGUoJ2NvbnRhY3QnLCB7XG4gICAgICB1cmw6ICcvY29udGFjdCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pzL3RlbXBsYXRlcy9jb250YWN0LnRwbC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICB9KTtcblxufVxuZXhwb3J0IHtcbiAgY29uZmlnXG59O1xuIiwiZnVuY3Rpb24gQnV5Q29udHJvbGxlcigkc2NvcGUpe1xuXG59XG5leHBvcnR7XG4gIEJ1eUNvbnRyb2xsZXJcbn07XG4iLCJmdW5jdGlvbiBDb250YWN0Q29udHJvbGxlcigkc2NvcGUpe1xuXG59XG5leHBvcnQge1xuICBDb250YWN0Q29udHJvbGxlclxufTtcbiIsImZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRtZFV0aWwsICRzdGF0ZSl7XG5cbiAgLy8gbmF2IHRvZ2dsZXNcbiAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBidWlsZFRvZ2dsZXIoJ2xlZnQnKTtcbiAgJHNjb3BlLnRvZ2dsZVJpZ2h0ID0gYnVpbGRUb2dnbGVyKCdyaWdodCcpO1xuICBsZXQgJGxlZnQgPSAkKCcubWQtc2lkZW5hdi1sZWZ0Jyk7XG4gIGxldCAkcmlnaHQgPSAkKCcubWQtc2lkZW5hdi1yaWdodCcpO1xuXG4gIC8vIGxpc3QgaXRlbSBjbGljayBldmVudFxuICAvLyAkKCdtZC1saXN0LWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAvLyAgICQoJ21kLWxpc3QtaXRlbScpLnJlbW92ZUNsYXNzKCdzaWRlbmF2LWFjdGl2ZScpO1xuICAvLyAgICQodGhpcykuYWRkQ2xhc3MoJ3NpZGVuYXYtYWN0aXZlJyk7XG4gIC8vIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkVG9nZ2xlcihuYXZJRCkge1xuICAgIGxldCBkZWJvdW5jZUZuID0gICRtZFV0aWwuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICRtZFNpZGVuYXYobmF2SUQpLnRvZ2dsZSgpO1xuICAgICAgfSwzMDApO1xuICAgIHJldHVybiBkZWJvdW5jZUZuO1xuICB9XG5cbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICRtZERpYWxvZy5jYW5jZWwoKTtcbiAgfTtcblxuXG4gIC8vIE5hdmlnYXRlIGZ1bmN0aW9uXG4gICRzY29wZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24oc3RhdGUsIG5hdil7XG4gICAgJHN0YXRlLmdvKHN0YXRlKTtcbiAgICBpZiAobmF2ID09IFwibGVmdFwiKXtcbiAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgICBpZighJHJpZ2h0Lmhhc0NsYXNzKCdtZC1jbG9zZWQnKSlcbiAgICAgICAgJHNjb3BlLnRvZ2dsZVJpZ2h0KCk7XG4gICAgfWVsc2UgaWYobmF2ID09IFwicmlnaHRcIil7XG4gICAgICAkc2NvcGUudG9nZ2xlUmlnaHQoKTtcbiAgICAgIGlmKCEkbGVmdC5oYXNDbGFzcygnbWQtY2xvc2VkJykpXG4gICAgICAgICRzY29wZS50b2dnbGVMZWZ0KCk7XG4gICAgfVxuICB9O1xuXG5cbn1cbmZ1bmN0aW9uIFJpZ2h0Q3RybCgkc2NvcGUsICRtZFNpZGVuYXYpe1xuICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1kU2lkZW5hdigncmlnaHQnKS5jbG9zZSgpO1xuICB9O1xufVxuZnVuY3Rpb24gTGVmdEN0cmwoJHNjb3BlLCAkbWRTaWRlbmF2KXtcbiAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xuICB9O1xufVxuZXhwb3J0IHtcbiAgTWFpbkNvbnRyb2xsZXIsXG4gIFJpZ2h0Q3RybCxcbiAgTGVmdEN0cmxcbn07XG4iLCJmdW5jdGlvbiBNZWRpYUNvbnRyb2xsZXIoJHNjb3BlKXtcblxuICAgICRzY29wZS50ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgIGNvbnNvbGUubG9nKCd3b3JrZWQnKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2Nsb3NldXAxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9jbG9zZXVwMS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2tldmluLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9rZXZpbi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL21haW4tY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL21haW4tY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICAvLyB7XG4gICAgICAvLyAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9tYWluMy1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAvLyAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbWFpbjMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgLy8gICBkZXNjcmlwdGlvbjogJydcbiAgICAgIC8vIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGUxLWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGUxLWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlMi1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlMi1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGh1bWI6ICdhc3NldHMvdGh1bWJzL2xhbmRzY2FwZTMtY29tcHJlc3Nvcl90bi5qcGcnLFxuICAgICAgICBpbWc6ICdhc3NldHMvaW1hZ2VzL2xhbmRzY2FwZTMtY29tcHJlc3Nvci5qcGcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRodW1iOiAnYXNzZXRzL3RodW1icy9sYW5kc2NhcGU0LWNvbXByZXNzb3JfdG4uanBnJyxcbiAgICAgICAgaW1nOiAnYXNzZXRzL2ltYWdlcy9sYW5kc2NhcGU0LWNvbXByZXNzb3IuanBnJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aHVtYjogJ2Fzc2V0cy90aHVtYnMvbGFuZHNjYXBlNS1jb21wcmVzc29yX3RuLmpwZycsXG4gICAgICAgIGltZzogJ2Fzc2V0cy9pbWFnZXMvbGFuZHNjYXBlNS1jb21wcmVzc29yLmpwZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgfVxuICAgIF07XG5cbn1cblxuZXhwb3J0e1xuICBNZWRpYUNvbnRyb2xsZXJcbn07XG4iLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYWluQ29udHJvbGxlciwgTGVmdEN0cmwsIFJpZ2h0Q3RybCB9IGZyb20gJy4vY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXInO1xuaW1wb3J0IHsgQnV5Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcnMvQnV5Q29udHJvbGxlcic7XG5pbXBvcnQgeyBNZWRpYUNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzL01lZGlhQ29udHJvbGxlcic7XG5pbXBvcnQgeyBDb250YWN0Q29udG9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVycy9Db250YWN0Q29udHJvbGxlcic7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ2prdXJpLmdhbGxlcnknXSlcbi5jb25maWcoY29uZmlnKVxuLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTGVmdEN0cmwnLCBMZWZ0Q3RybClcbi5jb250cm9sbGVyKCdSaWdodEN0cmwnLCBSaWdodEN0cmwpXG4uY29udHJvbGxlcignQnV5Q3RybCcsIEJ1eUNvbnRyb2xsZXIpXG4uY29udHJvbGxlcignTWVkaWFDb250cm9sbGVyJywgTWVkaWFDb250cm9sbGVyKTtcbiJdfQ==
