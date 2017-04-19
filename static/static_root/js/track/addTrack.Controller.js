(function() {
    'use strict';

    angular
        .module('app.track')
        .controller('addTrackController', trackController);

    // 'isLoggedIn' is passed from the config.route.js
    trackController.$inject = ['$location','$http', '$timeout', 'genreService', 'notifyService'];

    function trackController($location, $timeout, $http,genreService, notifyService) {
        var vm = this;


        vm.track = '';

        // Add new track

        vm.add_new_track=function(track_form) {
            
            if(track_form.$valid){
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
            
        }
  

       
    }
})();
