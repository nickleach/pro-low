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