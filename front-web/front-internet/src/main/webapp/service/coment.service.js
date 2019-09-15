kid.service('comentService', ['$http', 
                                function($http){
	
	/**
	 * Method get data rating
	 */
	this.getRating = function(uri){
		return $http.get(uri + '/rating/listpending');
	};
	
	/**
	 * Method activate rating
	 */
	this.getActive = function(uri, id){
		return $http.put(uri + '/rating/activate/' + id);
	};
	
	/**
	 * Delete data rating for key selected
	 */
	this.getActiveNotShow = function(uri, id){
		return $http.put(uri + '/rating/activate-logic-fail/' + id);
	};
	
}]);