/**
* Created by lbarcus on 7/5/14
*/

angular.module('ccApp', ['ui.bootstrap', 'ngRoute'])
	.controller('HomeCtrl', function($scope){
		//empty
	})
	.config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl : './home.html',
			controller: 'HomeCtrl'
		})
	})
	.controller('CountriesCtrl', function($scope, $http){
		$scope.getCountryData = function(){
			var url = "http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=DE&username=lorenb&style=full";
			var request = {
				outputMode: 'json',
				showSourceText: '1',
				call_back: 'JSON_CALLBACK',
			};
			$http({
                method: 'JSONP',
                url: url,
                params: request
            })
            .success(function(result) {
                $scope.result = result;
                console.log(request);
                console.log(result);
            }).
            error(function() {
                alert('error');
            });
		}
		$scope.submit = function(){
            console.log("from submitted...");
            $scope.submitted = true;
            $scope.res = $scope.getCountryData();
        }
	})
	.config(function($routeProvider){
		$routeProvider.when('/countries', {
			templateUrl : function($http){
				console.log('executing templateUrl function /countries route');
				var url = "http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=DE&username=lorenb&style=full";
				var request = {
					outputMode: 'json',
					showSourceText: '1',
					call_back: 'JSON_CALLBACK',
				};
				console.log('request object created.');

				var httpobj = $http({
	                method: 'GET',
	                url: "http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=DE&username=lorenb&style=full"
	                //params: request
	            });
	            console.log("httpobj intialized");
	            httpobj.success(function(result) {
	                //$scope.result = result;
	                //console.log(request);
	                console.log(result);
	            });
				return'./countries.html';
			},
			controller : 'CountriesCtrl'
		}).when('/countries/US', {
			templateUrl : './country.html',
			controller : 'CountriesCtrl'
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