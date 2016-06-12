/**
 * Author: Nilesh Mistry
 * Created Date: 11/06/2016
 * This file defines the scheduling controller
 *
 **/
'use strict';
(function(){
	angular
		.module('PracticalTestApp')
		.controller('SchedulingController', Controller);

	Controller.$inject = ['$rootScope', '$scope', 'timeslots'];
	function Controller($rootScope, $scope, timeslots){
		var vm = this;
		//method declarations
		vm.timeFormatChanged = timeFormatChanged;
		//method declarations done
		Activate();

		function Activate() {
			$scope.app.activeMenu='schedule';
			if(localStorage.getItem("timeFormat") != null && localStorage.getItem("timeFormat") != 'null') {
				vm.timeFormat = localStorage.getItem("timeFormat");
			} else {
				vm.timeFormat = '0';
				localStorage.setItem("timeFormat", vm.timeFormat);
			}
			vm.timeslots = timeslots;	
		}

		function timeFormatChanged() {
			localStorage.setItem("timeFormat", vm.timeFormat);
		}
	}
})();