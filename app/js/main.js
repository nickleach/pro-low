import config from './config';
import { MainController, LeftCtrl, RightCtrl, DialogCtrl } from './controllers/MainController';
import BuyController from './controllers/BuyController';
import MediaController from './controllers/MediaController';
import ContactController from './controllers/ContactController';
import TestimonialController from './controllers/TestimonialController';

angular.module('app', ['ui.router', 'ngMaterial', 'jkuri.gallery' , 'ngCookies'])
.config(config)
.controller('MainController', MainController)
.controller('LeftCtrl', LeftCtrl)
.controller('RightCtrl', RightCtrl)
.controller('DialogCtrl', DialogCtrl)
.controller('BuyCtrl', BuyController)
.controller('MediaController', MediaController)
.controller('ContactCtrl', ContactController)
.controller('TestimonialController', TestimonialController);
