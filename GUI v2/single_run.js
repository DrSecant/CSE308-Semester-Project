function SingleRun($scope, $element, $attrs, $http) {
	var ctrl = this;

	$scope.properties = {};
	$http.get('singleRun.json').success(function(singleRunProp) {
        $scope.properties = singleRunProp;
    });
	ctrl.content = parseGui($scope.properties);
}