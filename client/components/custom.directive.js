/**
 * Author: Nilesh Mistry
 * Created Date: 11/06/2016
 * This file contains all the custom directives
 *
 **/
'use strict';
(function(){
	angular
		.module('PracticalTestApp')
		.directive('timeFormat', Directive);

	function Directive(){
		var directive = {
			restrict: 'E',
			template: '{{slot}}',
			scope: {
				slot: '=',
				format: '='
			},
			controller: Controller,
			controllerAs: 'vm'
		};
		return directive;
	}

	Controller.$inject = ['$scope'];

	function Controller($scope){
		var vm = this;

		Activate();
		function Activate(){
			$scope.$watch('format', function(newValue, oldValue) {
				if($scope.format == 0) {
					var hourMin = $scope.slot.split(':');
					if(parseInt(hourMin[0]) == 12) {
						$scope.slot = "12:00 am";
					} else if(parseInt(hourMin[0]) > 12) {
						$scope.slot = (parseInt(hourMin[0]) - 12) + ":" + hourMin[1] + " pm";
					} else {
						$scope.slot = hourMin[0] + ":" + hourMin[1] + " am";
					}
				} else {
					var hourMin = $scope.slot.split(':');
					if($scope.slot.indexOf("pm") >= 0) {
						$scope.slot = (parseInt(hourMin[0]) + 12) + ":" + hourMin[1].replace('pm', '')
					} else {
						$scope.slot = hourMin[0] + ":" + hourMin[1].replace('am', '')
					}
				}
			});
		}
	}
})();