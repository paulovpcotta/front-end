kid.service('locationService', ['$http', 
                                function($http){
	
	/**
	 * Altera Company
	 */
	this.getStates = function(uri, idCountry){
		return $http.get(uri + '/locality/liststatebycountry/' + idCountry);
	};
	
	/**
	 * List Company's
	 */
	this.getCitys = function(uri, idState){
		return $http.get(uri + '/locality/listcitybystate/' + idState);
	};
	
	
}]);