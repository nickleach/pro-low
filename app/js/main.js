import { config } from './config';
import { MainController, LeftCtrl, RightCtrl } from './controllers/MainController';
import { BuyController } from './controllers/BuyController';
import { MediaController } from './controllers/MediaController';
import { ContactContoller } from './controllers/ContactController'

angular.module('app', ['ui.router', 'ngMaterial'])
.config(config)
.controller('MainController', MainController)
.controller('LeftCtrl', LeftCtrl)
.controller('RightCtrl', RightCtrl)
.controller('BuyCtrl', BuyController)
.controller('MediaController', MediaController);
