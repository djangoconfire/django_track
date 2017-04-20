(function() {
    'use strict';

    angular
        .module('app.genre')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider','STATIC_URL'];

    function configFunction($routeProvider, STATIC_URL) {
        $routeProvider.when('/genres', {
            templateUrl: STATIC_URL + '/genre/genre_list.html',
            controller: 'genreController',
            controllerAs: 'vm',
        });

          //  $locationProvider.html5Mode({
          //        enabled: true,
          //        requireBase: false
          // });
    }

})();
