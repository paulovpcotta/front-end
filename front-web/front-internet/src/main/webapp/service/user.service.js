kid.service('userService', ['$http', 
                                function($http){
	/**
	 * Method get data user adm
	 */
	this.getUserAdm = function(uri){
		return $http.get(uri + '/login/search-user-adm/null');
	};
	
	/**
	 * Altera User
	 */
	this.getAlterUser = function(uri, loginDto){
		return $http.put(uri + '/login/update-user-adm', loginDto);
	};
	
	/**
	 * Delete user admin
	 */
	this.getDeleteUser = function(uri, loginDto){
		return $http.delete(uri + '/login/remove-user/' + loginDto.idLogin);
	};
	
	/**
	 * Search for ask and search user
	 */
	this.getSearchUserAdmin = function(uri, search){
		return $http.get(uri + '/login/search-user-adm/' + search);
	};
	
	/**
	 * Register user admin
	 */
	this.getRegisterUserAdmin = function(uri, user, pws){
		return $http.post(uri + '/login/register-user-adm/' + user + "/" + pws);
	};
	
}]);