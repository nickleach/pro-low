import { config } from './config';
import { MainController, LeftCtrl, RightCtrl } from './controllers/MainController';
import { MediaController } from './controllers/MediaController';

angular.module('app', ['ui.router', 'ngMaterial'])
.config(config)
.controller('MainController', MainController)
.controller('LeftCtrl', LeftCtrl)
.controller('RightCtrl', RightCtrl)
.controller('MediaController', MediaController);
