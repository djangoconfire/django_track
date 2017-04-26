(function() {
    'use strict';

    var app = angular.module('app.genre');

    app.factory('genreService', genreService);

    genreService.$inject = ['$resource'];
    function genreService($resource) {
        return {
            genre: function(token) {
                return $resource('/api/genre/:id/', null, {
                    query: {
                        method: 'GET',
                        isArray: false,
                        headers: {
                            'Authorization': 'Token ' + token
                        }
                    }
                });
            }
        };
    }
})();
