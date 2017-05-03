var scotchTodo = angular.module('scotchTodo', []);
var backendUrl = "http://localhost:8081";

scotchTodo.controller('mainController', function($scope, $http) {
	$scope.formData = {
		text: 'test'
	};

	$http.get(backendUrl+'/api/todos').success(function(data) {
		$scope.todos = data;
		console.log(data);
	}).error(function(data) {
		console.log('Error: ' + data);
	});

	$scope.createTodo = function() {
		
		$http.post(backendUrl+'/api/todos', $scope.formData).success(function(data) {
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}

	$scope.deleteTodo = function(id) {
		$http.delete(backendUrl+'/api/todos/' + id).success(function(data) {
			$scope.todos = data;
			console.log(data);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
});