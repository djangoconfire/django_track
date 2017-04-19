(function() {
    'use strict';

    angular
        .module('app.track')
        .controller('trackListController', trackListController);

        trackListController.$inject = ['$http','$location','$routeParams', '$localStorage', '$timeout', 'trackService', 'genreService', 'notifyService','BASE_URL'];

        function trackListController($http,$location, $localStorage,$routeParams,$timeout,trackService,genreService, notifyService,BASE_URL) {
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
                        vm.tracks = data.results;
                    // console.log(data)
                    }).catch(function(error) {
                        vm.tracks = error;
                    });
                }

            // Intiliaze the track
            function track_initialize(){
                  var query = genreService.genre($localStorage.token).query();
                    query.$promise
                    .then(function(data) {
                        // console.log(data)
                        vm.genre_list = data.results;
                    }).catch(function(error) {
                        console.log(error);
                        vm.genre_list = error;
                    });

                    $("#genre").select2({
                        tags: true,
                        tokenSeparators: [',', ' ']
                    })
                }


            // Add new Track
            vm.add_new_track=function(track_form) {
            
                console.log(vm.track_form)
                if(vm.track_form.$valid){
                    vm.gen_list = $("#genre").select2('data')
                    vm.genre_list = []
                
                    angular.forEach(vm.gen_list,function(value){
                        vm.genre_list.push(value.id)
                    
                    })

                    // console.log(vm.genre_list)

                    var form_data= {
                        title: vm.track_form.title.$viewValue,
                        genre: JSON.stringify(vm.genre_list),
                        rating: vm.track_form.rating.$viewValue
                    };

                    // console.log(form_data);

                    $http({
                        url:BASE_URL+'/api/track/create/',
                        method:"post",
                        data:$.param(form_data),
                        headers:{
                            "Content-Type": 'application/x-www-form-urlencoded'
                        }
                    }).then(function successCallback(response){
                        vm.add_track_disable=false
                        $('#new_track').modal('hide');
                        notifyService.display("Track Added Successfully");
                        $timeout(function() {
                            notifyService.showMessage = false;
                        }, 2000);

                        track();
                    },function errorCallback(response){
                        vm.add_track_disable=false
                        notifyService.display("Something went wrong");
                    })

                }
            
            }

            // edit track initialization
             


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
                        url:BASE_URL+"/api/track/update/",
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


            vm.update_track=function(track_id){
                $http({
                    url:BASE_URL+'/api/genre',
                    method:'get'
                }).then(function successCallback(response){
                    console.log('inside update_track')
                    console.log(response)
                    vm.genres = response.data.results   
                    
                })

                $http({
                    url:BASE_URL+'/api/track/'+track_id,
                    method:'get'
                }).then(function successCallback(response){
                    console.log(response.data)
                    vm.track_detail = response.data.results
                    vm.track_name=vm.track_detail.name
                    vm.rating=Number(vm.track_detail.rating)
                    vm.sel_genre=vm.track_detail.genre
                    vm.selected_genre = []
                    angular.forEach(vm.sel_genre,function(value){
                        vm.selected_genre.push(value.pk)
                    });

                })
     
            }

        }
})();
