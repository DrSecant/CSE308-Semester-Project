(function() {
  'use strict';

  angular.module('DistrictApp', ['ngMaterial', 'ngMessages', 'ngAnimate'])
    .controller('AppCtrl', function($scope, $mdDialog, $mdToast, $http) {
    	loadProperties("gui_properties.json", $http);
  	});
})();