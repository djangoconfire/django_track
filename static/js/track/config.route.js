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
            controller: 'trackListController',
            controllerAs: 'vm',
        })
        .when('/update_track/:track_id/',{
            templateUrl : STATIC_URL + 'track/update_track.html',
            controller  : 'trackEditController',
            controllerAs : 'vm',
            params:{
                'track_id':null
              }
        })

          // $locationProvider.html5Mode({
          //        enabled: true,
          //        requireBase: false
          // });
    }

})();
