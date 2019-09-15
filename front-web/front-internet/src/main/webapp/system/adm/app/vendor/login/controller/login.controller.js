(function() {
	'use strict';

	angular.module('kidfriendly.adm').controller('LoginController', LoginController);
	LoginController.$inject = [ '$state' ];

	function LoginController($state) {
		var vm = this;

		vm.authenticate = function() {
		};
	}
})();