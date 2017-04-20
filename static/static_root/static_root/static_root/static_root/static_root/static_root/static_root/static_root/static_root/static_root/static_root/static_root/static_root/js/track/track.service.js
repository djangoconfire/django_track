(function() {
    'use strict';

    var app = angular.module('app.track');

    app.factory('trackService', trackService);

    trackService.$inject = ['$resource'];
    function trackService($resource) {
        return {
            track: function(token) {
                return $resource('/api/track/:id/', null, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        headers: {
                            'Authorization': 'Token ' + token
                        }
                    }
                });
            }
        };
    }
})();
