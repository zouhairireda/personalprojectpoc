'use strict';

angular.module('angularGoogleMapsExample.controllers', ['angularGoogleMapsExample.services'])

  .controller('MapCtrl', function($scope, $timeout, $cordovaGeolocation, uiGmapGoogleMapApi, Yelp) {

    $scope.markers = [];
    $scope.infoVisible = false;
    $scope.infoBusiness = {};
    $scope.position = {};

    // Default to downtown Toronto
    var defaultPosition = {
      latitude: 43.6722780,
      longitude: -79.3745125
    };
    var zoomLevel = 16;

    $scope.map = {
      center: defaultPosition,
      zoom: zoomLevel
    };

    // Initialize and show infoWindow for business
    $scope.showInfo = function(marker, eventName, markerModel) {
      $scope.infoBusiness = markerModel;
      $scope.infoVisible = true;
    };

    // Hide infoWindow when 'x' is clicked
    $scope.hideInfo = function() {
      $scope.infoVisible = false;
    };

    var initializeMap = function(position) {
      console.log(position);
      if (!position) {
        // Default to downtown Toronto
        position = {
          coords: defaultPosition
        };
      }
      console.log(position);
      // TODO add marker on current location

      $scope.map = {
        center: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        zoom: zoomLevel
      };

      // Make info window for marker show up above marker
      $scope.windowOptions = {
        pixelOffset: {
          height: -32,
          width: 0
        }
      };

      /*Yelp.search(position).then(function(data) {
        console.log(data);
        for (var i = 0; i < data.data.businesses.length; i++) {
          var business = data.data.businesses[i];
          $scope.markers.push({
            id: i,
            name: business.name,
            url: business.url,
            icon: "../img/red.png",
            location: {
              latitude: business.location.coordinate.latitude,
              longitude: business.location.coordinate.longitude
            }
          });
        }
      }, function(error) {
        console.log("Unable to access yelp");
        console.log(error);
      });*/
    };

    uiGmapGoogleMapApi.then(function(maps) {
      // Don't pass timeout parameter here; that is handled by setTimeout below
      var posOptions = {enableHighAccuracy: false};
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
        console.log("Got location: " + JSON.stringify(position));
        $scope.position = position;
        initializeMap(position);
      }, function(error) {
        console.log(error);
        initializeMap();
      });
    });

    $scope.tapMinor = function() {
      Yelp.search($scope.position).then(function(data) {
        console.log(data);
        for (var i = 0; i < data.data.businesses.length; i++) {
          var business = data.data.businesses[i];
          $scope.markers.push({
            id: i,
            name: business.name,
            url: business.url,
            icon: "../img/minor.gif",
            location: {
              latitude: business.location.coordinate.latitude,
              longitude: business.location.coordinate.longitude
            }
          });
          break;
        }
      }, function(error) {
        console.log("Unable to access yelp");
        console.log(error);
      });
    }

    $scope.tapMajor = function() {
      Yelp.search($scope.position).then(function(data) {
        console.log(data);
        for (var i = 0; i < data.data.businesses.length; i++) {
          var business = data.data.businesses[i];
          $scope.markers.push({
            id: i,
            name: business.name,
            url: business.url,
            icon: "../img/major.png",
            location: {
              latitude: business.location.coordinate.latitude,
              longitude: business.location.coordinate.longitude
            }
          });
          break;
        }
      }, function(error) {
        console.log("Unable to access yelp");
        console.log(error);
      });
    }

    $scope.tapCritical = function() {
      Yelp.search($scope.position).then(function(data) {
        console.log(data);
        for (var i = 0; i < data.data.businesses.length; i++) {
          var business = data.data.businesses[i];
          $scope.markers.push({
            id: i,
            name: business.name,
            url: business.url,
            icon: "../img/critical.gif",
            location: {
              latitude: business.location.coordinate.latitude,
              longitude: business.location.coordinate.longitude
            }
          });
          break;
        }
      }, function(error) {
        console.log("Unable to access yelp");
        console.log(error);
      });
    }



    // Deal with case where user does not make a selection
    $timeout(function() {
      if (!$scope.map) {
        console.log("No confirmation from user, using fallback");
        initializeMap();
      }
    }, 5000);

  });
