(function() {
	'use strict';

	angular.module('kidfriendly.adm').controller('MainController', MainController);
	MainController.$inject = [ '$state' ];

	function MainController($state) {
		var vm = this;

		initialize();

		vm.logout = function() {
			vm.go('login');
		};

		vm.go = function(state, event) {
			if (!angular.isUndefined(event)) {
				jQuery("#menu").find('.active').removeClass('active');
				event.target.parentElement.classList.add('active');
			}

			$state.go(state);
		};

		function initialize() {
			console.log('inicializando o main');
		}
	}
})();