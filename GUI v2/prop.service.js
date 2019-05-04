'use strict';
angular.module('prop')
	.factory('GenProp', function($resource) {
		var url = "/gui_properties.json";
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
		var url = "/singleRun.json";
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