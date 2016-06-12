'use strict';
(function() {
	angular
		.module('PracticalTestApp')
		.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app.schedule.list', {
				url: '/list',
				templateUrl: '/modules/scheduling/templates/scheduling.html',
				controller:'SchedulingController',
				controllerAs:'scheduling',
				resolve: {
					timeslots: ['SchedulingService', function (SchedulingService) {
						return SchedulingService.getTimeslots();
					}],
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'/modules/scheduling/controllers/scheduling.controller.js'
							]);
						}
					]
				}
			})
			.state('app.schedule.new', {
				url: '/new/:id',
				templateUrl: '/modules/scheduling/templates/manage-schedule.html',
				controller:'NewScheduleController',
				controllerAs:'scheduling',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'/modules/scheduling/controllers/new-schedule.controller.js'
							]);
						}
					]
				}
			})
			.state('app.schedule.edit', {
				url: '/edit/:id',
				templateUrl: '/modules/scheduling/templates/manage-schedule.html',
				controller:'EditScheduleController',
				controllerAs:'scheduling',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'/modules/scheduling/controllers/edit-schedule.controller.js'
							]);
						}
					]
				}
			});
	}
})();