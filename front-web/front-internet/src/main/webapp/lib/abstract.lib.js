/**
	Abstract for construction commom in user case
*/
kid.controller('abstractController', ['$scope', '$state', 
    function($scope, $state) {
      
	  $scope.returnFunction = function(){
	    $state.go('/', {});
	  };
	  
	  $scope.initial = function(){
		  $state.go('initial', {});
	  };
	  
	  $scope.company = function(){
		  $state.go('company', {});
	  };
	  
	  $scope.adm = function(){
		  $state.go('adm', {});
	  };
	  
	  $scope.coment = function(){
		  $state.go('coment', {});
	  };
      
}]).directive('menu', function() {
  return {
  	restrict: 'E',
    templateUrl: 'template/menu.html'
  };
});