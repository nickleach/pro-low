import { config } from './config';
import { MainController } from './controllers/MainController';
import { MediaController } from './controllers/MediaController';

angular.module('app', ['ui.router', 'ngMaterial'])
.config(config)
.controller('MainController', MainController)
.controller('MediaController', MediaController);
