(function() {
    'use strict';

    angular
        .module('app.track')
        .controller('trackController', trackController);

    trackController.$inject = ['$http','$location', '$localStorage', '$timeout', 'trackService', 'genreService', 'notifyService','BASE_URL'];

    function trackController($http,$location, $localStorage, $timeout,trackService,genreService, notifyService,BASE_URL) {
        var vm = this;

        vm.track = '';

        vm.track_initialize=track_initialize;

        vm.trackData = {
            title: '',
            genre:  '',
            rating: '',
        };

        track();

        // get list of track from Api
        function track() {
            var query = trackService.track($localStorage.token).query();
            query.$promise
                .then(function(data) {
                    vm.tracks = data.tracklist;
                    console.log(data)
                }).catch(function(error) {
                    vm.tracks = error;
                });
        }


        // Intiliaze the track
        function track_initialize(){
              var query = genreService.genre($localStorage.token).query();
                query.$promise
                .then(function(data) {
                    console.log(data)
                    vm.genre_list = data;
                }).catch(function(error) {
                    console.log(error);
                    vm.genre_list = error;
                });

                $("#genre").select2({
                    tags: true,
                    tokenSeparators: [',', ' ']
                })
            }

        
        // Add new track
        vm.add_new_track=function(trackData) {
            
            vm.gen_list = $("#genre").select2('data')
            vm.genre_list = []
            
            angular.forEach(vm.gen_list,function(value){
                vm.genre_list.push(value.id)
                
            })  

            console.log(vm.genre_list)



            var form_data= {
                title: vm.trackData.title,
                genre: JSON.stringify(vm.genre_list),
                rating: vm.trackData.rating
            };

            console.log(form_data);

            console.log('after form_data')

            console.log(BASE_URL.URL + '/api/track/create/')

            $http({
                method: 'POST',
                url: BASE_URL.URL +'/api/track/create/',
                data:{form_data:form_data},
                headers:{
                    "Content-Type": 'application/x-www-form-urlencoded'
                    }
                }).then(function successCallback(response){
                    $('#new_track').modal('hide');
                    notifyService.display("Track Added Successfully");
                },function errorCallback(response){
                    notifyService.display("Something went wrong");
            })

        }

    }
})();
