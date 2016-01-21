import {config, run, paypal, API} from './config';
import { MainController, LeftCtrl, RightCtrl, DialogCtrl } from './controllers/MainController';
import BuyController from './controllers/BuyController';
import MediaController from './controllers/MediaController';
import CartController from './controllers/CartController';
import ContactController from './controllers/ContactController';
import { TestimonialController, TestimonialSingleCtrl } from './controllers/TestimonialController';
import CartService from './services/CartService';
import TestimonialService from './services/TestimonialService';
import UserService from './services/UserService';
import loading from './directives/loading';
angular
.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery' , 'ngCookies'])
.config(config)
.constant('PAYPAL', paypal)
.constant('API', API)
.run(run)
.directive('myLoader', [loading])
.factory('CartService', CartService)
.factory('TestimonialService', TestimonialService)
.factory('UserService', UserService)
.controller('MainController', MainController)
.controller('LeftCtrl', LeftCtrl)
.controller('RightCtrl', RightCtrl)
.controller('DialogCtrl', DialogCtrl)
.controller('BuyCtrl', BuyController)
.controller('MediaController', MediaController)
.controller('CartController', CartController)
.controller('ContactCtrl', ContactController)
.controller('TestimonialController', TestimonialController)
.controller('TestimonialSingleCtrl', TestimonialSingleCtrl);
