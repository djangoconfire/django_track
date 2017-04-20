(function () {
    'use strict';

    angular.module('musicapp', [

        // Angular modules
        'ngRoute',
        'ngResource',
        'ngStorage',
        'ngMessages',
        'jcs-autoValidate',
        'angular-rating',
        // 'angular-clipboard',

        // Custom modules
        'app.core',
        'app.track',
        'app.genre',
        'app.home',
        'app.notify',
        // 'app.star',
    ]);
})();
