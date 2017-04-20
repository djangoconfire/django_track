(function () {
    'use strict';

    angular
        .module('app.home')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider','STATIC_URL'];

    function configFunction($routeProvider, STATIC_URL) {
        $routeProvider.when('/', {
            templateUrl: STATIC_URL + 'home/home.html'
        });

         // $locationProvider.html5Mode({
         //         enabled: true,
         //         requireBase: false
         //  });
    }
})();
