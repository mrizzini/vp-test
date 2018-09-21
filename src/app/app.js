import angular from 'angular';
import Chart from 'chart.js';
require("angular-route");

import '../style/app.scss';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngRoute'])
  .controller('AppCtrl', function ($scope, $route) {
    // Home page controller
    var ctx = document.getElementById("userStepsChart").getContext('2d');
    var stepChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          datasets: [
            {
              label: '# of Steps (this week)',
              data: [8120, 12900, 3200, 5430, 18202, 7003],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 5
          },
          {
            label: '# of Steps (last week)',
            data: [3220, 15200, 2100, 3540, 13502, 10003],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          labels: {
              fontSize: 18
          }
        },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  })
  .controller('LeaderboardCtrl', function ($scope, $http) {
    // Leaderboard controller
    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=10'
    }).then(function successCallback(response) {
      $scope.users = response.data.results.map(user => {
        user.steps = randomInt(1000, 20000);
        // user.rank = getRank();
        return user;
      });
    }, function errorCallback(response) {
      console.log('api call error');
    });

    $scope.stepsSortOrderDesc = "-steps";
    // var counter = 0;
    // var getRank = function() {
    //   counter += 1;
    //   console.log("Getting called " + counter);
    //   return counter;
    // };

    var randomInt = function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    }
  })
  .controller('FriendsCtrl', function ($scope, $http) {
    // Friends controller
    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=4'
    }).then(function successCallback(response) {
      $scope.users = response.data.results.map(user => {
        return user;
      });
    }, function errorCallback(response) {
      console.log('api call error');
    });

    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=3'
    }).then(function successCallback(response) {
      $scope.friends = response.data.results.map(friend => {
        return friend;
      });
    }, function errorCallback(response) {
      console.log('api call error');
    });

    $scope.requestFriend =  function(user) {
      document.getElementById(user).innerHTML = "Friend Requested!!";
    }

    var randomInt = function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    }
  })
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        template: require('./home.html'),
        controller: 'AppCtrl'
      })
      .when('/leaderboard', {
        template: require('./leaderboard.html'),
        controller: 'LeaderboardCtrl'
      })
      .when('/friends', {
        template: require('./friends.html'),
        controller: 'FriendsCtrl'
      })
    $locationProvider.hashPrefix('');
  });

export default MODULE_NAME;
