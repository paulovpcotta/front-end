kid.controller('loginController', ['$scope', 'loginService', '$state', '$cookieStore', 'util',
    function($scope, loginService, $state, $cookieStore, util){

	$scope.messages = "";
	$scope.cssMessage = "";
	$scope.visibleMessage = false;
	
	/**
	 * Efective login user in system
	 */
	$scope.entrace = function(){
		loginService.getLogin(util.getUri(), $scope.username, $scope.password).success(function(data, status, headers, config) {
			if(data != null && data != '' && data != undefined){
				$state.go('initial');
			}else{
				$scope.messages = "Usuário e senha não é um administrador.";
				$scope.visibleMessage = true;
				$scope.cssMessage = "message-table-incorret";
			}
		}).error(function(data, status, headers, config) {
			$scope.messages = "Não foi possível entrar ERRO INTERNO...";
			$scope.visibleMessage = true;
			$scope.cssMessage = "message-table-incorret";
	    });
	};
	
}]);