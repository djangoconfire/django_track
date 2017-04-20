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

        function track() {
            var query = trackService.track($localStorage.token).query();
            query.$promise
                .then(function(data) {
                    console.log(data);
                    vm.tracks = data;
                    console.log(data)
                }).catch(function(error) {
                    console.log(error);
                    vm.tracks = error;
                });
        }



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

        // function deletebook(book) {
        //     var i;
        //     for (i = 0; i < vm.track.length; i++)
        //         if(vm.track[i].id === book.id)
        //             break;

        //     var query = trackervice.book($localStorage.token).delete({id: book.id});
        //     query.$promise
        //         .then(function(data) {
        //             vm.track.splice(i, 1);
        //         }).catch(function(error) {
        //             console.log(error);
        //         });
        // }

        // function add_new_track() {
        //     console.log(vm.trackData)
        //     // Error checking must have at least 'book' filled out
        //     if (vm.trackData === '')
        //         return;

        //     vm.gen_list = $("#genre").select2('data')
        //     vm.genre_list = []
            
        //     angular.forEach(vm.gen_list,function(value){
        //         /*var genre_dict = {}*/
        //         /*genre_dict.id = value.id*/
                
        //         vm.genre_list.push(value.id)
        //     })
            
        //     console.log(genre_list);

        //     var query = trackService.track($localStorage.token).save({
        //         title: vm.trackData.title,
        //         genre: vm.trackData.genre,
        //         rating: vm.trackData.rating
        //     });

        //     console.log(query);

        //     query.$promise
        //         .then(function(data) {
        //             vm.track.unshift(data);
        //             $('#new_track').modal('hide');
        //             notifyService.display('Added New Track');
        //             $timeout(function() {
        //                 notifyService.showMessage = false;
        //             }, 3000);
        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         });
        // }

        vm.add_new_track=function(trackData) {
            vm.add_track_disable=true
            
            vm.gen_list = $("#genre").select2('data')
            vm.genre_list = []
            
            angular.forEach(vm.gen_list,function(value){
                vm.genre_list.push(value.id)
                
            })

            console.log(vm.genre_list)

              var query = trackService.track($localStorage.token).save({
                title: vm.trackData.title,
                genre: JSON.stringify(vm.trackData.genre),
                rating: vm.trackData.rating
            });

            console.log(query);

            query.$promise
                .then(function(data) {
                    // vm.track.unshift(data);
                    $('#new_track').modal('hide');
                    notifyService.display('Added New Track');
                    $timeout(function() {
                        notifyService.showMessage = false;
                    }, 3000);

                    track();
                })
                .catch(function(error) {
                    console.log(error);
                });

        }   

        // function updatebook() {
        //     var i;
        //     for(i = 0; i < vm.track.length; i++)
        //         if (vm.track[i].id === vm.edit.id)
        //             break;
        //     // No reason to send update request if objects are still the same
        //     if (angular.equals(vm.track[i], vm.edit))
        //         return;

        //     var query = trackervice.book($localStorage.token).update({id: vm.edit.id}, {
        //         book_name: vm.edit.book,
        //         author_name: vm.edit.author_name,
        //         isbn_code: vm.edit.isbn_code,
        //         cover_image: vm.edit.cover_image
        //     });

        //     query.$promise
        //         .then(function(response) {
        //             vm.track[i] = vm.edit;
        //             $('#updatebookModal').modal('hide');
        //             notifyService.display('Updated book');
        //             $timeout(function() {
        //                 notifyService.showMessage = false;
        //             }, 3000);
        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         });
        // }

        // function copybook(book) {
        //     vm.edit = angular.copy(book);
        // }
    }
})();
