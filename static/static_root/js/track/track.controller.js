(function() {
    'use strict';

    angular
        .module('app.track')
        .controller('trackController', trackController);

        trackController.$inject = ['$http','$location','$routeParams', '$localStorage', '$timeout', 'trackService', 'genreService', 'notifyService','BASE_URL'];

        function trackController($http,$location, $localStorage,$routeParams,$timeout,trackService,genreService, notifyService,BASE_URL) {
            var vm = this;
            
            vm.track = '';

            vm.track_initialize=track_initialize;
            vm.edit_track_initialize=edit_track_initialize;

            vm.trackData = {
                title: '',
                genre:  '',
                rating: '',
            };

            vm.edit_track_data = {
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

            // Intiliaze the create track form 
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

            // initializing edit track form
            function edit_track_initialize(){
              var query = genreService.genre($localStorage.token).query();
                query.$promise
                .then(function(data) {
                    // console.log(data)
                    vm.genre_list = data.results;
                }).catch(function(error) {
                    console.log(error);
                    vm.genre_list = error;
                });

                $("#edit_genre").select2({
                    tags: true,
                    tokenSeparators: [',', ' ']
                })
            }
   


            // Add new Track
            vm.add_new_track=function(track_form) {
                console.log(vm.track_form)
                if(vm.track_form.$valid){
                    vm.genredata_list = $("#genre").select2('data')
                    vm.genre_list = []
                
                    angular.forEach(vm.genredata_list,function(value){
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
                        $('#genre').select2('val',"")
                        vm.title=""
                        vm.genre=""
                        vm.rating=""
                        $('#new_track').modal('hide');
                        notifyService.display("Track Added Successfully");
                        $timeout(function() {
                            notifyService.showMessage = false;
                        }, 2000);

                        track();
                    },function errorCallback(response){
                        notifyService.display("Error occured");
                    })

                }
            
            }


            // update existing track
            vm.update_track=function(track_edit_form){
                if(vm.track_edit_form.$valid){

                   vm.genredata_list = $("#edit_genre").select2('data')
                    vm.genre_list = []
                
                    angular.forEach(vm.genredata_list,function(value){
                        vm.genre_list.push(value.id)
                    
                    })

                    // console.log(vm.genre_list)

                    var form_data = 
                        {'title':vm.track_edit_form.title.$viewValue,
                        'rating':vm.track_edit_form.rating.$viewValue,
                        'genre':JSON.stringify(vm.genre_list),
                        'track_id':vm.track_id
                    }

                    // console.log(form_data)
            
                    $http({
                        url:BASE_URL+'/api/track/update/',
                        method:"post",
                        data:$.param(form_data),
                        headers:{
                            "Content-Type": 'application/x-www-form-urlencoded'
                        }
                        }).then(function successCallback(response){
                                $('#edit_genre').select2('val',"")
                                $('#update_track').modal('hide');
                                notifyService.display("Track Updated Successfully");
                                $timeout(function() {
                                notifyService.showMessage = false;
                                }, 2000);

                                track();
                            },function errorCallback(response){
                                notifyService.display("Error occured");
                        })
                    }

                }

 
             // initialize edit  track form with data
            vm.edit_track=function(track_id){

                $http({
                    url: BASE_URL+'/api/track/'+track_id,
                    method:'get',
                    }).then(function successCallback(response){
                        console.log(response.data.results)
                        vm.track_edit_data= response.data.results
                        console.log(vm.track_edit_data.genre)
                        vm.track_id=vm.track_edit_data.id
                        vm.name=vm.track_edit_data.name
                        vm.rating=Number(vm.track_edit_data.rating)
                        vm.genre_data=vm.track_edit_data.genre
                        vm.genre_selected = []
                        angular.forEach(vm.genre_data,function(value){
                            vm.genre_selected.push(value.pk)
                        });
                            
                    },function errorCallback(response){
                        notifyService.display("Error occured");
                    })
                }

                // dropdown change event fired
                vm.update=function(){
                    console.log('dropdown change event fired')
                } 

        }
})();
