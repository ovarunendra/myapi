var myApp =  angular.module('myApp',[]); 

myApp.controller('myAppController',['$scope', '$http', function ($scope, $http, myAppService) { 

  	$scope.logs = [];

    $scope.init = function() { 

    	$http.get('http://localhost:2700/readlog/varun').then(function(result) { $scope.logs = result.data; });
    } 

    $scope.init(); 

}]);
