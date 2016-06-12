/**
 * Author: Nilesh Mistry
 * Created Date: 11/06/2016
 * This file defines the edit scheduling controller
 *
 **/
'use strict';
(function(){
	angular
		.module('PracticalTestApp')
		.controller('EditScheduleController', Controller);

	Controller.$inject = ['$rootScope', '$scope', '$stateParams', 'SchedulingService', '$state', 'ngToast'];
	function Controller($rootScope, $scope, $stateParams, SchedulingService, $state, ngToast){
		var vm = this;

		//method declarations
		vm.saveUserData = SaveUserData;
		// method declaration done
		Activate();

		function Activate() {
			SchedulingService.getSpecificTimeslot($stateParams.id)
				.then(function(data){
					if(data) {
						vm.timeslotDetails = data;
						vm.currentSlot = data.slot;
						vm.firstname = data.firstname;
						vm.lastname = data.lastname;
						vm.phoneNumber = data.phoneno;
					} else {
						console.log(ngToast.danger);
						ngToast.danger("The slot your are trying to use is no longer exist.");
						$state.go('app.schedule.list');
						return;
					}
				}, function(err){

				});
			$scope.app.activeMenu='schedule';
			vm.phoneRegex = /^[0-9]{10,10}$/;
			vm.timeFormat = localStorage.getItem("timeFormat");
		}

		function SaveUserData (formName){
			if(formName.$valid) {
				var postData = {
					'firstname': vm.firstname,
					'lastname': vm.lastname,
					'phoneno': vm.phoneNumber,
					'isAvailable': false,
					'slot': vm.currentSlot
				};
				SchedulingService.saveTimeslotDetails($stateParams.id, postData)
					.then(function(data){
						ngToast.success('We have updated your details.');
						$state.go('app.schedule.list');
					}, function(err){

					});
			}
		}
	}
})();