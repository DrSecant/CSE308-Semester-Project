(function() {
  'use strict';

  angular.module('MapApp', ['ngMaterial'])
    .controller('AppCtrl', function($scope) {
      var app = this;

      /* Login Info */
      app.username = "";

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
      /* Algorithm Control Menu */
      $scope.algData = {
        numDistricts:null
      };

      // Creating the Accordion tabs
      app.actions = {
        max: { name: "Maximize", icon: "img/icons/baseline-add-24px.svg"},
        min: { name: "Minimize", icon: "img/icons/baseline-remove-24px.svg"}
      };
      $scope.accordionTabs = {
        compact: {title: "Compactness", action: "min", open:"true", order:1},
        contig: {title: "Contiguity", action: "max", open:"false", order:3},
        popEq: {title: "Population Equality", action: "max", open:"false", order:5},
        parFai: {title: "Partisan Fairness", action: "max", open:"false", order:7},
        majMinDis: {title: "Majority-Minority Districts", action: "max", open:"false", order:9},
      };
      $scope.changeTabState = function(tabId) {
        var act = $scope.accordionTabs[tabId].action;
        $scope.accordionTabs[tabId].action = (act === "max") ? "min" : "max";
        $scope.accordionTabs[tabId].open = (act === "max") ? "true" : "false";
      };

      $scope.menuToggle = {};
    }); 
})();