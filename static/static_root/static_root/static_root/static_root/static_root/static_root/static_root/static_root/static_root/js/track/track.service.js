(function() {
    'use strict';

    var app = angular.module('app.track');

    app.factory('trackService', trackService);

    trackService.$inject = ['$resource'];
    function trackService($resource) {
        return {
            track: function(token) {
                return $resource('/api/track/', null, {
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
