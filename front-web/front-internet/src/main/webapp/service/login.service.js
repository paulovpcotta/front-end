kid.service('loginService', ['$http', 
                                function($http){
	
	/**
	 * Method login user adm
	 */
	this.getLogin = function(uri, user, pws){
		return $http.get(uri + '/login/login-entrace/' + user + "/" + pws);
	};
	
}]);