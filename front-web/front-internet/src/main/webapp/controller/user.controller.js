kid.controller('userController', ['$scope', 'userService', '$state', '$cookieStore', 'util', 'ModalService', '$timeout', 
    function($scope, userService, $state, $cookieStore, util, ModalService, $timeout){

	$scope.users = {};
	$scope.messages = "";
	$scope.cssMessage = "";
	$scope.visibleMessage = false;
	$scope.user = {};
	
	$scope.initEdit = function(){
		if($scope.user.idLogin == undefined || $scope.user.idLogin == null){
			$scope.user = $cookieStore.get("user");
		}
	};
	
	var searching = function() {
		$state.go('searchAdm');
    }
	
	$scope.search = function(){
		$state.go('searchAdm');
	};
	
	$scope.back = function(){
		$state.go('adm');
	};
	
	$scope.register = function(){
		$state.go('registerUser');
	};
	
	/**
	 * Method represent data in list and view users adims
	 */
	userService.getUserAdm(util.getUri()).success(function(data, status, headers, config) {
		$scope.users = data;
	}).error(function(data, status, headers, config) {
		$scope.messages = "Não foi possível carregar os dados dos usuários por algum erro interno...";
		$scope.visibleMessage = true;
		$scope.cssMessage = "message-table-incorret";
    });
	
	/**
	 * Call method for view edit
	 */
	$scope.editUser = function(user){
		$cookieStore.put("user", user);
		$state.go('editAdm');
	};
	
	/**
	 * Method in update user admin
	 */
	$scope.updateUserAdmin = function(){
		userService.getAlterUser(util.getUri(), $scope.user).success(function(data, status, headers, config) {
			$scope.cssMessage = "message-table-correct";
			$scope.messages = "Alterado com sucesso.";
			$scope.visibleMessage = true;
		}).error(function(data, status, headers, config) {
			$scope.cssMessage = "message-table-incorret";
			$scope.messages = "Erro ao tentar alterar usuário...";
			$scope.visibleMessage = true;
	    });
	};
	
	/**
	 * Delete User admin
	 */
	$scope.deleteUserAdm = function(user){
		userService.getDeleteUser(util.getUri(), user).success(function(data, status, headers, config) {
			$scope.cssMessage = "message-table-correct";
			$scope.messages = data.message;
			$scope.visibleMessage = true;
			userService.getUserAdm(util.getUri()).success(function(data, status, headers, config) {
				$scope.users = data;
			}).error(function(data, status, headers, config) {
				$scope.messages = "Não foi possível carregar os dados dos usuários por algum erro interno...";
				$scope.visibleMessage = true;
				$scope.cssMessage = "message-table-incorret";
		    });
		}).error(function(data, status, headers, config) {
			$scope.cssMessage = "message-table-incorret";
			$scope.messages = data.message;
			$scope.visibleMessage = true;
	    });
	};
	
	/**
	 * Search user admin
	 */
	$scope.searchUserAdmin = function(searching){
		userService.getSearchUserAdmin(util.getUri(), searching).success(function(data, status, headers, config) {
			$scope.users = data;
		}).error(function(data, status, headers, config) {
			$scope.messages = "Não foi possível pesquisar ERRO INTERNO...";
			$scope.visibleMessage = true;
			$scope.cssMessage = "message-table-incorret";
	    });
	};
	
	/**
	 * Register user admin
	 */
	$scope.registerUserAdm = function(user, pws){
		userService.getRegisterUserAdmin(util.getUri(), user, pws).success(function(data, status, headers, config) {
			$scope.cssMessage = "message-table-correct";
			$scope.messages = "Cadastrado com sucesso.";
			$scope.visibleMessage = true;
			$timeout(searching, 2000);
		}).error(function(data, status, headers, config) {
			$scope.messages = "Não foi possível pesquisar ERRO INTERNO...";
			$scope.visibleMessage = true;
			$scope.cssMessage = "message-table-incorret";
	    });
	};
	
}]);