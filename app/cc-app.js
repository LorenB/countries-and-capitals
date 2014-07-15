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
    .controller('CountryCtrl', function ($scope, $http, $routeParams, cacCountryRequest, cacNeighboursRequest) {
        $scope.country = cacCountryRequest;
        $scope.countryNeighbors = cacNeighboursRequest;
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/country/:countryCode', {
            templateUrl: './country.html',
            controller: 'CountryCtrl',
            resolve: {
                cacNeighboursRequest: [ '$route', '$http', '$q', function ($route, $http, $q) {
                    var neighboursData = $q.defer();
                    var neighboursUrl = 'http://api.geonames.org/neighboursJSON?formatted=true&lang=en&username=lorenb&country=' + $route.current.params.countryCode;
                    $http({
                        method: 'GET',
                        url: neighboursUrl
                    }).success(function (result) {
                        neighboursData.resolve(result);
                    }).error(function () {
                        alert('error');
                    });
                    data = neighboursData.promise;
                    return data;
                }],
                cacCountryRequest: [ '$route', '$http', '$q', function ($route, $http, $q) {
                    var countryData = $q.defer();
                    var countryUrl = 'http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=lorenb&style=full&country=' + $route.current.params.countryCode;
                    $http({
                        method: 'GET',
                        url: countryUrl
                    }).success(function (result) {
                        countryData.resolve(result);
                    }).error(function () {
                        alert('error');
                    });
                    data = countryData.promise;
                    return data;
                }]
            }
        })
    });
