/**
 * Author: Nilesh Mistry
 * Created Date: 11/06/2016
 * This file defines the dashboard controller
 *
 **/
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
			
		}
	}
})();