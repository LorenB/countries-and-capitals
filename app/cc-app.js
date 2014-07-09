/**
 * Created by lbarcus on 7/5/14
 */

angular.module('ccApp', ['ui.bootstrap', 'ngRoute'])
    .controller('HomeCtrl', function ($scope) {
        //empty
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: './home.html',
            controller: 'HomeCtrl'
        })
    })
    .controller('CountriesCtrl', function ($scope, cacRequest) {
        $scope.collection = cacRequest.geonames;
        $scope.submit = function () {
            console.log("from submitted...");
            $scope.submitted = true;
            $scope.res = $scope.getCountryData();
        }
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/countries', {
            templateUrl: './countries.html',
            controller: 'CountriesCtrl',
            resolve: {
                cacRequest: [ '$route', '$http', '$q', function ($route, $http, $q) {
                    var data = $q.defer();
                    var url = "http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=lorenb&style=full";
//                    var request = {
//                        outputMode: 'json',
//                        showSourceText: '1',
//                        call_back: 'JSON_CALLBACK'
//                    };
                    $http({
                        method: 'GET',
                        url: url
                    }).success(function (result) {
                        data.resolve(result);
                    }).error(function () {
                        alert('error');
                    });
                    return data.promise;
                }]
            }
        })
    })
    .controller('CountryCtrl', function ($scope, $http, $routeParams) {
//        neighboursJSON ?
        $http.get('http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=lorenb&style=full&country=' + $routeParams.countryCode).success(function (data) {
            $scope.country = data;
        });
        $http.get('http://api.geonames.org/neighboursJSON?formatted=true&lang=en&username=lorenb&country=' + $routeParams.countryCode).success(function (data) {
            $scope.countryNeighbors = data;
        });

    })
    .config(function ($routeProvider) {
        $routeProvider.when('/country/:countryCode', {
            templateUrl: './country.html',
            controller: 'CountryCtrl'
        })
    })
    /*
     .controller('CountriesCtrl', function($scope){
     //empty
     })
     .config(function($routeProvider){
     $routeProvider.when('/', {
     templateUrl : './countries.html'
     controller : 'CountriesCtrl'
     })
     })*/;