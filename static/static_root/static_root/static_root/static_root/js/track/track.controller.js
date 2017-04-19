(function() {
    'use strict';

    angular
        .module('app.track')
        .controller('trackController', trackController);

    // 'isLoggedIn' is passed from the config.route.js
    trackController.$inject = ['$location', '$localStorage','$http', '$timeout', 'trackService', 'genreService', 'notifyService'];

    function trackController($location, $localStorage, $timeout, $http,trackService,genreService, notifyService) {
        var vm = this;


        vm.track = '';

        vm.track_initialize=track_initialize;

        vm.trackData = {
            title: '',
            genre:  '',
            rating: '',
        };

        track();

        // get list of track

        function track() {
            var query = trackService.track($localStorage.token).query();
            query.$promise
                .then(function(data) {
                    console.log(data);
                    vm.tracks = data;
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
            vm.add_track_disable=true
            
            vm.gen_list = $("#genre").select2('data')
            vm.genre_list = []
            
            angular.forEach(vm.gen_list,function(value){
                vm.genre_list.push(value.id)
                
            })

            console.log(vm.genre_list)

            var form_data= {
                title: vm.trackData.title,
                genre: JSON.stringify(vm.trackData.genre),
                rating: vm.trackData.rating
            };

            console.log(form_data);


            $http({
                url:'/api/track/create/',
                method:"post",
                data:$.param(form_data),
                headers:{
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response){
                $('.genre_list').select2('val',"")
                vm.title=undefined
                vm.rating=undefined
                vm.genre_list=undefined

                vm.add_track_disable=false
                notifyService.display("Track Added Successfully");
            },function errorCallback(response){
                $scope.add_track_disable=false
                notifyService.display("Something went wrong");
            })

        }
  

        // // Delete track

        // vm.deletetrack=function(track) {
        //     var i;
        //     for (i = 0; i < vm.track.length; i++)
        //         if(vm.track[i].id === track.id)
        //             break;

        //     var query = trackervice.book($localStorage.token).delete({id: track.id});
        //     query.$promise
        //         .then(function(data) {
        //             vm.track.splice(i, 1);
        //         }).catch(function(error) {
        //             console.log(error);
        //         });
        // }

        
      
        //  Update the existing track

        // vm.edit_track=function(track){
        //     vm.trackData=track;
        // }

        // vm.update_track=function(trackData) {

        //     console.log(vm.track)

        //     var i;
        //     for(i = 0; i < vm.track.length; i++)
        //         if (vm.track[i].id === vm.edit.id)
        //             break;
        //     // No reason to send update request if objects are still the same
        //     if (angular.equals(vm.track[i], vm.edit))
        //         return;

        //     var query = trackervice.track($localStorage.token).update({id: vm.edit.id}, {
        //         title: vm.track.title,
        //         genre: JSON.stringify(vm.track.genre),
        //         rating: vm.track.rating
        //     });   

        //     query.$promise
        //         .then(function(response) {
        //             vm.track[i] = vm.edit;
        //             $('#update_track').modal('hide');
        //             notifyService.display('Track updated successfully');
        //             $timeout(function() {
        //                 notifyService.showMessage = false;
        //             }, 3000);
        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         });
        // }

        // vm.copytrack=function(track) {
        //     vm.edit = angular.copy(track);
        // }
    }
})();
