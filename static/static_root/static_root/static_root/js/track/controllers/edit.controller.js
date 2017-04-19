(function() {
    'use strict';

    angular
        .module('app.track')
        .controller('trackEditController', trackEditController);

    trackEditController.$inject = ['$http','$location','$routeParams', '$localStorage', '$timeout', 'trackService', 'genreService', 'notifyService','BASE_URL'];

    function trackEditController($http,$location, $localStorage,$routeParams,$timeout,trackService,genreService, notifyService,BASE_URL) {
        var vm = this;

        vm.track_initialize=track_initialize;


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




        // edit track initialization

        vm.edittrack_init = function(){
        /*Get genres*/
            $http({
                url:BASE_URL.URL+'/api/genre',
                method:'get'
            }).then(function successCallback(response){
                vm.genres = response.data
                
                
            })


            $http({
                url:BASE_URL.URL+'/api/track/'+String($routeParams.track_id),
                method:'get'
            }).then(function successCallback(response){
                console.log(response.data)
                vm.track_detail = response.data.track_detail
                vm.track_name=vm.track_detail.name
                vm.rating=Number(vm.track_detail.rating)
                vm.sel_genre=vm.track_detail.genres
                vm.selected_genre = []
                angular.forEach(vm.sel_genre,function(value){
                    vm.selected_genre.push(value.pk)
                });

        })
 

    }    


        // update existing track
        vm.edit_track=function(track_form){
            
            var genre_list=[]
            angular.forEach($("#genre").val(),function(value){
                genre_list.push(Number(value))
            })
            
            vm.add_track_disable=true
            if(vm.track_form.$valid){
                var form_data = 
                    {'title':vm.track_form.title.$viewValue,
                    'rating':vm.track_form.rating.$viewValue,
                    'genre':JSON.stringify(genre_list),
                    'track_id':$routeParams.track_id
                }
        
                $http({
                    url:BASE_URL.URL+"/api/track/update/",
                    method:"post",
                    data:$.param(from_data),
                    headers:{
                            "Content-Type": 'application/x-www-form-urlencoded'
                            }
                    }).then(function successCallback(response){
                            vm.add_track_disable=false
                            $('#update_track').modal('hide');
                            notifyService.display("Track Updated Successfully");
                        },function errorCallback(response){
                            vm.add_track_disable=false
                            notifyService.display("Something went wrong");
                    })
                }

            }   

    
    }
})();
