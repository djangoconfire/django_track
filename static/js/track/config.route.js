(function() {
    'use strict';

    angular
        .module('app.track')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', 'STATIC_URL'];

    function configFunction($routeProvider, STATIC_URL) {
        $routeProvider
        .when('/tracks', {
            templateUrl: STATIC_URL + 'track/track_list.html',
            controller: 'trackController',
            controllerAs: 'vm',
        })

          // $locationProvider.html5Mode({
          //        enabled: true,
          //        requireBase: false
          // });
    }

})();
