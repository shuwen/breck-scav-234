scavList = new Mongo.Collection('scavList');

if (Meteor.isClient) {
  angular.module('breck-scav-234',['angular-meteor'])
    .controller('ScavListCtrl', function($scope, $meteor, $window) {

      $scope.playlist = [
        'http://upload.wikimedia.org/wikipedia/commons/a/a5/Male_and_female_parakeet_1.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Rose-ringed_Parakeet_Female.jpg/800px-Rose-ringed_Parakeet_Female.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Jamaican_Parakeet.jpg/593px-Jamaican_Parakeet.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Echo_Parakeet.jpg/800px-Echo_Parakeet.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Alexandrine_Parakeet.jpg/800px-Alexandrine_Parakeet.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/d/d0/Painted_Parakeet.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Alexandrine_Parakeet_at_Lochmara_Lodge.jpg/800px-Alexandrine_Parakeet_at_Lochmara_Lodge.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Red-eared_Parakeet.jpg/800px-Red-eared_Parakeet.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Monk_Parakeet.jpg/800px-Monk_Parakeet.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Parakeet_young.jpg/691px-Parakeet_young.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Scarlet_Chested_Parakeet.jpg/720px-Scarlet_Chested_Parakeet.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Rose-Ringed_Parakeet.jpg/800px-Rose-Ringed_Parakeet.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rose-ringed_Parakeet_5.jpg/400px-Rose-ringed_Parakeet_5.jpg'
      ];

      $scope.hideKeet = true;
      $scope.keetURL = $scope.playlist[0];

      $scope.scavList = $meteor.collection(scavList);

      $scope.complete = function(completion) {
        // Save new state of list to databse
        $scope.scavList.save();

        // You only get rewarded if you complete an item
        if(completion) {
          $scope.hideKeet = false;
          $scope.keetURL = $scope.playlist[ Math.floor($scope.playlist.length*Math.random()) ];
        }
      }

    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // Populate the list with 323 items (the number of Scav items this year) if empty
    if( scavList.find().fetch().length == 0 ) {
      for(var i=0; i<323; i++) {
        scavList.insert({
          '_id': i+1,
          'complete': false,
        });
      }
    }

  });
}