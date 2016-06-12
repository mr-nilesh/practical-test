'use strict';
(function(){
	angular
		.module('PracticalTestApp')
		.controller('DashboardController', Controller);

	Controller.$inject=['$rootScope','$scope'];
	function Controller($rootScope,$scope){
		var vm = this;
		Activate();

		function Activate() {
			$scope.app.activeMenu='dashboard';
		}
	}
})();