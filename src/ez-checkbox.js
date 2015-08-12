'use strict';

angular.module('ez.checkbox', [])
.constant('EzCheckboxConfig', {
  'iconClass': 'glyphicon glyphicon-ok'
})
.directive('ezCheckbox', ['EzCheckboxConfig', function(EzCheckboxConfig) {
	return {
		require: 'ngModel',
		restrict: 'EA',
		replace: 'true',
		transclude: true,
		template: '<a class="ez-checkbox" ng-click="toggle()">' +
                '<span class="check-box">' +
                  '<i class="{{options.iconClass}}" ng-show="checked"></i>' +
                '</span>' +
                '<span class="check-label" ng-transclude></span>' +
              '</a>',
    scope: {},
		link: function(scope, elem, attrs, modelCtrl) {
			var trueValue = true;
			var falseValue = false;

      scope.options = EzCheckboxConfig;

			if (attrs.hasOwnProperty('trueValue')) {
				trueValue = attrs.trueValue;
			}

      // invert truthyness if invert is defined
      if (attrs.hasOwnProperty('invert')) {
        falseValue = trueValue;
        trueValue = false;
      }

      if (attrs.hasOwnProperty('name')) {
        $('form label[for="' + attrs.name + '"]').click(function() {
          scope.toggle();
          scope.$apply();
        });
      }

      modelCtrl.$render = function() {
        if (attrs.disabled) {
          return;
        }

        if (modelCtrl.$modelValue === trueValue) {
          scope.checked = true;
        } else {
          scope.checked = false;
        }
      };

      scope.toggle = function() {
        if (attrs.disabled) {
          return;
        }

        modelCtrl.$setViewValue(modelCtrl.$modelValue === trueValue ? falseValue : trueValue);

        modelCtrl.$render();
			};
		}
	};
}]);
