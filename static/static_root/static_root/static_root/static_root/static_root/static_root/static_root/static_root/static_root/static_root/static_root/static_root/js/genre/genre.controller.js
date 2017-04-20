(function() {
    'use strict';

    angular
        .module('app.genre')
        .controller('genreController', genreController);

        genreController.$inject = ['$http','$location', '$localStorage', '$timeout', 'genreService','$routeParams', 'notifyService','BASE_URL'];

        function genreController( $http,$location, $localStorage, $timeout, genreService,$routeParams, notifyService,BASE_URL) {
            var vm = this;

            vm.genre = '';

            genre();

            // showing genre_list from api
            function genre() {
                var query = genreService.genre($localStorage.token).query();
                query.$promise
                    .then(function(data) {
                        vm.genres = data.results;
                    }).catch(function(error) {
                        vm.genres = error;
                    });
            }


            // Adding new genre
            vm.add_new_genre=function(genre_form){

                if(vm.genre_form.$valid){
                    var form_data = {
                        genre_name: vm.genre_form.genre.$viewValue
                    };

                    // console.log(form_data)

                    $http({
                        url: BASE_URL +'/api/genre/create/',
                        method:"POST",
                        data:$.param(form_data),
                        headers:{
                                "Content-Type": 'application/x-www-form-urlencoded'
                            }
                    }).then(function successCallback(response){
                        $('#new_genre').modal('hide');
                        notifyService.display("Genre Added Successfully");
                        $timeout(function() {
                                notifyService.showMessage = false;
                            }, 2000);

                            genre();
                        },function errorCallback(response){
                            notifyService.display("Something went wrong");
                        })
                    }

                
                }     

            }

})();
