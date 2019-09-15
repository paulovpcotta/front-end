kid.service('util', ['$http', 
                                function($http){
	
	var uri = 'http://kidfriendly.com.br/kf';
	//var uri = 'http://localhost:8080/kf';
	
	/**
	 * Method uri return
	 */
	this.getUri = function(){
		return uri;
	};
	
}]);