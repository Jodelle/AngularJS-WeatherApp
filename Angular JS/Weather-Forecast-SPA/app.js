var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//Routes
weatherApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
        templateUrl: 'pages/home.html',
        controller:'homeController'
        })

        .when('/forecast',{
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

        .when('/forecast/:days',{
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })


});

//Services
weatherApp.service('cityService', function(){
    this.city = '';
});


//Controllers
weatherApp.controller('homeController',['$scope','cityService', function($scope, cityService){
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController',['$scope','$resource', '$routeParams', 'cityService',function($scope, $resource, $routeParams, cityService){
    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '7';

    $scope.weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?appid=9f884c08bd9aae96697e8eb9b255c4e4',{
        callback:"JSON_CALLBACK"},{
        get: { method: 'JSONP' }
    });

    $scope.weatherResult = $scope.weatherApi.get({
        q: $scope.city,
        cnt: $scope.days
    });
    console.log($scope.weatherResult);
    console.log($scope.list);
    $scope.convertToFahrenheit = function (degK){
        return Math.round((1.8 * (degK - 273)) + 32 ) + 'F';
    }
     $scope.convertToDate = function(date){
         return new Date(date * 1000);
     }

}]);