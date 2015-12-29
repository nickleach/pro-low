import config from './config';
import { MainController, LeftCtrl, RightCtrl, DialogCtrl } from './controllers/MainController';
import BuyController from './controllers/BuyController';
import MediaController from './controllers/MediaController';
import CartController from './controllers/CartController';
import ContactController from './controllers/ContactController';
import TestimonialController from './controllers/TestimonialController';
import CartService from './services/CartService';

angular
.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery' , 'ngCookies'])
.config(config)
.factory('CartService', CartService)
.controller('MainController', MainController)
.controller('LeftCtrl', LeftCtrl)
.controller('RightCtrl', RightCtrl)
.controller('DialogCtrl', DialogCtrl)
.controller('BuyCtrl', BuyController)
.controller('MediaController', MediaController)
.controller('CartController', CartController)
.controller('ContactCtrl', ContactController)
.controller('TestimonialController', TestimonialController);
