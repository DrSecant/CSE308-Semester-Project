function SingleRun($scope, $element, $attrs, $http) {
	var ctrl = this;

	$http.get('singleRun.json').then(function(singleRunProp) {
        $scope.properties = singleRunProp;
    },
    function(error) {
    	$scope.properties = {};
    	console.log("error loading single run properties: " + error);
    });
	ctrl.content = parseGui($scope.properties);
}

angular.module('DistrictApp').component('singleRun', {
  templateUrl: 'templates/singleRun.tmpl.html',
  controller: SingleRun,
  bindings: {}
});