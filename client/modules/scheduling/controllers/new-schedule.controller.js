/**
 * Author: Nilesh Mistry
 * Created Date: 11/06/2016
 * This file defines the new scheduling controller
 *
 **/
'use strict';
(function(){
	angular
		.module('PracticalTestApp')
		.controller('NewScheduleController', Controller);

	Controller.$inject = ['$rootScope', '$scope', 'SchedulingService', '$stateParams', '$state'];
	function Controller($rootScope, $scope, SchedulingService, $stateParams, $state){
		var vm = this;

		// method declarations
		vm.saveUserData = SaveUserData;
		// method declarations done
		Activate();

		function Activate() {
			$scope.app.activeMenu='schedule';
			vm.phoneRegex = /^[0-9]{10,10}$/;
			vm.timeFormat = localStorage.getItem("timeFormat");
			SchedulingService.getSpecificTimeslot($stateParams.id)
				.then(function(data){
					vm.timeslotDetails = data;
				}, function(err){

				});
		}

		function SaveUserData (formName){
			if(formName.$valid) {
				var postData = {
					'firstname': vm.firstname,
					'lastname': vm.lastname,
					'phoneno': vm.phoneNumber,
					'isAvailable': false,
					'slot': vm.timeslotDetails.slot
				};
				SchedulingService.saveTimeslotDetails($stateParams.id, postData)
					.then(function(data){
						$state.go('app.schedule.list');
					}, function(err){

					});
			}
		}
	}
})();