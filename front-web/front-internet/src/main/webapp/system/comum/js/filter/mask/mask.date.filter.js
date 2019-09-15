(function() {
	'use strict';

	angular.module('kidfriendly.comum.filter').filter('MaskDate', MaskDate);

	function MaskDate() {
		return function(input, format) {
			return moment(input).format(format);
		};
	}
})();
