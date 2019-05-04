'use strict';
angular.module('prop')
	.factory('GenProp', function($resource) {
		var url = "/properties/gui_properties.json";
		return $resource(url, {}, {
			query: {
				method: "GET",
				params: {},
				isArray: false,
				cache: true
			},
			get: {
				method: "GET",
				params: {},
				isArray: false,
				cache: true
			}
		})
	})
	.factory('SingleRunProp', function($resource) {
		var url = "/properties/singleRun.json";
		return $resource(url, {}, {
			query: {
				method: "GET",
				params: {},
				isArray: false,
				cache: true
			},
			get: {
				method: "GET",
				params: {},
				isArray: false,
				cache: true
			}
		})
	});