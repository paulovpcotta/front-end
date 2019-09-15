/**
 * Created by Paulo on 24/11/2015.
 */
var kid = angular.module('kid',['ui.bootstrap', 'ngResource', 'ngRoute', 'ngCookies', 'ui.router', 'angularModalService',
	'ngAnimate', 'ngProgress', 'ngFileUpload']);

kid.config(['$stateProvider', '$urlRouterProvider', '$routeProvider', function($stateProvider, $urlRouterProvider, $routeProvider) {
	 
	var urlUnidade = 'http://' + window.location.host + '/hlc';
	
	$stateProvider.state('/', {
	   url: '/',
	   templateUrl : 'pages/login/login.html',
	   controller     : 'loginController',
	}).state('initial', {
	   url: '/initial',
	   templateUrl : 'pages/initial/initial.html',
	}).state('company', {
	   url: '/company',
	   templateUrl : 'pages/company/company.html',
	}).state('searchCompany', {
	   url: '/searchCompany',
	   templateUrl : 'pages/company/search.html',
	}).state('editCompany', {
	   url: '/editCompany',
	   templateUrl : 'pages/company/edit.html',
	}).state('adm', {
	   url: '/adm',
	   templateUrl : 'pages/user/search.html',
	}).state('searchAdm', {
	   url: '/searchAdm',
	   templateUrl : 'pages/user/search.html',
	}).state('registerUser', {
	   url: '/registerUser',
	   templateUrl : 'pages/user/adm.html',
	}).state('editAdm', {
	   url: '/editAdm',
	   templateUrl : 'pages/user/edit.html',
	}).state('coment', {
	   url: '/coment',
	   templateUrl : 'pages/coment/coment.html',
	});
	
   $urlRouterProvider.otherwise('/');
}]);