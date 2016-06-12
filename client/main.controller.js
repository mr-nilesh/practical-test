'use strict';
(function(){
	angular
		.module('PracticalTestApp')
		.controller('AppController', Controller)

	Controller.$inject = ['$scope', '$rootScope'];
	/* @ngInject */
	function Controller($scope, $rootScope){
		var vm = this;
		// App globals
		$scope.app = {
			title:'Practical Test App'
		}
		Activate();

		function Activate() {

		}
	}
})();