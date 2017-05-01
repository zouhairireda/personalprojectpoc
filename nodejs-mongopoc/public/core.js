var scotchTodo = angular.module('scotchTodo', []);

scotchTodo.controller('mainController', function($scope, $http) {
	$scope.formData = {
		text: 'test'
	};

	$http.get('/api/todos').success(function(data) {
		$scope.todos = data;
		console.log(data);
	}).error(function(data) {
		console.log('Error: ' + data);
	});

	$scope.createTodo = function() {
		
		$http.post('/api/todos', $scope.formData).success(function(data) {
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}

	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id).success(function(data) {
			$scope.todos = data;
			console.log(data);
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
});