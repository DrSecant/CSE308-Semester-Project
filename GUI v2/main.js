'use strict';

angular.module('DistrictApp', ['prop', 'ngMaterial', 'ngMessages', 'ngAnimate'])
    .controller('AppCtrl', function(GenProp, $scope) {
    	var ctrl = this;
    	$scope.componentProp = GenProp.query();
    	ctrl.guiGenFunc = parseGui;

    	$scope.uiInfo = {
        	selectedState: ""
	    };
	    ctrl.usMap = new Map($scope.uiInfo);
	    ctrl.usMap.mapSetup();
});
