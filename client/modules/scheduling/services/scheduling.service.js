'use strict';
(function(){
	angular
		.module('PracticalTestApp')
		.factory('SchedulingService', SchedulingService);

	SchedulingService.$inject = ['$http', '$q', 'lodash'];

	function SchedulingService($http, $q, _){
		var service = {
			getTimeslots: GetTimeslots,
			getSpecificTimeslot: GetSpecificTimeslot,
			saveTimeslotDetails: SaveTimeslotDetails
		};
		return service;

		function GetTimeslots(){
			var deferred = $q.defer();
			var option = {
				method:'GET',
				url:'/apis/timeslots.json'
			};
			$http(option).success(function(data, status, headers){
				if(data.Status == 'success'){
					var timeslots = localStorage.getItem("timeslots");
					if(timeslots != null && timeslots != 'null') {
						var timeslotDetails = JSON.parse(timeslots);
						deferred.resolve(timeslotDetails);
					} else {
						localStorage.setItem("timeslots", JSON.stringify(data.Data));
						deferred.resolve(data.Data);
					}
				} else{
					deferred.reject(data.Error);
				}
			}).error(function(data, status, headers){
				deferred.reject(data);
			});
			return deferred.promise;
		}

		function GetSpecificTimeslot(timeslotId){
			var deferred = $q.defer();
			var timeslots = localStorage.getItem("timeslots");
			var timeslotDetails = _.find(JSON.parse(timeslots), {timeslotId: timeslotId});
			deferred.resolve(timeslotDetails);
			return deferred.promise;
		}

		function SaveTimeslotDetails(timeslotId, postData){
			postData.timeslotId = timeslotId;
			var deferred = $q.defer();
			var timeslots = JSON.parse(localStorage.getItem("timeslots"));
			_.map(timeslots, function(timeslot, index){
				return (timeslot.timeslotId == timeslotId) ? (timeslots[index] = postData) : timeslot;
			});
			localStorage.setItem("timeslots", JSON.stringify(timeslots));
			var returnObj = {
				"Status": "success",
				"Data": {}
			};
			deferred.resolve(returnObj.Data);
			return deferred.promise;
		}
	}
})();