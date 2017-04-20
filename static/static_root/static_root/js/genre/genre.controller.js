(function() {
    'use strict';

    angular
        .module('app.genre')
        .controller('genreController', genreController);

        genreController.$inject = ['$http','$location','$window', '$localStorage', '$timeout', 'genreService','$routeParams', 'notifyService','BASE_URL'];

        function genreController( $http,$location, $window,$localStorage, $timeout, genreService,$routeParams, notifyService,BASE_URL) {
            var vm = this;

            vm.genre = '';

            vm.edit={
                name : ''
            }

            // vm.updateGenre = updateGenre;

            vm.reloadRoute = function() {
                $window.location.reload();
            }

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

            vm.add_new_genre=function(GenreData){

                var query = genreService.genre($localStorage.token).save({
                    name: vm.GenreData.name,
                });

                query.$promise
                    .then(function(data) {
                        $('#new_genre').modal('hide');
                        notifyService.display('Added New Genre Successfully');
                        $timeout(function() {
                            notifyService.showMessage = false;
                        }, 2000);

                        genre();
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }

            

            // update genre 

            vm.updateGenre=function(name) {


                alert('inside update genre');
                var i;
                for(i = 0; i < vm.genres.length; i++)
                    if (vm.genres[i].id === vm.edit.id){
                        var query = genreService.genre($localStorage.token).update({id: vm.edit.id}, {
                            name: vm.name
                        });

                        query.$promise
                            .then(function(response) {
                                vm.genres[i] = vm.edit;
                                $('#update_genre').modal('hide');
                                notifyService.display('Updated Genre Successfully');
                                $timeout(function() {
                                    notifyService.showMessage = false;
                                }, 2000);

                                genre();
                            })
                            .catch(function(error) {
                                notifyService.display('Error occured');
                            });
                        }
                    }


            vm.copygenre=function(genre) {
                vm.name=genre.name;
                vm.edit = angular.copy(genre);
                console.log(vm.edit);
                } 


            // delete genre
            vm.delete_genre=function(genreData) {
                alert('inside deleting genre')
                console.log(vm.genres)
                console.log(genreData.id)
                var i;
                for (i = 0; i < vm.genres.length; i++)
                    if(vm.genres[i].id === genreData.id){
                        var query = genreService.genre($localStorage.token).delete({id: genreData.id});
                        console.log(query)
                        query.$promise
                        .then(function(data) {
                            console.log(data);
                            vm.genres.splice(i, 1);
                            notifyService.display('Genre Deleted Successfully');
                                $timeout(function() {
                                    notifyService.showMessage = false;
                                }, 2000);

                                genre();
                            })
                            .catch(function(error) {
                                notifyService.display('Error occured');
                            });
                        }

                    } 

        }

})();
