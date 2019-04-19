function GuiGroupController($scope, $element, $attrs) {
	var ctrl = this;
}

angular.module('districtApp').component('guiGroup', {
  templateUrl: 'templates/guiGroup.tmpl.html',
  controller: GuiGroupController,
  bindings: {
  	group: '='
  }
});