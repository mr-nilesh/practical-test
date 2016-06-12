/**
 * Initiates module level routes and initiate run method.
 * Also check authentication
 *
 **/
'use strict';
(function(){
	angular.module('PracticalTestApp')
		.run(['$rootScope', RunPracticalTestApp])
		.config(['$stateProvider', '$urlRouterProvider', ConfigPracticalTestApp]);

	function ConfigPracticalTestApp($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/app/dashboard');

		$stateProvider.state('app', {
			abstract:true,
			url:'/app',
			templateUrl:'/layout/app.html'
		})
			.state('app.dashboard', {
				url:'/dashboard',
				controller:'DashboardController',
				controllerAs:'dashboard',
				templateUrl:'/modules/dashboard/templates/dashboard.html',
				resolve: {
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/modules/dashboard/controllers/dashboard.controller.js'
                            ]);
                        }
                    ]
                }
			})
			.state('app.schedule', {
				url:'/schedule',
				abstract:true,
				templateUrl:'/layout/abstract.html'
			});
	}

	function RunPracticalTestApp($rootScope){}
})();