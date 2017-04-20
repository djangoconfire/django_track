(function() {
    'use strict';

    angular
        .module('app.genre')
        .controller('genreController', genreController);

    genreController.$inject = ['$location', '$localStorage','$http', '$timeout', 'genreService','$routeParams', 'notifyService','BASE_URL'];

    function genreController($location, $localStorage, $timeout, $http, genreService,$routeParams, notifyService,BASE_URL) {
        var vm = this;


        vm.genre = '';
        // vm.genre_initialize=genre_initialize;
      
        // vm.edit = {
        //     name: ''
        // };

        genre();

        function genre() {
            var query = genreService.genre($localStorage.token).query();
            query.$promise
                .then(function(data) {
                    vm.genres = data;
                }).catch(function(error) {
                    console.log(error);
                    vm.genres = error;
                });
        }


        vm.add_new_genre=function(genreData){


            var form_data = {
                name: vm.genreData.name
            };

            console.log(form_data)


            $http({
                url: BASE_URL.URL + '/api/genre/create/',
                method:"POST",
                data:form_data,
                headers:{
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response){
                notifyService.display("Genre Added Successfully");
            },function errorCallback(response){
                notifyService.display("Something went wrong");
            })
        }    


        // vm.edit_genre=function(genreData){
        //     vm.genreData=genreData;


        // }


        // vm.update_genre=function(genreData) {

        //     console.log(vm.genreData)

        //     var i;
        //     for(i = 0; i < vm.genreData.length; i++)
        //         if (vm.genreData[i].id === vm.edit.id)
        //             break;

        //     console.log(vm.edit.id);    
        //     // No reason to send update request if objects are still the same
        //     if (angular.equals(vm.genreData[i], vm.edit))
        //         return;

        //     var query = genreService.genre($localStorage.token).update({id: vm.edit.id}, {
        //         name: vm.edit.name
        //     });

        // }  

    }
})();
