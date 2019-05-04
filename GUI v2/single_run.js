'use strict';

function SingleRunController(SingleRunProp, $scope, $element, $attrs, $http) {
	var ctrl = this;

  var singleRunStruct = SingleRunProp.query();

  singleRunStruct.$promise.then(function() {
    ctrl.content = parseGui(singleRunStruct, ctrl.componentProp);
    console.log(ctrl.content);
  });
}

angular.module('DistrictApp').component('singleRun', {
  templateUrl: 'templates/singleRun.tmpl.html',
  controller: SingleRunController,
  bindings: {
  	componentProp: '='
  }
});