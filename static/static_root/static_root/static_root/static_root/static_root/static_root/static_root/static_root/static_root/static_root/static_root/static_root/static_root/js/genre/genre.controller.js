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
      
        vm.genreData = {
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

        //    function genre_initialize(){
        //       var query = genreService.genre($localStorage.token).query({id:$routeParams.genre_id});
        //       console.log(query)
        //         query.$promise
        //         .then(function(data) {
        //             console.log(data)
        //             vm.genre = data.name;
        //         }).catch(function(error) {
        //             console.log(error);
        //             vm.genre_list = error;
        //         });


        // }


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

    }
})();
