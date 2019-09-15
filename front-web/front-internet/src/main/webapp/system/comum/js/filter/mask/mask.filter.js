(function() {
	'use strict';

	angular.module('kidfriendly.comum.filter').filter('Mask', Mask);

	function Mask() {
		return function(input, format) {
			return new StringMask(format).apply(input);
		};
	}
})();
