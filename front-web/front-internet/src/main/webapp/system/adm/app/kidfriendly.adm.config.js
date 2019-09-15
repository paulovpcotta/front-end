(function() {
	'use strict';

	angular.module('kidfriendly.adm').config(Config);
	Config.$inject = [ '$stateProvider', '$urlRouterProvider', '$httpProvider' ];

	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$httpProvider.interceptors.push(function() {
			return {
				'request' : function(config) {
					config.timeout = 120000;

					return config;
				}
			};
		});

		$stateProvider.state('login', {
			url : '/login',
			templateUrl : 'app/view/login/login.html',
			controller : 'LoginController',
			controllerAs : 'vm'
		})/*.state('main', {
			url : '/main',
			abstract : true,
			templateUrl : 'app/view/main/main.html',
			controller : 'MainController',
			controllerAs : 'vm'
		}).state('main.email', {
			url : '/email',
			views : {
				'main-view' : {
					templateUrl : 'app/view/email/email.html',
					controller : 'EmailController',
					controllerAs : 'vm'
				}
			}
		})*/;

		$urlRouterProvider.otherwise('/login');
	}
})();