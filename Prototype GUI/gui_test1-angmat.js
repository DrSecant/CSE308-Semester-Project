(function() {
  'use strict';

  angular.module('MapApp', ['ngMaterial'])
    .controller('AppCtrl', function($scope) {
      var app = this;

      /* Call leaflet function (potentially create a Map obj instead) */
      var usMap = new Map();
      usMap.mapSetup();

      app.isOpen = false;
      app.hover = false;

      app.selectedMode = 'md-scale';

      app.selectedDirection = 'left';

      /* Defining menu item info */
      app.items = [
        { name: "Batch Run", icon: "img/icons/baseline-add_photo_alternate-24px.svg", direction: "bottom" },
        { name: "Single Run", icon: "img/icons/baseline-photo-24px.svg", direction: "bottom" }
      ];

      /* Handling application menu */
      app.buttonIcons = {
      	prev: { name: "Previous State", icon: "img/icons/baseline-navigate_before-24px.svg"},
      	next: { name: "Next State", icon: "img/icons/baseline-navigate_next-24px.svg"}
      };
      app.states=usMap.leaf_states;

      $scope.menuToggle = {};
    }); 
})();