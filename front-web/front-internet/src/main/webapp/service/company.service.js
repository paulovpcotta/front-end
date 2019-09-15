kid.service('companyService', ['$http', 
                                function($http){
	
	/**
	 * Register Company
	 */
	this.getCompany = function(uri, companyDto){
		return $http.post(uri + '/company/register-company', companyDto);
	};
	
	/**
	 * Image Company
	 */
	this.getImage = function(uri, imageDto){
		return $http.post(uri + '/company/image-selected', imageDto);
	};
	
	/**
	 * List Company's
	 */
	this.getListCompany = function(uri, nameEstablishment, responsibleEstablishment,
			cnpj, objCity){
		return $http.get(uri + '/company/search-company/' + nameEstablishment + "/" + responsibleEstablishment + 
				"/" + cnpj + "/" + objCity);
	};
	
	/**
	 * List Category
	 */
	this.getListCategory = function(uri){
		return $http.get(uri + '/category/');
	};
	
	/**
	 * List schedule
	 */
	this.getListSchedule = function(uri){
		return $http.get(uri + '/schedule/listall/');
	};
	
	/**
	 * List type food
	 */
	this.getListTypeFood = function(uri){
		return $http.get(uri + '/foodtype/listall/');
	};
	
	/**
	 * List week
	 */
	this.getListWeek = function(uri){
		return $http.get(uri + '/week/listall/');
	};
	
	/**
	 * List Characteristic
	 */
	this.getListCharacteristic = function(uri, idCategory){
		return $http.get(uri + '/characteristic/listbycategory/' + idCategory);
	};
	
	/**
	 * inactive Company
	 */
	this.getInactiveCompany = function(uri, company){
		return $http.put(uri + '/company/inative-company', company);
	};
	
	/**
	 * Edit Company
	 */
	this.getEditCompany = function(uri, company){
		return $http.put(uri + '/company/edit-company', company);
	};
	
}]);