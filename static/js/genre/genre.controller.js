(function() {
    'use strict';

    angular
        .module('app.genre')
        .controller('genreController', genreController);

    genreController.$inject = ['$location', '$localStorage', '$timeout', 'genreService','$routeParams', 'notifyService'];

    function genreController($location, $localStorage, $timeout,  genreService,$routeParams, notifyService) {
        var vm = this;


        vm.genre = '';
        // vm.genre_initialize=genre_initialize;
      
        vm.edit = {
            name: ''
        };

        genre();

        function genre() {
            var query = genreService.genre($localStorage.token).query();
            query.$promise
                .then(function(data) {
                    console.log(data[0].name);
                    vm.genres = data;
                }).catch(function(error) {
                    console.log(error);
                    vm.genres = error;
                });
        }


        vm.add_new_genre=function(genreData){
            alert('inside adding genre')
            console.log(vm.genreData)
            // Error checking must have at least 'book' filled out
            if (vm.genreData === '')
                return;


            var query = genreService.genre($localStorage.token).save({
                name: vm.genreData.name
            });

            console.log(query);

            query.$promise
                .then(function(data) {
                    alert(data);
                    // vm.genre.unshift(data);
                    $('#new_genre').modal('hide');
                    notifyService.display('Added New genre');
                    $timeout(function() {
                        notifyService.showMessage = false;
                    }, 3000);

                    genre();
                })
                .catch(function(error) {
                    console.log(error);
                });
        }


        vm.edit_genre=function(genreData){
            vm.genreData=genreData;


        }


        vm.update_genre=function(genreData) {

            console.log(vm.genreData)

            var i;
            for(i = 0; i < vm.genreData.length; i++)
                if (vm.genreData[i].id === vm.edit.id)
                    break;

            console.log(vm.edit.id);    
            // No reason to send update request if objects are still the same
            if (angular.equals(vm.genreData[i], vm.edit))
                return;

            var query = genreService.genre($localStorage.token).update({id: vm.edit.id}, {
                name: vm.edit.name
            });

        }  

    }
})();
